// tslint:disable:no-class no-this readonly-keyword no-expression-statement
import React from 'react';
import { I18nManager, Image, Dimensions, TouchableOpacity } from 'react-native';
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

export interface QuestionnaireProps {
    readonly activeQuestion: SelectorQuestion;
}

export interface QuestionnaireActions {
    readonly chooseAnswer: (answerId: Id) => ChooseAnswerAction;
    readonly setActiveQuestion: (activeQuestion: Id) => SetActiveQuestionAction;
}

type Props = QuestionnaireProps & QuestionnaireActions & RouterProps;

type ContentRef = {
    readonly _root: { scrollIntoView: (element: JSX.Element) => void };
};

export class QuestionnaireComponent extends React.Component<Props> {
    contentComponent: ContentRef = undefined;
    headingComponent: JSX.Element = undefined;

    constructor(props: Props) {
        super(props);
        this.setContentComponentRef = this.setContentComponentRef.bind(this);
        this.setHeadingComponentRef = this.setHeadingComponentRef.bind(this);
    }

    render(): JSX.Element {
        return (
            <Content padder ref={this.setContentComponentRef}>
                {this.renderHeading()}
                {this.renderProgress()}
                {this.renderQuestion()}
                {this.renderButtons()}
            </Content>
        );
    }

    private setContentComponentRef(component: object): void {
        this.contentComponent = component as ContentRef;
    }

    private setHeadingComponentRef(component: object): void {
        this.headingComponent = component as JSX.Element;
    }

    private renderHeading(): JSX.Element {
        const logoSize = Dimensions.get('screen').width / 6;
        const closeButtonOnPress = goToRouteWithoutParameter(Routes.MyPlan, this.props.history);
        return (
            <View ref={this.setHeadingComponentRef}>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                    <TouchableOpacity onPress={closeButtonOnPress}>
                        <Icon name='close' style={{ color: colors.black, padding: 10 }} />
                    </TouchableOpacity>
                </View>
                <View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: colors.white }}>
                    <Image
                        source={arrivalAdvisorGlyphLogo}
                        resizeMode={'contain'}
                        style={{ width: logoSize, height: logoSize, marginBottom: 5 }}
                    />
                </View>
            </View>
        );
    }

    private renderProgress(): JSX.Element {
        const activeQuestionPosition = this.props.activeQuestion.positionInQuestionnaire;
        const lengthOfQuestionnaire = this.props.activeQuestion.lengthOfQuestionnaire;
        const barWidth = lengthOfQuestionnaire > 0 ? Math.round(activeQuestionPosition / lengthOfQuestionnaire * 100) : 100;
        return (
            <View style={{ marginBottom: 15 }}>
                <View style={{ flex: 1, borderRadius: values.roundedBorderRadius, backgroundColor: colors.lightGrey }}>
                    <View style={{
                        borderRadius: values.roundedBorderRadius,
                        backgroundColor: colors.topaz,
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
    }

    private renderQuestion(): JSX.Element {
        return <QuestionComponent question={this.props.activeQuestion} chooseAnswer={this.props.chooseAnswer} />;
    }

    private renderButtons(): JSX.Element {
        const hasNextQuestion = this.props.activeQuestion.nextQuestionId !== undefined;
        const hasPreviousQuestion = this.props.activeQuestion.previousQuestionId !== undefined;
        return (
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 10 }}>
                {hasPreviousQuestion ? this.renderPreviousButton() : <EmptyComponent />}
                {hasNextQuestion ? this.renderNextButton() : this.renderGotoPlanButton()}
            </View>
        );
    }

    private renderNextButton(): JSX.Element {
        const onPress = this.getQuestionButtonOnPress(this.props.activeQuestion.nextQuestionId);
        const icon = I18nManager.isRTL ? 'arrow-back' : 'arrow-forward';
        const text = this.activeQuestionHasBeenAnswered() ? <Trans>Next</Trans> : <Trans>Skip</Trans>;
        return (
            <Button style={applicationStyles.whiteTopazButton} onPress={onPress} iconRight>
                <Text style={textStyles.whiteTopazButton}>{text}</Text>
                <Icon name={icon} style={{ color: colors.topaz }} />
            </Button>
        );
    }

    private renderPreviousButton(): JSX.Element {
        const onPress = this.getQuestionButtonOnPress(this.props.activeQuestion.previousQuestionId);
        const icon = I18nManager.isRTL ? 'arrow-forward' : 'arrow-back';
        const text = <Trans>Back</Trans>;
        return (
            <Button style={applicationStyles.whiteTopazButton} onPress={onPress} iconLeft>
                <Icon name={icon} style={{ color: colors.topaz }} />
                <Text style={textStyles.whiteTopazButton}>{text}</Text>
            </Button>
        );
    }

    private renderGotoPlanButton(): JSX.Element {
        const onPress = goToRouteWithoutParameter(Routes.MyPlan, this.props.history);
        const text = <Trans>Go to My plan</Trans>;
        return (
            <Button style={applicationStyles.whiteTopazButton} onPress={onPress} iconRight>
                <Text style={textStyles.whiteTopazButton}>{text}</Text>
            </Button>
        );
    }

    private getQuestionButtonOnPress(questionId: Id): () => void {
        return (): void => { this.props.setActiveQuestion(questionId); this.scrollToTop(); };
    }

    private scrollToTop(): void {
        this.contentComponent._root.scrollIntoView(this.headingComponent);
    }

    private activeQuestionHasBeenAnswered(): boolean {
        return R.any((answer: SelectorAnswer) => answer.isChosen, this.props.activeQuestion.answers);
    }
}
