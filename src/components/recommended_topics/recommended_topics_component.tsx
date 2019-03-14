import React from 'react';
import { Trans } from '@lingui/react';
import { Id as TaskId } from '../../stores/tasks';
import { View, Text } from 'native-base';
import { TaskListItem } from '../../selectors/tasks/task_list_item';
import { TaskListActions } from '../tasks/task_list_component';
import { TaskListComponent, NoTasksRecommendedComponent } from '../tasks/task_list_component';
import { RouterProps } from '../../application/routing';
import { textStyles, colors, values } from '../../application/styles';
import {
    CallToActionFullComponent, CallToActionFullSubComponent,
    CallToActionPartialComponent, CallToActionPartialSubComponent,
} from './call_to_action';
import { RecommendedIconComponent } from './recommended_icon_component';
import { buildTopicsListItemsWithHeadings } from '../tasks/build_topic_list_items_with_headings';

export interface RecommendedTopicsProps {
    readonly hasChosenAnswers: boolean;
    readonly savedTopicsIdList: ReadonlyArray<TaskId>;
    readonly recommendedTopics: ReadonlyArray<TaskListItem>;
}

type Props = RecommendedTopicsProps & TaskListActions & RouterProps;

export const RecommendedTopicsComponent: React.StatelessComponent<Props> = (props: Props): JSX.Element => (
    <TaskListComponent
        {...props}
        tasks={buildTopicsListItemsWithHeadings(props.recommendedTopics)}
        savedTasksIdList={props.savedTopicsIdList}
        emptyTaskListContent={<NoTasksRecommendedComponent />}
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
