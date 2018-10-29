import React from 'react';
import { Trans } from '@lingui/react';
import { TouchableOpacity, Dimensions, Image } from 'react-native';
import { Text, View, Button } from 'native-base';
import { applicationStyles, colors, values, textStyles } from '../../application/styles';

export enum PersonalizePocketStates {
    Open,
    Closed,
}

export interface PersonalizePocketProps {
    readonly pocketState: PersonalizePocketStates;
}

export interface PersonalizePocketActions {
    readonly onPocketPress: () => void;
    readonly onPocketButtonPress: () => void;
}

type Props = PersonalizePocketProps & PersonalizePocketActions;

// tslint:disable-next-line:no-var-requires
const patLogo = require('../../../assets/images/pat.png');

export const PersonalizePocketComponent: React.StatelessComponent<Props> = (props: Props): JSX.Element => (
    <TouchableOpacity
        onPress={props.onPocketPress}
        style={{
            backgroundColor: colors.white,
            borderBottomLeftRadius: values.roundedBorderRadius,
            borderBottomRightRadius: values.roundedBorderRadius,
        }}
    >
        {props.pocketState === PersonalizePocketStates.Open ? getOpenPocket(props) : getClosedPocket()}
    </TouchableOpacity>
);

const getOpenPocket = (props: Props): JSX.Element => {
    const patLogoWidthAndHeight = Dimensions.get('screen').width / 5;
    return (
        <View style={{ alignItems: 'center', paddingHorizontal: 30, marginVertical: 20 }}>
            <Image
                source={patLogo}
                resizeMode={'contain'}
                style={{
                    width: patLogoWidthAndHeight,
                    height: patLogoWidthAndHeight,
                }}
            />
            <Text style={textStyles.headlineH5StyleBlackCenter}>
                <Trans>PERSONALIZE MY PLAN</Trans>
            </Text>
            <Button
                full
                onPress={props.onPocketButtonPress}
                style={[
                    applicationStyles.orangeButton,
                    {
                        marginTop: 10,
                    },
                ]}
            >
                <Text style={textStyles.button}>
                    <Trans>Start</Trans>
                </Text>
            </Button>
        </View>
    );
};

const getClosedPocket = (): JSX.Element => {
    const patLogoWidthAndHeight = Dimensions.get('screen').width / 9;
    return (
        <View style={{ alignItems: 'center', padding: 2 }}>
            <Image
                source={patLogo}
                resizeMode={'contain'}
                style={{
                    width: patLogoWidthAndHeight,
                    height: patLogoWidthAndHeight,
                }}
            />
        </View>
    );
};
