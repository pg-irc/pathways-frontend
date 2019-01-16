import React from 'react';
import * as R from 'ramda';
import { View, Text, Icon, Button } from 'native-base';
import { Trans } from '@lingui/react';
import Markdown from 'react-native-markdown-renderer';
import { Task } from '../../selectors/tasks/task';
import { textStyles, colors, values, markdownStyles, applicationStyles } from '../../application/styles';
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
        <TaxonomyComponent {...props} />
        <TitleComponent {...props} />
        <RecommendedComponent {...props} />
        <Divider />
        <TaskDescription {...props} />
        <Divider />
        <ServicesButton {...props} />
    </View>
);

const TaxonomyComponent = (props: Props): JSX.Element => (
    <Text style={[
        textStyles.headlineH5StyleBlackLeft,
        {
            color: colors.greyishBrown,
            marginTop: 20,
            marginBottom: 5,
        },
    ]}
    >
        {props.task.exploreSection.name.toUpperCase()}
    </Text>
);

const RecommendedComponent = (props: Props): JSX.Element => {
    if (R.not(props.task.isRecommended)) {
        return <EmptyComponent />;
    }
    return (
        <View style={{ flexDirection: 'row', marginVertical: 5 }}>
            <Icon
                type='FontAwesome'
                name={'star'}
                style={{
                    fontSize: values.smallerIconSize,
                    color: colors.sunYellow,
                    marginRight: 5,
                }}
            />
            <Text style={[textStyles.paragraphStyle, { color: colors.greyishBrown, fontSize: 14, fontStyle: 'italic' }]}>
                <Trans>Recommended for me</Trans>
            </Text>
        </View>
    );
};

const Divider = (): JSX.Element => (
    <View style={{ height: 1, flex: 1, marginVertical: 20, backgroundColor: colors.lightGrey }}></View>
);

const TitleComponent = (props: Props): JSX.Element => (
    <Text style={textStyles.taskTitle}>
        {props.task.title}
    </Text>
);

const TaskDescription = (props: Props): JSX.Element => {
    const task = props.task;
    const taskDescription = <Markdown style={markdownStyles}>{task.description}</Markdown>;
    return task.relatedTasks.length > 0 ? <ExpandableContentComponent content={taskDescription} /> : taskDescription;
};

const ServicesButton = (props: Props): JSX.Element => (
    <Button
        onPress={props.onServicesTextPress}
        style={[
            applicationStyles.orangeButton,
            applicationStyles.boxShadowBelow,
            {
                paddingHorizontal: 15,
                alignSelf: 'center',
                marginBottom: 15,
            },
        ]}
    >
        <Text style={textStyles.button}>
            <Trans>Find related service near me</Trans>
        </Text>
    </Button>
);
