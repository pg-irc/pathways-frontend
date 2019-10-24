import React, { useEffect } from 'react';
import { View, Icon, Text } from 'native-base';
import { I18n } from '@lingui/react';
import { values, applicationStyles, colors } from '../../application/styles';
import { LatLong } from '../../validation/geocoder/types';
import { debug, useTraceUpdate } from '../../helpers/debug';
import { InputFormSeparator } from './separators';
import { ReactI18nRenderProp } from '../../locale/types';
import { TouchableOpacity } from 'react-native';

export interface Props {
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

    return <I18n>{(reactI18nRenderProp: ReactI18nRenderProp): JSX.Element => {
        const _ = reactI18nRenderProp.i18n._.bind(reactI18nRenderProp.i18n);

        return <View style={{ paddingHorizontal: 20, paddingBottom: 20, backgroundColor: colors.teal }}>
            <SearchTextInput
                iconName={'search'}
                value={props.currentRefinement}
                localizedPlaceholder={_('Search for services')}
                onPress={props.openSearchTermInput} />
            <InputFormSeparator />
            <SearchTextInput
                iconName={'map-marker'}
                value={props.location}
                localizedPlaceholder={_('Near My location')}
                onPress={props.openLocationInput} />
            <InputFormSeparator />
        </View >;
    }}
    </I18n>;
};

interface SearchTextInputProps {
    readonly iconName: string;
    readonly value: string;
    readonly localizedPlaceholder: string;
    // tslint:disable-next-line:no-mixed-interface
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
