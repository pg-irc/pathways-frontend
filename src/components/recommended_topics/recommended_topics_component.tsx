import React from 'react';
import { Trans } from '@lingui/react';
import { Id as TaskId } from '../../stores/topics';
import { View, Text } from 'native-base';
import { TopicListItem } from '../../selectors/topics/types';
import { TaskListActions, TaskListProps } from '../topics/task_list_component';
import { TaskListComponent } from '../topics/task_list_component';
import { RouterProps } from '../../application/routing';
import { textStyles } from '../../application/styles';
import {
    CallToActionFullComponent,
    CallToActionFullSubComponent,
    CallToActionPartialComponent,
    CallToActionPartialSubComponent,
    AlertComponent,
} from './call_to_action';
import { ManitobaStartCard } from '../sponsor_card/manitoba_start_card';
import { RecommendedIconComponent } from './recommended_icon_component';
import { buildTopicsListItemsWithHeadings } from '../topics/build_topic_list_items_with_headings';
import { EmptyTopicListComponent } from '../empty_component/empty_topic_list_component';
import { AnalyticsLinkPressedAction, AnalyticsLinkProps } from '../../stores/analytics';
import { OpenHeaderMenuAction } from '../../stores/user_experience/actions';
import { HelpAndMenuButtonHeaderComponent } from '../help_and_menu_button_header/help_and_menu_button_header_component';
import { recommendedTopicsStyles } from './styles';
import { Alert } from '../../validation/content/types';
import { OffsetHook, useOffset } from '../use_offset';

export interface RecommendedTopicsProps {
    readonly hasChosenAnswers: boolean;
    readonly bookmarkedTopics: ReadonlyArray<TaskId>;
    readonly recommendedTopics: ReadonlyArray<TopicListItem>;
    readonly alerts: ReadonlyArray<Alert>;
    readonly showLinkAlerts: boolean;
    readonly region: string;
}

export interface RecommendedTopicsActions {
    readonly openHeaderMenu: () => OpenHeaderMenuAction;
    readonly analyticsLinkPressed: (analyticsLink: AnalyticsLinkProps) => AnalyticsLinkPressedAction;
    readonly hideLinkAlerts: () => void;
}

type Props = RecommendedTopicsProps & RecommendedTopicsActions & TaskListProps & TaskListActions & RouterProps;

export const RecommendedTopicsComponent: React.StatelessComponent<Props> = (props: Props): JSX.Element => {
    const { offsetFromRouteLocation }: OffsetHook = useOffset();
    return (
        <View style={{ flex: 1 }}>
            <HelpAndMenuButtonHeaderComponent {...props} />
            <TaskListComponent
                {...props}
                tasks={buildTopicsListItemsWithHeadings(props.recommendedTopics)}
                bookmarkedTopicsIdList={props.bookmarkedTopics}
                emptyTaskListContent={<EmptyTopicListComponent message={<Trans>No topics to recommend</Trans>} />}
                headerContent={<TaskListHeaderComponent {...props} />}
                scrollOffset={offsetFromRouteLocation}
            />
        </View>
    );
};

const TaskListHeaderComponent = (props: Props): JSX.Element => (
    <View>
        <View style={recommendedTopicsStyles.taskListHeaderContainer}>
            <Text
                style={[
                    textStyles.headlineH1StyleBlackLeft,
                    recommendedTopicsStyles.taskListHeaderTitle,
                ]}
            >
                <HomeScreenTitle {...props} />
            </Text>
            <AlertComponent
                alerts={props.alerts}
                showLinkAlerts={props.showLinkAlerts}
                hideLinkAlerts={props.hideLinkAlerts} />
            {props.region === 'mb' && <ManitobaStartCard />}
            {props.hasChosenAnswers ?
                <CallToActionPartialComponent {...props} />
                :
                <CallToActionFullComponent {...props} />
            }
        </View>
        <View padder style={recommendedTopicsStyles.recommendedListContainer}>
            <View style={recommendedTopicsStyles.recommendedListTitleContainer}>
                <Text
                    style={[
                        textStyles.headlineH2StyleBlackLeft,
                        recommendedTopicsStyles.recommendedListTitle,
                    ]}
                >
                    <Trans>Recommended for you</Trans>
                </Text>
                <RecommendedIconComponent />
            </View>
            {props.hasChosenAnswers ?
                <CallToActionPartialSubComponent />
                :
                <CallToActionFullSubComponent />
            }
        </View>
    </View>
);

const HomeScreenTitle = (props: Props): JSX.Element => (
    props.region === 'bc' ? <Trans>Start settling in B.C.</Trans> : <Trans>Start settling in Manitoba</Trans>
);
