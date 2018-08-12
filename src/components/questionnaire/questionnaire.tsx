import React from 'react';
import { StyleSheet } from 'react-native';
import * as R from 'ramda';
import Accordion from 'react-native-collapsible/Accordion';
import { Content, View, Text, ListItem } from 'native-base';
import * as selector from '../../selectors/questionnaire/types';
import { Question } from './question';
import { applicationStyles, colors, values } from '../../application/styles';
import { Trans } from '@lingui/react';
import { RouterProps } from '../../application/routing';
import { Id, ChooseAnswerAction, SetActiveQuestionAction } from '../../stores/questionnaire';

export interface QuestionnaireProps {
    readonly questionnaire: selector.Questionnaire;
    readonly activeQuestion: Id;
    readonly recommendedTaskCount: number;
}
export interface QuestionnaireActions {
    readonly chooseAnswer: (answerId: Id) => ChooseAnswerAction;
    readonly setActiveQuestion: (activeQuestion: Id) => SetActiveQuestionAction;
}

type Props = QuestionnaireProps & QuestionnaireActions & RouterProps;

export const Component: React.StatelessComponent<Props> = (props: Props): JSX.Element => (
    <View style={[
        { flex: 1 },
    ]}>
        <Content padder>
            <Text style={applicationStyles.pageTitle}><Trans>Personalize My Plan</Trans></Text>
            <Text style={[
                { marginBottom: 20 },
                { textAlign: 'left' },
            ]}>
                <Trans>There is no requirement to answer any of the following questions
                but in doing so you help us recommend tasks and articles for you.</Trans>
            </Text>
            <Accordion
                activeSection={findIndexForQuestion(props.activeQuestion, props.questionnaire)}
                sections={getAccordionSections(props)}
                renderHeader={renderHeader(props)}
                renderContent={renderContent}
                duration={400}
            />
        </Content>
        <View style={styles.floatingCount}>
            <Text style={[styles.floatingText, { fontSize: 20 }]}>
                {props.recommendedTaskCount} <Text style={[styles.floatingText, { fontSize: values.smallTextSize }]}>
                    {props.recommendedTaskCount === 1 ? <Trans>task</Trans> : <Trans>tasks</Trans>}
                </Text>
            </Text>
            <Text style={[styles.floatingText, { fontSize: values.smallTextSize }]}>
                <Trans>recommended</Trans>
            </Text>
        </View>
    </View>
);

const findIndexForQuestion = (questionId: Id, questions: selector.Questionnaire): number => (
    R.findIndex(R.propEq('id', questionId), questions)
);

const findNextActiveQuestion = (currentActiveQuestionId: Id, questions: selector.Questionnaire): Id => {
    const nextActiveQuestionIndex = findIndexForQuestion(currentActiveQuestionId, questions) + 1;
    return questions[nextActiveQuestionIndex].id;
};

interface AccordionSection {
    readonly id: Id;
    readonly title: string;
    readonly content: JSX.Element;
}

// tslint:disable-next-line:readonly-array
type AccordionSectionArray = Array<AccordionSection>;

const getAccordionSections = (props: Props): AccordionSectionArray => (
    R.map((question: selector.Question) => (
        {
            id: question.id,
            title: renderQuestionTitle(question),
            content: renderQuestionContent(question, props),
        }
    ), props.questionnaire)
);

const renderQuestionTitle = (question: selector.Question): string => (
    `${question.number}. ${question.text}`
);

const renderQuestionContent = (question: selector.Question, props: Props): JSX.Element => {
    const { activeQuestion, questionnaire, setActiveQuestion }: Props = props;
    const nextButtonOnPress = (): SetActiveQuestionAction =>
        setActiveQuestion(findNextActiveQuestion(activeQuestion, questionnaire));
    return (
        <Question
            {...props}
            key={question.id}
            question={question}
            nextButtonOnPress={nextButtonOnPress}
            isFinalQuestion={question.number === questionnaire.length} />
    );
};

const renderHeader = R.curry((props: Props, section: AccordionSection, _index: number, isActive: boolean): JSX.Element => (
    <ListItem button noIndent noBorder
        onPress={(): SetActiveQuestionAction => props.setActiveQuestion(section.id)}
        style={isActive ? [{ backgroundColor: colors.lighterGrey }] : [{ backgroundColor: colors.white }]}>
        <Text style={isActive ? [{ padding: 10 }, applicationStyles.bold] : [{ padding: 10 }]}>
            {section.title}
        </Text>
    </ListItem>
));

const renderContent = (section: AccordionSection): JSX.Element => (
    section.content
);

const styles = StyleSheet.create({
    floatingCount: {
        backgroundColor: colors.darkGrey,
        padding: 5,
        flex: 1,
        position: 'absolute',
        bottom: 20,
        right: 0,
        justifyContent: 'center',
        borderBottomLeftRadius: 10,
        borderTopLeftRadius: 10,
    },
    floatingText: {
        color: colors.white,
        textAlign: 'center',
    },
});
