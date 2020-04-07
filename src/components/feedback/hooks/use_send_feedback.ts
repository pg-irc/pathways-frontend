// tslint:disable:no-expression-statement
import { useState, Dispatch, SetStateAction, useEffect, useRef } from 'react';
import * as R from 'ramda';
import { AIRTABLE_API_KEY, AIRTABLE_BASE_ID, AIRTABLE_TABLE_ID } from 'react-native-dotenv';
import buildUrl from 'build-url';

export interface FeedbackField {
    readonly value: string;
    readonly shouldSend: boolean;
}

export interface Feedback {
    readonly bc211Id: FeedbackField;
    readonly name: FeedbackField;
    readonly organization: FeedbackField;
    readonly description: FeedbackField;
    readonly address: FeedbackField;
    readonly phone: FeedbackField;
    readonly website: FeedbackField;
    readonly email: FeedbackField;
    readonly removalReason: FeedbackField;
    readonly other: FeedbackField;
    readonly authorIsEmployee: FeedbackField;
    readonly authorEmail: FeedbackField;
    readonly authorName: FeedbackField;
    readonly authorOrganization: FeedbackField;
    readonly authorJobTitle: FeedbackField;
}

export const getEmptyFeedback = (shouldSend: boolean = true): Feedback => {
    const emptyFeedbackField = { value: '', shouldSend };
    return {
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

export interface UseSendFeedback {
    readonly isSendingFeedback: boolean;
    readonly sendFeedback: () => Promise<void>;
}

export const useSendFeedback = (feedback: Feedback, clearFeedback: () => void): UseSendFeedback => {
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

export const toValidFeedbackJSON = (feedback: Feedback): string => {
    const feedbackToSend: Feedback = R.pickBy(
        (value: FeedbackField): boolean => value.shouldSend && !!value.value,
        feedback,
    );
    const feedbackFields: ReadonlyArray<keyof Feedback> = R.keys(feedbackToSend);
    const isMissingBC211Id = R.indexOf('bc211Id', feedbackFields) === -1;
    const hasLessThanTwoFields = feedbackFields.length < 2;

    if (isMissingBC211Id || hasLessThanTwoFields) {
        throw new Error('Feedback must have a bc211Id and at least one other value.');
    }

    const buildFieldValuePair = (acc: object, field: keyof Feedback): object =>
        ({...acc, [field]: feedbackToSend[field].value});

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
