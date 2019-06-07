// tslint:disable:no-expression-statement no-let no-any

import { TopicBuilder } from '../../stores/__tests__/helpers/topics_helpers';
import { aLocale } from '../../stores/__tests__/helpers/locale_helpers';
import * as stores from '../../stores/topics';
import { Taxonomies as TaxonomyConstants } from '../../application/constants';
import { Locale } from '../../locale/types';
import { aString, aBoolean } from '../../application/__tests__/helpers/random_test_values';
import { TaxonomyTermReference } from '../../stores/taxonomies';
import { ExploreSectionBuilder } from './helpers/explore_section_helpers';
import { ExploreSection } from '../explore/types';
import { toSelectorTopic } from '../topics/to_selector_topic';
import { Topic } from '../topics/topic';
import { isTopicRecommended } from '../topics/is_topic_recommended';
import { sortTopicList } from '../topics/sort_topic_list';
import { ViewTaskBuilder } from './helpers/task_helpers';
import { getRecommendedTasks } from '../topics/get_recommended_tasks';
import { rejectTopicsWithIds } from '../topics/reject_topics_with_ids';
import { AnswerBuilder } from '../../stores/__tests__/helpers/questionnaire_helpers';
import { getNewlyRecommendedTasks } from '../topics/get_newly_recommended_tasks';
import { AnswersMap, Answer } from '../../stores/questionnaire';
import { getAllTaxonomyTermsFromTasks } from '../topics/get_all_taxonomy_terms_from_tasks';
import { getIdsOfCompletedTasks } from '../topics/get_ids_of_completed_tasks';
import * as R from 'ramda';

let locale: Locale = undefined;

const aTaxonomyTermReference = (): TaxonomyTermReference => (
    { taxonomyId: aString(), taxonomyTermId: aString() }
);

beforeEach(() => {
    locale = aLocale();
});

describe('topics selector', () => {

    describe('denormalization', () => {
        let topic: stores.Topic;
        let taxonomyId: string;
        let taxonomyTermId: string;
        let exploreSectionName: string;
        let isRecommended: boolean;
        let exploreSection: ExploreSection;
        let denormalizedTask: Topic;

        beforeEach(() => {
            taxonomyId = aString();
            taxonomyTermId = aString();
            exploreSectionName = aString();
            topic = new TopicBuilder().
                withLocaleCode(locale.code).
                withTaxonomyTerm({ taxonomyId, taxonomyTermId }).
                build();
            exploreSection = new ExploreSectionBuilder().withName(exploreSectionName).build();
            isRecommended = aBoolean();
            denormalizedTask = toSelectorTopic(locale, topic, exploreSection, isRecommended, []);
        });

        test('id property', () => {
            expect(denormalizedTask.id).toBe(topic.id);
        });

        test('completed property', () => {
            expect(denormalizedTask.completed).toBe(topic.completed);
        });

        test('title property', () => {
            expect(denormalizedTask.title).toBe(topic.title[locale.code]);
        });

        test('englishTitle property to be the title in English', () => {
            expect(denormalizedTask.englishTitle).toBe(topic.title.en);
        });

        test('description property', () => {
            expect(denormalizedTask.description).toBe(topic.description[locale.code]);
        });

        test('taxonomy term reference', () => {
            expect(denormalizedTask.taxonomyTerms).toEqual([{ taxonomyId, taxonomyTermId }]);
        });

        test('explore section', () => {
            expect(denormalizedTask.exploreSection.name).toEqual(exploreSectionName);
        });

        test('is recommended flag', () => {
            expect(denormalizedTask.isRecommended).toEqual(isRecommended);
        });
    });

    describe('getting recommended topics', () => {

        it('should not recommend topics by default', () => {
            const aTaxonomyTerm = aTaxonomyTermReference();
            const aNonChosenAnswer = new AnswerBuilder().withIsChosen(false).withTaxonomyTerm(aTaxonomyTerm).build();
            const anIncompleteTask = new TopicBuilder().build();

            const result = getRecommendedTasks({ [aNonChosenAnswer.id]: aNonChosenAnswer }, { [anIncompleteTask.id]: anIncompleteTask });

            expect(result).toEqual([]);
        });

        it('should recommend topics tagged with the recommend to all taxonomy term', () => {
            const recommendedToAllTaxonomyTerm = {
                taxonomyId: TaxonomyConstants.RECOMMENDATION_TAXONOMY_ID,
                taxonomyTermId: TaxonomyConstants.RECOMMEND_TO_ALL_TAXONOMY_TERM_ID,
            };
            const aTaskRecommendedToAll = new TopicBuilder().withTaxonomyTerm(recommendedToAllTaxonomyTerm).build();
            const aNonChosenAnswer = new AnswerBuilder().withIsChosen(false).build();

            const result = getRecommendedTasks({ [aNonChosenAnswer.id]: aNonChosenAnswer }, { [aTaskRecommendedToAll.id]: aTaskRecommendedToAll });

            expect(result).toEqual([aTaskRecommendedToAll]);
        });

        it('should recommend topics tagged with the same taxonomy term as a chosen answer', () => {
            const aTaxonomyTerm = aTaxonomyTermReference();
            const aChosenAnswer = new AnswerBuilder().withTaxonomyTerm(aTaxonomyTerm).withIsChosen(true).withIsInverted(false).build();
            const anIncompleteTask = new TopicBuilder().withTaxonomyTerm(aTaxonomyTerm).build();

            const result = getRecommendedTasks({ [aChosenAnswer.id]: aChosenAnswer }, { [anIncompleteTask.id]: anIncompleteTask });

            expect(result).toEqual([anIncompleteTask]);
        });

        describe('taxonomy boolean algebra', () => {

            const redTerm: TaxonomyTermReference = { taxonomyId: 'colour', taxonomyTermId: 'red' };
            const blueTerm: TaxonomyTermReference = { taxonomyId: 'colour', taxonomyTermId: 'blue' };
            const smallTerm: TaxonomyTermReference = { taxonomyId: 'size', taxonomyTermId: 'small' };

            const redAnswer = new AnswerBuilder().withTaxonomyTerm(redTerm).withIsChosen(false).withIsInverted(false).build();
            const smallAnswer = new AnswerBuilder().withTaxonomyTerm(smallTerm).withIsChosen(false).withIsInverted(false).build();

            const redAnswerChosen = new AnswerBuilder().withTaxonomyTerm(redTerm).withIsChosen(true).withIsInverted(false).build();
            const blueAnswerChosen = new AnswerBuilder().withTaxonomyTerm(blueTerm).withIsChosen(true).withIsInverted(false).build();
            const smallAnswerChosen = new AnswerBuilder().withTaxonomyTerm(smallTerm).withIsChosen(true).withIsInverted(false).build();

            const toAnswerMap = (values: ReadonlyArray<Answer>): AnswersMap => {
                const keys = R.map((answer: Answer): string => answer.id, values);
                return R.zipObj(keys, values);
            };

            const toTaskMap = (topics: ReadonlyArray<stores.Topic>): stores.TopicMap => {
                const keys = R.map((topic: stores.Topic): string => topic.id, topics);
                return R.zipObj(keys, topics);
            };

            describe('terms from the same taxonomy imply OR', () => {

                const aRedBlueTask = new TopicBuilder().withTaxonomyTerm(redTerm).withTaxonomyTerm(blueTerm).build();

                const topicMap = toTaskMap([aRedBlueTask]);

                it('recommends the topic if colour:red is chosen', () => {
                    const result = getRecommendedTasks(toAnswerMap([redAnswerChosen]), topicMap);
                    expect(result).toEqual([aRedBlueTask]);
                });

                it('recommends the topic if colour:blue is chosen', () => {
                    const result = getRecommendedTasks(toAnswerMap([blueAnswerChosen]), topicMap);
                    expect(result).toEqual([aRedBlueTask]);
                });

                it('recommends the topic if colour:red and colour:blue is chosen', () => {
                    const result = getRecommendedTasks(toAnswerMap([redAnswerChosen, blueAnswerChosen]), topicMap);
                    expect(result).toEqual([aRedBlueTask]);
                });
            });

            describe('terms from different taxonomies imply AND', () => {

                const aRedSmallTask = new TopicBuilder().withTaxonomyTerm(redTerm).withTaxonomyTerm(smallTerm).build();

                const topicMap = toTaskMap([aRedSmallTask]);

                it('does not recommend the topic if colour:red is chosen', () => {
                    const result = getRecommendedTasks(toAnswerMap([redAnswerChosen, smallAnswer]), topicMap);
                    expect(result).toEqual([]);
                });

                it('does not recommend the topic if size:small is chosen', () => {
                    const result = getRecommendedTasks(toAnswerMap([redAnswer, smallAnswerChosen]), topicMap);
                    expect(result).toEqual([]);
                });

                it('recommends the topic if both colour:red and size:small is chosen', () => {
                    const result = getRecommendedTasks(toAnswerMap([redAnswerChosen, smallAnswerChosen]), topicMap);
                    expect(result).toEqual([aRedSmallTask]);
                });
            });

            describe('with three terms from two taxonomies, colour and size', () => {

                const aRedBlueSmallTask = new TopicBuilder().withTaxonomyTerm(redTerm).withTaxonomyTerm(blueTerm).withTaxonomyTerm(smallTerm).build();

                const topicMap = toTaskMap([aRedBlueSmallTask]);

                it('does not recommend when one colour is chosen', () => {
                    const result = getRecommendedTasks(toAnswerMap([redAnswerChosen, smallAnswer]), topicMap);
                    expect(result).toEqual([]);
                });

                it('does not recommend when one size is chosen', () => {
                    const result = getRecommendedTasks(toAnswerMap([redAnswer, smallAnswerChosen]), topicMap);
                    expect(result).toEqual([]);
                });

                it('does not recommend when both colours are chosen', () => {
                    const result = getRecommendedTasks(toAnswerMap([redAnswerChosen, blueAnswerChosen, smallAnswer]), topicMap);
                    expect(result).toEqual([]);
                });

                it('does recommend if one colour and the size are chosen', () => {
                    const result = getRecommendedTasks(toAnswerMap([redAnswerChosen, smallAnswerChosen]), topicMap);
                    expect(result).toEqual([aRedBlueSmallTask]);
                });

                it('does recommend if both colours and the size are chosen', () => {
                    const result = getRecommendedTasks(toAnswerMap([redAnswerChosen, blueAnswerChosen, smallAnswerChosen]), topicMap);
                    expect(result).toEqual([aRedBlueSmallTask]);
                });
            });

            describe('topics with irrelevant taxonomy terms', () => {
                const irrelevantTaxonomyTerm: TaxonomyTermReference = { taxonomyId: 'explore', taxonomyTermId: 'settling_in' };

                const aRedTaskWithAdditionalTaxonomyTerm = new TopicBuilder().
                    withTaxonomyTerm(redTerm).
                    withTaxonomyTerm(irrelevantTaxonomyTerm).
                    build();

                const topicMap = toTaskMap([aRedTaskWithAdditionalTaxonomyTerm]);

                it('recommends the topic if colour:red is chosen', () => {
                    const result = getRecommendedTasks(toAnswerMap([redAnswerChosen]), topicMap);
                    expect(result).toEqual([aRedTaskWithAdditionalTaxonomyTerm]);
                });

                it('does not recommend the topic if just colour:blue is chosen', () => {
                    const result = getRecommendedTasks(toAnswerMap([blueAnswerChosen]), topicMap);
                    expect(result).toEqual([]);
                });
            });
        });

        it('should not recommend a completed topic', () => {
            const aTaxonomyTerm = aTaxonomyTermReference();
            const aChosenAnswer = new AnswerBuilder().withTaxonomyTerm(aTaxonomyTerm).withIsChosen(true).build();
            const aCompleteTask = new TopicBuilder().withCompleted(true).withTaxonomyTerm(aTaxonomyTerm).build();

            const result = getRecommendedTasks({ [aChosenAnswer.id]: aChosenAnswer }, { [aCompleteTask.id]: aCompleteTask });

            expect(result).toEqual([]);
        });

    });

    describe('getting newly recommended topics', () => {

        let aTaxonomyTerm: TaxonomyTermReference = undefined;
        let chosenAnswers: AnswersMap = undefined;
        let nonChosenAnswers: AnswersMap = undefined;
        let incompleteTask: stores.Topic = undefined;
        let incompleteTasks: stores.TopicMap = undefined;

        beforeEach(() => {
            aTaxonomyTerm = aTaxonomyTermReference();

            const notChosenAnswer = new AnswerBuilder().withTaxonomyTerm(aTaxonomyTerm).withIsChosen(false).withIsInverted(false).build();
            nonChosenAnswers = { [notChosenAnswer.id]: notChosenAnswer };

            const chosenAnswer = new AnswerBuilder().withTaxonomyTerm(aTaxonomyTerm).withIsChosen(true).withIsInverted(false).build();
            chosenAnswers = { [chosenAnswer.id]: chosenAnswer };

            incompleteTask = new TopicBuilder().withTaxonomyTerm(aTaxonomyTerm).withCompleted(false).build();
            incompleteTasks = { [incompleteTask.id]: incompleteTask };
        });

        it('should include a topic that was not previously recommended but is now recommended', () => {
            const oldNonChosenAnswers = nonChosenAnswers;
            const newChosenAnswers = chosenAnswers;

            const result = getNewlyRecommendedTasks(oldNonChosenAnswers, newChosenAnswers, incompleteTasks);

            expect(result).toEqual([incompleteTask]);
        });

        it('should not include a topics that was previously recommended and is still recommended', () => {
            const oldChosenAnswers = chosenAnswers;
            const newChosenAnswers = chosenAnswers;

            const result = getNewlyRecommendedTasks(oldChosenAnswers, newChosenAnswers, incompleteTasks);

            expect(result).toEqual([]);
        });

        it('should not include a topics that was not previously recommended and is still not recommended', () => {
            const oldNonChosenAnswers = nonChosenAnswers;
            const newNonChosenAnswers = nonChosenAnswers;

            const result = getNewlyRecommendedTasks(oldNonChosenAnswers, newNonChosenAnswers, incompleteTasks);

            expect(result).toEqual([]);
        });

        it('should not include a topics that was previously recommended and is no longer recommended', () => {
            const oldChosenAnswers = chosenAnswers;
            const newNonChosenAnswers = nonChosenAnswers;

            const result = getNewlyRecommendedTasks(oldChosenAnswers, newNonChosenAnswers, incompleteTasks);

            expect(result).toEqual([]);
        });
    });

    describe('is topic recommended', () => {

        it('returns false by default', () => {
            const topic = new TopicBuilder().build();
            const noTaxonomyTermsFromQuestionnaire: ReadonlyArray<TaxonomyTermReference> = [];

            const result = isTopicRecommended([], noTaxonomyTermsFromQuestionnaire, topic);

            expect(result).toBe(false);
        });

        it('returns true if topic is recommended to all', () => {
            const taxonomyId = TaxonomyConstants.RECOMMENDATION_TAXONOMY_ID;
            const taxonomyTermId = TaxonomyConstants.RECOMMEND_TO_ALL_TAXONOMY_TERM_ID;
            const topic = new TopicBuilder().withTaxonomyTerm({ taxonomyId, taxonomyTermId }).build();
            const noTaxonomyTermsFromQuestionnaire: ReadonlyArray<TaxonomyTermReference> = [];

            const result = isTopicRecommended([], noTaxonomyTermsFromQuestionnaire, topic);

            expect(result).toBe(true);
        });

        it('returns true if topics is tagged with the same taxonomy term as a chosen answer', () => {
            const taxonomyId = aString();
            const taxonomyTermId = aString();
            const topic = new TopicBuilder().withTaxonomyTerm({ taxonomyId, taxonomyTermId }).build();
            const taxonomyTermsFromQuestionnaire: ReadonlyArray<TaxonomyTermReference> = [{ taxonomyId, taxonomyTermId }];

            const result = isTopicRecommended([taxonomyId], taxonomyTermsFromQuestionnaire, topic);

            expect(result).toBe(true);
        });

        it('returns true for a completed topic', () => {
            const taxonomyId = aString();
            const taxonomyTermId = aString();
            const topic = new TopicBuilder().withCompleted(true).withTaxonomyTerm({ taxonomyId, taxonomyTermId }).build();
            const taxonomyTermsFromQuestionnaire: ReadonlyArray<TaxonomyTermReference> = [{ taxonomyId, taxonomyTermId }];

            const result = isTopicRecommended([taxonomyId], taxonomyTermsFromQuestionnaire, topic);

            expect(result).toBe(true);
        });
    });

    describe('sorting', () => {
        it('sorts recommended topics before non-recommended topics', () => {
            const theId = aString();
            const firstByRecommended = new ViewTaskBuilder().withId(theId).withIsRecommended(true).build();
            const lastByRecommended = new ViewTaskBuilder().withId(theId).withIsRecommended(false).build();
            const sorted = sortTopicList([lastByRecommended, firstByRecommended]);
            expect(sorted[0]).toBe(firstByRecommended);
            expect(sorted[1]).toBe(lastByRecommended);
        });

        it('sorts by id if both have the same recommended state', () => {
            const isRecommended = aBoolean();
            const firstById = new ViewTaskBuilder().withId('aaa').withIsRecommended(isRecommended).build();
            const lastById = new ViewTaskBuilder().withId('bbb').withIsRecommended(isRecommended).build();
            const sorted = sortTopicList([lastById, firstById]);
            expect(sorted[0]).toBe(firstById);
            expect(sorted[1]).toBe(lastById);
        });

        it('sorts by recommended flag if they have different ids', () => {
            const firstByIdLastByRecommended = new ViewTaskBuilder().withId('aaa').withIsRecommended(false).build();
            const lastByIdFirstByRecommended = new ViewTaskBuilder().withId('bbb').withIsRecommended(true).build();
            const sorted = sortTopicList([firstByIdLastByRecommended, lastByIdFirstByRecommended]);
            expect(sorted[0]).toBe(lastByIdFirstByRecommended);
            expect(sorted[1]).toBe(firstByIdLastByRecommended);
        });
    });

    describe('getting taxonomy terms from topics', () => {
        const aTaxonomyTerm = aTaxonomyTermReference();

        it('should return taxonomy term', () => {
            const aTask = new TopicBuilder().withTaxonomyTerm(aTaxonomyTerm).withId('id').build();

            const result = getAllTaxonomyTermsFromTasks({ 'id': aTask });

            expect(result).toEqual([aTaxonomyTerm]);
        });

        it('should return terms without duplicates', () => {
            const aTask = new TopicBuilder().withTaxonomyTerm(aTaxonomyTerm).withId('id1').build();
            const aSecondTaskWithSameTaxonomyTerm = new TopicBuilder().withTaxonomyTerm(aTaxonomyTerm).withId('id2').build();

            const result = getAllTaxonomyTermsFromTasks({ 'id1': aTask, 'id2': aSecondTaskWithSameTaxonomyTerm });

            expect(result).toEqual([aTaxonomyTerm]);
        });
    });

    describe('get ids of completed topics', () => {
        it('includes the id of a completed topic', () => {
            const theId = aString();
            const aTask = new TopicBuilder().withCompleted(true).withId(theId).build();

            const result = getIdsOfCompletedTasks({ [theId]: aTask });

            expect(result).toEqual([theId]);
        });
        it('does not include the id of a non-completed topic', () => {
            const theId = aString();
            const aTask = new TopicBuilder().withCompleted(false).withId(theId).build();

            const result = getIdsOfCompletedTasks({ [theId]: aTask });

            expect(result).toEqual([]);
        });
    });

    describe('rejecting topic ids', () => {

        it('excludes rejected topic ids', () => {
            const aTaskIdToReject = aString();
            const aTaskWithRejectedId = new TopicBuilder().withId(aTaskIdToReject).build();
            expect(rejectTopicsWithIds([aTaskWithRejectedId], [aTaskIdToReject])).toHaveLength(0);
        });

        it('includes non rejected topic ids', () => {
            const aTaskIdToReject = aString();
            const aTaskWithRejectedId = new TopicBuilder().withId(aTaskIdToReject).build();
            const aTaskToInclude = new TopicBuilder().build();
            expect(rejectTopicsWithIds([aTaskWithRejectedId, aTaskToInclude], [aTaskIdToReject])).toHaveLength(1);
        });
    });
});
