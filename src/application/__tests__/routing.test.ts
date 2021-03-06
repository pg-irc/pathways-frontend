// tslint:disable:no-expression-statement readonly-array no-any typedef
import {
    Routes, routePathDefinition, routePathWithoutParameter, routePathWithParameter, goBack,
    popFeedbackPathsFromHistory, backToServiceDetailOnFeedbackSubmit, isServiceReviewScreen,
    popServiceReviewPathFromHistory, backFromServiceReview, goToRouteWithParameter, RouteLocationStateOffsets, goToRouteWithoutParameter }
from '../routing';
import { aNumber, aString } from '../helpers/random_test_values';
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

    it('sends users to the previous path', () => {
        const initialPathEntries = [welcomePath, learnPath, learnDetailPath];
        const indexOfLastPath = initialPathEntries.length - 1;
        const history = createMemoryHistory({ initialEntries: initialPathEntries, initialIndex: indexOfLastPath });
        goBack(history);
        expect(history.location.pathname).toBe(learnPath);
    });

    it('provides the previousOffset state from the most recent path for use in the previous path as currentOffset', () => {
        const previousOffset = aNumber();
        const initialPathEntries = [welcomePath, learnPath];
        const indexOfLastPath = initialPathEntries.length - 1;
        const history = createMemoryHistory({ initialEntries: initialPathEntries, initialIndex: indexOfLastPath });
        goToRouteWithParameter(Routes.LearnDetail, aString(), history, previousOffset);
        goBack(history);
        expect(history.location.state).toEqual({ previousOffset: 0, currentOffset: previousOffset });
    });
});

describe('the popFeedbackPathsFromHistory function', () => {
    const firstRegularPath = routePathDefinition(Routes.TopicDetail);
    const secondRegularPath = routePathDefinition(Routes.Services);
    const serviceDetailPath = routePathDefinition(Routes.ServiceDetail);
    const removeServiceOrOtherFeedbackPath = routePathDefinition(Routes.OtherFeedback);
    const editableServiceDetailFeedbackPath = routePathDefinition(Routes.ServiceDetail);
    const contactInformationFeedbackPath = routePathDefinition(Routes.ContactInformation);

    it ('pops all feedback paths from the history stack until the last element in the array is a regular path', () => {
        const initialPathEntries = [firstRegularPath, editableServiceDetailFeedbackPath, secondRegularPath, contactInformationFeedbackPath];
        const history = createMemoryHistory({ initialEntries: initialPathEntries });
        popFeedbackPathsFromHistory(history);
        expect(history.entries.length).toBe(3);
        expect(history.entries[2].pathname).toBe(secondRegularPath);
    });

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

describe('the backToServiceDetailOnFeedbackSubmit function', () => {
    const firstRegularPath = routePathDefinition(Routes.TopicDetail);
    const secondRegularPath = routePathDefinition(Routes.Services);
    const serviceDetailPath = routePathDefinition(Routes.ServiceDetail);
    const firstFeedbackPath = routePathDefinition(Routes.OtherFeedback);
    const secondFeedbackPath = routePathDefinition(Routes.ContactInformation);

    it('sends the user back to the service detail page already on the history stack', () => {
        const initialPathEntries = [firstRegularPath, secondRegularPath, serviceDetailPath, firstFeedbackPath, secondFeedbackPath];
        const indexOfLastPath = initialPathEntries.length - 1;
        const history = createMemoryHistory({ initialEntries: initialPathEntries, initialIndex: indexOfLastPath});
        backToServiceDetailOnFeedbackSubmit(history);
        expect(history.location.pathname).toBe(serviceDetailPath);
    });

    it('does not add a subsequent duplicate service detail path to the history stack', () => {
        const initialPathEntries = [firstRegularPath, secondRegularPath, serviceDetailPath, firstFeedbackPath, secondFeedbackPath];
        const indexOfLastPath = initialPathEntries.length - 1;
        const history = createMemoryHistory({ initialEntries: initialPathEntries, initialIndex: indexOfLastPath});
        backToServiceDetailOnFeedbackSubmit(history);
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

    it ('pops service review paths until the last element of the array is a regular path', () => {
        const initialPathEntries = [
            firstRegularPath, serviceReviewPath, secondRegularPath, serviceReviewPath,
        ];
        const history = createMemoryHistory({ initialEntries: initialPathEntries });
        popServiceReviewPathFromHistory(history);
        expect(history.entries.length).toBe(3);
        expect(history.entries[2].pathname).toBe(secondRegularPath);
    });

    it('pops the service review path from the history stack on clicking the discard button', () => {
        const initialPathEntries = [
            firstRegularPath, secondRegularPath, serviceReviewPath,
        ];
        const history = createMemoryHistory({ initialEntries: initialPathEntries });
        popServiceReviewPathFromHistory(history);
        expect(history.entries.length).toBe(2);
        expect(history.entries[1].pathname).toBe(secondRegularPath);
    });
});

describe('the backFromServiceReview function', () => {
    const firstRegularPath = routePathDefinition(Routes.Services);
    const serviceDetailPath = routePathDefinition(Routes.ServiceDetail);
    const serviceReviewPath = routePathDefinition(Routes.ServiceReview);
    const feedbackExplainerPath = routePathDefinition(Routes.ExplainFeedback);

    it('sends the user back to the service detail page already on the history stack', () => {
        const initialPathEntries = [firstRegularPath, serviceDetailPath, serviceReviewPath];
        const indexOfLastPath = initialPathEntries.length - 1;
        const history = createMemoryHistory({ initialEntries: initialPathEntries, initialIndex: indexOfLastPath});
        backFromServiceReview(history);
        expect(history.location.pathname).toBe(serviceDetailPath);
    });

    it('does not add a subsequent duplicate service detail path to the history stack', () => {
        const initialPathEntries = [firstRegularPath, serviceDetailPath, serviceReviewPath];
        const indexOfLastPath = initialPathEntries.length - 1;
        const history = createMemoryHistory({ initialEntries: initialPathEntries, initialIndex: indexOfLastPath});
        backFromServiceReview(history);
        expect(history.entries.length).toBe(2);
        expect(history.entries[0].pathname).toBe(firstRegularPath);
        expect(history.entries[1].pathname).toBe(serviceDetailPath);
    });

    it('sends the user back to the service detail page when explain feedback and service review are on the history stack', () => {
        const initialPathEntries = [firstRegularPath, serviceDetailPath, serviceReviewPath, feedbackExplainerPath];
        const indexOfLastPath = initialPathEntries.length - 1;
        const history = createMemoryHistory({ initialEntries: initialPathEntries, initialIndex: indexOfLastPath});
        backFromServiceReview(history);
        expect(history.entries.length).toBe(2);
        expect(history.entries[0].pathname).toBe(firstRegularPath);
        expect(history.entries[1].pathname).toBe(serviceDetailPath);
    });
});

describe('goToRouteWithParameter', () => {
    const firstPath = routePathDefinition(Routes.Services);
    it('sends the user to the route', () => {
        const serviceParameter = aString();
        const initialPathEntries = [firstPath];
        const indexOfLastPath = initialPathEntries.length - 1;
        const history = createMemoryHistory({ initialEntries: initialPathEntries, initialIndex: indexOfLastPath});
        goToRouteWithParameter(Routes.ServiceDetail, serviceParameter, history);
        expect(history.location.pathname).toBe(`/service/${serviceParameter}`);
    });

    it('sends a previousOffset state with the parameter', () => {
        const offset = aNumber();
        const initialPathEntries = [firstPath];
        const indexOfLastPath = initialPathEntries.length - 1;
        const history = createMemoryHistory({ initialEntries: initialPathEntries, initialIndex: indexOfLastPath});
        goToRouteWithParameter(Routes.ServiceDetail, aString(), history, offset);
        const { previousOffset }: Partial<RouteLocationStateOffsets> = history.location.state as any;
        expect(previousOffset).toEqual(offset);
    });

    it('sends a default offset with the parameter if it is not populated', () => {
        const initialPathEntries = [firstPath];
        const indexOfLastPath = initialPathEntries.length - 1;
        const history = createMemoryHistory({ initialEntries: initialPathEntries, initialIndex: indexOfLastPath});
        goToRouteWithParameter(Routes.ServiceDetail, aString(), history);
        const { previousOffset }: RouteLocationStateOffsets = history.location.state as any;
        expect(previousOffset).toEqual(0);
    });

    it('sends a currentOffset state with the parameter of 0', () => {
        const initialPathEntries = [firstPath];
        const indexOfLastPath = initialPathEntries.length - 1;
        const history = createMemoryHistory({ initialEntries: initialPathEntries, initialIndex: indexOfLastPath});
        goToRouteWithParameter(Routes.ServiceDetail, aString(), history);
        const { currentOffset }: RouteLocationStateOffsets = history.location.state as any;
        expect(currentOffset).toEqual(0);
    });
});

describe('an example of how the route location state changes when', () => {
    const firstPath = routePathDefinition(Routes.TopicDetail);
    const initialPathEntries = [firstPath];
    const indexOfLastPath = initialPathEntries.length - 1;
    const history = createMemoryHistory({ initialEntries: initialPathEntries, initialIndex: indexOfLastPath });
    const topicDetailOffset = aNumber();
    goToRouteWithParameter(Routes.Services, aString(), history, topicDetailOffset);

    describe('navigating to a service list screen', () => {
        const routeLocationState = history.location.state as any;
        it ('sends the currentOffset containing 0', () => {
            expect(routeLocationState.currentOffset).toBe(0);
        });
        it ('sends the previousOffset containing the previous topic detail screen\'s offset', () => {
            expect(routeLocationState.previousOffset).toBe(topicDetailOffset);
        });
    });

    const serviceListOffset = aNumber();
    goToRouteWithParameter(Routes.ServiceDetail, aString(), history, serviceListOffset);

    describe('navigating to a service detail screen', () => {
        const routeLocationState = history.location.state as any;
        it('sends the currentOffset containing 0', () => {
            expect(routeLocationState.currentOffset).toBe(0);
        });
        it('sends the previousOffset containing the previous service list screen\'s offset', () => {
            expect(routeLocationState.previousOffset).toBe(serviceListOffset);
        });
    });

    goBack(history);

    describe('navigating back to the service list screen', () => {
        const routeLocationState = history.location.state as any;
        it('uses the previousOffset state provided to the service detail page for the currentOffset', () => {
            expect(routeLocationState.currentOffset).toBe(serviceListOffset);
        });
        it('maintains the topic detail\'s offset in previousOffset', () => {
            expect(routeLocationState.previousOffset).toBe(topicDetailOffset);
        });
    });
});

describe('goToRouteWithoutParameter', () => {
    const firstPath = routePathDefinition(Routes.RecommendedTopics);
    it('sends the user to the route', () => {
        const initialPathEntries = [firstPath];
        const indexOfLastPath = initialPathEntries.length - 1;
        const history = createMemoryHistory({ initialEntries: initialPathEntries, initialIndex: indexOfLastPath});
        goToRouteWithoutParameter(Routes.Learn, history);
        expect(history.location.pathname).toBe(routePathDefinition(Routes.Learn));
    });

    it('sends a previousOffset state when going to the new route', () => {
        const offset = aNumber();
        const initialPathEntries = [firstPath];
        const indexOfLastPath = initialPathEntries.length - 1;
        const history = createMemoryHistory({ initialEntries: initialPathEntries, initialIndex: indexOfLastPath});
        goToRouteWithoutParameter(Routes.Learn, history, offset);
        const { previousOffset }: Partial<RouteLocationStateOffsets> = history.location.state as any;
        expect(previousOffset).toEqual(offset);
    });

    it('sends a default offset state when going to the new route', () => {
        const initialPathEntries = [firstPath];
        const indexOfLastPath = initialPathEntries.length - 1;
        const history = createMemoryHistory({ initialEntries: initialPathEntries, initialIndex: indexOfLastPath});
        goToRouteWithoutParameter(Routes.Learn, history);
        const { previousOffset }: Partial<RouteLocationStateOffsets> = history.location.state as any;
        expect(previousOffset).toEqual(0);
    });

    it('sends a currentOffset state with the parameter of 0', () => {
        const initialPathEntries = [firstPath];
        const indexOfLastPath = initialPathEntries.length - 1;
        const history = createMemoryHistory({ initialEntries: initialPathEntries, initialIndex: indexOfLastPath});
        goToRouteWithoutParameter(Routes.Learn, history);
        const { currentOffset }: Partial<RouteLocationStateOffsets> = history.location.state as any;
        expect(currentOffset).toEqual(0);
    });
});