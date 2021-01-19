// tslint:disable:no-expression-statement readonly-array
import {
    Routes, routePathDefinition, routePathWithoutParameter, routePathWithParameter, goBack,
    popFeedbackPathsFromHistory, goBackToServiceDetailOnFeedbackSubmit, isServiceReviewScreen, popServiceReviewPathFromHistory, goBackToServiceDetailOnDiscard }
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

    it('For Routes.Organization returns path: "/organization/:organizationId"', () => {
        expect(routePathDefinition(Routes.Organization)).toEqual('/organization/:organizationId');
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

    it('For Routes.ServiceReview returns path: "/service-review/:serviceId"', () => {
        expect(routePathDefinition(Routes.ServiceReview)).toEqual('/service-review/:serviceId');
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

    it('Sends users to the previous path', () => {
        const initialPathEntries = [welcomePath, learnPath, learnDetailPath];
        const indexOfLastPath = initialPathEntries.length - 1;
        const history = createMemoryHistory({ initialEntries: initialPathEntries, initialIndex: indexOfLastPath });
        goBack(history);
        expect(history.location.pathname).toBe(learnPath);
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

describe('the is service review screen function', () => {
    const firstPath = routePathDefinition(Routes.Services);
    const secondPath = routePathDefinition(Routes.ServiceDetail);
    const serviceReviewPath = routePathDefinition(Routes.ServiceReview);
    const wrongPath = routePathDefinition(Routes.ExplainFeedback);

    it('returns true when the most recent path is the service review path', () => {
        const initialPathEntries = [firstPath, secondPath, serviceReviewPath];
        const indexOfLastPath = initialPathEntries.length - 1;
        const history = createMemoryHistory({ initialEntries: initialPathEntries, initialIndex: indexOfLastPath });
        expect(isServiceReviewScreen(history)).toBe(true);
    });

    it('returns false when the most recent path is not the service review path', () => {
        const initialPathEntries = [firstPath, secondPath, wrongPath];
        const indexOfLastPath = initialPathEntries.length - 1;
        const history = createMemoryHistory({ initialEntries: initialPathEntries, initialIndex: indexOfLastPath });
        expect(isServiceReviewScreen(history)).toBe(false);
    });
});

describe('the popServiceReviewPathFromHistory function', () => {
    const firstRegularPath = routePathDefinition(Routes.Services);
    const secondRegularPath = routePathDefinition(Routes.ServiceDetail);
    const serviceReviewPath = routePathDefinition(Routes.ServiceReview);

    it('pops the service review path from the history stack on clicking the discard button', () => {
        const initialPathEntries = [
            firstRegularPath, secondRegularPath, serviceReviewPath,
        ];
        const history = createMemoryHistory({ initialEntries: initialPathEntries });
        popServiceReviewPathFromHistory(history);
        expect(history.entries.length).toBe(2);
        expect(history.entries[0].pathname).toBe(firstRegularPath);
        expect(history.entries[1].pathname).toBe(secondRegularPath);
    });
});

describe('the goBackToServiceDetailOnDiscard function', () => {
    const firstRegularPath = routePathDefinition(Routes.Services);
    const serviceDetailPath = routePathDefinition(Routes.ServiceDetail);
    const serviceReviewPath = routePathDefinition(Routes.ServiceReview);

    it('sends the user back to the service detail page already on the history stack', () => {
        const initialPathEntries = [firstRegularPath, serviceDetailPath, serviceReviewPath];
        const indexOfLastPath = initialPathEntries.length - 1;
        const history = createMemoryHistory({ initialEntries: initialPathEntries, initialIndex: indexOfLastPath});
        goBackToServiceDetailOnDiscard(history);
        expect(history.location.pathname).toBe(serviceDetailPath);
        expect(history.entries.length).toBe(2);
        expect(history.entries[0].pathname).toBe(firstRegularPath);
        expect(history.entries[1].pathname).toBe(serviceDetailPath);
    });

    it('does not add a subsequent duplicate service detail path to the history stack', () => {
        const initialPathEntries = [firstRegularPath, serviceDetailPath, serviceReviewPath];
        const indexOfLastPath = initialPathEntries.length - 1;
        const history = createMemoryHistory({ initialEntries: initialPathEntries, initialIndex: indexOfLastPath});
        goBackToServiceDetailOnDiscard(history);
        expect(history.entries.length).toBe(2);
        expect(history.entries[0].pathname).toBe(firstRegularPath);
        expect(history.entries[1].pathname).toBe(serviceDetailPath);
    });
});