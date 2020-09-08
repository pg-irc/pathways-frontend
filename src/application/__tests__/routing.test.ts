// tslint:disable:no-expression-statement readonly-array
import { Routes, routePathDefinition, routePathWithoutParameter, routePathWithParameter, goBack } from '../routing';
import { aString } from '../helpers/random_test_values';
import { createMemoryHistory } from 'history';

describe('the routePathDefinition function', () => {

    it('For Routes.Welcome returns path: "/welcome"', () => {
        expect(routePathDefinition(Routes.Welcome)).toEqual('/welcome');
    });

    it('For Routes.Onboarding returns path: "/onboarding"', () => {
        expect(routePathDefinition(Routes.Onboarding)).toEqual('/onboarding');
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
        expect(routePathDefinition(Routes.TopicDetail)).toEqual('/task/:topicId');
    });

    it('For Routes.Services returns path: "/services/:taskId" with parameter', () => {
        expect(routePathDefinition(Routes.Services)).toEqual('/services/:topicId');
    });

    it('For Routes.RecommendedTopics returns path: "/recommended-topics"', () => {
        expect(routePathDefinition(Routes.RecommendedTopics)).toEqual('/recommended-topics');
    });

    it('For Routes.BookmarkedTopics returns path: "/bookmarks"', () => {
        expect(routePathDefinition(Routes.Bookmarks)).toEqual('/bookmarks');
    });

    it('For Routes.Search returns path: "/search"', () => {
        expect(routePathDefinition(Routes.Search)).toEqual('/search');
    });

    it('For Routes.OrganizationDetail returns path: "/organization/:organizationId"', () => {
        expect(routePathDefinition(Routes.OrganizationDetail)).toEqual('/organization/:organizationId');
    });

    it('For Routes.ServiceDetail returns path: "/service/:serviceId"', () => {
        expect(routePathDefinition(Routes.ServiceDetail)).toEqual('/service/:serviceId');
    });

    it('For Routes.OtherFeedback returns path: "/feedback/:serviceId"', () => {
        expect(routePathDefinition(Routes.OtherFeedback)).toEqual('/feedback/:serviceId');
    });

    it('For Routes.ContactInformation returns path: "contact-information/:serviceId"', () => {
        expect(routePathDefinition(Routes.ContactInformation)).toEqual('/contact-information/:serviceId');
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

describe('the goBack function', () => {
    const welcomeRoute = routePathDefinition(Routes.Welcome);
    const learnRoute = routePathDefinition(Routes.Learn);
    const learnDetailRoute = routePathDefinition(Routes.LearnDetail);
    const servicesRoute = routePathDefinition(Routes.Services);
    const serviceDetailRoute = routePathDefinition(Routes.ServiceDetail);
    const otherFeedbackRoute = routePathDefinition(Routes.OtherFeedback);
    const contactInformationRoute = routePathDefinition(Routes.ContactInformation);

    it('Sends users to the previous path', () => {
        const initialEntries = [welcomeRoute, learnRoute, learnDetailRoute];
        const initialIndex = initialEntries.length - 1;
        const history = createMemoryHistory({ initialEntries, initialIndex });
        goBack(history);
        expect(history.location.pathname).toBe(learnRoute);
    });

    it('Sends users to the path previous to feedback routes when the previous route is Routes.ContactInformation', () => {
        const initialEntries = [servicesRoute, serviceDetailRoute, otherFeedbackRoute, contactInformationRoute, serviceDetailRoute];
        const initialIndex = initialEntries.length - 1;
        const history = createMemoryHistory({ initialEntries, initialIndex });
        goBack(history);
        expect(history.location.pathname).toBe(servicesRoute);
    });

    it('Sends users to the previous feedback route from Routes.ContactInformation', () => {
        const initialEntries = [servicesRoute, serviceDetailRoute, otherFeedbackRoute, contactInformationRoute];
        const initialIndex = initialEntries.length - 1;
        const history = createMemoryHistory({ initialEntries, initialIndex });
        goBack(history);
        expect(history.location.pathname).toBe(otherFeedbackRoute);
    });

});
