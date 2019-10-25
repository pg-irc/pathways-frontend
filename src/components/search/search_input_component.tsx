import React, { useEffect } from 'react';
import { View, Icon, Text } from 'native-base';
import { values, applicationStyles, colors } from '../../application/styles';
import { LatLong } from '../../validation/latlong/types';
import { debug, useTraceUpdate } from '../../helpers/debug';
import { InputFormSeparator } from './separators';
import { TouchableOpacity } from 'react-native';
import { USE_MY_LOCATION } from './constants';

export interface Props {
    readonly searchTermPlaceHolder: string;
    readonly locationPlaceHolder: string;
    readonly nearMyLocationPlaceHolder: string;
    readonly currentRefinement: string;
    readonly location: string;
    readonly latLong: LatLong;
}

export interface Actions {
    readonly refine: (searchTerms: string) => string;
    readonly setLocation: (s: string) => void;
    readonly openSearchTermInput: () => void;
    readonly openLocationInput: () => void;
}

// tslint:disable:no-expression-statement
export const SearchInputComponent = (props: Props & Actions): JSX.Element => {
    useTraceUpdate('SearchInputComponent', props);
    useEffect(() => {
        debug(`SearchInput Component useEffect with '${props.currentRefinement}'`);
        props.refine(props.currentRefinement);
    }, [props.latLong]);

    const location = props.location === USE_MY_LOCATION ? props.nearMyLocationPlaceHolder : props.location;

    return <View style={{ paddingHorizontal: 20, paddingBottom: 20, backgroundColor: colors.teal }}>
        <SearchTextInput
            iconName={'search'}
            value={props.currentRefinement}
            localizedPlaceholder={props.searchTermPlaceHolder}
            onPress={props.openSearchTermInput} />
        <InputFormSeparator />
        <SearchTextInput
            iconName={'map-marker'}
            value={location}
            localizedPlaceholder={props.locationPlaceHolder}
            onPress={props.openLocationInput} />
        <InputFormSeparator />
    </View >;
};

interface SearchTextInputProps {
    readonly iconName: string;
    readonly value: string;
    readonly localizedPlaceholder: string;
    readonly onPress: () => void;
}

const SearchTextInput = (props: SearchTextInputProps): JSX.Element => {
    return <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={props.onPress}>
        <Icon
            name={props.iconName}
            type='FontAwesome'
            style={{ color: colors.white, fontSize: values.smallIconSize, flex: .1, marginHorizontal: 3 }}
        />
        <Text style={applicationStyles.searchInput} >
            {props.value || props.localizedPlaceholder}
        </Text>
    </TouchableOpacity>;
};
