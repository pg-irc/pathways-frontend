// tslint:disable:no-expression-statement
import { Routes, routePathWithoutParameter, routePathWithParameter } from '../routing';
import { aString } from './helpers/random_test_values';

describe('the routePathWithoutParameter function', () => {

    it('For Routes.Home returns path: "/"', () => {
        expect(routePathWithoutParameter(Routes.Welcome)).toEqual('/');
    });

    it('For Routes.Welcome returns path: "/welcome"', () => {
        expect(routePathWithoutParameter(Routes.Home)).toEqual('/home');
    });

    it('For Routes.Questionnaire returns path: "/questionnaire"', () => {
        expect(routePathWithoutParameter(Routes.Questionnaire)).toEqual('/questionnaire');
    });

    it('For Routes.MyPlan returns path: "/my-plan"', () => {
        expect(routePathWithoutParameter(Routes.MyPlan)).toEqual('/my-plan');
    });

    it('For Routes.Learn returns path: "/learn"', () => {
        expect(routePathWithoutParameter(Routes.Learn)).toEqual('/learn');
    });

    it('throws when provided route is a parameterized route', () => {
        expect(() => routePathWithoutParameter(Routes.LearnDetail)).toThrow();
    });

});

describe('the routePathWithParameter function', () => {
    const parameter = aString();

    it('For Routes.LearnDetail returns path: "/learn/" with parameter', () => {
        expect(routePathWithParameter(Routes.LearnDetail, parameter)).toEqual(`/learn/${parameter}`);
    });

    it('For Routes.TaskDetail returns path: "/task/" with parameter', () => {
        expect(routePathWithParameter(Routes.TaskDetail, parameter)).toEqual(`/task/${parameter}`);
    });

    it('For Routes.ArticleDetail returns path: "/article/" with parameter', () => {
        expect(routePathWithParameter(Routes.ArticleDetail, parameter)).toEqual(`/article/${parameter}`);
    });

    it('throws when provided route is not a parameterized route', () => {
        expect(() => routePathWithParameter(Routes.Learn, parameter)).toThrow();
    });

});
