// tslint:disable:no-expression-statement
import React, { Dispatch, SetStateAction } from 'react';
import { FeedbackReceiveUpdatesModal } from '../feedback/feedback_receive_updates_modal';
import { FeedbackChooseModeModal } from './feedback_choose_mode_modal';
import { UserInformation } from '../../stores/feedback/types';
import { FeedbackDiscardChangesModal } from './feedback_discard_changes_modal';
import { EmptyComponent } from '../empty_component/empty_component';
import {
    ChooseChangeNameOrDetailsAction,
    ChooseRemoveServiceAction,
    ChooseOtherChangesAction,
    CloseAction,
    DiscardChangesAction,
    CancelDiscardChangesAction,
} from '../../stores/feedback';

interface FeedbackModalContainerProps {
    readonly isSendingFeedback: boolean;
    readonly showChoooseFeedbackModeModal: boolean;
    readonly showReceiveUpdatesModal: boolean;
    readonly showFeedbackDiscardChangesModal: boolean;
    readonly setUserInformation: Dispatch<SetStateAction<UserInformation>>;
    readonly userInformation: UserInformation;
    readonly finishAndSendFeedback: () => void;
    readonly chooseChangeNameOrDetail: () => ChooseChangeNameOrDetailsAction;
    readonly chooseRemoveService: () => ChooseRemoveServiceAction;
    readonly chooseOtherChanges: () => ChooseOtherChangesAction;
    readonly close: () => CloseAction;
    readonly discardFeedback: () => DiscardChangesAction;
    readonly cancelDiscardFeedback: () => CancelDiscardChangesAction;
}

export const FeedbackModalContainer = (props: FeedbackModalContainerProps): JSX.Element => {
    if (props.showChoooseFeedbackModeModal) {
        return (
            <FeedbackChooseModeModal
                close={props.close}
                chooseChangeNameOrOtherDetail={props.chooseChangeNameOrDetail}
                chooseOtherChanges={props.chooseOtherChanges}
                chooseRemoveService={props.chooseRemoveService}
            />
        );
    }
    if (props.showReceiveUpdatesModal) {
        return (
            <FeedbackReceiveUpdatesModal
                finishAndSendFeedback={props.finishAndSendFeedback}
                isSendingFeedback={props.isSendingFeedback}
                setUserInformation={props.setUserInformation}
                userInformation={props.userInformation}
            />
        );
    }
    if (props.showFeedbackDiscardChangesModal) {
        return (
            <FeedbackDiscardChangesModal
                discardFeedback={props.discardFeedback}
                cancelDiscardFeedback={props.cancelDiscardFeedback}
            />
        );
    }

    return <EmptyComponent />;
};
