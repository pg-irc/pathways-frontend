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
    readonly latLong: LatLong;
    readonly searchTerm: string;
    readonly location: string;
}

export interface Actions {
    readonly refine: (searchTerms: string) => string;
    readonly saveSearchTerm: (s: string) => void;
    readonly setLocation: (s: string) => void;
}

const renderMyLocationButton = (hideMyLocationButton: boolean, saveLocation: Function): JSX.Element => {
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
            onPress={(): void => saveLocation('Near My Location')}>
            {icon}{text}
        </TouchableOpacity>
    );
};

const renderSearchButton = (searchTerm: string, location: string, saveSearchTerm: Function, saveLocation: Function): JSX.Element => {

    return (
        <TouchableOpacity
            style={{
                backgroundColor: colors.lightTeal,
                borderRadius: values.roundedBorderRadius,
                alignSelf: 'flex-start',
                flexDirection: 'row',
            }}
            onPress={(): void => {
                saveSearchTerm(searchTerm);
                saveLocation(location);
            }}>
            <Icon
                type={'MaterialIcons'} name={'search'}
                style={{ color: colors.white, fontSize: 20, margin: 10 }}
            />
            <Text style={{
                color: colors.white,
                fontSize: 16,
                marginVertical: 10,
                marginRight: 16,
                fontWeight: 'bold',
            }}>Search</Text>
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
    const [hideMyLocationButton, setHideMyLocationButton] = useState(true);
    useEffect(() => {
        debug(`SearchInput Component useEffect with '${props.searchTerm}'`);
        props.refine(props.searchTerm);
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

            <View style={{ padding: 10, backgroundColor: colors.teal }}>
                <TouchableOpacity style={applicationStyles.searchContainer}>
                    <InputIcon name='search' />
                    <TextInput
                        style={[applicationStyles.searchInput, { opacity: getOpacity(searchInputField) }]}
                        onChangeText={(d: string): void => {
                            debug(`SearchInputComponent search text changed to '${d}'`);
                            setSearchInputField(d);
                        }}
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
                        onFocus={(): void => setHideMyLocationButton(false)}
                        onBlur={(): void => setHideMyLocationButton(true)}
                        value={locationInputField}
                        placeholder={buildTranslatedPlaceholder(i18nRenderProp.i18n, 'Enter city, address, or postal code')} // TODO translate
                        placeholderTextColor={colors.greyishBrown}
                        selectionColor={colors.black}
                    />
                    <ClearInputButton visible={locationInputField !== ''} onPress={clearLocation} />
                </TouchableOpacity>
                <View style={{ flexDirection: 'row-reverse', display: 'flex', justifyContent: 'space-between', margin: 6 }}>
                    {renderSearchButton(searchInputField, locationInputField, props.saveSearchTerm, props.setLocation)}
                    {renderMyLocationButton(hideMyLocationButton, setLocationInputField)}
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
