import React from 'react';
import Modal from 'react-native-modal';
import { View, Text, Button } from 'native-base';
import { colors, textStyles, applicationStyles } from '../../application/styles';
import { Trans } from '@lingui/react';
import { FeedbackModalProps } from '../feedback/feedback_options_modal_component';

export const DiscardFeedbackModal = (props: FeedbackModalProps): JSX.Element => (
    <Modal
        isVisible={props.isVisible}
    >
        <View padder style={{backgroundColor: colors.white, borderRadius: 10}}>
            <HeaderComponent />
            <ButtonsComponent />
        </View>
    </Modal>
);

const HeaderComponent = (): JSX.Element => (
        <Text style={textStyles.headlineH4StyleBlackLeft}>
            <Trans>Discard the change suggested?</Trans>
        </Text>
);

const ButtonsComponent = (): JSX.Element => (
    <View style={{ flexDirection: 'row-reverse'}}>
        <Button style={applicationStyles.whiteTealButton}>
            <Text>Keep editing</Text>
        </Button>
        <Button style={applicationStyles.tealButton}>
            <Text>
                Discard
            </Text>
        </Button>
    </View>
);