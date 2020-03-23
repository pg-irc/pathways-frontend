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
import { BookmarkButtonComponent } from '../bookmark_button/bookmark_button_component';
import * as R from 'ramda';
import { MenuButtonComponent } from '../header_button/menu_button_component';
import { renderHeader } from '../main/render_header';
import { OpenHeaderMenuAction } from '../../stores/header_menu';

export interface TopicDetailsProps {
    readonly topic: Topic;
    readonly taskIsBookmarked: boolean;
    readonly savedTasksIdList: ReadonlyArray<TaskId>;
    readonly history: History;
    readonly location: Location;
}

export interface TopicDetailActions {
    readonly bookmarkTopic: (topicId: TaskId) => BookmarkTopicAction;
    readonly unbookmarkTopic: (topicId: TaskId) => UnbookmarkTopicAction;
    readonly onExpand?: (contentId: string) => ExpandDetailAction;
    readonly onCollapse?: (contentId: string) => CollapseDetailAction;
    readonly analyticsLinkPressed: (currentPath: string, linkContext: string, linkType: string, linkValue: string) => AnalyticsLinkPressedAction;
    readonly openHeaderMenu: () => OpenHeaderMenuAction;
}

type Props = TopicDetailsProps & TopicDetailActions;

export const TopicDetailComponent = (props: Props): JSX.Element => (
    <View style={{ flex: 1 }}>
        <Header {...props} />
        <TaskListComponent
            tasks={props.topic.relatedTopics}
            savedTasksIdList={props.savedTasksIdList}
            bookmarkTopic={props.bookmarkTopic}
            unbookmarkTopic={props.unbookmarkTopic}
            history={props.history}
            emptyTaskListContent={<EmptyTopicListComponent message={<Trans>No topics to show</Trans>}/>}
            headerContent={<ListHeaderComponent {...props} />}
            headerContentIdentifier={props.topic.id}
        />
    </View>
);

const Header = (props: Props): JSX.Element => {
    const params = getParametersFromPath(props.location, Routes.TopicDetail);
    const topicId = params.topicId;
    const backgroundColor = colors.lightGrey;
    const leftButton = <BackButtonComponent history={props.history} textColor={colors.black} />;
    const rightButtons: ReadonlyArray<JSX.Element> = [
        <BookmarkButtonComponent
            isBookmarked={R.contains(topicId, props.savedTasksIdList)}
            bookmark={(): BookmarkTopicAction => props.bookmarkTopic(topicId)}
            unbookmark={(): UnbookmarkTopicAction => props.unbookmarkTopic(topicId)}
            textColor={colors.teal}
        />,
        <MenuButtonComponent
            onPress={props.openHeaderMenu}
            textColor={colors.black}
        />,
    ];
    return renderHeader({ backgroundColor, leftButton, rightButtons });
};

const ListHeaderComponent = (props: Props): JSX.Element => (
    <View padder>
        <TaskDetailContentComponent
            topic={props.topic}
            onServicesTextPress={onServicesTextPress(props)}
            onExpand={(): ExpandDetailAction => props.onExpand(props.topic.id)}
            onCollapse={(): CollapseDetailAction => props.onCollapse(props.topic.id)}
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

const onServicesTextPress = (props: Props): () => void => {
    return (): void => {
        const analyticsLinkContext = buildAnalyticsLinkContext('Topic', props.topic.title);
        const linkType = 'Button';
        const linkValue = 'Find related services near me';
        const currentPath = props.location.pathname;
        props.analyticsLinkPressed(currentPath, analyticsLinkContext, linkType, linkValue);
        goToRouteWithParameter(Routes.Services, props.topic.id, props.history)();
    };
};
