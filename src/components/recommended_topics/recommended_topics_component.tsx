// tslint:disable:no-trailing-whitespace
import React from 'react';
import { Dimensions, Image, TouchableOpacity, I18nManager } from 'react-native';
import { Trans } from '@lingui/react';
import { Id as TaskId } from '../../stores/tasks';
import { View, Text, Button, Icon } from 'native-base';
import { TaskListItem } from '../../selectors/tasks/task_list_item';
import { TaskListActions } from '../tasks/task_list_component';
import { TaskListComponent, NoTasksRecommendedComponent } from '../tasks/task_list_component';
import { RouterProps, goToRouteWithoutParameter, Routes } from '../../application/routing';
import { textStyles, applicationStyles, colors, values } from '../../application/styles';
import { advisor, recommendationBubble } from '../../application/images';

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
    <View>
        <View
            padder
            style={{
                backgroundColor: colors.white,
            }}
        >
            <Text style={[textStyles.headlineH1StyleBlackLeft, { marginBottom: 10 }]}>
                <Trans>Start settling in B.C.</Trans>
            </Text>
            {props.hasChosenAnswers ?
                <CallToActionPartialComponent {...props} />
                :
                <CallToActionFullComponent {...props} />
            }
        </View>
        <View padder style={{ backgroundColor: colors.lightGrey }}>
            <Text style={[textStyles.headlineH2StyleBlackLeft, { marginVertical: 15 }]}>
                <Trans>Recommended for You</Trans>
            </Text>
            {props.hasChosenAnswers ?
                <CallToActionPartialSubComponent />
                :
                <CallToActionFullSubComponent />
            }
        </View>
    </View>
);

const CallToActionFullComponent = (props: Props): JSX.Element => {
    return (
        <View>
            <View style={[
                applicationStyles.boxShadowBelow,
                {
                    backgroundColor: colors.lightGrey,
                    borderRadius: values.lessRoundedBorderRadius,
                    padding: 20,
                    marginBottom: 10,
                },
            ]}>
                <CallToActionFullComponentContent />
                <CallToActionFullComponentButton {...props} />
            </View>
            <View style={{ alignItems: 'center'}}>
                <Icon type={'FontAwesome'} name={'angle-down'} style={{ color: colors.lightGrey }} />
            </View>
        </View>
    );
};

const CallToActionFullComponentContent = (): JSX.Element => {
    const logoSize = Dimensions.get('screen').width / 4;
    return (
        <View>
            <View style={{ flex: 5, flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                <View style={{ flex: 3 }}>
                    <Text style={[textStyles.headlineH5StyleBlackLeft, { color: colors.greyishBrown, marginBottom: 20 }]}>
                        <Trans>GETTING STARTED</Trans>
                    </Text>
                    <Text style={textStyles.headlineH2StyleBlackLeft}>
                        <Trans>Get information based on your needs</Trans>
                    </Text>
                </View>
                <Image
                    source={advisor}
                    resizeMode={'contain'}
                    style={{
                        flex: 2,
                        width: logoSize,
                        height: logoSize,
                    }}
                />
            </View>
            <Text style={[textStyles.paragraphStyleBrown, { marginBottom: 20 }]}>
                <Trans>
                    Share a little about yourself to get personalized recommendations to
                    help you from arrival to integration.
                </Trans>
            </Text>
        </View>
    );
};

const CallToActionFullComponentButton = (props: Props): JSX.Element => (
    <Button
        full
        onPress={goToRouteWithoutParameter(Routes.Questionnaire, props.history)}
        style={[applicationStyles.tealButton, applicationStyles.boxShadowBelow]}
    >
        <Text style={textStyles.tealButton}>
            <Trans>Answer questions</Trans>
        </Text>
    </Button>
);

const CallToActionFullSubComponent = (): JSX.Element => {
    const rightColumnContent = (
        <Text style={[textStyles.paragraphStyleBrown, { paddingLeft: 5 }]}>
            <Trans>
                Once you answer some questions, your recommendations will show up below.
                For now, here are some topics we recommend for everyone:
            </Trans>
        </Text>
    );
    return buildRecommendationContent(rightColumnContent);
};

const CallToActionPartialComponent = (props: Props): JSX.Element => {
    const rightColumnContent = (
        <View>
            <Text style={[textStyles.headlineH5StyleBlackLeft, { color: colors.greyishBrown }]}>
                <Trans>UPDATE MY RECOMMENDATIONS</Trans>
            </Text>
            <View style={{ flexDirection: 'row' }}>
                <Text style={[textStyles.headline6, { marginRight: 10 }]}>
                    <Trans>Go back to questions</Trans>
                </Text>
                <Icon
                    type={'FontAwesome'}
                    name={I18nManager.isRTL ? 'arrow-left' : 'arrow-right'}
                    style={{
                        color: colors.teal,
                        fontSize: values.smallerIconSize,
                    }}
                />
            </View>
        </View>
    );
    return (
        <TouchableOpacity
            onPress={goToRouteWithoutParameter(Routes.Questionnaire, props.history)}
            style={[
                applicationStyles.boxShadowBelow,
                {
                    backgroundColor: colors.lightGrey,
                    borderRadius: values.lessRoundedBorderRadius,
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingVertical: 15,
                    paddingHorizontal: 10,
                    marginBottom: 15,
                },
            ]}
        >
            {buildRecommendationContent(rightColumnContent)}
        </TouchableOpacity>
    );
};

const CallToActionPartialSubComponent = (): JSX.Element => {
    return (
        <Text style={textStyles.paragraphStyleBrown}>
            <Trans>
                Based on your answers, we recommend these topics for you:
            </Trans>
        </Text>
    );
};

const buildRecommendationContent = (rightColumnContent: JSX.Element): JSX.Element => {
    const logoSize = Dimensions.get('screen').width / 9;
    return (
        <View style={{ flex: 4, flexDirection: 'row' }}>
            <Image
                source={recommendationBubble}
                resizeMode={'contain'}
                style={{
                    flex: 1,
                    width: logoSize,
                    height: logoSize,
                    padding: 5,
                }}
            />
            <View style={{ flex: 3 }}>
                {rightColumnContent}
            </View>
        </View>
    );
};
