import React from 'react';
import * as R from 'ramda';
import Accordion from 'react-native-collapsible/Accordion';
import { Content, Text } from 'native-base';
import { Question} from './question';
import * as selector from '../../selectors/questionnaire';
import { QuestionnaireActions } from './actions';
import { applicationStyles, colors } from '../../application/styles';
import { questionnaireStyles } from './styles';
import { Trans } from '@lingui/react';
import { RouterProps } from '../../application/routing';

export interface QuestionnaireProps {
    readonly questionnaire: selector.Questionnaire;
}
type Props = QuestionnaireProps & QuestionnaireActions & RouterProps;

export const Component: React.StatelessComponent<Props> = (props: Props): JSX.Element => (
    <Content padder>
        <Text style={applicationStyles.pageTitle}><Trans>Personalize My Plan</Trans></Text>
        <Text style={questionnaireStyles.introText}>
            <Trans>There is no requirement to answer any of the following questions but in doing so you help us recommend tasks right for you.</Trans>
        </Text>
        <Accordion
            sections={getAccordionSections(props)}
            renderHeader={(section: AccordionSection): JSX.Element => section.title}
            renderContent={(section: AccordionSection): JSX.Element => section.content}
            underlayColor={colors.lightGrey}
            duration={400}
        />
    </Content>
);

interface AccordionSection {
    readonly title: JSX.Element;
    readonly content: JSX.Element;
}

// tslint:disable-next-line:readonly-array
const getAccordionSections = (props: Props): Array<AccordionSection> => (
    R.map((question: selector.Question) => (
        {
            title: renderQuestionTitle(question),
            content: renderQuestionContent(question, props),
        }
    ), props.questionnaire)
);

const renderQuestionTitle = (question: selector.Question): JSX.Element => (
    <Text style={[
        { padding: 10 },
    ]}>{question.number}. {question.text}</Text>
);

const renderQuestionContent = (question: selector.Question, props: Props): JSX.Element => (
    <Question
        {...props}
        key={question.id}
        question={question}
        selectAnswer={props.selectAnswer}
        isFinalQuestion={question.number === props.questionnaire.length} />
);
