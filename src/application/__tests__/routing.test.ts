// tslint:disable:no-expression-statement
import { Routes, routePathDefinition, routePathWithoutParameter,
         isOnStartScreen, isOnParentScreen, isOnChildScreen, routePathWithParameter } from '../routing';
import { aString } from './helpers/random_test_values';

describe('the routePathDefinition function', () => {

    it('For Routes.Home returns path: "/"', () => {
        expect(routePathDefinition(Routes.Welcome)).toEqual('/');
    });

    it('For Routes.Welcome returns path: "/welcome"', () => {
        expect(routePathDefinition(Routes.Home)).toEqual('/home');
    });

    it('For Routes.Questionnaire returns path: "/questionnaire"', () => {
        expect(routePathDefinition(Routes.Questionnaire)).toEqual('/questionnaire');
    });

    it('For Routes.Learn returns path: "/learn"', () => {
        expect(routePathDefinition(Routes.Learn)).toEqual('/learn');
    });

    it('For Routes.LearnDetail returns path: "/learn/:learnId"', () => {
        expect(routePathDefinition(Routes.LearnDetail)).toEqual('/learn/:learnId');
    });

    it('For Routes.TaskDetail returns path: "/task/:taskId" with parameter', () => {
        expect(routePathDefinition(Routes.TaskDetail)).toEqual('/task/:taskId');
    });

    it('For Routes.Services returns path: "/services/:taskId" with parameter', () => {
        expect(routePathDefinition(Routes.Services)).toEqual('/services/:taskId');
    });

    it('For Routes.RecommendedTopics returns path: "/recommended-topics"', () => {
        expect(routePathDefinition(Routes.RecommendedTopics)).toEqual('/recommended-topics');
    });

    it('For Routes.BookmarkedTopics returns path: "/bookmarked-topics"', () => {
        expect(routePathDefinition(Routes.BookmarkedTopics)).toEqual('/bookmarked-topics');
    });

});

describe('the routePathWithoutParameter function', () => {

    it('Throws when provided route is a parameterized route', () => {
        expect(() => routePathWithoutParameter(Routes.LearnDetail)).toThrow();
    });

});

describe('the routePathWithParameter function', () => {
    const parameter = aString();

    it('Substitutes path parameters', () => {
        expect(routePathWithParameter(Routes.LearnDetail, parameter)).toEqual(`/learn/${parameter}`);
    });

    it('Throws when provided route is not a parameterized route', () => {
        expect(() => routePathWithParameter(Routes.Learn, parameter)).toThrow();
    });

});

describe('the isOnStartScreen function', () => {

    it('returns true on path: "/"', () => {
        expect(isOnStartScreen('/')).toStrictEqual(true);
    });

    it('returns false on non start screen path', () => {
        expect(isOnStartScreen('/' + aString())).toStrictEqual(false);
    });
});

describe('the isOnParentScreen function', () => {

    it('returns true on path: "/home"', () => {
        expect(isOnParentScreen('/home')).toStrictEqual(true);
    });

    it('returns true on path: "/help"', () => {
        expect(isOnParentScreen('/home')).toStrictEqual(true);
    });

    it('returns true on path: "/learn"', () => {
        expect(isOnParentScreen('/learn')).toStrictEqual(true);
    });

    it('returns true on path: "/questionnaire"', () => {
        expect(isOnParentScreen('/questionnaire')).toStrictEqual(true);
    });

    it('returns true on path: "/about"', () => {
        expect(isOnParentScreen('/about')).toStrictEqual(true);
    });

    it('returns true on path: "/recommended-topics"', () => {
        expect(isOnParentScreen('/recommended-topics')).toStrictEqual(true);
    });

    it('returns true on path: "/bookmarked-topics"', () => {
        expect(isOnParentScreen('/bookmarked-topics')).toStrictEqual(true);
    });

    it('returns false on non parent screen path', () => {
        expect(isOnParentScreen('/')).toStrictEqual(false);
    });
});

describe('the isOnChildScreen function', () => {

    it('returns true on path: "/task/A task"', () => {
        expect(isOnChildScreen('/task/A task')).toStrictEqual(true);
    });

    it('returns true on path: "/services/A task service"', () => {
        expect(isOnChildScreen('/services/A task service')).toStrictEqual(true);
    });

    it('returns true on path: "/learn/A learn section"', () => {
        expect(isOnChildScreen('/learn/A learn section')).toStrictEqual(true);
    });

    it('returns false on non child screen path', () => {
        expect(isOnChildScreen('/')).toStrictEqual(false);
    });
});