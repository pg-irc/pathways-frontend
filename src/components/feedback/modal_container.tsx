// tslint:disable:no-expression-statement
import React, { Dispatch, SetStateAction } from 'react';
import { t } from '@lingui/macro';
import { ReceiveUpdatesModal } from './receive_updates_modal';
import { ChooseModeModal } from './choose_mode_modal';
import { UserInformation } from '../../stores/feedback/types';
import { DiscardChangesModal } from './discard_changes_modal';
import { showToast } from '../../application/toast';
import {
    DiscardChangesAction,
    CancelDiscardChangesAction,
    ChooseChangeNameOrDetailsAction,
    ChooseRemoveServiceAction,
    ChooseOtherChangesAction,
    CloseAction,
} from '../../stores/feedback';

interface ModalContainerProps {
    readonly isSendingFeedback: boolean;
    readonly showChooseFeedbackModeModal: boolean;
    readonly showReceiveUpdatesModal: boolean;
    readonly showDiscardChangesModal: boolean;
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

export const ModalContainer = (props: ModalContainerProps): JSX.Element => {

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
            <ChooseModeModal
                onClosePress={props.close}
                onChangeNameOrOtherDetailPress={props.chooseChangeNameOrDetail}
                onChooseOtherChangesPress={props.chooseOtherChanges}
                onChooseRemoveServicePress={props.chooseRemoveService}
                isVisible={props.showChooseFeedbackModeModal}
            />
            <ReceiveUpdatesModal
                isSendingFeedback={props.isSendingFeedback}
                setUserInformation={props.setUserInformation}
                userInformation={props.userInformation}
                onFinishPress={props.finishAndSendFeedback}
                isVisible={props.showReceiveUpdatesModal}
                onModalHide={onReceiveUpdatesModalHide}
            />
            <DiscardChangesModal
                onDiscardPress={onDiscardModalDiscardPress}
                onKeepEditingPress={props.cancelDiscardFeedback}
                isVisible={props.showDiscardChangesModal}
            />
        </>
    );
};
