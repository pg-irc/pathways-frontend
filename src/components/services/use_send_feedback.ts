// tslint:disable:no-expression-statement
import { useState, Dispatch, SetStateAction, useEffect, useRef } from 'react';
import { AIRTABLE_API_KEY, AIRTABLE_BASE_ID, AIRTABLE_TABLE_ID } from 'react-native-dotenv';
import buildUrl from 'build-url';
import { ServiceFeedback } from '../../stores/feedback/types';
import { FeedbackPostData } from '../../selectors/feedback/types';

export const getEmptyFeedback = (shouldSend: boolean = true): ServiceFeedback => {
    const emptyFeedbackField = { value: '', shouldSend };
    return {
        type: 'service_feedback',
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

export const useSendFeedback = (feedback: FeedbackPostData, clearFeedback: () => void): SendFeedbackPromise => {
    const sendCancelled = useRef<boolean>(false);
    useEffect(() => () => { sendCancelled.current = true; }, []);
    const [isSendingFeedback, setisSendingFeedback]: readonly[boolean, Dispatch<SetStateAction<boolean>>] = useState(false);
    const sendFeedback = async (): Promise<void> => {
        try {
            setisSendingFeedback(true);
            const feedbackJSON = JSON.stringify(feedback);
            const response = await fetch(
                getRequestUrl(),
                getRequestInit(feedbackJSON),
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
