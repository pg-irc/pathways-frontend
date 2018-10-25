// tslint:disable:no-expression-statement no-let
import * as selector from '../questionnaire/question';
import { getIdsOfChosenAnswers } from '../questionnaire/get_ids_of_chosen_answers';
import { anInteger } from '../../application/__tests__/helpers/random_test_values';
import { ValidStoreBuilder, AnswerBuilder, QuestionBuilder } from '../../stores/__tests__/helpers/questionnaire_helpers';
import { aLocale } from '../../stores/__tests__/helpers/locale_helpers';
import { aString } from '../../application/__tests__/helpers/random_test_values';
import { TaxonomyTermReference } from '../../stores/taxonomies';
import { toValidOrThrow } from '../../stores/questionnaire/stores';
import { toSelectorQuestionList } from '../questionnaire/to_selector_question_list';
import { getTaxonomyTermsForChosenAnswers } from '../taxonomies/get_taxonomy_terms_for_chosen_answers';
import { getAllAnswersWithTaxonomyTermsNotIn } from '../questionnaire/get_all_answers_with_taxonomy_terms_not_in';

const aTaxonomyTermReference = (): TaxonomyTermReference => (
    { taxonomyId: aString(), taxonomyTermId: aString() }
);

describe('questionnaire selector', () => {

    let locale = aLocale();

    describe('should map properties', () => {

        let anAnswer: AnswerBuilder;
        let aQuestion: QuestionBuilder;
        let denormalizedData: ReadonlyArray<selector.Question>;

        beforeEach(() => {
            anAnswer = new AnswerBuilder().withLocaleCode(locale.code);
            aQuestion = new QuestionBuilder().withLocaleCode(locale.code).withAnswers([anAnswer]);
            const normalizedData = new ValidStoreBuilder().withQuestions([aQuestion]).build();

            denormalizedData = toSelectorQuestionList(locale, normalizedData);
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
            new QuestionBuilder().withLocaleCode(locale.code)),
        );
        const normalizedData = new ValidStoreBuilder().withQuestions(questions).build();

        const denormalizedData = toSelectorQuestionList(locale, normalizedData);

        expect(denormalizedData).toHaveLength(questionCount);
    });

    it('should return all the answers to a question', () => {
        const answerCount = anInteger();
        const answers = new Array(answerCount).fill(0).map(() => (
            new AnswerBuilder().withLocaleCode(locale.code)),
        );
        const theQuestion = new QuestionBuilder().withLocaleCode(locale.code).withAnswers(answers);
        const normalizedData = new ValidStoreBuilder().withQuestions([theQuestion]).build();

        const denormalizedData = toSelectorQuestionList(locale, normalizedData);

        expect(denormalizedData[0].answers).toHaveLength(answerCount);
    });

    // TODO move tests for filterTaxonomyTermsForChosenAnswers to a different test suite
    it('should return the taxonomy terms for a chosen answer', () => {
        const theTaxonomyTerm = aTaxonomyTermReference();
        const chosenAnswer = new AnswerBuilder().withTaxonomyTerm(theTaxonomyTerm).withIsChosen(true);
        const theQuestion = new QuestionBuilder().withAnswers([chosenAnswer]);
        const normalizedData = new ValidStoreBuilder().withQuestions([theQuestion]).build();

        const result = getTaxonomyTermsForChosenAnswers(toValidOrThrow(normalizedData).answers);

        expect(result).toEqual([theTaxonomyTerm]);
    });

    it('should not return the taxonomy terms for a non-chosen answer', () => {
        const theTaxonomyTerm = aTaxonomyTermReference();
        const nonChosenAnswer = new AnswerBuilder().withTaxonomyTerm(theTaxonomyTerm).withIsChosen(false);
        const theQuestion = new QuestionBuilder().withAnswers([nonChosenAnswer]);
        const normalizedData = new ValidStoreBuilder().withQuestions([theQuestion]).build();

        const result = getTaxonomyTermsForChosenAnswers(toValidOrThrow(normalizedData).answers);

        expect(result).toEqual([]);
    });

    it('should return all taxonomy terms for a selected answer', () => {
        const theTaxonomyTerm = aTaxonomyTermReference();
        const theSecondTaxonomyTerm = aTaxonomyTermReference();
        const chosendAnswer = new AnswerBuilder().withTaxonomyTerm(theTaxonomyTerm).
            withTaxonomyTerm(theSecondTaxonomyTerm).withIsChosen(true);
        const theQuestion = new QuestionBuilder().withAnswers([chosendAnswer]);
        const normalizedData = new ValidStoreBuilder().withQuestions([theQuestion]).build();

        const result = getTaxonomyTermsForChosenAnswers(toValidOrThrow(normalizedData).answers);

        expect(result).toContain(theTaxonomyTerm);
        expect(result).toContain(theSecondTaxonomyTerm);
    });
});

describe('getting ids of all chosen answers', () => {
    it('should include ids for chosen answers', () => {
        const locale = aLocale();
        const aChosenAnswer = new AnswerBuilder().withIsChosen(true).withLocaleCode(locale.code);
        const aQuestion = new QuestionBuilder().withLocaleCode(locale.code).withAnswers([aChosenAnswer]);
        const normalizedData = new ValidStoreBuilder().withQuestions([aQuestion]).build();

        const result = getIdsOfChosenAnswers(toValidOrThrow(normalizedData).answers);

        expect(result).toContain(aChosenAnswer.id);
    });

    it('should not include ids for non-chosen questions', () => {
        const locale = aLocale();
        const aNonChosenAnswer = new AnswerBuilder().withIsChosen(false).withLocaleCode(locale.code);
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
});
