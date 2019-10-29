import React from 'react';
import { View, Icon, Text } from 'native-base';
import { values, applicationStyles, colors } from '../../application/styles';
import { LatLong } from '../../validation/latlong/types';
import { InputFormSeparator } from './separators';
import { TouchableOpacity } from 'react-native';
import { USE_MY_LOCATION } from './constants';

interface Props {
    readonly searchTerm: string;
    readonly searchTermPlaceHolder: string;
    readonly locationPlaceHolder: string;
    readonly nearMyLocationPlaceHolder: string;
    readonly location: string;
    readonly latLong: LatLong;
    readonly setLocation: (location: string) => void;
    readonly openSearchTermInput: () => void;
    readonly openLocationInput: () => void;
}

export const SearchTermAndLocationComponent = (props: Props): JSX.Element => (
    <View style={{ paddingHorizontal: 20, paddingBottom: 20, backgroundColor: colors.teal }}>
        <SearchStringComponent
            iconName={'search'}
            value={props.searchTerm}
            localizedPlaceholder={props.searchTermPlaceHolder}
            onPress={props.openSearchTermInput} />
        <InputFormSeparator />
        <SearchStringComponent
            iconName={'map-marker'}
            value={locationStringOrPlaceholder(props)}
            localizedPlaceholder={props.locationPlaceHolder}
            onPress={props.openLocationInput} />
        <InputFormSeparator />
    </View >
);

const locationStringOrPlaceholder = (props: Props): string => (
    props.location === USE_MY_LOCATION ? props.nearMyLocationPlaceHolder : props.location
);

interface SearchStringComponentProps {
    readonly iconName: string;
    readonly value: string;
    readonly localizedPlaceholder: string;
    readonly onPress: () => void;
}

const SearchStringComponent = (props: SearchStringComponentProps): JSX.Element => (
    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={props.onPress}>
        <Icon
            name={props.iconName}
            type='FontAwesome'
            style={{ color: colors.white, fontSize: values.smallIconSize, flex: .1, marginHorizontal: 3 }}
        />
        <Text style={applicationStyles.searchInput} >
            {props.value || props.localizedPlaceholder}
        </Text>
    </TouchableOpacity>
);
