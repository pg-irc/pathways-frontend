// tslint:disable:no-expression-statement
import React, { Dispatch, SetStateAction } from 'react';
import { FeedbackReceiveUpdatesModal } from '../feedback/feedback_receive_updates_modal';
import { FeedbackChooseModeModal } from './feedback_choose_mode_modal';
import { UserInformation } from '../../stores/feedback/types';
import { FeedbackDiscardChangesModal } from './feedback_discard_changes_modal';
import { EmptyComponent } from '../empty_component/empty_component';

interface FeedbackModalContainerProps {
    readonly isSendingFeedback: boolean;
    readonly showChoooseFeedbackModeModal: boolean;
    readonly showReceiveUpdatesModal: boolean;
    readonly showFeedbackDiscardChangesModal: boolean;
    readonly setUserInformation: Dispatch<SetStateAction<UserInformation>>;
    readonly userInformation: UserInformation;
    readonly finishAndSendFeedback: () => void;
    readonly resetFeedback: () => void;
    readonly onChangeNameOrOtherDetailPress: () => void;
    readonly onChooseRemoveServicePress: () => void;
    readonly onChooseOtherChangesPress: () => void;
    readonly onClosePress: () => void;
    readonly onKeepEditingPress: () => void;
}

export const FeedbackModalContainer = (props: FeedbackModalContainerProps): JSX.Element => {
    if (props.showChoooseFeedbackModeModal) {
        return (
            <FeedbackChooseModeModal
                onClosePress={props.onClosePress}
                onChangeNameOrOtherDetailPress={props.onChangeNameOrOtherDetailPress}
                onChooseOtherChangesPress={props.onChooseOtherChangesPress}
                onChooseRemoveServicePress={props.onChooseRemoveServicePress}
            />
        );
    }
    if (props.showReceiveUpdatesModal) {
        return (
            <FeedbackReceiveUpdatesModal
                isSendingFeedback={props.isSendingFeedback}
                setUserInformation={props.setUserInformation}
                userInformation={props.userInformation}
                resetFeedback={props.resetFeedback}
                onFinishPress={props.finishAndSendFeedback}
            />
        );
    }
    if (props.showFeedbackDiscardChangesModal) {
        return (
            <FeedbackDiscardChangesModal
                onDiscardPress={props.resetFeedback}
                onKeepEditingPress={props.onKeepEditingPress}
            />
        );
    }

    return <EmptyComponent />;
};
