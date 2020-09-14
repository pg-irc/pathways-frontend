// tslint:disable:no-expression-statement
import React from 'react';
import { Trans } from '@lingui/react';
import { History, Location } from 'history';
import { Text, View } from 'native-base';
import { Id as TaskId, UnbookmarkTopicAction, BookmarkTopicAction, ExpandDetailAction, CollapseDetailAction } from '../../stores/topics';
import { textStyles, values, colors } from '../../application/styles';
import { goToRouteWithParameter, getParametersFromPath } from '../../application/routing';
import { Topic } from '../../selectors/topics/types';
import { Routes } from '../../application/routing';
import { TaskDetailContentComponent } from './task_detail_content_component';
import { TaskListComponent } from './task_list_component';
import { buildAnalyticsLinkContext } from '../../sagas/analytics/events';
import { EmptyTopicListComponent } from '../empty_component/empty_topic_list_component';
import { AnalyticsLinkPressedAction } from '../../stores/analytics';
import { BackButtonComponent } from '../header_button/back_button_component';
import { BookmarkButtonComponent } from '../bookmark_button_component';
import * as R from 'ramda';
import { MenuButtonComponent } from '../header_button/menu_button_component';
import { HeaderComponent } from '../main/header_component';
import { OpenHeaderMenuAction } from '../../stores/user_experience/actions';
import { HideLinkAlertsAction } from '../../stores/user_profile';
import { UserLocation, LatLong } from '../../validation/latlong/types';
import { BuildServicesRequestAction } from '../../stores/services/actions';

export interface TopicDetailsProps {
    readonly topic: Topic;
    readonly topicIsBookmarked: boolean;
    readonly bookmarkedTopicsIdList: ReadonlyArray<TaskId>;
    readonly history: History;
    readonly location: Location;
    readonly showLinkAlert: boolean;
    readonly manualUserLocation: UserLocation;
    readonly customLatLong: LatLong;
}

export interface TopicDetailActions {
    readonly bookmarkTopic: (topicId: TaskId) => BookmarkTopicAction;
    readonly unbookmarkTopic: (topicId: TaskId) => UnbookmarkTopicAction;
    readonly onExpand?: (contentId: string) => ExpandDetailAction;
    readonly onCollapse?: (contentId: string) => CollapseDetailAction;
    readonly analyticsLinkPressed: (currentPath: string, linkContext: string, linkType: string, linkValue: string) => AnalyticsLinkPressedAction;
    readonly openHeaderMenu: () => OpenHeaderMenuAction;
    readonly hideLinkAlert: () => HideLinkAlertsAction;
    readonly dispatchServicesRequest: (topic: Topic, manualUserLocation?: UserLocation) => BuildServicesRequestAction;
}

type Props = TopicDetailsProps & TopicDetailActions;

export const TopicDetailComponent = (props: Props): JSX.Element => (
    <View style={{ flex: 1 }}>
        <Header {...props} />
        <TaskListComponent
            tasks={props.topic.relatedTopics}
            bookmarkedTopicsIdList={props.bookmarkedTopicsIdList}
            bookmarkTopic={props.bookmarkTopic}
            unbookmarkTopic={props.unbookmarkTopic}
            history={props.history}
            emptyTaskListContent={<EmptyTopicListComponent message={<Trans>No topics to show</Trans>} />}
            headerContent={<ListHeaderComponent {...props} />}
            headerContentIdentifier={props.topic.id}
        />
    </View>
);

const Header = (props: Props): JSX.Element => {
    const params = getParametersFromPath(props.location, Routes.TopicDetail);
    const topicId = params.topicId;
    const backgroundColor = colors.lightGrey;
    const leftButton = <BackButtonComponent textColor={colors.black} />;
    const rightButtons: ReadonlyArray<JSX.Element> = [
        <BookmarkButtonComponent
            isBookmarked={R.contains(topicId, props.bookmarkedTopicsIdList)}
            bookmark={(): BookmarkTopicAction => props.bookmarkTopic(topicId)}
            unbookmark={(): UnbookmarkTopicAction => props.unbookmarkTopic(topicId)}
            textColor={colors.teal}
        />,
        <MenuButtonComponent
            onPress={props.openHeaderMenu}
            textColor={colors.black}
        />,
    ];
    return (
        <HeaderComponent
            backgroundColor={backgroundColor}
            leftButton={leftButton}
            rightButtons={rightButtons}
        />
    );
};

const ListHeaderComponent = (props: Props): JSX.Element => (
    <View padder>
        <TaskDetailContentComponent
            topic={props.topic}
            onServicesTextPress={(): void => onServicesTextPress(props)}
            showLinkAlert={props.showLinkAlert}
            onExpand={(): ExpandDetailAction => props.onExpand(props.topic.id)}
            onCollapse={(): CollapseDetailAction => props.onCollapse(props.topic.id)}
            hideLinkAlert={props.hideLinkAlert}
        />
        <Text
            style={[
                textStyles.headlineH5StyleBlackLeft,
                {
                    paddingHorizontal: values.backgroundTextPadding,
                    paddingTop: 18,
                },
            ]}
        >
            <Trans>RELATED TOPICS</Trans>
        </Text>
    </View>
);

const onServicesTextPress = (props: Props): void => {
    const analyticsLinkContext = buildAnalyticsLinkContext('Topic', props.topic.title);
    const linkType = 'Button';
    const linkValue = 'Find related services near me';
    const currentPath = props.location.pathname;
    props.analyticsLinkPressed(currentPath, analyticsLinkContext, linkType, linkValue);
    if(props.customLatLong){
        const newManualUserLocation = {
            label: 'custom',
            latLong: props.customLatLong,
        }
        props.dispatchServicesRequest(props.topic, newManualUserLocation)
    }
    else{
        props.dispatchServicesRequest(props.topic, props.manualUserLocation)
    }
    goToRouteWithParameter(Routes.Services, props.topic.id, props.history)();
};
