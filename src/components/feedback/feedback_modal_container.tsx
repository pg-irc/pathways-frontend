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
    readonly onChangeNameOrDetailsPress: () => void;
    readonly onRemoveThisServicePress: () => void;
    readonly onOtherChangesPress: () => void;
    readonly onFinishPress: () => void;
    readonly closeChooseFeedbackModeModal: () => void;
    readonly onDiscardPress: () => void;
    readonly onKeepEditingPress: () => void;
}

export const FeedbackModalContainer = (props: FeedbackModalContainerProps): JSX.Element => {
    if (props.showChoooseFeedbackModeModal) {
        return (
            <FeedbackChooseModeModal
                closeModal={props.closeChooseFeedbackModeModal}
                onChangeNameOrDetailsPress={props.onChangeNameOrDetailsPress}
                onOtherPress={props.onOtherChangesPress}
                onRemoveServicePress={props.onRemoveThisServicePress}
            />
        );
    }
    if (props.showReceiveUpdatesModal) {
        return (
            <FeedbackReceiveUpdatesModal
                onFinishPress={props.onFinishPress}
                isSendingFeedback={props.isSendingFeedback}
                setUserInformation={props.setUserInformation}
                userInformation={props.userInformation}
            />
        );
    }
    if (props.showFeedbackDiscardChangesModal) {
        return (
            <FeedbackDiscardChangesModal
                onDiscardPress={props.onDiscardPress}
                onKeepEditingPress={props.onKeepEditingPress}
            />
        );
    }

    return <EmptyComponent />;
};
