// tslint:disable:no-class no-this no-expression-statement
import React, { useState } from 'react';
import { I18nManager, Image, Dimensions } from 'react-native';
import { Button, Content, View, Text, Icon } from 'native-base';
import { Question as SelectorQuestion } from '../../selectors/questionnaire/question';
import { Answer as SelectorAnswer } from '../../selectors/questionnaire/answer';
import { QuestionComponent } from './question_component';
import { applicationStyles, textStyles, colors, values } from '../../application/styles';
import { Trans } from '@lingui/react';
import { RouterProps } from '../../application/routing';
import { Id, ChooseAnswerAction, SetActiveQuestionAction, AnswersMap } from '../../stores/questionnaire';
import { goToRouteWithoutParameter, Routes } from '../../application/routing';
import { arrivalAdvisorGlyphLogo } from '../../application/images';
import { EmptyComponent } from '../empty_component/empty_component';
import { CloseButtonComponent } from '../close_button_component';
import { NewTopicsModalConnectedComponent } from './new_topics_modal_connected_component';
import { CloseQuestionnaireAction } from '../../stores/questionnaire/actions';
import { Id as TopicId, TopicMap } from '../../stores/topics';
import { getNewlyRecommendedTopics } from '../../selectors/topics/get_newly_recommended_topics';
import { rejectTopicsWithIds } from '../../selectors/topics/reject_topics_with_ids';
import * as R from 'ramda';
import { getId } from '../../selectors/topics/get_id';

export interface QuestionnaireProps {
    readonly activeQuestion: SelectorQuestion;
    readonly oldAnswers: AnswersMap;
    readonly newAnswers: AnswersMap;
    readonly topics: TopicMap;
    readonly savedTopicIds: ReadonlyArray<TopicId>;
}

export interface QuestionnaireActions {
    readonly chooseAnswer: (answerId: Id) => ChooseAnswerAction;
    readonly setActiveQuestion: (activeQuestion: Id) => SetActiveQuestionAction;
    readonly closeQuestionnaire: (newTopics: ReadonlyArray<TopicId>) => CloseQuestionnaireAction;
}

type Props = QuestionnaireProps & QuestionnaireActions & RouterProps;

const computeNewlyRecommendedTopics = (props: Props): ReadonlyArray<TopicId> => {
    const newTopics = getNewlyRecommendedTopics(props.oldAnswers, props.newAnswers, props.topics);
    const newTopicsNotAlreadySaved = rejectTopicsWithIds(newTopics, props.savedTopicIds);
    return R.map(getId, newTopicsNotAlreadySaved);
};

export const QuestionnaireComponent = (props: Props): JSX.Element => {
    // linter doesn't understand state hooks with booleans for some reason
    // tslint:disable-next-line:typedef
    const [showModal, setShowModal] = useState(false);

    const closeQuestionnaireWithOptionalModal = (): void => {
        const newTopics = computeNewlyRecommendedTopics(props);
        if (R.isEmpty(newTopics)) {
            closeQuestionnaire();
        } else {
            setShowModal(true);
        }
    };

    const closeQuestionnaire = (): void => {
        const newTopics = computeNewlyRecommendedTopics(props);
        props.closeQuestionnaire(newTopics);
        setShowModal(false);
        goToRouteWithoutParameter(Routes.RecommendedTopics, props.history)();
    };

    return (
        <View style={{ flex: 1 }}>
            <View style={{paddingTop: 20, paddingBottom: 0, paddingLeft: 0, paddingRight: 10}}>
                <CloseButtonComponent
                    onPress={closeQuestionnaireWithOptionalModal}
                    color={colors.black}
                />
            </View>
            <Content padder>
                <HeadingComponent />
                <ProgressComponent
                    activeQuestion={props.activeQuestion}
                />
                <QuestionComponent
                    question={props.activeQuestion}
                    chooseAnswer={props.chooseAnswer}
                />
                <ButtonsComponent
                    activeQuestion={props.activeQuestion}
                    setActiveQuestion={props.setActiveQuestion}
                    onDoneButtonPress={closeQuestionnaireWithOptionalModal}
                />
                <NewTopicsModalConnectedComponent
                    isVisible={showModal}
                    onModalButtonPress={closeQuestionnaire}
                />
            </Content>
        </View>
    );
};

const HeadingComponent = (): JSX.Element => {
    const logoSize = Dimensions.get('screen').width / 6;
    return (
        <View>
            <View
                style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: colors.white,
                    paddingVertical: 15,
                }}
            >
                <Image
                    source={arrivalAdvisorGlyphLogo}
                    resizeMode={'contain'}
                    style={{ width: logoSize, height: logoSize, marginBottom: 5 }}
                />
            </View>
        </View>
    );
};

const ProgressComponent = (props: { readonly activeQuestion: SelectorQuestion }): JSX.Element => {
    const activeQuestionPosition = props.activeQuestion.positionInQuestionnaire;
    const lengthOfQuestionnaire = props.activeQuestion.lengthOfQuestionnaire;
    const barWidth = lengthOfQuestionnaire > 0 ? Math.round(activeQuestionPosition / lengthOfQuestionnaire * 100) : 100;
    return (
        <View style={{ marginBottom: 15 }}>
            <View style={{ flex: 1, borderRadius: values.roundedBorderRadius, backgroundColor: colors.lightGrey }}>
                <View style={{
                    borderRadius: values.roundedBorderRadius,
                    backgroundColor: colors.teal,
                    width: `${barWidth}%`,
                    height: 8,
                }}
                />
            </View>
            <Text style={textStyles.headlineH5StyleBlackCenter}>
                {activeQuestionPosition} <Trans>OF</Trans> {lengthOfQuestionnaire}
            </Text>
        </View>
    );
};

type ButtonsProps = {
    readonly activeQuestion: SelectorQuestion,
    readonly setActiveQuestion: (activeQuestion: Id) => SetActiveQuestionAction;
    readonly onDoneButtonPress: () => void,
};

const ButtonsComponent = (props: ButtonsProps): JSX.Element => {
    const hasNextQuestion = props.activeQuestion.nextQuestionId !== undefined;
    const hasPreviousQuestion = props.activeQuestion.previousQuestionId !== undefined;
    return (
        <View
            style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-around',
                marginBottom: 10,
                flexWrap: 'wrap',
            }}
        >
            {hasPreviousQuestion ? renderPreviousButton(props) : <EmptyComponent />}
            {hasNextQuestion ? renderNextButton(props) : renderDoneButton(props)}
        </View>
    );
};

const renderNextButton = (props: ButtonsProps): JSX.Element => {
    // tslint:disable-next-line:no-expression-statement
    const onPress = (): void => { props.setActiveQuestion(props.activeQuestion.nextQuestionId); };
    const icon = I18nManager.isRTL ? 'arrow-back' : 'arrow-forward';
    const text = activeQuestionHasBeenAnswered(props) ? <Trans>Next</Trans> : <Trans>Skip</Trans>;
    return (
        <Button style={applicationStyles.whiteTealButton} onPress={onPress} iconRight>
            <Text style={textStyles.whiteTealButton}>{text}</Text>
            <Icon name={icon} style={{ color: colors.teal }} />
        </Button>
    );
};

const renderPreviousButton = (props: ButtonsProps): JSX.Element => {
    // tslint:disable-next-line:no-expression-statement
    const onPress = (): void => { props.setActiveQuestion(props.activeQuestion.previousQuestionId); };
    const icon = I18nManager.isRTL ? 'arrow-forward' : 'arrow-back';
    const text = <Trans>Back</Trans>;
    return (
        <Button style={[applicationStyles.whiteTealButton, { marginBottom: 5 }]} onPress={onPress} iconLeft>
            <Icon name={icon} style={{ color: colors.teal }} />
            <Text style={textStyles.whiteTealButton}>{text}</Text>
        </Button>
    );
};

const renderDoneButton = (props: ButtonsProps): JSX.Element => {
    const text = <Trans>Done</Trans>;
    return (
        <Button style={applicationStyles.whiteTealButton} onPress={props.onDoneButtonPress} iconRight>
            <Text style={textStyles.whiteTealButton}>{text}</Text>
        </Button>
    );
};

const activeQuestionHasBeenAnswered = (props: ButtonsProps): boolean => {
    return R.any((answer: SelectorAnswer) => answer.isChosen, props.activeQuestion.answers);
};
