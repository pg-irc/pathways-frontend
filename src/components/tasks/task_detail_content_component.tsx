import React from 'react';
import { TouchableOpacity } from 'react-native';
import { View, Text, Icon } from 'native-base';
import { Trans } from '@lingui/react';
import Markdown from 'react-native-markdown-renderer';
import { Task } from '../../selectors/tasks/task';
import { textStyles, colors, values, markdownStyles } from '../../application/styles';
import { getColorForExploreIcon } from '../explore/get_color_for_explore_icon';
import { EmptyComponent } from '../empty_component/empty_component';
import { ExpandableContentComponent } from '../expandable_content/expandable_content_component';

export interface TaskDetailContentProps {
    readonly task: Task;
}

export interface TaskDetailContentActions {
    readonly onServicesTextPress: () => void;
}

type Props = TaskDetailContentProps & TaskDetailContentActions;

export const TaskDetailContentComponent: React.StatelessComponent<Props> = (props: Props): JSX.Element => (
    <View padder style={{ backgroundColor: colors.white }}>
        <View style={{ marginVertical: 20, flexDirection: 'row' }}>
            <TaxonomyComponent {...props} />
            <RecommendedComponent {...props} />
        </View>
        <TitleComponent {...props} />
        <TinyHeadingWithContentComponent text={<Trans>ABOUT</Trans>} content={<TaskDescription {...props} />} />
        <TinyHeadingWithContentComponent text={<Trans>WHO CAN HELP?</Trans>} content={<ServicesLink {...props} />} />
    </View>
);

const TaxonomyComponent = (props: Props): JSX.Element => (
    <RoundedBadge
        iconName={props.task.exploreSection.icon}
        iconColor={getColorForExploreIcon(props.task.exploreSection.icon)}
        text={props.task.exploreSection.name}
    />
);

const RecommendedComponent = (props: Props): JSX.Element => (
    props.task.isRecommended ?
        <RoundedBadge
            iconName={'star'}
            iconColor={colors.sunYellow}
            text={<Trans>Recommended for me</Trans>}
        />
        :
        <EmptyComponent />
);

const RoundedBadge = (props: { readonly iconName: string, readonly iconColor: string, readonly text: string | JSX.Element }):
    JSX.Element => (
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
                name={props.iconName}
                style={{
                    fontSize: values.smallerIconSize,
                    color: props.iconColor,
                    marginRight: 5,
                }}
            />
            <Text style={textStyles.paragraphStyle}>{props.text}</Text>
        </View>
    );

const TitleComponent = (props: Props): JSX.Element => (
    <Text style={textStyles.taskTitle}>
        {props.task.title}
    </Text>
);

const TinyHeadingWithContentComponent = (props: { readonly text: JSX.Element, readonly content: JSX.Element }):
    JSX.Element => (
        <View style={{ marginTop: 10 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={textStyles.headlineH5StyleBlackLeft}>
                    {props.text}
                </Text>
                <View style={{ height: 1, flex: 1, marginLeft: 10, backgroundColor: colors.lightGrey }}></View>
            </View>
            {props.content}
        </View>
    );

const TaskDescription = (props: Props): JSX.Element => {
    const task = props.task;
    const taskDescription = <Markdown style={markdownStyles}>{task.description}</Markdown>;
    return task.relatedTasks.length > 0 ? <ExpandableContentComponent content={taskDescription} /> : taskDescription;
};

const ServicesLink = (props: Props): JSX.Element => (
    <TouchableOpacity
        onPress={props.onServicesTextPress}
        style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 5,
        }}>
        <Text style={[textStyles.headlineH3StyleBlackLeft, { color: colors.orange, textDecorationLine: 'underline' }]}>
            <Trans>Find nearest services that can help</Trans>
        </Text>
        <Icon name={'arrow-forward'} style={{ color: colors.orange, fontSize: values.smallerIconSize, marginLeft: 5 }} />
    </TouchableOpacity>
);
