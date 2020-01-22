import React, { useState, useEffect } from 'react';
import { TextInput, TouchableOpacity } from 'react-native';
import { View, Icon, Text } from 'native-base';
import { Trans, I18n } from '@lingui/react';
import { values, applicationStyles, colors } from '../../application/styles';
import { LatLong } from '../../validation/latlong/types';
import { debug, useTraceUpdate } from '../../helpers/debug';
import { ReactI18nRenderProp, ReactI18n } from '../../locale/types';
import { EmptyComponent } from '../empty_component/empty_component';
import { ClearInputButton } from './clear_input_button';

export interface Props {
    readonly currentRefinement: string;
    readonly location: string;
    readonly latLong: LatLong;
}

export interface Actions {
    readonly refine: (searchTerms: string) => string;
    readonly setLocation: (s: string) => void;
}

const renderMyLocationButton = (hideMyLocationButton: boolean, setLocation: Function): JSX.Element => {
    if (hideMyLocationButton) {
        return <EmptyComponent />;
    }
    const icon = <Icon
        type={'MaterialIcons'} name={'my-location'}
        style={{ color: colors.greyishBrown, fontSize: 16, marginRight: 8 }}
    />;

    const text = <Text style={{
        color: colors.greyishBrown,
        fontSize: 12,
        fontWeight: 'bold',
    }}><Trans>My Location</Trans></Text>;

    return (
        <TouchableOpacity
            style={applicationStyles.whiteButton}
            onPress={(): void => setLocation('Near My Location')}>
            {icon}{text}
        </TouchableOpacity>
    );
};



// tslint:disable:no-expression-statement
export const SearchInputComponent = (props: Props & Actions): JSX.Element => {
    useTraceUpdate('SearchInputComponent', props);
    const [locationInputField, setLocationInputField]: [string, (s: string) => void] = useState(props.location);
    // linter doesn't understand state hooks with booleans for some reason
    // tslint:disable-next-line:typedef
    const [hideMyLocationButton, setHideMyLocationButton] = useState(true);
    useEffect(() => {
        debug(`SearchInput Component useEffect with '${props.currentRefinement}'`);
        props.refine(props.currentRefinement);
    }, [props.latLong]);
    const buildTranslatedPlaceholder = (i18n: ReactI18n, placeholder: string): string => {
        const _ = i18n._.bind(i18n);
        return _(placeholder);
    };
    const clearSearch = (): string => props.refine('');
    const clearLocation = (): void => {
        setLocationInputField('');
        props.setLocation('');
    };
    const getOpacity = (input: string): number => input === '' ? .6 : 1;

    return <I18n>
        {(i18nRenderProp: ReactI18nRenderProp): JSX.Element => (

            <View style={{ padding: 10, backgroundColor: colors.teal }}>
                <TouchableOpacity style={applicationStyles.searchContainer}>
                    <InputIcon name='search' />
                    <TextInput
                        style={[applicationStyles.searchInput, { opacity: getOpacity(props.currentRefinement) }]}
                        onChangeText={(d: string): void => {
                            debug(`SearchInputComponent search text changed to '${d}'`);
                            props.refine(d);
                        }}
                        value={props.currentRefinement}
                        placeholder={buildTranslatedPlaceholder(i18nRenderProp.i18n, 'Search for services')} // TODO translate
                        placeholderTextColor={colors.greyishBrown}
                        selectionColor={colors.black}
                    />
                    <ClearInputButton visible={props.currentRefinement !== ''} onPress={clearSearch} />
                </TouchableOpacity>
                <TouchableOpacity style={applicationStyles.searchContainer}>
                    <InputIcon name='location-on' />
                    <TextInput
                        style={[applicationStyles.searchInput, { opacity: getOpacity(locationInputField) }]}
                        onChangeText={(d: string): void => {
                            debug(`SearchInputComponent location text changed to '${d}'`);
                            setLocationInputField(d);
                        }}
                        onFocus={(): void => setHideMyLocationButton(false)}
                        onBlur={(): void => setHideMyLocationButton(true)}
                        value={locationInputField}
                        placeholder={buildTranslatedPlaceholder(i18nRenderProp.i18n, 'Enter city, address, or postal code')} // TODO translate
                        placeholderTextColor={colors.greyishBrown}
                        selectionColor={colors.black}
                    />
                    <ClearInputButton visible={locationInputField !== ''} onPress={clearLocation} />
                </TouchableOpacity>
                {renderMyLocationButton(hideMyLocationButton, props.setLocation)}
            </View >
        )}

    </I18n>;
};

interface IconProps {
    readonly name: string;
}

const InputIcon = ({ name }: IconProps): JSX.Element => (
    <View style={{ width: 48 }}>
        <Icon name={name}
            type='MaterialIcons'
            style={{ color: colors.teal, fontSize: values.mediumIconSize, paddingLeft: 12 }}
        />
    </View>
);

export const extractSearchStrings = (): JSX.Element => (
    <div>
        <Text><Trans>Search for services</Trans></Text>
        <Text>
            <Trans>Enter city, address, or postal code</Trans>
        </Text>
    </div>
);
