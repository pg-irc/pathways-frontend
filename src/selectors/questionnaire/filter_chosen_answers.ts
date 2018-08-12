import { AnswersMap } from '../../stores/questionnaire';
import * as R from 'ramda';

export const filterChosenAnswers = (answers: AnswersMap): AnswersMap => (
    R.filter(R.propEq('isChosen', true), answers)
);
