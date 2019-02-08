// tslint:disable:no-class no-this no-expression-statement
import React from 'react';
import { History } from 'history';
import { I18nManager, Image, Dimensions } from 'react-native';
import { Button, Content, View, Text, Icon } from 'native-base';
import * as R from 'ramda';
import { Question as SelectorQuestion } from '../../selectors/questionnaire/question';
import { Answer as SelectorAnswer } from '../../selectors/questionnaire/answer';
import { QuestionComponent } from './question_component';
import { applicationStyles, textStyles, colors, values } from '../../application/styles';
import { Trans } from '@lingui/react';
import { RouterProps } from '../../application/routing';
import { Id, ChooseAnswerAction, SetActiveQuestionAction } from '../../stores/questionnaire';
import { goToRouteWithoutParameter, Routes } from '../../application/routing';
import { arrivalAdvisorGlyphLogo } from '../../application/images';
import { EmptyComponent } from '../empty_component/empty_component';
import { CloseButtonComponent } from '../close_button/close_button_component';
import { NewTopicsModalConnectedComponent } from './new_topics_modal_connected_component';
import { UpdateOldAnswersFromStoreAnswersAction } from '../../stores/questionnaire/actions';

export interface QuestionnaireProps {
    readonly activeQuestion: SelectorQuestion;
}

export interface QuestionnaireActions {
    readonly chooseAnswer: (answerId: Id) => ChooseAnswerAction;
    readonly setActiveQuestion: (activeQuestion: Id) => SetActiveQuestionAction;
    readonly updateOldAnswersFromStoreAnswers: () => UpdateOldAnswersFromStoreAnswersAction;
}

type Props = QuestionnaireProps & QuestionnaireActions & RouterProps;

interface State {
    readonly newTopicsModalIsVisible: boolean;
}

export class QuestionnaireComponent extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            newTopicsModalIsVisible: false,
        };
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.getOnModalButtonPress = this.getOnModalButtonPress.bind(this);
    }

    render(): JSX.Element {
        return (
            <Content padder>
                <HeadingComponent
                    history={this.props.history}
                    onCloseButtonPress={this.openModal}
                />
                <ProgressComponent {...this.props} />
                <QuestionComponent
                    question={this.props.activeQuestion}
                    chooseAnswer={this.props.chooseAnswer}
                />
                <ButtonsComponent {...this.props} />
                <NewTopicsModalConnectedComponent
                    history={this.props.history}
                    isVisible={this.state.newTopicsModalIsVisible}
                    onModalButtonPress={this.getOnModalButtonPress}
                />
            </Content>
        );
    }

    private openModal(): void {
        this.setState({ newTopicsModalIsVisible: true });
    }

    private closeModal(): void {
        this.setState({ newTopicsModalIsVisible: false });
    }

    private async getOnModalButtonPress(): Promise<void> {
        await this.props.updateOldAnswersFromStoreAnswers();
        await this.closeModal();
        goToRouteWithoutParameter(Routes.RecommendedTopics, this.props.history)();
    }
}

const HeadingComponent = (props: { readonly history: History, readonly onCloseButtonPress: () => void }): JSX.Element => {
    const logoSize = Dimensions.get('screen').width / 6;
    return (
        <View>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', paddingTop: 10 }}>
                <CloseButtonComponent onPress={props.onCloseButtonPress} color={colors.black}/>
            </View>
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

const ProgressComponent = (props: Props): JSX.Element => {
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

const ButtonsComponent = (props: Props): JSX.Element => {
    const hasNextQuestion = props.activeQuestion.nextQuestionId !== undefined;
    const hasPreviousQuestion = props.activeQuestion.previousQuestionId !== undefined;
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 10 }}>
            {hasPreviousQuestion ? renderPreviousButton(props) : <EmptyComponent />}
            {hasNextQuestion ? renderNextButton(props) : renderGotoRecommendedButton(props)}
        </View>
    );
};

const renderNextButton = (props: Props): JSX.Element => {
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

const renderPreviousButton = (props: Props): JSX.Element => {
    // tslint:disable-next-line:no-expression-statement
    const onPress = (): void => { props.setActiveQuestion(props.activeQuestion.previousQuestionId); };
    const icon = I18nManager.isRTL ? 'arrow-forward' : 'arrow-back';
    const text = <Trans>Back</Trans>;
    return (
        <Button style={applicationStyles.whiteTealButton} onPress={onPress} iconLeft>
            <Icon name={icon} style={{ color: colors.teal }} />
            <Text style={textStyles.whiteTealButton}>{text}</Text>
        </Button>
    );
};

const renderGotoRecommendedButton = (props: Props): JSX.Element => {
    const onPress = goToRouteWithoutParameter(Routes.RecommendedTopics, props.history);
    const text = <Trans>Done</Trans>;
    return (
        <Button style={applicationStyles.whiteTealButton} onPress={onPress} iconRight>
            <Text style={textStyles.whiteTealButton}>{text}</Text>
        </Button>
    );
};

const activeQuestionHasBeenAnswered = (props: Props): boolean => {
    return R.any((answer: SelectorAnswer) => answer.isChosen, props.activeQuestion.answers);
};
