import React from 'react';
import { textStyles } from '../../application/styles';
import { View, Text } from 'native-base';
import { AnswerComponent } from './answer_component';
import { ChooseAnswerAction, Id } from '../../stores/questionnaire';
import { EmptyComponent } from '../empty_component/empty_component';
import { Answer as SelectorAnswer } from '../../selectors/questionnaire/answer';
import { Question as SelectorQuestion } from '../../selectors/questionnaire/question';

export interface QuestionProps {
    readonly question: SelectorQuestion;
}

export interface QuestionActions {
    readonly chooseAnswer: (answerId: Id) => ChooseAnswerAction;
}

type Props = QuestionProps & QuestionActions;

export const QuestionComponent: React.StatelessComponent<Props> = (props: Props): JSX.Element => {
    const { question, chooseAnswer }: Props = props;
    return (
        <View style={{ flex: 1, alignItems: 'center', marginBottom: 15 }}>
            <Text style={[textStyles.headlineH2StyleBlackCenter, { marginBottom: 15 }]}>{question.text}</Text>
            {question.explanation ? <Text style={textStyles.paragraphSmallStyleLeft}>{question.explanation}</Text> : <EmptyComponent />}
            {question.answers.map((answer: SelectorAnswer) => (
                <AnswerComponent
                    key={answer.id}
                    answer={answer}
                    chooseAnswer={chooseAnswer}
                    acceptMultipleAnswers={answer.acceptMultipleAnswers}
                />
            ))}
        </View>
    );
};
