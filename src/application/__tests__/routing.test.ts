// tslint:disable:no-expression-statement readonly-array
import {
    Routes, routePathDefinition, routePathWithoutParameter, routePathWithParameter, goBack,
    popFeedbackPathsFromHistory, goBackToServiceDetailOnFeedbackSubmit }
from '../routing';
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
    const welcomePath = routePathDefinition(Routes.Welcome);
    const learnPath = routePathDefinition(Routes.Learn);
    const learnDetailPath = routePathDefinition(Routes.LearnDetail);
    const servicesPath = routePathDefinition(Routes.Services);
    const serviceDetailPath = routePathDefinition(Routes.ServiceDetail);
    const otherFeedbackPath = routePathDefinition(Routes.OtherFeedback);
    const contactInformationPath = routePathDefinition(Routes.ContactInformation);

    it('Sends users to the previous path', () => {
        const initialPathEntries = [welcomePath, learnPath, learnDetailPath];
        const indexOfLastPath = initialPathEntries.length - 1;
        const history = createMemoryHistory({ initialEntries: initialPathEntries, initialIndex: indexOfLastPath });
        goBack(history);
        expect(history.location.pathname).toBe(learnPath);
    });

    it('Sends users to the "/feedback/:serviceId" path from "/contact-information/:serviceId"', () => {
        const initialPathEntries = [servicesPath, serviceDetailPath, otherFeedbackPath, contactInformationPath];
        const indexOfLastPath = initialPathEntries.length - 1;
        const history = createMemoryHistory({ initialEntries: initialPathEntries, initialIndex: indexOfLastPath });
        goBack(history);
        expect(history.location.pathname).toBe(otherFeedbackPath);
    });

    it('Sends users to the "/service/:serviceId" path from "/feedback/:serviceId"', () => {
        const initialPathEntries = [serviceDetailPath, otherFeedbackPath];
        const history = createMemoryHistory({ initialEntries: initialPathEntries });
        goBack(history);
        expect(history.location.pathname).toBe(serviceDetailPath);
    });

    it('Sends users to the "/services/:topicId" from "/service/:serviceId"', () => {
        const initialPathEntries = [servicesPath, serviceDetailPath];
        const history = createMemoryHistory({ initialEntries: initialPathEntries });
        goBack(history);
        expect(history.location.pathname).toBe(servicesPath);
    });

});

describe('the popFeedbackPathsFromHistory function', () => {
    const firstRegularPath = routePathDefinition(Routes.TopicDetail);
    const secondRegularPath = routePathDefinition(Routes.Services);
    const serviceDetailPath = routePathDefinition(Routes.ServiceDetail);
    const removeServiceOrOtherFeedbackPath = routePathDefinition(Routes.OtherFeedback);
    const editableServiceDetailFeedbackPath = routePathDefinition(Routes.ServiceDetail);
    const contactInformationFeedbackPath = routePathDefinition(Routes.ContactInformation);

    it('pops all feedback paths from the history stack when submitting feedback from the remove Service or other feedback screen', () => {
        const initialPathEntries = [
            firstRegularPath, secondRegularPath, serviceDetailPath, removeServiceOrOtherFeedbackPath, contactInformationFeedbackPath,
        ];
        const history = createMemoryHistory({ initialEntries: initialPathEntries });
        popFeedbackPathsFromHistory(history);
        expect(history.entries.length).toBe(3);
        expect(history.entries[0].pathname).toBe(firstRegularPath);
        expect(history.entries[1].pathname).toBe(secondRegularPath);
        expect(history.entries[2].pathname).toBe(serviceDetailPath);
    });

    it('pops all feedback paths from the history stack when submitting feedback from the editable service detail screen', () => {
        const initialPathEntries = [firstRegularPath, secondRegularPath, editableServiceDetailFeedbackPath, contactInformationFeedbackPath];
        const history = createMemoryHistory({ initialEntries: initialPathEntries });
        popFeedbackPathsFromHistory(history);
        expect(history.entries.length).toBe(3);
        expect(history.entries[0].pathname).toBe(firstRegularPath);
        expect(history.entries[1].pathname).toBe(secondRegularPath);
        expect(history.entries[2].pathname).toBe(serviceDetailPath);
    });

});

describe('the goBackToServiceDetailOnFeedbackSubmit function', () => {
    const firstRegularPath = routePathDefinition(Routes.TopicDetail);
    const secondRegularPath = routePathDefinition(Routes.Services);
    const serviceDetailPath = routePathDefinition(Routes.ServiceDetail);
    const firstFeedbackPath = routePathDefinition(Routes.OtherFeedback);
    const secondFeedbackPath = routePathDefinition(Routes.ContactInformation);

    it('sends the user back to the service detail page already on the history stack', () => {
        const initialPathEntries = [firstRegularPath, secondRegularPath, serviceDetailPath, firstFeedbackPath, secondFeedbackPath];
        const indexOfLastPath = initialPathEntries.length - 1;
        const history = createMemoryHistory({ initialEntries: initialPathEntries, initialIndex: indexOfLastPath});
        goBackToServiceDetailOnFeedbackSubmit(history);
        expect(history.location.pathname).toBe(serviceDetailPath);
        expect(history.entries.length).toBe(3);
        expect(history.entries[0].pathname).toBe(firstRegularPath);
        expect(history.entries[1].pathname).toBe(secondRegularPath);
        expect(history.entries[2].pathname).toBe(serviceDetailPath);
    });

    it('does not add a subsequent duplicate service detail path to the history stack', () => {
        const initialPathEntries = [firstRegularPath, secondRegularPath, serviceDetailPath, firstFeedbackPath, secondFeedbackPath];
        const indexOfLastPath = initialPathEntries.length - 1;
        const history = createMemoryHistory({ initialEntries: initialPathEntries, initialIndex: indexOfLastPath});
        goBackToServiceDetailOnFeedbackSubmit(history);
        expect(history.entries.length).toBe(3);
        expect(history.entries[0].pathname).toBe(firstRegularPath);
        expect(history.entries[1].pathname).toBe(secondRegularPath);
        expect(history.entries[2].pathname).toBe(serviceDetailPath);
    });
});