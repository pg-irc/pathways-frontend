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
    readonly questions: ReadonlyArray<SelectorQuestion>;
    readonly activeQuestion: Id;
    readonly recommendedTaskCount: number;
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

    render(): JSX.Element {
        return (
            <Content padder ref={(component: object): object => this.contentComponent = component as ContentRef}>
                {this.renderHeading()}
                {this.renderProgress()}
                {this.renderQuestion()}
                {this.renderButtons()}
            </Content>
        );
    }

    private renderHeading(): JSX.Element {
        const logoSize = Dimensions.get('screen').width / 6;
        const closeButtonOnPress = goToRouteWithoutParameter(Routes.MyPlan, this.props.history);
        return (
            <View ref={(component: object): object => this.headingComponent = component as JSX.Element}>
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
        const activeQuestion = this.fetchActiveQuestionFromProps();
        const currentQuestionCount = activeQuestion.number;
        const totalQuestionCount = this.props.questions.length;
        const barWidth = totalQuestionCount > 0 ? Math.round(currentQuestionCount / totalQuestionCount * 100) : 100;
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
                    {currentQuestionCount} <Trans>OF</Trans> {totalQuestionCount}
                </Text>
            </View>
        );
    }

    private renderQuestion(): JSX.Element {
        const activeQuestion = this.fetchActiveQuestionFromProps();
        return <QuestionComponent question={activeQuestion} chooseAnswer={this.props.chooseAnswer} />;
    }

    private renderButtons(): JSX.Element {
        const activeQuestion = this.fetchActiveQuestionFromProps();
        const isFinalQuestion = activeQuestion.number === this.props.questions.length;
        const isFirstQuestion = activeQuestion.number === 1;
        return (
            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                {isFirstQuestion ? <EmptyComponent /> : this.renderPreviousButton()}
                {isFinalQuestion ? this.renderGotoPlanButton() : this.renderNextButton()}
            </View>
        );
    }

    private renderNextButton(): JSX.Element {
        const nextQuestion = this.fetchQuestionRelativeToActiveQuestion(1);
        const onPress = this.getQuestionButtonOnPress(nextQuestion.id);
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
        const previousQuestion = this.fetchQuestionRelativeToActiveQuestion(-1);
        const onPress = this.getQuestionButtonOnPress(previousQuestion.id);
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

    private findIndexForQuestion(questionId: Id): number {
        return R.findIndex(R.propEq('id', questionId), this.props.questions);
    }

    private fetchActiveQuestionFromProps(): SelectorQuestion {
        return this.props.questions[this.findIndexForQuestion(this.props.activeQuestion)];
    }

    private fetchQuestionRelativeToActiveQuestion(offset: number): SelectorQuestion {
        const activeQuestionIndex = this.findIndexForQuestion(this.props.activeQuestion);
        const targetQuestionIndex = activeQuestionIndex + offset;
        return this.fetchQuestionWithFallbackIndex(targetQuestionIndex, activeQuestionIndex);
    }

    private fetchQuestionWithFallbackIndex(indexToFetch: number, fallbackIndex: number): SelectorQuestion {
        if (this.props.questions[indexToFetch]) {
            return this.props.questions[indexToFetch];
        }
        return this.props.questions[fallbackIndex];
    }

    private activeQuestionHasBeenAnswered(): boolean {
        const activeQuestion = this.fetchActiveQuestionFromProps();
        return R.any((answer: SelectorAnswer) => answer.isChosen, activeQuestion.answers);
    }
}
