import React from 'react';
import * as R from 'ramda';
import Accordion from 'react-native-collapsible/Accordion';
import { Content, Text, ListItem } from 'native-base';
import * as selector from '../../selectors/questionnaire';
import { Question} from './question';
import { applicationStyles, colors } from '../../application/styles';
import { Trans } from '@lingui/react';
import { RouterProps } from '../../application/routing';
import { Id, SelectAnswerAction, SetActiveQuestionAction } from '../../stores/questionnaire';

export interface QuestionnaireProps {
    readonly questionnaire: selector.Questionnaire;
    readonly activeQuestion: Id;
}
export interface QuestionnaireActions {
    readonly selectAnswer: (answerId: Id) => SelectAnswerAction;
    readonly setActiveQuestion: (activeQuestion: Id) => SetActiveQuestionAction;
}

type Props = QuestionnaireProps & QuestionnaireActions & RouterProps;

export const Component: React.StatelessComponent<Props> = (props: Props): JSX.Element => (
    <Content padder>
        <Text style={applicationStyles.pageTitle}><Trans>Personalize My Plan</Trans></Text>
        <Text style={[ { marginBottom: 20 } ]}>
            <Trans>There is no requirement to answer any of the following questions
                but in doing so you help us recommend tasks and articles for you</Trans>
        </Text>
        <Accordion
            activeSection={findIndexForQuestion(props.activeQuestion, props.questionnaire)}
            sections={getAccordionSections(props)}
            renderHeader={renderHeader(props)}
            renderContent={renderContent}
            duration={400}
        />
    </Content>
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
        style={isActive ? [{ backgroundColor: colors.lighterGrey }] : [{ backgroundColor: colors.white}]}>
        <Text style={isActive ? [{ padding: 10 }, applicationStyles.bold] : [{ padding: 10 }]}>
            {section.title}
        </Text>
    </ListItem>
));

const renderContent = (section: AccordionSection): JSX.Element => (
    section.content
);
