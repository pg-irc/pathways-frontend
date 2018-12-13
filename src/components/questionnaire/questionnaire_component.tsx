// tslint:disable:no-class no-this readonly-keyword no-expression-statement
import React from 'react';
import { I18nManager, Image, Dimensions, TouchableOpacity } from 'react-native';
import { Button, Content, View, Text, Icon } from 'native-base';
import * as R from 'ramda';
import * as selector from '../../selectors/questionnaire/question';
import { QuestionComponent } from './question_component';
import { applicationStyles, textStyles, colors, values } from '../../application/styles';
import { Trans } from '@lingui/react';
import { RouterProps } from '../../application/routing';
import { Id, ChooseAnswerAction, SetActiveQuestionAction } from '../../stores/questionnaire';
import { goToRouteWithoutParameter, Routes } from '../../application/routing';
import { arrivalAdvisorGlyphLogo } from '../../application/images';

export interface QuestionnaireProps {
    readonly questions: ReadonlyArray<selector.Question>;
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
                        height: 10,
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
        const activeQuestionIndex = this.findIndexForQuestion(this.props.activeQuestion);
        const isFinalQuestion = this.props.questions.length === activeQuestionIndex + 1;
        return (
            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                {this.renderPreviousButton()}
                {isFinalQuestion ? this.renderGotoPlanButton() : this.renderNextButton()}
            </View>
        );
    }

    private scrollToTop(): void {
        this.contentComponent._root.scrollIntoView(this.headingComponent);
    }

    private renderNextButton(): JSX.Element {
        const activeQuestionIndex = this.findIndexForQuestion(this.props.activeQuestion);
        const nextQuestionIndex = activeQuestionIndex + 1;
        const nextQuestion = this.fetchQuestionWithFallbackIndex(nextQuestionIndex, activeQuestionIndex);
        const onPress = (): void => { this.props.setActiveQuestion(nextQuestion.id); this.scrollToTop(); };
        const icon = I18nManager.isRTL ? 'arrow-back' : 'arrow-forward';
        const text = <Trans>Next</Trans>;
        return (
            <Button style={applicationStyles.whiteTopazButton} onPress={onPress} iconRight>
                <Text style={textStyles.whiteTopazButton}>{text}</Text>
                <Icon name={icon} style={{ color: colors.topaz }} />
            </Button>
        );
    }

    private renderGotoPlanButton(): JSX.Element {
        const onPress = goToRouteWithoutParameter(Routes.MyPlan, this.props.history);
        const text = <Trans>Go to My plan</Trans>;
        return (
            <Button style={applicationStyles.whiteTopazButton} onPress={onPress} iconRight>
                <Text style={textStyles.whiteTopazButton}>{text}</Text>
                <Icon name={'th-list'} type={'FontAwesome'} style={{ color: colors.topaz }} />
            </Button>
        );
    }

    private renderPreviousButton(): JSX.Element {
        const activeQuestionIndex = this.findIndexForQuestion(this.props.activeQuestion);
        const previousQuestionIndex = activeQuestionIndex - 1;
        const previousQuestion = this.fetchQuestionWithFallbackIndex(previousQuestionIndex, activeQuestionIndex);
        const onPress = (): void => { this.props.setActiveQuestion(previousQuestion.id); this.scrollToTop(); };
        const icon = I18nManager.isRTL ? 'arrow-forward' : 'arrow-back';
        const text = <Trans>Back</Trans>;
        return (
            <Button style={applicationStyles.whiteTopazButton} onPress={onPress} iconLeft>
                <Icon name={icon} style={{ color: colors.topaz }} />
                <Text style={textStyles.whiteTopazButton}>{text}</Text>
            </Button>
        );
    }

    private findIndexForQuestion(questionId: Id): number {
        return R.findIndex(R.propEq('id', questionId), this.props.questions);
    }

    private fetchActiveQuestionFromProps(): selector.Question {
        return this.props.questions[this.findIndexForQuestion(this.props.activeQuestion)];
    }

    private fetchQuestionWithFallbackIndex(indexToFetch: number, fallbackIndex: number): selector.Question {
        if (this.props.questions[indexToFetch]) {
            return this.props.questions[indexToFetch];
        }
        return this.props.questions[fallbackIndex];
    }
}
