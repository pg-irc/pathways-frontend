import React from 'react';
import { View, Text, Icon } from 'native-base';
import { Trans } from '@lingui/react';
import { Task } from '../../selectors/tasks/task';
import { textStyles, colors, values } from '../../application/styles';
import { getColorForExploreIcon } from '../explore/get_color_for_explore_icon';
import { EmptyComponent } from '../empty_component/empty_component';
import { ExpandableText } from '../expandable_text/expandable_text';

export interface TaskDetailHeadingProps {
    readonly task: Task;
}

export const TaskDetailContentComponent: React.StatelessComponent<TaskDetailHeadingProps> =
    (props: TaskDetailHeadingProps): JSX.Element => {
        const task = props.task;
        return (
            <View padder style={{ backgroundColor: colors.white }}>
                <Text style={[textStyles.headlineH1StyleBlackLeft, { marginTop: 10 }]}>
                    {task.title}
                </Text>
                <View style={{ marginVertical: 20, flexDirection: 'row' }}>
                    <TaxonomyComponent {...props} />
                    <RecommendedComponent {...props} />
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={textStyles.headlineH5StyleBlackLeft}>
                        <Trans>ABOUT THIS TASK</Trans>
                    </Text>
                    <View style={{ height: 1, flex: 1, marginLeft: 10, backgroundColor: colors.lightGrey }}></View>
                </View>

                <ExpandableText text={props.task.description} />
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
