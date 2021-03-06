import React from 'react';
import { Text } from 'react-native';
import { Trans } from '@lingui/react';
import { colors, textStyles, applicationStyles } from '../../application/styles';
import { View } from 'native-base';
import Modal from 'react-native-modal';
import { MultiLineButtonComponent } from '../mutiline_button/multiline_button_component';

interface Props {
    readonly onKeepEditingPress: () => void;
    readonly onDiscardPress: () => void;
    readonly isVisible: boolean;
}

export const DiscardChangesModal = (props: Props): JSX.Element => (
    <Modal isVisible={props.isVisible} backdropTransitionOutTiming={0}>
        <View style={{ backgroundColor: colors.white, borderRadius: 15, padding: 20 }}>
            <PromptText />
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                <KeepEditingButton onKeepEditingPress={props.onKeepEditingPress} />
                <DiscardButton onDiscardPress={props.onDiscardPress} />
            </View>
        </View>
    </Modal>
);

const PromptText = (): JSX.Element => (
    <Text style={[textStyles.paragraphStyleBrown, { marginBottom: 20 }]}>
        <Trans>Discard the changes you suggested?</Trans>
    </Text>
);

const KeepEditingButton = (props: { readonly onKeepEditingPress: () => void }): JSX.Element => (
    <MultiLineButtonComponent
        onPress={props.onKeepEditingPress}
        style={[applicationStyles.whiteTealButton, { paddingVertical: 10, paddingHorizontal: 15, marginRight: 5 }]}
    >
        <Text style={textStyles.whiteTealButton}>
            <Trans>Keep editing</Trans>
        </Text>
    </MultiLineButtonComponent>
);

const DiscardButton = (props: { readonly onDiscardPress: () => void }): JSX.Element => (
    <MultiLineButtonComponent
        onPress={props.onDiscardPress}
        style={[applicationStyles.tealButton, { paddingVertical: 12, paddingHorizontal: 17,  marginLeft: 5 }]}
    >
        <Text style={textStyles.tealButton}>
            <Trans>Discard</Trans>
        </Text>
    </MultiLineButtonComponent>
);
