// tslint:disable:no-expression-statement
import React, { Dispatch, SetStateAction } from 'react';
import { FeedbackReceiveUpdatesModal } from '../feedback/feedback_receive_updates_modal';
import { FeedbackChooseModeModal } from './feedback_choose_mode_modal';
import { UserInformation } from '../../stores/feedback/types';
import { FeedbackDiscardChangesModal } from './feedback_discard_changes_modal';

interface FeedbackModalContainerProps {
    readonly isSendingFeedback: boolean;
    readonly showChoooseFeedbackModeModal: boolean;
    readonly showReceiveUpdatesModal: boolean;
    readonly showFeedbackDiscardChangesModal: boolean;
    readonly setUserInformation: Dispatch<SetStateAction<UserInformation>>;
    readonly userInformation: UserInformation;
    readonly onChangeNameOrDetailsPress: () => void;
    readonly onRemoveThisServicePress: () => void;
    readonly onOtherChangesPress: () => void;
    readonly onFinishPress: () => void;
    readonly closeChooseFeedbackModeModal: () => void;
    readonly onDiscardPress: () => void;
    readonly onKeepEditingPress: () => void;
}

export const FeedbackModalContainer = (props: FeedbackModalContainerProps): JSX.Element => (
    <>
        <FeedbackChooseModeModal
            isVisible={props.showChoooseFeedbackModeModal}
            closeModal={props.closeChooseFeedbackModeModal}
            onChangeNameOrDetailsPress={props.onChangeNameOrDetailsPress}
            onOtherPress={props.onOtherChangesPress}
            onRemoveServicePress={props.onRemoveThisServicePress}
        />
        <FeedbackReceiveUpdatesModal
            isVisible={props.showReceiveUpdatesModal}
            onFinishPress={props.onFinishPress}
            isSendingFeedback={props.isSendingFeedback}
            setUserInformation={props.setUserInformation}
            userInformation={props.userInformation}
        />
        <FeedbackDiscardChangesModal
            isVisible={props.showFeedbackDiscardChangesModal}
            onDiscardPress={props.onDiscardPress}
            onKeepEditingPress={props.onKeepEditingPress}
        />
    </>
);
