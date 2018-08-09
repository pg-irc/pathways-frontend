// tslint:disable:no-expression-statement no-let
import * as selector from '../questionnaire';
import { getIdsOfChosenAnswers } from '../select_ids_of_chosen_questions';
import { anInteger } from '../../application/__tests__/helpers/random_test_values';
import * as testHelpers from '../../stores/__tests__/helpers/questionnaire_helpers';
import { LocaleBuilder } from '../../stores/__tests__/helpers/locale_helpers';
import { aString } from '../../application/__tests__/helpers/random_test_values';
import { TaxonomyTermReference } from '../../stores/taxonomies';
import { unwrapValidStoreOrThrow } from '../../stores/questionnaire/tagged_stores';

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

        it('answer isChosen flag', () => {
            expect(denormalizedData[0].answers[0].isChosen).toBe(anAnswer.isChosen);
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

    it('should return the taxonomy terms for a chosen answer', () => {
        const theTaxonomyTerm = aTaxonomyTermReference();
        const chosenAnswer = new testHelpers.AnswerBuilder().withTaxonomyTerm(theTaxonomyTerm).withIsChosen(true);
        const theQuestion = new testHelpers.QuestionBuilder().withAnswers([chosenAnswer]);
        const normalizedData = testHelpers.buildNormalizedQuestionnaire([theQuestion]);

        const result = selector.filterTaxonomyTermsForChosenAnswers(unwrapValidStoreOrThrow(normalizedData).answers);

        expect(result).toEqual([theTaxonomyTerm]);
    });

    it('should not return the taxonomy terms for a non-chosen answer', () => {
        const theTaxonomyTerm = aTaxonomyTermReference();
        const nonChosenAnswer = new testHelpers.AnswerBuilder().withTaxonomyTerm(theTaxonomyTerm).withIsChosen(false);
        const theQuestion = new testHelpers.QuestionBuilder().withAnswers([nonChosenAnswer]);
        const normalizedData = testHelpers.buildNormalizedQuestionnaire([theQuestion]);

        const result = selector.filterTaxonomyTermsForChosenAnswers(unwrapValidStoreOrThrow(normalizedData).answers);

        expect(result).toEqual([]);
    });

    it('should return all taxonomy terms for a selected answer', () => {
        const theTaxonomyTerm = aTaxonomyTermReference();
        const theSecondTaxonomyTerm = aTaxonomyTermReference();
        const chosendAnswer = new testHelpers.AnswerBuilder().withTaxonomyTerm(theTaxonomyTerm).
            withTaxonomyTerm(theSecondTaxonomyTerm).withIsChosen(true);
        const theQuestion = new testHelpers.QuestionBuilder().withAnswers([chosendAnswer]);
        const normalizedData = testHelpers.buildNormalizedQuestionnaire([theQuestion]);

        const result = selector.filterTaxonomyTermsForChosenAnswers(unwrapValidStoreOrThrow(normalizedData).answers);

        expect(result).toContain(theTaxonomyTerm);
        expect(result).toContain(theSecondTaxonomyTerm);
    });
});

describe('getting ids of all chosen answers', () => {
    it('should include ids for chosen answers', () => {
        const locale = new LocaleBuilder().build();
        const aChosenAnswer = new testHelpers.AnswerBuilder().withIsChosen(true).withLocaleCode(locale.code);
        const aQuestion = new testHelpers.QuestionBuilder().withLocaleCode(locale.code).withAnswers([aChosenAnswer]);
        const normalizedData = testHelpers.buildNormalizedQuestionnaire([aQuestion]);

        const result = getIdsOfChosenAnswers(unwrapValidStoreOrThrow(normalizedData).answers);

        expect(result).toContain(aChosenAnswer.id);
    });

    it('should not include ids for non-chosen questions', () => {
        const locale = new LocaleBuilder().build();
        const aNonChosenAnswer = new testHelpers.AnswerBuilder().withIsChosen(false).withLocaleCode(locale.code);
        const aQuestion = new testHelpers.QuestionBuilder().withLocaleCode(locale.code).withAnswers([aNonChosenAnswer]);
        const normalizedData = testHelpers.buildNormalizedQuestionnaire([aQuestion]);

        const result = getIdsOfChosenAnswers(unwrapValidStoreOrThrow(normalizedData).answers);

        expect(result).not.toContain(aNonChosenAnswer.id);
    });
});
