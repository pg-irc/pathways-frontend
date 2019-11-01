import React, { useState, useEffect } from 'react';
import { TextInput } from 'react-native';
import { View, Icon } from 'native-base';
import { I18n } from '@lingui/react';
import { values, applicationStyles, colors } from '../../application/styles';
import { LatLong } from '../../validation/geocoder/types';
import { debug, useTraceUpdate } from '../../helpers/debug';
import { InputFormSeparator } from './separators';
import { ReactI18nRenderProp } from '../../locale/types';

export interface Props {
    readonly currentRefinement: string;
    readonly location: string;
    readonly latLong: LatLong;
}

export interface Actions {
    readonly refine: (searchTerms: string) => string;
    readonly setLocation: (s: string) => void;
}

// tslint:disable:no-expression-statement
export const SearchInputComponent = (props: Props & Actions): JSX.Element => {
    useTraceUpdate('SearchInputComponent', props);
    const [location, setLocation]: [string, (s: string) => void] = useState(props.location);
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
                onChangeText={(d: string): void => {
                    debug(`SearchInputComponent search text changed to '${d}'`);
                    props.refine(d);
                }} />
            <InputFormSeparator />
            <SearchTextInput
                iconName={'map-marker'}
                value={location}
                localizedPlaceholder={_('Near My location')}
                onChangeText={(d: string): void => {
                    debug(`SearchInputComponent location text changed to '${d}'`);
                    setLocation(d);
                }}
                onEndEditing={props.setLocation} />
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
    readonly onChangeText: (s: string) => void;
    readonly onEndEditing?: (s: string) => void;
}

const SearchTextInput = (props: SearchTextInputProps): JSX.Element => {
    const onEndEditing = props.onEndEditing ? (): void => props.onEndEditing(props.value) : undefined;
    return <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Icon
            name={props.iconName}
            type='FontAwesome'
            style={{ color: colors.white, fontSize: values.smallIconSize, flex: .1, marginHorizontal: 3 }}
        />
        <TextInput
            style={applicationStyles.searchInput}
            onChangeText={props.onChangeText}
            value={props.value}
            onEndEditing={onEndEditing}
            placeholder={props.localizedPlaceholder}
            placeholderTextColor={colors.white}
        />
    </View>;
};
