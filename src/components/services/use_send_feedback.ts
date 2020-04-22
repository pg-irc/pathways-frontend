// tslint:disable:no-expression-statement
import { useState, Dispatch, SetStateAction, useEffect, useRef } from 'react';
import { AIRTABLE_API_KEY, AIRTABLE_BASE_ID, AIRTABLE_TABLE_ID } from 'react-native-dotenv';
import buildUrl from 'build-url';
import { FeedbackPostData } from '../../selectors/feedback/types';

export type SendFeedbackPromise = readonly [
    boolean,
    () => Promise<void>,
];

export const useSendFeedback = (feedback: FeedbackPostData, onSendFeedbackFinished: () => void): SendFeedbackPromise => {
    const sendCancelled = useRef<boolean>(false);
    useEffect(() => () => { sendCancelled.current = true; }, []);
    const [isSendingFeedback, setisSendingFeedback]: readonly[boolean, Dispatch<SetStateAction<boolean>>] = useState(false);
    const sendFeedback = async (): Promise<void> => {
        try {
            setisSendingFeedback(true);
            const feedbackJSON = toFeedbackJSON(feedback);
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
                onSendFeedbackFinished();
            }
        }
    };

    return [
        isSendingFeedback,
        sendFeedback,
    ];
};

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
        throw new Error(json.error.message);
    }
};
