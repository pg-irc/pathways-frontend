import React from 'react';
import { Trans } from '@lingui/react';
import { TouchableOpacity } from 'react-native';
import { Text, View, Button, Icon } from 'native-base';
import { applicationStyles, colors, values } from '../../application/styles';

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

const getOpenPocket = (props: Props): JSX.Element => (
    <View style={{ paddingHorizontal: 30, alignItems: 'center' }}>
        <Icon name='user' type='FontAwesome' style={{ marginTop: 15, marginBottom: 5 }}/>
        <Text style={{
            color: colors.black,
            fontSize: values.smallTextSize,
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: 15,
        }}>
            <Trans>PERSONALIZE MY PLAN</Trans>
        </Text>
        <Button
            full
            onPress={props.onPocketButtonPress}
            style={[applicationStyles.roundedButton, { marginBottom: 15 } ]}
        >
            <Text style={{ fontWeight: 'bold', color: colors.white }}>
                <Trans>Start</Trans>
            </Text>
        </Button>
    </View>
);

const getClosedPocket = (): JSX.Element => (
    <View style={{
        backgroundColor: colors.topaz,
        alignItems: 'center',
        borderBottomLeftRadius: values.roundedBorderRadius,
        borderBottomRightRadius: values.roundedBorderRadius,
    }}>
        <Icon
            name='user'
            type='FontAwesome'
            style={{
                fontSize: values.smallerIconSize,
                padding: 3,
                color: colors.white,
            }}
        />
    </View>
);
