// tslint:disable:no-expression-statement
import { t } from '@lingui/macro';
import React, { Dispatch, SetStateAction, useCallback, useState } from 'react';

import { FeedbackOptionsModalComponent } from './feedback_options_modal_component';
import { FeedbackOtherRemoveServiceModal } from './feedback_other_remove_service_component';

const SUGGESTION_CONTENT = {
    OTHER: {
        header: t`Other`,
        label: t`Tell us more about this service`,
        placeholder: t`Comment or suggest edits`,
    },
    REMOVE_SERVICE: {
        header: t`Remove Service`,
        label: t`What is your reason for removal?`,
        placeholder: t`e.g. Service is permanently closed`,
    },
};

interface SuggestionContent {
    readonly header: TemplateStringsArray;
    readonly label: TemplateStringsArray;
    readonly placeholder: TemplateStringsArray;
}

interface UseFeedbackContent {
    readonly suggestionFormContent: SuggestionContent;
    readonly showRemoveService: () => void;
    readonly showOther: () => void;
}

interface FeedbackModalContainerProps {
    readonly isFeedbackOptionModalVisible: boolean;
    readonly setShowFeedbackOptionsModal: (isVisible: boolean) => void;
    readonly onSuggestAnUpdatePress: () => void;
}

interface FeedbackSuggestionControls {
    readonly suggestionFormContent: SuggestionContent;
    readonly showSuggestion: boolean;
    readonly setShowSuggestion: Dispatch<SetStateAction<boolean>>;
    readonly onOtherPress: () => void;
    readonly onRemoveServicePress: () => void;
}

/**
 * This hook manages the content state of the suggestion modal
 */
const useFeedbackSuggestionContent = (): UseFeedbackContent => {
    const [suggestionFormContent, setSuggestionFormContent]: readonly[SuggestionContent, Dispatch<SetStateAction<SuggestionContent>>]
        = useState<SuggestionContent>(SUGGESTION_CONTENT.OTHER);

    const showRemoveService = useCallback<() => void>(
        (): void => setSuggestionFormContent(SUGGESTION_CONTENT.REMOVE_SERVICE),
        [setSuggestionFormContent],
    );

    const showOther = useCallback<() => void>(
        (): void => setSuggestionFormContent(SUGGESTION_CONTENT.OTHER),
        [setSuggestionFormContent],
    );

    return {
        suggestionFormContent,
        showRemoveService,
        showOther,
    };
};

/**
 * This hook attempts to abstract the onPress callbacks for Other and Remove Service options.
 * The controls do not attempt to manage the state of suggestion modal visibility.
 *
 */
const useFeedbackSuggestionControls = (setShowFeedbackOptionsModal: (show: boolean) => void): FeedbackSuggestionControls => {
    // This state does not control the modal visibility.
    const [showSuggestion, setShowSuggestion]: readonly[boolean, Dispatch<SetStateAction<boolean>>]
        = useState(false);

    const { suggestionFormContent, showRemoveService, showOther }: UseFeedbackContent
        = useFeedbackSuggestionContent();

    const onOtherPress = useCallback(
        (): void => {
            showOther();
            setShowSuggestion(true);
            setShowFeedbackOptionsModal(false);
        },
        [setShowSuggestion, showOther, setShowFeedbackOptionsModal],
    );

    const onRemoveServicePress = useCallback(
        (): void => {
            showRemoveService();
            setShowSuggestion(true);
            setShowFeedbackOptionsModal(false);
        },
        [setShowSuggestion, showRemoveService, setShowFeedbackOptionsModal],
    );

    return {
        suggestionFormContent,
        showSuggestion,
        setShowSuggestion,
        onOtherPress,
        onRemoveServicePress,
    };
};

export const FeedbackModalContainer = ({
    onSuggestAnUpdatePress,
    setShowFeedbackOptionsModal,
    isFeedbackOptionModalVisible,
}: FeedbackModalContainerProps): JSX.Element => {
    const {
        suggestionFormContent,
        showSuggestion,
        setShowSuggestion,
        onOtherPress,
        onRemoveServicePress,
    }: FeedbackSuggestionControls = useFeedbackSuggestionControls(setShowFeedbackOptionsModal);

    const [showModal, setShowModal]: readonly[boolean, Dispatch<SetStateAction<boolean>>]
        = useState<boolean>(false);

    const onHideOptionsModal = useCallback(
        (): void => {
            // Only show the suggestion modal once the options modal is successfull hidden
            if (showSuggestion) {
                setShowModal(true);
            }
        },
        [showSuggestion, setShowModal],
    );

    const onCloseSuggestionModal = useCallback(
        (): void => {
            // If the close button is pressed, hide the modal and
            // set the flag to false
            setShowSuggestion(false);
            setShowModal(false);
        },
        [setShowSuggestion],
    );

    return (
        <>
            <FeedbackOptionsModalComponent
                isVisible={isFeedbackOptionModalVisible}
                setIsVisible={setShowFeedbackOptionsModal}
                onModalHide={onHideOptionsModal}
                onSuggestAnUpdatePress={onSuggestAnUpdatePress}
                onOtherOptionPress={onOtherPress}
                onRemoveServicePress={onRemoveServicePress}
            />
            <FeedbackOtherRemoveServiceModal
                headerLabel={suggestionFormContent.header}
                isVisible={showModal}
                inputLabel={suggestionFormContent.label}
                onClose={onCloseSuggestionModal}
                placeholder={suggestionFormContent.placeholder}
            />
        </>
    );
};