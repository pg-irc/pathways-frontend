// tslint:disable:no-expression-statement
import buildUrl from 'build-url';
import * as Sentry from 'sentry-expo';
import { ForkEffect, takeLatest, call, CallEffect, select, SelectEffect, PutEffect, put } from 'redux-saga/effects';
import { AIRTABLE_API_KEY, AIRTABLE_BASE_ID, AIRTABLE_SERVICES_REVIEWS_TABLE_ID } from 'react-native-dotenv';
import { SUBMIT_SERVICE_REVIEW } from '../application/constants';
import { selectRating } from '../selectors/reviews/select_rating';
import { finishServiceReview, FinishServiceReviewAction, SubmitServiceReviewAction } from '../stores/reviews/actions';
import { Rating, ServiceReviewPostData } from '../stores/reviews';
import { Id } from '../stores/services';
import { selectLocaleCode } from '../selectors/locale/select_locale_code';

type Effects = CallEffect | SelectEffect | PutEffect<FinishServiceReviewAction>;

export function* watchSubmitServiceReview(): IterableIterator<ForkEffect> {
    yield takeLatest(SUBMIT_SERVICE_REVIEW, submitServiceReview);
}

function* submitServiceReview(action: SubmitServiceReviewAction): IterableIterator<Effects> {
    try {
        const serviceId = action.payload.serviceId;
        const comment = action.payload.comment;
        const userLocale = yield select(selectLocaleCode);
        const rating = yield select(selectRating);
        const serviceReviewToPost = buildServiceReviewPostData(serviceId, userLocale, rating, comment);
        const serviceReviewJSON = toServiceReviewJSON(serviceReviewToPost);
        const response = yield call(sendToAirtable, serviceReviewJSON);
        yield call(handleResponse, response);
    } catch (error) {
        Sentry.Native.captureException(error);
        console.warn(error?.message || 'Error saving review');
    } finally {
        yield put(finishServiceReview());
    }
}

const buildServiceReviewPostData = (serviceId: Id, userLocale: string, rating: Rating, comment?: string): ServiceReviewPostData => ({
    serviceId,
    userLocale,
    rating,
    comment,
});

const toServiceReviewJSON = (serviceReview: ServiceReviewPostData): string => (
    JSON.stringify({ fields: serviceReview })
);

const sendToAirtable = async (serviceReviewJSON: string): Promise<Response> => (
    fetch(buildRequestUrl(), buildReviewPostRequest(serviceReviewJSON))
);

const buildRequestUrl = (): string => {
    if (!AIRTABLE_BASE_ID) {
        throw new Error('AIRTABLE_BASE_ID is missing.');
    }

    if (!AIRTABLE_SERVICES_REVIEWS_TABLE_ID) {
        throw new Error('AIRTABLE_SERVICES_REVIEWS_TABLE_ID is missing.');
    }

    return buildUrl('https://api.airtable.com', { path: `v0/${AIRTABLE_BASE_ID}/${AIRTABLE_SERVICES_REVIEWS_TABLE_ID}` });
};

const buildReviewPostRequest = (serviceReviewJSON: string): RequestInit => {
    if (!AIRTABLE_API_KEY) {
        throw new Error('AIRTABLE_API_KEY is missing.');
    }

    return {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${AIRTABLE_API_KEY}`,
        },
        body: serviceReviewJSON,
    };
};

const handleResponse = async (response: Response): Promise<void> => {
    if (!response.ok) {
        const json = await response.json();
        const message = buildErrorMessage(json);
        throw new Error(message);
    }
};

// tslint:disable-next-line: no-any
const buildErrorMessage = (json: any): string => {
    const message = json?.error?.message;
    if (message) {
        return 'Failed to save review to server: ' + message;
    }
    return 'Failed to save review';
};
