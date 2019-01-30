import React from 'react';
import { Dimensions, Image } from 'react-native';
import { Trans } from '@lingui/react';
import { Id as TaskId } from '../../stores/tasks';
import { View, Text, Button } from 'native-base';
import { TaskListItem } from '../../selectors/tasks/task_list_item';
import { TaskListActions } from '../tasks/task_list_component';
import { TaskListComponent, NoTasksRecommendedComponent } from '../tasks/task_list_component';
import { RouterProps, goToRouteWithoutParameter, Routes } from '../../application/routing';
import { EmptyComponent } from '../empty_component/empty_component';
import { textStyles, applicationStyles, colors, values } from '../../application/styles';
import { recommendationBubble } from '../../application/images';

export interface RecommendedTopicsProps {
    readonly hasChosenAnswers: boolean;
    readonly savedTopicsIdList: ReadonlyArray<TaskId>;
    readonly recommendedTopics: ReadonlyArray<TaskListItem>;
}

type Props = RecommendedTopicsProps & TaskListActions & RouterProps;

export const RecommendedTopicsComponent: React.StatelessComponent<Props> = (props: Props): JSX.Element => (
    <TaskListComponent
        {...props}
        tasks={props.recommendedTopics}
        savedTasksIdList={props.savedTopicsIdList}
        emptyTaskListContent={<NoTasksRecommendedComponent />}
        headerContent={<TaskListHeaderComponent {...props} />}
    />
);

const TaskListHeaderComponent = (props: Props): JSX.Element => (
    <View padder>
        {props.hasChosenAnswers ?
            <CallToActionCollapsedComponent {...props} />
            :
            <CallToActionFullComponent {...props} />}
        <Text style={textStyles.headlineH1StyleBlackLeft}>
            <Trans>Recommended Topics</Trans>
        </Text>
    </View>
);

const CallToActionFullComponent = (props: Props): JSX.Element => {
    return (
        <View style={[
            applicationStyles.boxShadowBelow,
            {
                backgroundColor: colors.teal,
                borderRadius: values.lessRoundedBorderRadius,
                padding: 20,
                marginBottom: 15,
            },
        ]}>
            <CallToActionFullComponentContent />
            <CallToActionFullComponentButton {...props} />
        </View>
    );
};

const CallToActionFullComponentContent = (): JSX.Element => {
    const logoSize = Dimensions.get('screen').width / 6;
    return (
        <View style={{ flexDirection: 'row', marginBottom: 15 }}>
            <View style={{ flex: 3 }}>
                <Text style={textStyles.headlineH2StyleWhiteLeft}>
                    <Trans>Get information based on your needs</Trans>
                </Text>
                <Text style={textStyles.paragraphStyleWhiteleft}>
                    <Trans>Share a little about yourself to get personalized recommendations to help you from arrival to integration.</Trans>
                </Text>
                <Image
                    source={recommendationBubble}
                    resizeMode={'contain'}
                    style={{
                        flex: 1,
                        width: logoSize,
                        height: logoSize,
                        marginBottom: 20,
                    }}
                />
            </View>
        </View>
    );
};

const CallToActionFullComponentButton = (props: Props): JSX.Element => (
    <Button
        full
        onPress={goToRouteWithoutParameter(Routes.Questionnaire, props.history)}
        style={[applicationStyles.whiteButton, applicationStyles.boxShadowBelow]}
    >
        <Text style={textStyles.whiteButton}>
            <Trans>Answer questions</Trans>
        </Text>
    </Button>
);

const CallToActionCollapsedComponent = (props: Props): JSX.Element => (
    <EmptyComponent />
);
