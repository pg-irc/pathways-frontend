// tslint:disable:no-expression-statement
import { ForkEffect, takeLatest, PutEffect, put, call, CallEffect, select, SelectEffect } from 'redux-saga/effects';
import { AIRTABLE_API_KEY, AIRTABLE_BASE_ID, AIRTABLE_TABLE_ID } from 'react-native-dotenv';
import buildUrl from 'build-url';
import { SEND_FEEDBACK } from '../application/constants';
import { SendFeedbackAction, setError, SetErrorAction, setIsSending, SetIsSendingAction, discardChanges, DiscardChangesAction } from '../stores/feedback';
import { FeedbackPostData } from '../selectors/feedback/types';
import { selectFeedbackPostData } from '../selectors/feedback/select_feedback_post_data';

export function* watchSendFeedback(): IterableIterator<ForkEffect> {
    yield takeLatest(SEND_FEEDBACK, sendFeedback);
}

type Effects = CallEffect | PutEffect<SetIsSendingAction | SetErrorAction | DiscardChangesAction> | SelectEffect;

export function* sendFeedback(action: SendFeedbackAction): IterableIterator<Effects> {
    try {
        yield put(setIsSending(true));
        const feedbackPostData = yield select(selectFeedbackPostData, action.payload.serviceId);
        console.log(JSON.stringify(feedbackPostData));
        const feedbackJSON = toFeedbackJSON(feedbackPostData);
        console.log(JSON.stringify(feedbackJSON));
        const response = yield call(sendToAirtable, feedbackJSON);
        yield call(handleResponse, response);
    } catch (error) {
        console.warn(error.message);
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
        console.log('Oh yes we got an error');
        const json = await response.json();
        console.log(JSON.stringify(json));
        const message = 'Failed to save feedback to server: ' + json.error.message;
        throw new Error(message);
    }
};
