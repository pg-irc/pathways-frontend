import React from 'react';
import Modal from 'react-native-modal';
import { View, Button, Text, Icon } from 'native-base';
import { Trans } from '@lingui/react';
import { textStyles, colors, values, applicationStyles } from '../../application/styles';

export interface NewTopicsModalProps {
    readonly isVisible: boolean;
}

export interface NewTopicsModalActions {
    readonly onModalButtonPress: () => void;
}

type Props = NewTopicsModalProps & NewTopicsModalActions;

export const NewTopicsModalComponent: React.StatelessComponent<Props> = (props: Props): JSX.Element => (
    <Modal isVisible={props.isVisible}>
        <View
            padder
            style={{
                backgroundColor: colors.white,
                borderRadius: values.lessRoundedBorderRadius,
            }}
        >
            <ContentComponent />
            <ButtonComponent {...props} />
        </View>
    </Modal>
);

const ContentComponent = (): JSX.Element => (
    <View style={{ backgroundColor: colors.white }}>
        <Icon
            style={{
                fontSize: values.heroIconSize,
                color: colors.lightTeal,
                marginVertical: 15,
                alignSelf: 'center',
            }}
            name={'check-decagram'}
            type={'MaterialCommunityIcons'}
        />
        <View style={{ padding: 10 }}>
            <Text style={textStyles.headlineH2StyleBlackCenter}>
                <Trans>New topics have been recommended based on your answers!</Trans>
            </Text>
        </View>
    </View>
);

const ButtonComponent = (props: Props): JSX.Element => (
    <View
        style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginVertical: 15,
        }}
    >
        <Button
            style={[
                applicationStyles.tealButton,
                applicationStyles.boxShadowBelow,
                { paddingHorizontal: 20 },
            ]}
            onPress={props.onModalButtonPress}
        >
            <Text style={textStyles.button}>
                <Trans>See recommendations</Trans>
            </Text>
        </Button>
    </View>
);
