import React, { useState, useEffect } from 'react';
import { TextInput, TouchableOpacity } from 'react-native';
import { View, Icon, Text } from 'native-base';
import { Trans, I18n } from '@lingui/react';
import { values, applicationStyles, colors, getNormalFontFamily } from '../../application/styles';
import { LatLong } from '../../validation/latlong/types';
import { debug, useTraceUpdate } from '../../helpers/debug';
import { ReactI18nRenderProp, ReactI18n } from '../../locale/types';
import { EmptyComponent } from '../empty_component/empty_component';
import { ClearInputButton } from './clear_input_button';

export interface Props {
    readonly currentRefinement: string;
    readonly latLong: LatLong;
    readonly searchTerm: string;
    readonly location: string;
}

export interface Actions {
    readonly refine: (searchTerms: string) => string;
    readonly saveSearchTerm: (s: string) => void;
    readonly setLocation: (s: string) => void;
}

const renderMyLocationButton = (showMyLocationButton: boolean, saveLocation: Function): JSX.Element => {
    if (!showMyLocationButton) {
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
        fontFamily: getNormalFontFamily(),
    }}><Trans>My Location</Trans></Text>;

    return (
        <TouchableOpacity
            style={[applicationStyles.searchButton, { backgroundColor: colors.white }]}
            onPress={(): void => saveLocation('Near My Location')}>
            {icon}{text}
        </TouchableOpacity>
    );
};

const renderSearchButton = (showSearchButton: boolean, searchTerm: string, location: string,
    setSearchTerm: Function, setSearchLocation: Function): JSX.Element => {

    if (!showSearchButton) {
        return <EmptyComponent />;
    }

    const icon = <Icon
        type={'MaterialIcons'} name={'search'}
        style={{ color: colors.white, fontSize: values.smallIconSize, marginRight: 8 }}
    />;

    const text = <Text style={{
        color: colors.white,
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: getNormalFontFamily(),
    }}>Search</Text>;

    return (
        <TouchableOpacity
            style={[applicationStyles.searchButton, { backgroundColor: colors.lightTeal }]}
            onPress={(): void => {
                setSearchTerm(searchTerm);
                setSearchLocation(location);
            }}>
            {icon}{text}
        </TouchableOpacity>
    );
};

// tslint:disable:no-expression-statement
export const SearchInputComponent = (props: Props & Actions): JSX.Element => {
    useTraceUpdate('SearchInputComponent', props);
    const [locationInputField, setLocationInputField]: readonly [string, (s: string) => void] = useState(props.location);
    const [searchInputField, setSearchInputField]: readonly [string, (s: string) => void] = useState(props.searchTerm);
    // linter doesn't understand state hooks with booleans for some reason
    // tslint:disable-next-line:typedef
    const [showMyLocationButton, setShowMyLocationButton] = useState(false);
    // tslint:disable-next-line:typedef
    const [showSearchButton, setShowSearchButton] = useState(false);
    useEffect(() => {
        debug(`SearchInput Component useEffect with '${props.searchTerm}'`);
        props.refine(props.searchTerm);
        setShowSearchButton(false);
    }, [props.latLong]);
    const buildTranslatedPlaceholder = (i18n: ReactI18n, placeholder: string): string => {
        const _ = i18n._.bind(i18n);
        return _(placeholder);
    };
    const clearSearch = (): void => setSearchInputField('');
    const clearLocation = (): void => setLocationInputField('');

    const getOpacity = (input: string): number => input === '' ? .6 : 1;

    return <I18n>
        {(i18nRenderProp: ReactI18nRenderProp): JSX.Element => (

            <View style={{ padding: 4, backgroundColor: colors.teal }}>
                <TouchableOpacity style={applicationStyles.searchContainer}>
                    <InputIcon name='search' />
                    <TextInput
                        style={[applicationStyles.searchInput, { opacity: getOpacity(searchInputField) }]}
                        onChangeText={(d: string): void => {
                            debug(`SearchInputComponent search text changed to '${d}'`);
                            setSearchInputField(d);
                        }}
                        onFocus={(): void => setShowSearchButton(true)}
                        value={searchInputField}
                        placeholder={buildTranslatedPlaceholder(i18nRenderProp.i18n, 'Search for services')} // TODO translate
                        placeholderTextColor={colors.greyishBrown}
                        selectionColor={colors.black}
                    />
                    <ClearInputButton visible={searchInputField !== ''} onPress={clearSearch} />
                </TouchableOpacity>
                <TouchableOpacity style={applicationStyles.searchContainer}>
                    <InputIcon name='location-on' />
                    <TextInput
                        style={[applicationStyles.searchInput, { opacity: getOpacity(locationInputField) }]}
                        onChangeText={(d: string): void => {
                            debug(`SearchInputComponent location text changed to '${d}'`);
                            setLocationInputField(d);
                        }}
                        onFocus={(): void => {
                            setShowMyLocationButton(true);
                            setShowSearchButton(true);
                        }}
                        onBlur={(): void => setShowMyLocationButton(false)}
                        value={locationInputField}
                        placeholder={buildTranslatedPlaceholder(i18nRenderProp.i18n, 'Enter city, address, or postal code')} // TODO translate
                        placeholderTextColor={colors.greyishBrown}
                        selectionColor={colors.black}
                    />
                    <ClearInputButton visible={locationInputField !== ''} onPress={clearLocation} />
                </TouchableOpacity>
                <View style={{ flexDirection: 'row-reverse', display: 'flex', justifyContent: 'space-between', margin: 4 }}>
                    {renderSearchButton(showSearchButton, searchInputField, locationInputField, props.saveSearchTerm, props.setLocation)}
                    {renderMyLocationButton(showMyLocationButton, setLocationInputField)}
                </View>
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
        <Text><Trans>My Location</Trans></Text>
    </div>
);
