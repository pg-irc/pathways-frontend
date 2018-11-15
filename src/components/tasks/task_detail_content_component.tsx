import React from 'react';
import { View, Text, Icon } from 'native-base';
import { Trans } from '@lingui/react';
import Markdown from 'react-native-markdown-renderer';
import { Task } from '../../selectors/tasks/task';
import { textStyles, colors, values, markdownStyles } from '../../application/styles';
import { getColorForExploreIcon } from '../explore/get_color_for_explore_icon';
import { EmptyComponent } from '../empty_component/empty_component';
import { ExpandableContentComponent } from '../expandable_content/expandable_content_component';

export interface TaskDetailHeadingProps {
    readonly task: Task;
}

export const TaskDetailContentComponent: React.StatelessComponent<TaskDetailHeadingProps> =
    (props: TaskDetailHeadingProps): JSX.Element => {
        const task = props.task;
        const taskDescription = <Markdown style={markdownStyles}>{props.task.description}</Markdown>;
        return (
            <View padder style={{ backgroundColor: colors.white }}>
                <View style={{ marginVertical: 20, flexDirection: 'row' }}>
                    <TaxonomyComponent {...props} />
                    <RecommendedComponent {...props} />
                </View>
                <Text style={[textStyles.taskTitle, { marginBottom: 10 }]}>
                    {task.title}
                </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={textStyles.headlineH5StyleBlackLeft}>
                        <Trans>ABOUT THIS TASK</Trans>
                    </Text>
                    <View style={{ height: 1, flex: 1, marginLeft: 10, backgroundColor: colors.lightGrey }}></View>
                </View>
                {
                    task.relatedTasks.length > 0 ?
                        <ExpandableContentComponent content={taskDescription} /> :
                        taskDescription
                }
            </View>
        );
    };

const TaxonomyComponent = (props: TaskDetailHeadingProps): JSX.Element => (
    buildRoundedBadge(
        props.task.exploreSection.icon,
        getColorForExploreIcon(props.task.exploreSection.icon),
        props.task.exploreSection.name,
    )
);

const RecommendedComponent = (props: TaskDetailHeadingProps): JSX.Element => (
    props.task.isRecommended ?
        buildRoundedBadge(
            'star',
            colors.sunYellow,
            <Trans>Recommended for me</Trans>,
        ) : <EmptyComponent />
);

const buildRoundedBadge = (iconName: string, iconColor: string, text: string | JSX.Element): JSX.Element => (
    <View
        style={{
            backgroundColor: colors.lightGrey,
            borderRadius: values.roundedBorderRadius,
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 8,
            paddingHorizontal: 12,
            marginRight: 5,
        }}
    >
        <Icon
            type='FontAwesome'
            name={iconName}
            style={{
                fontSize: values.smallerIconSize,
                color: iconColor,
                marginRight: 5,
            }}
        />
        <Text style={textStyles.paragraphStyle}>{text}</Text>
    </View>
);
