import React from 'react';
import { View, Icon, Text } from 'native-base';
import { values, applicationStyles, colors } from '../../application/styles';
import { LatLong } from '../../validation/latlong/types';
import { InputFormSeparator } from './separators';
import { Trans } from '@lingui/react';
import { TouchableOpacity } from 'react-native';
import { USE_MY_LOCATION } from './constants';

interface Props {
    readonly searchTerm: string;
    readonly searchTermPlaceHolder: string;
    readonly locationPlaceHolder: string;
    readonly location: string;
    readonly latLong: LatLong;
    readonly setLocation: (location: string) => void;
    readonly openSearchTermInput: () => void;
    readonly openLocationInput: () => void;
}

export const SearchTermAndLocationComponent = (props: Props): JSX.Element => (
    <View style={{ paddingHorizontal: 20, paddingBottom: 20, backgroundColor: colors.teal }}>
        <SearchStringComponent
            value={props.searchTerm}
            localizedPlaceholder={props.searchTermPlaceHolder}
            iconName={'search'}
            renderText={renderSearchTerm}
            onPress={props.openSearchTermInput} />
        <InputFormSeparator />
        <SearchStringComponent
            value={props.location}
            localizedPlaceholder={props.locationPlaceHolder}
            iconName={'map-marker'}
            renderText={renderLocation}
            onPress={props.openLocationInput} />
        <InputFormSeparator />
    </View >
);

const regular = applicationStyles.searchInput;
const bold = applicationStyles.searchInputBold;

const renderSearchTerm = (value: string, placeholder: string): JSX.Element => {
    if (value === '') {
        return <Text style={regular}>{placeholder}</Text >;
    }
    return <Text style={bold}>{value}</Text >;
};

const renderLocation = (value: string, placeholder: string): JSX.Element => {
    if (value === '') {
        return <Text style={regular}>{placeholder}</Text >;
    }
    if (value === USE_MY_LOCATION) {
        return <Text style={regular}><Trans>Near <Text style={bold}>My location</Text></Trans></Text >;
    }
    return <Text style={bold}>{value}</Text >;
};

interface SearchStringComponentProps {
    readonly iconName: string;
    readonly value: string;
    readonly localizedPlaceholder: string;
    readonly onPress: () => void;
    readonly renderText: (value: string, placeholder: string) => JSX.Element;
}

const SearchStringComponent = (props: SearchStringComponentProps): JSX.Element => (
    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={props.onPress}>
        <Icon
            name={props.iconName}
            type='FontAwesome'
            style={{ color: colors.white, fontSize: values.smallIconSize, flex: .1, marginHorizontal: 3 }}
        />
        {props.renderText(props.value, props.localizedPlaceholder)}
    </TouchableOpacity>
);
