import React from 'react';
import * as R from 'ramda';
import Accordion from 'react-native-collapsible/Accordion';
import { TouchableOpacity } from 'react-native';
import { Content, View, Text } from 'native-base';
import * as selector from '../../selectors/questionnaire/question';
import { QuestionComponent } from './question_component';
import { colors, textStyles } from '../../application/styles';
import { Trans } from '@lingui/react';
import { RouterProps } from '../../application/routing';
import { Id, ChooseAnswerAction, SetActiveQuestionAction } from '../../stores/questionnaire';
import { FloatingTaskCounterComponent } from './floating_task_counter_component';
import { values } from '../../application/styles';

export interface QuestionnaireProps {
    readonly questionnaire: ReadonlyArray<selector.Question>;
    readonly activeQuestion: Id;
    readonly recommendedTaskCount: number;
}

export interface QuestionnaireActions {
    readonly chooseAnswer: (answerId: Id) => ChooseAnswerAction;
    readonly setActiveQuestion: (activeQuestion: Id) => SetActiveQuestionAction;
}

type Props = QuestionnaireProps & QuestionnaireActions & RouterProps;

export const QuestionnaireComponent: React.StatelessComponent<Props> = (props: Props): JSX.Element => (
    <View style={{ flex: 1, backgroundColor: colors.lightGrey}}>
        <Content padder>
            <Text style={textStyles.headlineH1StyleBlackLeft}><Trans>Personalize My Plan</Trans></Text>
            <Text style={[
                textStyles.headlineH4StyleBlackLeft,
                { marginBottom: 15 },
            ]}>
                <Trans>There is no requirement to answer any of the following questions
                but in doing so you help us recommend tasks for you.</Trans>
            </Text>
            <Accordion
                activeSection={findIndexForQuestion(props.activeQuestion, props.questionnaire)}
                sections={getAccordionSections(props)}
                renderHeader={renderHeader(props)}
                renderContent={renderContent}
                touchableComponent={TouchableOpacity}
                duration={400}
            />
        </Content>
        <FloatingTaskCounterComponent
            taskCount={props.recommendedTaskCount}
            history={props.history}
        />
    </View>
);

const findIndexForQuestion = (questionId: Id, questions: ReadonlyArray<selector.Question>): number => (
    R.findIndex(R.propEq('id', questionId), questions)
);

const findNextActiveQuestion = (currentActiveQuestionId: Id, questions: ReadonlyArray<selector.Question>): Id => {
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
        <QuestionComponent
            {...props}
            key={question.id}
            question={question}
            nextButtonOnPress={nextButtonOnPress}
            isFinalQuestion={question.number === questionnaire.length} />
    );
};

const renderHeader = R.curry((props: Props, section: AccordionSection, _index: number, isActive: boolean): JSX.Element => (
    <TouchableOpacity
        onPress={(): SetActiveQuestionAction => props.setActiveQuestion(section.id)}
        style={{
            backgroundColor: isActive ? colors.orange : colors.topaz,
            borderRadius: values.lessRoundedBorderRadius,
            marginBottom: 5,
            padding: 10,
        }}
    >
        <Text style={textStyles.paragraphBoldWhiteLeft}>
            {section.title}
        </Text>
    </TouchableOpacity>
));

const renderContent = (section: AccordionSection): JSX.Element => (
    section.content
);
