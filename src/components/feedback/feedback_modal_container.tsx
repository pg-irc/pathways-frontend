import React, { useCallback, useState } from 'react';

import { FeedbackOptionsModalComponent } from './feedback_options_modal_component';
import { FeedbackSuggestionComponent } from './feedback_suggestion_component';

interface SuggestionContent {
  header: string;
  label: string;
  placeholder: string;
};

type FeedbackOptionsModalProps = {
  isFeedbackOptionModalVisible: boolean,
  setShowFeedbackOptionsModal: (isVisible: boolean) => void,
  onSuggestAnUpdatePress: () => void,
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

function useToggleState(initialValue: boolean): readonly [boolean, () => void] {
  const [state, toggleState] = useState<boolean>(initialValue);

  function toggle() {
    toggleState(prevState => !prevState);
  }

  return [state, toggle];
}

function useFeedbackSuggestionContent() {
  const [isVisible, toggle] = useToggleState(false);
  const [content, setContent] = useState<SuggestionContent>(SUGGESTION_CONTENT.OTHER);

  const showRemoveService = useCallback<() => void>(
    () => {
      toggle();
      setContent(SUGGESTION_CONTENT.REMOVE_SERVICE);
    },
    [toggle, setContent],
  );

  const showOther = useCallback<() => void>(
    () => {
      toggle();
      setContent(SUGGESTION_CONTENT.OTHER);
    },
    [toggle, setContent],
  );

  const close = useCallback<() => void> (
    () => toggle(),
    [toggle],
  )

  return {
    content,
    close,
    isVisible,
    showRemoveService,
    showOther,
  };
}

export const FeedbackModalContainer = (props: FeedbackModalContainerProps) => {
  const {
    content,
    isVisible,
    showOther,
    showRemoveService,
    close,
  } = useFeedbackSuggestionContent();

  return (
    <>
      <FeedbackOptionsModalComponent
        isVisible={props.isFeedbackOptionModalVisible}
        setIsVisible={props.setShowFeedbackOptionsModal}
        onSuggestAnUpdatePress={props.onSuggestAnUpdatePress}
        onOtherOptionPress={showOther}
        onRemoveServicePress={showRemoveService}
      />
      <FeedbackSuggestionComponent
        isVisible={isVisible}
        headerLabel={content.header}
        inputLabel={content.label}
        placeholder={content.placeholder}
        onClose={close}
      />
    </>
  );
}