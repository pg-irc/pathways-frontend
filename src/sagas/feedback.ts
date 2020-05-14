// tslint:disable:no-expression-statement
import { ForkEffect, takeLatest, PutEffect, put, call, CallEffect, select, SelectEffect } from 'redux-saga/effects';
import { AIRTABLE_API_KEY, AIRTABLE_BASE_ID, AIRTABLE_TABLE_ID } from 'react-native-dotenv';
import buildUrl from 'build-url';
import { SEND_FEEDBACK } from '../application/constants';
import { SendFeedbackAction, setError, SetErrorAction, setIsSending, SetIsSendingAction, discardChanges, DiscardChangesAction } from '../stores/feedback';
import { FeedbackPostData } from '../selectors/feedback/types';
import { selectFeedbackPostData } from '../selectors/feedback/select_feedback_post_data';
import * as Sentry from 'sentry-expo';

export function* watchSendFeedback(): IterableIterator<ForkEffect> {
    yield takeLatest(SEND_FEEDBACK, sendFeedback);
}

type Effects = CallEffect | PutEffect<SetIsSendingAction | SetErrorAction | DiscardChangesAction> | SelectEffect;

export function* sendFeedback(action: SendFeedbackAction): IterableIterator<Effects> {
    try {
        yield put(setIsSending(true));
        const feedbackPostData = yield select(selectFeedbackPostData, action.payload.serviceId);
        const feedbackJSON = toFeedbackJSON(feedbackPostData);
        const response = yield call(sendToAirtable, feedbackJSON);
        yield call(handleResponse, response);
    } catch (error) {
        Sentry.captureException(error);
        console.warn(error?.message || 'Error saving feedback');
        return yield put(setError(error));
    } finally {
        yield put(setIsSending(false));
        yield put(discardChanges());
    }
}

const sendToAirtable = async (feedbackJSON: string): Promise<Response> => (
    fetch(getRequestUrl(), getRequestInit(feedbackJSON))
);

const toFeedbackJSON = (feedback: FeedbackPostData): string => (
    JSON.stringify({ fields: feedback })
);

const getRequestUrl = (): string => {
    if (!AIRTABLE_BASE_ID) {
        throw new Error('AIRTABLE_BASE_ID is missing.');
    }

    if (!AIRTABLE_TABLE_ID) {
        throw new Error('AIRTABLE_TABLE_ID is missing.');
    }

    return buildUrl('https://api.airtable.com', { path: `v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_ID}` });
};

const getRequestInit = (feedbackJSON: string): RequestInit => {
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
        body: feedbackJSON,
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
        return 'Failed to save feedback to server: ' + message;
    }
    return 'Failed to save feedback';
};
