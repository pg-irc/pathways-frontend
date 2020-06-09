import React from 'react';
import { Trans } from '@lingui/react';
import { Id as TaskId } from '../../stores/topics';
import { View, Text } from 'native-base';
import { TopicListItem } from '../../selectors/topics/types';
import { TaskListActions } from '../topics/task_list_component';
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
import { RecommendedIconComponent } from './recommended_icon_component';
import { buildTopicsListItemsWithHeadings } from '../topics/build_topic_list_items_with_headings';
import { EmptyTopicListComponent } from '../empty_component/empty_topic_list_component';
import { AnalyticsLinkPressedAction } from '../../stores/analytics';
import { OpenHeaderMenuAction } from '../../stores/user_experience/actions';
import { HelpAndMenuButtonHeaderComponent } from '../help_and_menu_button_header/help_and_menu_button_header_component';
import { recommendedTopicsStyles } from './styles';
import { Alert } from '../../validation/content/types';

export interface RecommendedTopicsProps {
    readonly hasChosenAnswers: boolean;
    readonly bookmarkedTopics: ReadonlyArray<TaskId>;
    readonly recommendedTopics: ReadonlyArray<TopicListItem>;
    readonly alerts: ReadonlyArray<Alert>;
    readonly showLinkAlerts: boolean;
}

export interface RecommendedTopicsActions {
    readonly openHeaderMenu: () => OpenHeaderMenuAction;
    readonly analyticsLinkPressed: (currentPath: string, linkContext: string, linkType: string, linkValue: string) => AnalyticsLinkPressedAction;
    readonly hideLinkAlerts: () => void;
}

type Props = RecommendedTopicsProps & RecommendedTopicsActions & TaskListActions & RouterProps;

export const RecommendedTopicsComponent: React.StatelessComponent<Props> = (props: Props): JSX.Element => (
    <View style={{ flex: 1 }}>
        <HelpAndMenuButtonHeaderComponent {...props} />
        <TaskListComponent
            {...props}
            tasks={buildTopicsListItemsWithHeadings(props.recommendedTopics)}
            bookmarkedTopicsIdList={props.bookmarkedTopics}
            emptyTaskListContent={<EmptyTopicListComponent message={<Trans>No topics to recommend</Trans>} />}
            headerContent={<TaskListHeaderComponent {...props} />}
        />
    </View>
);

const TaskListHeaderComponent = (props: Props): JSX.Element => (
    <View>
        <View style={recommendedTopicsStyles.taskListHeaderContainer}>
            <Text
                style={[
                    textStyles.headlineH1StyleBlackLeft,
                    recommendedTopicsStyles.taskListHeaderTitle,
                ]}
            >
                <Trans>Start settling in B.C.</Trans>
            </Text>
            <AlertComponent
                alerts={props.alerts}
                showLinkAlerts={props.showLinkAlerts}
                hideLinkAlerts={props.hideLinkAlerts} />
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
