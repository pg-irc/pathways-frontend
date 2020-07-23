// tslint:disable:no-expression-statement
import React from 'react';
import { ChooseModeModal } from './choose_mode_modal';
import { DiscardChangesModal } from './discard_changes_modal';
import { DiscardChangesAction, CancelDiscardChangesAction, CloseAction } from '../../stores/feedback';
import { goToRouteWithParameter, Routes } from '../../application/routing';
import { useHistory } from 'react-router-native';

interface ModalContainerProps {
    readonly showChooseFeedbackModeModal: boolean;
    readonly showDiscardChangesModal: boolean;
    readonly serviceId: string;
    readonly discardFeedback: () => DiscardChangesAction;
    readonly cancelDiscardFeedback: () => CancelDiscardChangesAction;
    readonly chooseChangeNameOrDetail: () => void;
    readonly chooseRemoveService: () => void;
    readonly chooseOtherChanges: () => void;
    readonly close: () => CloseAction;
    readonly onBackButtonPress: () => void;
}

export const ModalContainer = (props: ModalContainerProps): JSX.Element => {
    const history = useHistory();

    const onDiscardModalDiscardPress = (): void => {
        props.discardFeedback();
        goToRouteWithParameter(Routes.ServiceDetail, props.serviceId, history)();
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
            <DiscardChangesModal
                onDiscardPress={onDiscardModalDiscardPress}
                onKeepEditingPress={props.cancelDiscardFeedback}
                isVisible={props.showDiscardChangesModal}
            />
        </>
    );
};
