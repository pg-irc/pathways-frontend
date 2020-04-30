// tslint:disable:no-expression-statement
import React, { Dispatch, SetStateAction } from 'react';
import { t } from '@lingui/macro';
import { FeedbackReceiveUpdatesModal } from '../feedback/feedback_receive_updates_modal';
import { FeedbackChooseModeModal } from './feedback_choose_mode_modal';
import { UserInformation } from '../../stores/feedback/types';
import { FeedbackDiscardChangesModal } from './feedback_discard_changes_modal';
import { showToast } from '../../application/toast';
import {
    DiscardChangesAction,
    CancelDiscardChangesAction,
    ChooseChangeNameOrDetailsAction,
    ChooseRemoveServiceAction,
    ChooseOtherChangesAction,
    CloseAction,
} from '../../stores/feedback';

interface FeedbackModalContainerProps {
    readonly isSendingFeedback: boolean;
    readonly showChoooseFeedbackModeModal: boolean;
    readonly showReceiveUpdatesModal: boolean;
    readonly showFeedbackDiscardChangesModal: boolean;
    readonly setUserInformation: Dispatch<SetStateAction<UserInformation>>;
    readonly userInformation: UserInformation;
    readonly finishAndSendFeedback: () => void;
    readonly discardFeedback: () => DiscardChangesAction;
    readonly cancelDiscardFeedback: () => CancelDiscardChangesAction;
    readonly chooseChangeNameOrDetail: () => ChooseChangeNameOrDetailsAction;
    readonly chooseRemoveService: () => ChooseRemoveServiceAction;
    readonly chooseOtherChanges: () => ChooseOtherChangesAction;
    readonly close: () => CloseAction;
    readonly resetFeedbackAndUserInput: () => void;
}

export const FeedbackModalContainer = (props: FeedbackModalContainerProps): JSX.Element => {

    const onReceiveUpdatesModalHide = (i18n: I18n) => () => {
        showToast(i18n._(t`Thank you for your contribution!`));
        props.resetFeedbackAndUserInput();
    };

    const onDiscardModalDiscardPress = (): void => {
        props.discardFeedback();
        props.resetFeedbackAndUserInput();
    };

    return (
        <>
            <FeedbackChooseModeModal
                onClosePress={props.close}
                onChangeNameOrOtherDetailPress={props.chooseChangeNameOrDetail}
                onChooseOtherChangesPress={props.chooseOtherChanges}
                onChooseRemoveServicePress={props.chooseRemoveService}
                isVisible={props.showChoooseFeedbackModeModal}
            />
            <FeedbackReceiveUpdatesModal
                isSendingFeedback={props.isSendingFeedback}
                setUserInformation={props.setUserInformation}
                userInformation={props.userInformation}
                onFinishPress={props.finishAndSendFeedback}
                isVisible={props.showReceiveUpdatesModal}
                onModalHide={onReceiveUpdatesModalHide}
            />
            <FeedbackDiscardChangesModal
                onDiscardPress={onDiscardModalDiscardPress}
                onKeepEditingPress={props.cancelDiscardFeedback}
                isVisible={props.showFeedbackDiscardChangesModal}
            />
        </>
    );
};
