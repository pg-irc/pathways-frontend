import React, { Dispatch, SetStateAction, useCallback, useState } from 'react';

import { useToggleState, ToggleStateApi } from '../../hooks/use_toggle_state';

import { FeedbackOptionsModalComponent } from './feedback_options_modal_component';
import { FeedbackOtherRemoveServiceModal } from './feedback_other_remove_service_component';

interface SuggestionContent {
    readonly header: string;
    readonly label: string;
    readonly placeholder: string;
}

interface UseFeedbackContent {
    readonly content: SuggestionContent;
    readonly isVisible: boolean;
    readonly showRemoveService: () => void;
    readonly showOther: () => void;
    readonly close: () => void;
}

type FeedbackOptionsModalProps = {
    readonly isFeedbackOptionModalVisible: boolean;
    readonly setShowFeedbackOptionsModal: (isVisible: boolean) => void;
    readonly onSuggestAnUpdatePress: () => void;
};

type FeedbackModalContainerProps = FeedbackOptionsModalProps;

const SUGGESTION_CONTENT = {
    OTHER: {
        header: 'Other',
        label: 'Tell us more about this service',
        placeholder: 'Comment or suggest edits',
    },
    REMOVE_SERVICE: {
        header: 'Remove Service',
        label: 'What is your reason for removal?',
        placeholder: 'e.g. Service is permanently closed',
    },
};

const useFeedbackSuggestionContent = (): UseFeedbackContent => {
    const {
        state: isVisible,
        on: showModal,
        off: hideModal,
    }: ToggleStateApi = useToggleState();
    const [content, setContent]: readonly[SuggestionContent, Dispatch<SetStateAction<SuggestionContent>>]
        = useState<SuggestionContent>(SUGGESTION_CONTENT.OTHER);

    const showRemoveService = useCallback<() => void>(
        (): void => {
            showModal();
            setContent(SUGGESTION_CONTENT.REMOVE_SERVICE);
        },
        [showModal, setContent],
    );

    const showOther = useCallback<() => void>(
        (): void => {
            showModal();
            setContent(SUGGESTION_CONTENT.OTHER);
        },
        [showModal, setContent],
    );

    const close = useCallback<() => void> (
        (): void => hideModal(),
        [hideModal],
    );

    return {
        content,
        close,
        isVisible,
        showRemoveService,
        showOther,
    };
};

export const FeedbackModalContainer = (props: FeedbackModalContainerProps): JSX.Element => {
    const {
        content,
        isVisible,
        showOther,
        showRemoveService,
        close,
    }: UseFeedbackContent = useFeedbackSuggestionContent();

    return (
        <>
            <FeedbackOptionsModalComponent
                isVisible={props.isFeedbackOptionModalVisible}
                setIsVisible={props.setShowFeedbackOptionsModal}
                onSuggestAnUpdatePress={props.onSuggestAnUpdatePress}
                onOtherOptionPress={showOther}
                onRemoveServicePress={showRemoveService}
            />
            <FeedbackOtherRemoveServiceModal
                isVisible={isVisible}
                headerLabel={content.header}
                inputLabel={content.label}
                placeholder={content.placeholder}
                onClose={close}
            />
        </>
    );
};