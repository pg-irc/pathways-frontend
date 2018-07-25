// tslint:disable:no-expression-statement
import { Routes, routePathDefinition, routePathWithoutParameter, routePathWithParameter } from '../routing';
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

    it('For Routes.MyPlan returns path: "/my-plan"', () => {
        expect(routePathDefinition(Routes.MyPlan)).toEqual('/my-plan');
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

    it('For Routes.ArticleDetail returns path: "/article/:articleId" with parameter', () => {
        expect(routePathDefinition(Routes.ArticleDetail)).toEqual('/article/:articleId');
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
