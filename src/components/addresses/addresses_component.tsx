import React from 'react';
import { View, Text } from 'react-native';
import { Trans } from '@lingui/react';
import { Icon } from 'native-base';
import { mapWithIndex } from '../../application/map_with_index';
import { Address } from '../../validation/services/types';
import { CardButtonComponent, CardButtonProps } from '../card_button/card_button_component';
import { DividerComponent } from '../content_layout/divider_component';
import { colors, values, textStyles } from '../../application/styles';

interface Props {
    readonly addresses: ReadonlyArray<Address>;
    readonly linkContextForAnalytics: string;
    readonly currentPathForAnalytics: string;
    readonly onPressForAddress: (address: Address) => () => Promise<void>;
}

export const AddressesComponent = (props: Props): JSX.Element => (
    <View>
        {mapWithIndex((address: Address, index: number) =>
            <View key={index}>
                <CardButtonComponent {...buildCardButtonProps(address, props)} />
                <DividerComponent />
            </View>
        , props.addresses)}
    </View>
);

export const SingleAddressComponent = (props: {readonly address: Address}): JSX.Element => (
    <View>
        <Text style={textStyles.paragraphBoldBlackLeft}><Trans>Address</Trans>: </Text>
        <Text style={textStyles.paragraphStyle}>{props.address.address}</Text>
        <Text style={textStyles.paragraphStyle}>
            {props.address.city} {props.address.stateProvince} {props.address.postalCode}
        </Text>
    </View>
);

const buildCardButtonProps = (address: Address, props: Props): CardButtonProps => {
    const leftContent = <SingleAddressComponent address={address} />;
    const rightContent = (
        <Icon
            name={'location-arrow'}
            type={'FontAwesome'}
            style={{ color: colors.teal, fontSize: values.smallIconSize, paddingRight: 10 }}
        />
    );
    const onPress = props.onPressForAddress ?
        props.onPressForAddress(address) : (): undefined => undefined;

    return { leftContent, rightContent, onPress };
}
