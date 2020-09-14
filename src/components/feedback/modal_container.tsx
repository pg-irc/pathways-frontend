// tslint:disable:no-expression-statement
import React from 'react';
import { ChooseModeModal } from './choose_mode_modal';
import { DiscardChangesModal } from './discard_changes_modal';
import { DiscardChangesAction, CancelDiscardChangesAction, CloseAction } from '../../stores/feedback';

interface ModalContainerProps {
    readonly showChooseFeedbackModeModal: boolean;
    readonly showDiscardChangesModal: boolean;
    readonly serviceId: string;
    readonly discardFeedback: () => DiscardChangesAction;
    readonly cancelDiscardFeedback: () => CancelDiscardChangesAction;
    readonly chooseChangeNameOrDetail: () => void;
    readonly chooseRemoveService: () => void;
    readonly chooseOtherChanges: () => void;
    readonly chooseExplainFeedback: () => void;
    readonly close: () => CloseAction;
    readonly onBackButtonPress: () => void;
}

export const ModalContainer = (props: ModalContainerProps): JSX.Element => {

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
                onChooseExplainFeedback={props.chooseExplainFeedback}
                isVisible={props.showChooseFeedbackModeModal}
            />
            <DiscardChangesModal
                onDiscardPress={onDiscardModalDiscardPress}
                onKeepEditingPress={props.cancelDiscardFeedback}
                isVisible={props.showDiscardChangesModal}
            />
        </>
    );
};
