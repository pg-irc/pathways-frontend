import React from 'react';
import { Trans } from '@lingui/react';
import { TouchableOpacity, Dimensions, Image } from 'react-native';
import { Text, View, Button } from 'native-base';
import { applicationStyles, colors, values, textStyles } from '../../application/styles';
import { patLogo } from '../../application/images';

export interface QuestionnairePocketProps {
    readonly isOpen: boolean;
}

export interface QuestionnairePocketActions {
    readonly onPocketPress: () => void;
    readonly onPocketButtonPress: () => void;
}

type Props = QuestionnairePocketProps & QuestionnairePocketActions;

export const QuestionnairePocketComponent: React.StatelessComponent<Props> = (props: Props): JSX.Element => (
    <TouchableOpacity
        onPress={props.onPocketPress}
        style={{
            backgroundColor: colors.white,
            borderBottomLeftRadius: values.roundedBorderRadius,
            borderBottomRightRadius: values.roundedBorderRadius,
        }}
    >
        {props.isOpen ? getOpenPocket(props) : getClosedPocket()}
    </TouchableOpacity>
);

const getOpenPocket = (props: Props): JSX.Element => {
    const patLogoWidthAndHeight = getLargePatLogoSize();
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
    const patLogoWidthAndHeight = getSmallPatLogoSize();
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

const getSmallPatLogoSize = (): number => Dimensions.get('screen').width / 9;

const getLargePatLogoSize = (): number => Dimensions.get('screen').width / 5;