// tslint:disable:no-expression-statement no-let
import * as R from 'ramda';
import * as selector from '../questionnaire/question';
import { getIdsOfChosenAnswers } from '../questionnaire/get_ids_of_chosen_answers';
import { anInteger } from '../../application/random_test_values';
import { ValidStoreBuilder, AnswerBuilder, QuestionBuilder } from '../../stores/__tests__/helpers/questionnaire_helpers';
import { aLocale } from '../../stores/__tests__/helpers/locale_helpers';
import { aString } from '../../application/random_test_values';
import { TaxonomyTermReference } from '../../stores/taxonomies';
import { toValidOrThrow } from '../../stores/questionnaire/stores';
import { toSelectorQuestion } from '../questionnaire/to_selector_question';
import { getTaxonomyTermsForRelevantAnswers } from '../taxonomies/get_taxonomy_terms_for_relevant_answers';
import { getAllAnswersWithTaxonomyTermsNotIn } from '../questionnaire/get_all_answers_with_taxonomy_terms_not_in';
import { getAllTaxonomyIdsFromAnswers } from '../questionnaire/get_all_taxonomy_ids_from_questionnaire';

const aTaxonomyTermReference = (): TaxonomyTermReference => (
    { taxonomyId: aString(), taxonomyTermId: aString() }
);

describe('toSelectorQuestion selector', () => {

    let locale = aLocale();

    describe('should map properties', () => {

        let firstAnswer: AnswerBuilder;
        let firstQuestion: QuestionBuilder;
        let secondAnswer: AnswerBuilder;
        let secondQuestion: QuestionBuilder;
        let firstDenormalizedQuestion: selector.Question;

        beforeEach(() => {
            const firstQuestionId = aString();
            const secondQuestionId = aString();

            firstAnswer = new AnswerBuilder().withLocaleCode(locale.code).withQuestionId(firstQuestionId);
            firstQuestion = new QuestionBuilder().withLocaleCode(locale.code).withId(firstQuestionId).withAnswers([firstAnswer]);

            secondAnswer = new AnswerBuilder().withLocaleCode(locale.code).withQuestionId(secondQuestionId);
            secondQuestion = new QuestionBuilder().withLocaleCode(locale.code).withId(secondQuestionId).withAnswers([secondAnswer]);

            const normalizedData = new ValidStoreBuilder().withQuestions([firstQuestion, secondQuestion]).build();
            firstDenormalizedQuestion = toSelectorQuestion(normalizedData.questions[firstQuestion.id],
                normalizedData.questions, normalizedData.answers);
        });

        it('should map question id', () => {
            expect(firstDenormalizedQuestion.id).toBe(firstQuestion.id);
        });

        it('should map question text', () => {
            expect(firstDenormalizedQuestion.text).toBe(firstQuestion.text);
        });

        it('should map question explanation', () => {
            expect(firstDenormalizedQuestion.explanation).toBe(undefined);
        });

        it('should nest answers inside questions', () => {
            expect(firstDenormalizedQuestion.answers[0].id).toBe(firstAnswer.id);
        });

        it('should map answer text', () => {
            expect(firstDenormalizedQuestion.answers[0].text).toBe(firstAnswer.text);
        });

        it('should map answer isChosen flag', () => {
            expect(firstDenormalizedQuestion.answers[0].isChosen).toBe(firstAnswer.isChosen);
        });

        it('should map position in questionnaire', () => {
            expect(firstDenormalizedQuestion.positionInQuestionnaire).toBe(1);
        });

        it('should map length of questionnaire', () => {
            expect(firstDenormalizedQuestion.lengthOfQuestionnaire).toBe(2);
        });

        it('should map next question id', () => {
            expect(firstDenormalizedQuestion.nextQuestionId).toBe(secondQuestion.id);
        });

        it('should map previous question id', () => {
            expect(firstDenormalizedQuestion.previousQuestionId).toBe(undefined);
        });
    });

    it('should return all the answers to a question', () => {
        const answerCount = anInteger();
        const answers = new Array(answerCount).fill(0).map(() => (
            new AnswerBuilder().withLocaleCode(locale.code)),
        );
        const theQuestion = new QuestionBuilder().withLocaleCode(locale.code).withAnswers(answers);
        const normalizedData = new ValidStoreBuilder().withQuestions([theQuestion]).build();
        const firstQuestionKey = R.keys(normalizedData.questions)[0];
        const denormalizedData = toSelectorQuestion(normalizedData.questions[firstQuestionKey],
            normalizedData.questions, normalizedData.answers);
        expect(denormalizedData.answers).toHaveLength(answerCount);
    });

    // TODO move tests for filterTaxonomyTermsForChosenAnswers to a different test suite
    it('should return the taxonomy terms for a chosen answer', () => {
        const theTaxonomyTerm = aTaxonomyTermReference();
        const chosenAnswer = new AnswerBuilder().withTaxonomyTerm(theTaxonomyTerm).
            withIsChosen(true).withIsInverted(false);
        const theQuestion = new QuestionBuilder().withAnswers([chosenAnswer]);
        const normalizedData = new ValidStoreBuilder().withQuestions([theQuestion]).build();

        const result = getTaxonomyTermsForRelevantAnswers(toValidOrThrow(normalizedData).answers);

        expect(result).toEqual([theTaxonomyTerm]);
    });

    it('should return the taxonomy terms for a non-chosen inverted answer', () => {
        const theTaxonomyTerm = aTaxonomyTermReference();
        const nonChosenInvertedAnswer = new AnswerBuilder().withTaxonomyTerm(theTaxonomyTerm).
            withIsChosen(false).withIsInverted(true);
        const theQuestion = new QuestionBuilder().withAnswers([nonChosenInvertedAnswer]);
        const normalizedData = new ValidStoreBuilder().withQuestions([theQuestion]).build();

        const result = getTaxonomyTermsForRelevantAnswers(toValidOrThrow(normalizedData).answers);

        expect(result).toEqual([theTaxonomyTerm]);
    });

    it('should not return the taxonomy terms for a chosen inverted answer', () => {
        const theTaxonomyTerm = aTaxonomyTermReference();
        const chosenInvertedAnswer = new AnswerBuilder().withTaxonomyTerm(theTaxonomyTerm).
            withIsChosen(true).withIsInverted(true);
        const theQuestion = new QuestionBuilder().withAnswers([chosenInvertedAnswer]);
        const normalizedData = new ValidStoreBuilder().withQuestions([theQuestion]).build();

        const result = getTaxonomyTermsForRelevantAnswers(toValidOrThrow(normalizedData).answers);

        expect(result).toEqual([]);
    });

    it('should not return the taxonomy terms for a non-chosen answer', () => {
        const theTaxonomyTerm = aTaxonomyTermReference();
        const nonChosenAnswer = new AnswerBuilder().withTaxonomyTerm(theTaxonomyTerm).
            withIsChosen(false).withIsInverted(false);
        const theQuestion = new QuestionBuilder().withAnswers([nonChosenAnswer]);
        const normalizedData = new ValidStoreBuilder().withQuestions([theQuestion]).build();

        const result = getTaxonomyTermsForRelevantAnswers(toValidOrThrow(normalizedData).answers);

        expect(result).toEqual([]);
    });

    it('should return all taxonomy terms for a selected answer', () => {
        const theTaxonomyTerm = aTaxonomyTermReference();
        const theSecondTaxonomyTerm = aTaxonomyTermReference();
        const chosendAnswer = new AnswerBuilder().withTaxonomyTerm(theTaxonomyTerm).
            withTaxonomyTerm(theSecondTaxonomyTerm).withIsChosen(true).withIsInverted(false);
        const theQuestion = new QuestionBuilder().withAnswers([chosendAnswer]);
        const normalizedData = new ValidStoreBuilder().withQuestions([theQuestion]).build();

        const result = getTaxonomyTermsForRelevantAnswers(toValidOrThrow(normalizedData).answers);

        expect(result).toContain(theTaxonomyTerm);
        expect(result).toContain(theSecondTaxonomyTerm);
    });
});

describe('getting all taxonomy ids from questionnaire', () => {

    const locale = aLocale();
    const firstTerm = aTaxonomyTermReference();
    const secondTerm = aTaxonomyTermReference();

    const answerWithFirstTerm = new AnswerBuilder().withTaxonomyTerm(firstTerm).withLocaleCode(locale.code);
    const answerWithSecondTerm = new AnswerBuilder().withTaxonomyTerm(secondTerm).withLocaleCode(locale.code);
    const answerWithBothTerms = new AnswerBuilder().withTaxonomyTerm(firstTerm).withTaxonomyTerm(secondTerm).withLocaleCode(locale.code);

    it('returns the taxonomy id from an answer in the questionnaire', () => {
        const aQuestion = new QuestionBuilder().withLocaleCode(locale.code).withAnswers([answerWithFirstTerm]);
        const normalizedData = new ValidStoreBuilder().withQuestions([aQuestion]).build();

        const result = getAllTaxonomyIdsFromAnswers(normalizedData.answers);
        expect(result).toEqual([firstTerm.taxonomyId]);
    });

    it('returns the taxonomy ids from different answers in the questionnaire', () => {
        const aQuestion = new QuestionBuilder().withLocaleCode(locale.code).withAnswers([answerWithFirstTerm, answerWithSecondTerm]);
        const normalizedData = new ValidStoreBuilder().withQuestions([aQuestion]).build();

        const result = getAllTaxonomyIdsFromAnswers(normalizedData.answers);
        expect(result).toContain(firstTerm.taxonomyId);
        expect(result).toContain(secondTerm.taxonomyId);
    });

    it('returns the two taxonomy ids from the same answer in the questionnaire', () => {
        const aQuestion = new QuestionBuilder().withLocaleCode(locale.code).withAnswers([answerWithBothTerms]);
        const normalizedData = new ValidStoreBuilder().withQuestions([aQuestion]).build();

        const result = getAllTaxonomyIdsFromAnswers(normalizedData.answers);
        expect(result).toContain(firstTerm.taxonomyId);
        expect(result).toContain(secondTerm.taxonomyId);
    });

    it('returns taxonomy ids without duplicates', () => {
        const aQuestion = new QuestionBuilder().withLocaleCode(locale.code).withAnswers([answerWithFirstTerm, answerWithBothTerms]);
        const normalizedData = new ValidStoreBuilder().withQuestions([aQuestion]).build();

        const result = getAllTaxonomyIdsFromAnswers(normalizedData.answers);
        expect(result).toHaveLength(2);
    });
});

describe('getting ids of all chosen answers', () => {
    it('should include ids for chosen answers', () => {
        const locale = aLocale();
        const aChosenAnswer = new AnswerBuilder().withIsChosen(true).withIsInverted(false).
            withLocaleCode(locale.code);
        const aQuestion = new QuestionBuilder().withLocaleCode(locale.code).withAnswers([aChosenAnswer]);
        const normalizedData = new ValidStoreBuilder().withQuestions([aQuestion]).build();

        const result = getIdsOfChosenAnswers(toValidOrThrow(normalizedData).answers);

        expect(result).toContain(aChosenAnswer.id);
    });

    it('should not include ids for non-chosen answers', () => {
        const locale = aLocale();
        const aNonChosenAnswer = new AnswerBuilder().withIsChosen(false).withIsInverted(false).
            withLocaleCode(locale.code);
        const aQuestion = new QuestionBuilder().withLocaleCode(locale.code).withAnswers([aNonChosenAnswer]);
        const normalizedData = new ValidStoreBuilder().withQuestions([aQuestion]).build();

        const result = getIdsOfChosenAnswers(toValidOrThrow(normalizedData).answers);

        expect(result).not.toContain(aNonChosenAnswer.id);
    });

    it('should not include ids for non-chosen answers even if inverted', () => {
        const locale = aLocale();
        const aNonChosenAnswer = new AnswerBuilder().withIsChosen(false).withIsInverted(true).
            withLocaleCode(locale.code);
        const aQuestion = new QuestionBuilder().withLocaleCode(locale.code).withAnswers([aNonChosenAnswer]);
        const normalizedData = new ValidStoreBuilder().withQuestions([aQuestion]).build();

        const result = getIdsOfChosenAnswers(toValidOrThrow(normalizedData).answers);

        expect(result).not.toContain(aNonChosenAnswer.id);
    });
});

describe('get answer with taxonomy terms not in set of valid terms', () => {
    const taxonomyTerm = aTaxonomyTermReference();
    const answer = new AnswerBuilder().withTaxonomyTerm(taxonomyTerm).withId('id').build();

    it('should include answers with taxonoy terms not in set', () => {
        const result = getAllAnswersWithTaxonomyTermsNotIn([], { 'id': answer });
        expect(result).toContain(answer);
    });

    it('should not include answers with taxonoy terms in set', () => {
        const result = getAllAnswersWithTaxonomyTermsNotIn([taxonomyTerm], { 'id': answer });
        expect(result).not.toContain(answer);
    });

    it('should not include answers with no taxonomy term', () => {
        const answerWithNoTaxonomyTerm = new AnswerBuilder().withId('id').build();
        const result = getAllAnswersWithTaxonomyTermsNotIn([taxonomyTerm], { 'id': answerWithNoTaxonomyTerm });
        expect(result).not.toContain(answerWithNoTaxonomyTerm);
    });
});
