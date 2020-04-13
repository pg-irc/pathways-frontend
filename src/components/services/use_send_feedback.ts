// tslint:disable:no-expression-statement
import { useState, Dispatch, SetStateAction, useEffect, useRef } from 'react';
import * as R from 'ramda';
import { AIRTABLE_API_KEY, AIRTABLE_BASE_ID, AIRTABLE_TABLE_ID } from 'react-native-dotenv';
import buildUrl from 'build-url';
import { ServiceFeedback, FeedbackField } from '../../stores/feedback/types';

export const getEmptyFeedback = (shouldSend: boolean = true): ServiceFeedback => {
    const emptyFeedbackField = { value: '', shouldSend };
    return {
        type: 'service_feedback',
        bc211Id: emptyFeedbackField,
        name: emptyFeedbackField,
        organization: emptyFeedbackField,
        description: emptyFeedbackField,
        address: emptyFeedbackField,
        phone: emptyFeedbackField,
        website: emptyFeedbackField,
        email: emptyFeedbackField,
        removalReason: emptyFeedbackField,
        other: emptyFeedbackField,
        authorIsEmployee: emptyFeedbackField,
        authorEmail: emptyFeedbackField,
        authorName: emptyFeedbackField,
        authorJobTitle: emptyFeedbackField,
        authorOrganization: emptyFeedbackField,
    };
};

export interface SendFeedbackPromise {
    readonly isSendingFeedback: boolean;
    readonly sendFeedback: () => Promise<void>;
}

export const useSendFeedback = (feedback: ServiceFeedback, clearFeedback: () => void): SendFeedbackPromise => {
    const sendCancelled = useRef<boolean>(false);
    useEffect(() => () => { sendCancelled.current = true; }, []);
    const [isSendingFeedback, setisSendingFeedback]: readonly[boolean, Dispatch<SetStateAction<boolean>>] = useState(false);
    const sendFeedback = async (): Promise<void> => {
        try {
            setisSendingFeedback(true);
            const response = await fetch(
                getRequestUrl(),
                getRequestInit(toValidFeedbackJSON(feedback)),
            );
            await handleResponse(response);
        } catch (error) {
            console.warn(`An error occured while sending feedback: ${error}`);
        } finally {
            if (!sendCancelled.current) {
                setisSendingFeedback(false);
                clearFeedback();
            }
        }
    };

    return {
        isSendingFeedback,
        sendFeedback,
    };
};

export const toValidFeedbackJSON = (feedback: ServiceFeedback): string => {
    const feedbackToSend: ServiceFeedback = R.pickBy(
        (value: FeedbackField): boolean => value.shouldSend && !!value.value,
        feedback,
    );
    const feedbackFields: ReadonlyArray<keyof ServiceFeedback> = R.keys(feedbackToSend);
    const isMissingBC211Id = R.indexOf('bc211Id', feedbackFields) === -1;
    const hasLessThanTwoFields = feedbackFields.length < 2;

    // TODO use the type system to express this, bc211id cannot be optional, the
    // other fields can.
    if (isMissingBC211Id || hasLessThanTwoFields) {
        throw new Error('Feedback must have a bc211Id and at least one other value.');
    }

    // TODO write instead a selector that pulls data from the store in a form that can be
    // directly JSON.stringified here. Selectors are easy to unit test, unlike this code.

    const buildFieldValuePair = (acc: object, field: keyof ServiceFeedback): object => (
        {
            ...acc,
            [field]: field === 'type' ? '' : feedbackToSend[field].value,
        }
    );

    return JSON.stringify({ fields: R.reduce(buildFieldValuePair, {}, feedbackFields) });
};

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
        throw new Error(json.error.message);
    }
};
