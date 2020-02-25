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
        <View padder style={{ backgroundColor: colors.white, borderRadius: 15 }}>
            <HeaderComponent />
            <ButtonsComponent {...props} />
        </View>
    </Modal>
);

const HeaderComponent = (): JSX.Element => (
        <Text style={[textStyles.headlineH4StyleBlackLeft, { margin: 20, color: colors.greyishBrown }]}>
            <Trans>Discard the change you suggested?</Trans>
        </Text>
);

const ButtonsComponent = (props: DiscardFeedbackModalProps): JSX.Element => {
    const onDiscardPress = (): void => {
        props.disableFeedback();
        props.closeModal();
    };
    return (
        <View style={{ flexDirection: 'row-reverse', marginBottom: 20, marginTop: 10, marginHorizontal: 20 }}>
            <Button style={[applicationStyles.tealButton, { marginHorizontal: 5 }]} onPress={onDiscardPress}>
                <Text style={textStyles.tealButton}>
                    Discard
                </Text>
            </Button>
            <Button style={applicationStyles.whiteTealButton} onPress={props.closeModal}>
                <Text style={textStyles.whiteTealButton}>Keep editing</Text>
            </Button>
        </View>
    );
};