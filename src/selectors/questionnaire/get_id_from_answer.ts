import { Id, Answer } from '../../stores/questionnaire';

export const getIdFromAnswer = (answer: Answer): Id => answer.id;
