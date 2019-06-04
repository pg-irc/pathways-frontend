// tslint:disable:no-expression-statement no-string-literal

/*
To build and run:

In order to run this with node, change tsconfig.json so it has

    "target": "es6"
    "module": "commonjs"

    Don't check that in!!!

Then run

    yarn build
    node lib/dump_questionnaire.js
*/

import { buildQuestionnaireFixture } from './fixtures/buildFixtures';
import { Answer, Question } from './stores/questionnaire';
import { TaxonomyTermReference } from './stores/taxonomies';
import * as R from 'ramda';

export const dumpQuestionnaireSummary = (): void => {
    const fixture = buildQuestionnaireFixture();

    const questions = R.values(fixture.questions);
    questions.forEach((question: Question) => {
        const answerBelongsToQuestion = (answer: Answer): boolean => (
            answer.questionId === question.id
        );
        const answers = R.filter(answerBelongsToQuestion, R.values(fixture.answers));

        logQuestion(question);
        answers.forEach((answer: Answer) => {
            logAnswer(answer);
        });
    });
};

const logQuestion = (question: Question): void => {
    const text = question.text;

    console.log(`\n\n${text}`);
};

const logAnswer = (answer: Answer): void => {
    const text = answer.text;
    const joinedTerms = getJoinedTaxonomyTerms(answer);

    console.log(`\t${text}\t${joinedTerms}`);
};

const getJoinedTaxonomyTerms = (answer: Answer): string => {
    if (R.isEmpty(answer.taxonomyTerms)) {
        return 'none';
    }
    const termStrings = R.map(toString, answer.taxonomyTerms);
    return R.reduce(joinWithTab, R.head(termStrings), R.tail(termStrings));
};

const toString = (term: TaxonomyTermReference): string => (
    `${term.taxonomyId}:${term.taxonomyTermId}`
);

const joinWithTab = (left: string, right: string): string => (
    `${left}\t${right}`
);

dumpQuestionnaireSummary();
