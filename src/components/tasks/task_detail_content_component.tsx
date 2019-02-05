import React from 'react';
import * as R from 'ramda';
import { Image, Dimensions } from 'react-native';
import { View, Text, Icon, Button } from 'native-base';
import { Trans } from '@lingui/react';
import Markdown from 'react-native-markdown-renderer';
import { Task } from '../../selectors/tasks/task';
import { textStyles, colors, values, markdownStyles, applicationStyles } from '../../application/styles';
import { EmptyComponent } from '../empty_component/empty_component';
import { ExpandableContentComponent } from '../expandable_content/expandable_content_component';
import { arrivalAdvisorGlyphLogo } from '../../application/images';
import { images as topicImages } from '../../application/topicImages';

export interface TaskDetailContentProps {
    readonly task: Task;
}

export interface TaskDetailContentActions {
    readonly onServicesTextPress: () => void;
}

type Props = TaskDetailContentProps & TaskDetailContentActions;

export const TaskDetailContentComponent: React.StatelessComponent<Props> = (props: Props): JSX.Element => (
    <View padder style={{ backgroundColor: colors.white, marginHorizontal: -10 }}>
        <ImageComponent {...props}/>
        <TaxonomyComponent {...props} />
        <TitleComponent {...props} />
        <RecommendedComponent {...props} />
        <Divider />
        <TaskDescription {...props} />
        <Divider />
        <ServicesButton {...props} />
    </View>
);

const ImageComponent = (props: Props): JSX.Element => {
    const logoHeight = Dimensions.get('screen').height / 8;
    const imageSource = topicImages[props.task.id] ?
        topicImages[props.task.id]
        :
        arrivalAdvisorGlyphLogo;
    return (
        <View style={{
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 10,
            backgroundColor: colors.lightGrey,
            borderBottomWidth: 1,
            borderBottomColor: colors.darkerGrey,
            marginHorizontal: -10,
            marginTop: -10,
        }}>
            <Image
                source={imageSource}
                resizeMode={'contain'}
                style={{ height: logoHeight }}
            />
        </View>
    );
};

const TaxonomyComponent = (props: Props): JSX.Element => (
    <Text style={[
        textStyles.headlineH5StyleBlackLeft,
        {
            color: colors.greyishBrown,
            marginTop: 20,
            marginBottom: 5,
            paddingHorizontal: values.backgroundTextPadding,
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
        <View style={{ flexDirection: 'row', marginVertical: 5, paddingHorizontal: values.backgroundTextPadding }}>
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
    <View style={{ height: 2, flex: 1, marginVertical: 20, backgroundColor: colors.lightGrey }}></View>
);

const TitleComponent = (props: Props): JSX.Element => (
    <Text style={[textStyles.taskTitle, { paddingHorizontal: values.backgroundTextPadding }]}>
        {props.task.title}
    </Text>
);

const TaskDescription = (props: Props): JSX.Element => {
    const task = props.task;
    const taskDescription = <Markdown style={markdownStyles}>{task.description}</Markdown>;
    return task.relatedTasks.length > 0 ? <ExpandableContentComponent contentId={task.id} content={taskDescription} /> : taskDescription;
};

const ServicesButton = (props: Props): JSX.Element => (
    <Button
        onPress={props.onServicesTextPress}
        iconLeft
        style={[
            applicationStyles.tealButton,
            applicationStyles.boxShadowBelow,
            {
                paddingHorizontal: 15,
                alignSelf: 'center',
                marginBottom: 15,
                justifyContent: 'center',
            },
        ]}
    >
        <Icon
            type={'FontAwesome'}
            name={'map-marker'}
            style={{
                color: colors.white,
                fontSize: values.smallIconSize,
            }}
        />
        <Text style={textStyles.button}>
            <Trans>Find related services near me</Trans>
        </Text>
    </Button>
);
