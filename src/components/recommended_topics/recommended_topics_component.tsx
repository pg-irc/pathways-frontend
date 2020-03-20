import React from 'react';
import { Trans } from '@lingui/react';
import { Id as TaskId } from '../../stores/topics';
import { View, Text } from 'native-base';
import { TopicListItem } from '../../selectors/topics/types';
import { TaskListActions } from '../topics/task_list_component';
import { TaskListComponent } from '../topics/task_list_component';
import { RouterProps } from '../../application/routing';
import { textStyles, colors, values } from '../../application/styles';
import {
    CallToActionFullComponent,
    CallToActionFullSubComponent,
    CallToActionPartialComponent,
    CallToActionPartialSubComponent,
    CovidComponent,
} from './call_to_action';
import { RecommendedIconComponent } from './recommended_icon_component';
import { buildTopicsListItemsWithHeadings } from '../topics/build_topic_list_items_with_headings';
import { EmptyTopicListComponent } from '../empty_component/empty_topic_list_component';

export interface RecommendedTopicsProps {
    readonly hasChosenAnswers: boolean;
    readonly bookmarkedTopics: ReadonlyArray<TaskId>;
    readonly recommendedTopics: ReadonlyArray<TopicListItem>;
}

export type AnalyticsAction = {
    readonly analyticsLinkPressed: (currentPath: string, linkContext: string, linkType: string, linkValue: string) => AnalyticsLinkPressedAction;
};

type Props = RecommendedTopicsProps & TaskListActions & RouterProps & AnalyticsAction;

export const RecommendedTopicsComponent: React.StatelessComponent<Props> = (props: Props): JSX.Element => (
    <TaskListComponent
        {...props}
        tasks={buildTopicsListItemsWithHeadings(props.recommendedTopics)}
        savedTasksIdList={props.bookmarkedTopics}
        emptyTaskListContent={<EmptyTopicListComponent message={<Trans>No topics to recommend</Trans>}/>}
        headerContent={<TaskListHeaderComponent {...props} />}
    />
);

const TaskListHeaderComponent = (props: Props): JSX.Element => (
    <View>
        <View
            padder
            style={{
                backgroundColor: colors.white,
            }}
        >
            <Text
                style={[
                    textStyles.headlineH1StyleBlackLeft,
                    {
                        marginBottom: 10,
                        paddingHorizontal: values.backgroundTextPadding,
                    },
                ]}
            >
                <Trans>Start settling in B.C.</Trans>
            </Text>
            <CovidComponent
                analyticsLinkPressed={props.analyticsLinkPressed}
                currentPathForAnalytics={props.location.pathname}
            />
            {props.hasChosenAnswers ?
                <CallToActionPartialComponent {...props} />
                :
                <CallToActionFullComponent {...props} />
            }
        </View>
        <View padder style={{ backgroundColor: colors.lightGrey }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text
                    style={[
                        textStyles.headlineH2StyleBlackLeft,
                        {
                            marginVertical: 15,
                            marginRight: 5,
                            paddingHorizontal: values.backgroundTextPadding,
                        },
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
