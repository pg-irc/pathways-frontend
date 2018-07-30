import React from 'react';
import * as R from 'ramda';
import Accordion from 'react-native-collapsible/Accordion';
import { Content, Text, ListItem } from 'native-base';
import * as selector from '../../selectors/questionnaire';
import { Question} from './question';
import { applicationStyles, colors } from '../../application/styles';
import { questionnaireStyles } from './styles';
import { Trans } from '@lingui/react';
import { RouterProps } from '../../application/routing';
import { Id, SelectAnswerAction, SetActiveQuestionAction } from '../../stores/questionnaire';

export interface QuestionnaireProps {
    readonly questionnaire: selector.Questionnaire;
    readonly activeQuestion: number;
}
export interface QuestionnaireActions {
    readonly selectAnswer: (answerId: Id) => SelectAnswerAction;
    readonly setActiveQuestion: (activeQuestion: number) => SetActiveQuestionAction;
}

type Props = QuestionnaireProps & QuestionnaireActions & RouterProps;

export const Component: React.StatelessComponent<Props> = (props: Props): JSX.Element => (
    <Content padder>
        <Text style={applicationStyles.pageTitle}><Trans>Personalize My Plan</Trans></Text>
        <Text style={questionnaireStyles.introText}>
            <Trans>There is no requirement to answer any of the following questions
                but in doing so you help us recommend tasks right for you.</Trans>
        </Text>
        <Accordion
            activeSection={props.activeQuestion}
            sections={getAccordionSections(props)}
            renderHeader={renderHeader(props)}
            renderContent={renderContent}
            duration={400}
        />
    </Content>
);

interface AccordionSection {
    readonly title: string;
    readonly content: JSX.Element;
}

// tslint:disable-next-line:readonly-array
type AccordionSectionArray = Array<AccordionSection>;

const getAccordionSections = (props: Props): AccordionSectionArray => (
    R.map((question: selector.Question) => (
        {
            title: renderQuestionTitle(question),
            content: renderQuestionContent(question, props),
        }
    ), props.questionnaire)
);

const renderQuestionTitle = (question: selector.Question): string => (
    `${question.number}. ${question.text}`
);

const renderQuestionContent = (question: selector.Question, props: Props): JSX.Element => (
    <Question
        {...props}
        key={question.id}
        question={question}
        isFinalQuestion={question.number === props.questionnaire.length} />
);

const renderHeader = R.curry((props: Props, section: AccordionSection, index: number, isActive: boolean): JSX.Element => (
    <ListItem button noIndent noBorder
        onPress={(): SetActiveQuestionAction => props.setActiveQuestion(index)}
        style={isActive ? [{ backgroundColor: colors.lighterGrey }] : [{ backgroundColor: colors.white}]}>
        <Text style={isActive ? [{ padding: 10 }, applicationStyles.bold] : [{ padding: 10 }]}>
            {section.title}
        </Text>
    </ListItem>
));

const renderContent = (section: AccordionSection): JSX.Element => (
    section.content
);
