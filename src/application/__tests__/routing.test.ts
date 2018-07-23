// tslint:disable:no-expression-statement
import { Routes, routePath, routePathWithParameter } from '../routing';

describe('the routePath function', () => {

    it('For Routes.Home returns path: "/"', () => {
        expect(routePath(Routes.Welcome)).toEqual('/');
    });

    it('For Routes.Welcome returns path: "/welcome"', () => {
        expect(routePath(Routes.Home)).toEqual('/home');
    });

    it('For Routes.Questionnaire returns path: "/questionnaire', () => {
        expect(routePath(Routes.Questionnaire)).toEqual('/questionnaire');
    });

    it('For Routes.MyPlan returns path: "/my-plan', () => {
        expect(routePath(Routes.MyPlan)).toEqual('/my-plan');
    });

    it('For Routes.Learn returns path: "/learn', () => {
        expect(routePath(Routes.Learn)).toEqual('/learn');
    });

    it('For Routes.LearnDetail returns path: "/learn/:learnId', () => {
        expect(routePath(Routes.LearnDetail)).toEqual('/learn/:learnId');
    });

    it('For Routes.TaskDetail returns path: "/task/:taskId', () => {
        expect(routePath(Routes.TaskDetail)).toEqual('/task/:taskId');
    });

    it('For Routes.ArticleDetail returns path: "/article/:articleId', () => {
        expect(routePath(Routes.ArticleDetail)).toEqual('/article/:articleId');
    });
});

describe('the routePathWithParameter function', () => {

    it('Replaces a Route argument placeholder with provided value', () => {
        expect(routePathWithParameter(Routes.LearnDetail, 'l1')).toEqual('/learn/l1');
    });
});
