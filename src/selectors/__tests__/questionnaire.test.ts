// tslint:disable:no-expression-statement no-let
import * as selector from '../questionnaire';
import { getIdsOfActiveAnswers } from '../select_ids_of_active_questions';
import { anInteger } from '../../application/__tests__/helpers/random_test_values';
import * as testHelpers from '../../stores/__tests__/helpers/questionnaire_helpers';
import { LocaleBuilder } from '../../stores/__tests__/helpers/locale_helpers';
import { aString } from '../../application/__tests__/helpers/random_test_values';
import { TaxonomyTermReference } from '../../stores/taxonomies';

const aTaxonomyTermReference = (): TaxonomyTermReference => (
    { taxonomyId: aString(), taxonomyTermId: aString() }
);

describe('questionnaire selector', () => {

    let locale = new LocaleBuilder().build();

    describe('should map properties', () => {

        let anAnswer: testHelpers.AnswerBuilder;
        let aQuestion: testHelpers.QuestionBuilder;
        let denormalizedData: selector.Questionnaire;

        beforeEach(() => {
            anAnswer = new testHelpers.AnswerBuilder().withLocaleCode(locale.code);
            aQuestion = new testHelpers.QuestionBuilder().withLocaleCode(locale.code).withAnswers([anAnswer]);
            const normalizedData = testHelpers.buildNormalizedQuestionnaire([aQuestion]);

            denormalizedData = selector.denormalizeQuestions(locale, normalizedData);
        });

        it('question id', () => {
            expect(denormalizedData[0].id).toBe(aQuestion.id);
        });

        it('question text', () => {
            expect(denormalizedData[0].text).toBe(aQuestion.text);
        });

        it('should nest answers inside questions', () => {
            expect(denormalizedData[0].answers[0].id).toBe(anAnswer.id);
        });

        it('answer text', () => {
            expect(denormalizedData[0].answers[0].text).toBe(anAnswer.text);
        });

        it('answer isSelected flag', () => {
            expect(denormalizedData[0].answers[0].isSelected).toBe(anAnswer.isSelected);
        });
    });

    it('should return all the questions', () => {
        const questionCount = anInteger();
        const questions = new Array(questionCount).fill(0).map(() => (
            new testHelpers.QuestionBuilder().withLocaleCode(locale.code)),
        );
        const normalizedData = testHelpers.buildNormalizedQuestionnaire(questions);

        const denormalizedData = selector.denormalizeQuestions(locale, normalizedData);

        expect(denormalizedData).toHaveLength(questionCount);
    });

    it('should return all the answers to a question', () => {
        const answerCount = anInteger();
        const answers = new Array(answerCount).fill(0).map(() => (
            new testHelpers.AnswerBuilder().withLocaleCode(locale.code)),
        );
        const theQuestion = new testHelpers.QuestionBuilder().withLocaleCode(locale.code).withAnswers(answers);
        const normalizedData = testHelpers.buildNormalizedQuestionnaire([theQuestion]);

        const denormalizedData = selector.denormalizeQuestions(locale, normalizedData);

        expect(denormalizedData[0].answers).toHaveLength(answerCount);
    });

    it('should return the taxonomy terms for a selected answer', () => {
        const theTaxonomyTerm = aTaxonomyTermReference();
        const selectedAnswer = new testHelpers.AnswerBuilder().withTaxonomyTerm(theTaxonomyTerm).withSelected(true);
        const theQuestion = new testHelpers.QuestionBuilder().withAnswers([selectedAnswer]);
        const normalizedData = testHelpers.buildNormalizedQuestionnaire([theQuestion]);

        const result = selector.filterTaxonomyTermsForSelectedAnswers(normalizedData.answers);

        expect(result).toEqual([theTaxonomyTerm]);
    });

    it('should not return the taxonomy terms for a non-selected answer', () => {
        const theTaxonomyTerm = aTaxonomyTermReference();
        const nonSelectedAnswer = new testHelpers.AnswerBuilder().withTaxonomyTerm(theTaxonomyTerm).withSelected(false);
        const theQuestion = new testHelpers.QuestionBuilder().withAnswers([nonSelectedAnswer]);
        const normalizedData = testHelpers.buildNormalizedQuestionnaire([theQuestion]);

        const result = selector.filterTaxonomyTermsForSelectedAnswers(normalizedData.answers);

        expect(result).toEqual([]);
    });

    it('should return all taxonomy terms for a selected answer', () => {
        const theTaxonomyTerm = aTaxonomyTermReference();
        const theSecondTaxonomyTerm = aTaxonomyTermReference();
        const selectedAnswer = new testHelpers.AnswerBuilder().withTaxonomyTerm(theTaxonomyTerm).
            withTaxonomyTerm(theSecondTaxonomyTerm).withSelected(true);
        const theQuestion = new testHelpers.QuestionBuilder().withAnswers([selectedAnswer]);
        const normalizedData = testHelpers.buildNormalizedQuestionnaire([theQuestion]);

        const result = selector.filterTaxonomyTermsForSelectedAnswers(normalizedData.answers);

        expect(result).toContain(theTaxonomyTerm);
        expect(result).toContain(theSecondTaxonomyTerm);
    });
});

describe('getting ids of all active questions', () => {
    it('should include ids for active questions', () => {
        const locale = new LocaleBuilder().build();
        const answerId = aString();
        const anActiveAnswer = new testHelpers.AnswerBuilder().
            withSelected(true).
            withId(answerId).
            withLocaleCode(locale.code);
        const aQuestion = new testHelpers.QuestionBuilder().withLocaleCode(locale.code).withAnswers([anActiveAnswer]);
        const normalizedData = testHelpers.buildNormalizedQuestionnaire([aQuestion]);

        const result = getIdsOfActiveAnswers(normalizedData.answers);

        expect(result).toContain(answerId);
    });

    it('should not include ids for inactive questions', () => {
        const locale = new LocaleBuilder().build();
        const answerId = aString();
        const anInactiveAnswer = new testHelpers.AnswerBuilder().
            withSelected(false).
            withId(answerId).
            withLocaleCode(locale.code);
        const aQuestion = new testHelpers.QuestionBuilder().withLocaleCode(locale.code).withAnswers([anInactiveAnswer]);
        const normalizedData = testHelpers.buildNormalizedQuestionnaire([aQuestion]);

        const result = getIdsOfActiveAnswers(normalizedData.answers);

        expect(result).not.toContain(answerId);
    });
});
