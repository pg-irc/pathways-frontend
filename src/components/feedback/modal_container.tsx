// tslint:disable:no-expression-statement
import React, { Dispatch, SetStateAction } from 'react';
import { t } from '@lingui/macro';
import { ContactInformationModal } from './contact_information_modal';
import { ChooseModeModal } from './choose_mode_modal';
import { UserInformation } from '../../stores/feedback/types';
import { DiscardChangesModal } from './discard_changes_modal';
import { showToast } from '../../application/toast';
import { DiscardChangesAction, CancelDiscardChangesAction, CloseAction } from '../../stores/feedback';

interface ModalContainerProps {
    readonly isSendingFeedback: boolean;
    readonly showChooseFeedbackModeModal: boolean;
    readonly showContactInformationModal: boolean;
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
    readonly back: () => void;
}

export const ModalContainer = (props: ModalContainerProps): JSX.Element => {

    const onFinishPress = (i18n: I18n): void => {
        props.finishAndSendFeedback();
        showToast(i18n._(t`Thank you for your contribution!`), 3000);
    };

    const onDiscardModalDiscardPress = (): void => {
        props.discardFeedback();
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
            <ContactInformationModal
                isSendingFeedback={props.isSendingFeedback}
                setUserInformation={props.setUserInformation}
                userInformation={props.userInformation}
                onFinishPress={onFinishPress}
                isVisible={props.showContactInformationModal}
                back={props.back}
            />
            <DiscardChangesModal
                onDiscardPress={onDiscardModalDiscardPress}
                onKeepEditingPress={props.cancelDiscardFeedback}
                isVisible={props.showDiscardChangesModal}
            />
        </>
    );
};
