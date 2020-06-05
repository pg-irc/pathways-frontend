// tslint:disable:no-expression-statement
import React, { Dispatch, SetStateAction } from 'react';
import { t } from '@lingui/macro';
import { ReceiveUpdatesModal } from './receive_updates_modal';
import { ChooseModeModal } from './choose_mode_modal';
import { UserInformation } from '../../stores/feedback/types';
import { DiscardChangesModal } from './discard_changes_modal';
import { showToast } from '../../application/toast';
import { EmptyComponent } from '../empty_component/empty_component';
import { DiscardChangesAction, CancelDiscardChangesAction, CloseAction } from '../../stores/feedback';

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
    readonly chooseChangeNameOrDetail: () => void;
    readonly chooseRemoveService: () => void;
    readonly chooseOtherChanges: () => void;
    readonly close: () => CloseAction;
}

export const ModalContainer = (props: ModalContainerProps): JSX.Element => {

    const onReceiveUpdatesModalHide = (i18n: I18n) => () => {
        showToast(i18n._(t`Thank you for your contribution!`));
    };

    const onDiscardModalDiscardPress = (): void => {
        props.discardFeedback();
    };

    if (props.showChooseFeedbackModeModal) {
        return <ChooseModeModal
            onClosePress={props.close}
            onChangeNameOrOtherDetailPress={props.chooseChangeNameOrDetail}
            onChooseOtherChangesPress={props.chooseOtherChanges}
            onChooseRemoveServicePress={props.chooseRemoveService}
        />;
    }

    if (props.showReceiveUpdatesModal) {
        return <ReceiveUpdatesModal
            isSendingFeedback={props.isSendingFeedback}
            setUserInformation={props.setUserInformation}
            userInformation={props.userInformation}
            onFinishPress={props.finishAndSendFeedback}
            onModalHide={onReceiveUpdatesModalHide}
        />;
    }

    if (props.showDiscardChangesModal) {
        return <DiscardChangesModal
            onDiscardPress={onDiscardModalDiscardPress}
            onKeepEditingPress={props.cancelDiscardFeedback}
            isVisible={true}
        />;
    }

    return <EmptyComponent/>;
};
