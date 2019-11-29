import React from 'react';
import { Dimensions, Image } from 'react-native';
import Modal from 'react-native-modal';
import { View, Button, Text } from 'native-base';
import { Trans } from '@lingui/react';
import { textStyles, colors, values, applicationStyles } from '../../application/styles';
import { arrivalAdvisorGlyphLogo } from '../../application/images';

export interface NewTopicsModalProps {
    readonly isVisible: boolean;
}

export interface NewTopicsModalActions {
    readonly onModalButtonPress: () => void;
}

type Props = NewTopicsModalProps & NewTopicsModalActions;

const logoSize = Dimensions.get('screen').width / 7;

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

const ContentComponent = (): JSX.Element => {
    return (
        <View style={{ backgroundColor: colors.white }}>
            <Image
                source={arrivalAdvisorGlyphLogo}
                resizeMode={'contain'}
                style={{
                    width: logoSize,
                    height: logoSize,
                    marginVertical: 15,
                    alignSelf: 'center',
                }}
            />
            <View style={{ padding: 10 }}>
                <Text style={textStyles.headlineH2StyleBlackCenter}>
                    <Trans>Some new topics recommended based on your answers.</Trans>
                </Text>
            </View>
        </View>
    );
};

const ButtonComponent = (props: Props): JSX.Element => (
    <View
        style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 10,
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
                <Trans>OK</Trans>
            </Text>
        </Button>
    </View>
);
