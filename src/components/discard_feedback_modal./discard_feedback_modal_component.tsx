// tslint:disable: no-expression-statement
import React from 'react';
import Modal from 'react-native-modal';
import { View, Text, Button } from 'native-base';
import { colors, textStyles, applicationStyles } from '../../application/styles';
import { Trans } from '@lingui/react';

export interface DiscardFeedbackModalProps {
    readonly isVisible: boolean;
    readonly closeModal: () => void;
    readonly disableFeedback: () => void;
}

export const DiscardFeedbackModal = (props: DiscardFeedbackModalProps): JSX.Element => (
    <Modal
        isVisible={props.isVisible}
    >
        <View padder style={{backgroundColor: colors.white, borderRadius: 10}}>
            <HeaderComponent />
            <ButtonsComponent {...props} />
        </View>
    </Modal>
);

const HeaderComponent = (): JSX.Element => (
        <Text style={textStyles.headlineH4StyleBlackLeft}>
            <Trans>Discard the change suggested?</Trans>
        </Text>
);

const ButtonsComponent = (props: DiscardFeedbackModalProps): JSX.Element => {
    const onDiscardPress = (): void => {
        props.disableFeedback();
        props.closeModal();
    };
    return (
        <View style={{ flexDirection: 'row-reverse'}}>
            <Button style={applicationStyles.whiteTealButton} onPress={props.closeModal}>
                <Text>Keep editing</Text>
            </Button>
            <Button style={applicationStyles.tealButton} onPress={onDiscardPress}>
                <Text>
                    Discard
                </Text>
            </Button>
        </View>
    );
};