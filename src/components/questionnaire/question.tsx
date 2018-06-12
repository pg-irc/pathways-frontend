import React from 'react';
import { Content, Button, Grid, Row, Col, Text } from 'native-base';
import { Answer, Actions } from './answer';
import * as selector from '../../selectors/questionnaire';
import { QuestionnaireActions } from './actions';
import { applicationStyles } from '../../application/styles';
import { questionStyles } from './styles';
import { Trans } from '@lingui/react';

export interface Props {
    readonly question: selector.Question;
    readonly questionNumber: number;
}

export type Actions = QuestionnaireActions;

export const Question: React.StatelessComponent<Props & Actions> = (props: Props & Actions): JSX.Element => {
    const { question, questionNumber, selectAnswer }: Props & Actions = props;
    return (
        <Grid style={questionStyles.questionWrapper}>
            <Row>
                <Col>
                    <Text style={applicationStyles.bold}>{questionNumber}. {question.text}</Text>
                    {question.explanation ? <Text style={questionStyles.explanationText}>{question.explanation}</Text> : undefined}
                    {question.answers.map((answer: selector.Answer) => (
                        <Answer
                            key={answer.id}
                            answer={answer}
                            selectAnswer={selectAnswer}
                            acceptMultipleAnswers={answer.acceptMultipleAnswers}
                        />
                    ))}
                </Col>
            </Row>
            <Row style={questionStyles.buttonsWrapper}>
                <Button style={questionStyles.continueButton} small>
                    <Text><Trans>Continue</Trans></Text>
                </Button>
                <Button transparent small>
                    <Text><Trans>Skip</Trans></Text>
                </Button>
            </Row>
        </Grid>
    );
};
