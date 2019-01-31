import { Answer } from '../../stores/questionnaire';

export const isEitherChosenOrInverted = (answer: Answer): boolean => answer.isChosen !== answer.isInverted;
