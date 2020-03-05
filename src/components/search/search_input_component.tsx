// tslint:disable: no-expression-statement

import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { TextInput, TouchableOpacity } from 'react-native';
import { View, Icon, Text } from 'native-base';
import { Trans, I18n } from '@lingui/react';
import { values, applicationStyles, colors, textStyles } from '../../application/styles';
import { LatLong } from '../../validation/latlong/types';
import { debug, useTraceUpdate } from '../../helpers/debug';
import { ReactI18nRenderProp, ReactI18n } from '../../locale/types';
import { ClearInputButton } from './clear_input_button';
import * as IntentLauncher from 'expo-intent-launcher';
import * as Permissions from 'expo-permissions';
import { isAndroid } from '../../helpers/is_android';
import { openURL } from '../link/link';
import { MY_LOCATION } from '../../application/constants';

export interface SearchProps {
    readonly currentRefinement: string;
    readonly latLong: LatLong;
    readonly searchTerm: string;
    readonly location: string;
    readonly isSearchInputCollapsed: boolean;
}

export interface SearchActions {
    readonly refine: (searchTerms: string) => string;
    readonly saveSearchTerm: (s: string) => void;
    readonly setLocation: (s: string) => void;
    readonly setIsSearchInputCollapsed: (b: boolean) => void;
}

interface SearchInputProps {
    readonly searchInputField: string;
    readonly locationInputField: string;
    readonly setSearchInputField: (s: string) => void;
    readonly setLocationInputField: (s: string) => void;
}

interface IconProps {
    readonly name: string;
}

type Props = SearchProps & SearchActions & SearchInputProps;

export type SetShowMyLocationButton = Dispatch<SetStateAction<boolean>>;

export type SetShowSearchButton = Dispatch<SetStateAction<boolean>>;

export const SearchInputComponent = (props: SearchProps & SearchActions): JSX.Element => {
    useTraceUpdate('SearchInputComponent', props);
    const [locationInputField, setLocationInputField]: readonly [string, (s: string) => void] = useState(props.location);
    const [searchInputField, setSearchInputField]: readonly [string, (s: string) => void] = useState(props.searchTerm);
    const searchProps = { ...props, searchInputField, locationInputField, setSearchInputField, setLocationInputField };

    useEffect((): void => {
        debug(`SearchInput Component useEffect with '${props.searchTerm}'`);
        props.refine(props.searchTerm);
    }, [props.latLong]);

    if (props.isSearchInputCollapsed) {
        return (
            <View>
                {collapsedInput(searchProps)}
            </View>
        );
    }
    return (
        <View>
            {expandedInput(searchProps)}
        </View>
    );
};

const buildTranslatedString = (i18n: ReactI18n, placeholder: string): string => {
    const _ = i18n._.bind(i18n);
    return _(placeholder);
};

const combineSearchInputs = (searchInput: string, locationInput: string, i18nRenderProp: ReactI18nRenderProp): string => {
    if (searchInput === '') {
        return '';
    }
    if (locationInput === '') {
        return searchInput;
    }
    if (locationInput === MY_LOCATION) {
        return searchInput + ' ' + buildTranslatedString(i18nRenderProp.i18n, 'near ' + MY_LOCATION);
    }
    return searchInput + ' near ' + locationInput;
};

const collapsedInput = (props: Props): JSX.Element => {
    const clearSearch = (): void => {
        props.saveSearchTerm('');
        props.setLocation('');
    };

    return (
        <I18n>
            {(i18nRenderProp: ReactI18nRenderProp): JSX.Element => (
                <View style={{ padding: 4, backgroundColor: colors.teal }}>
                    <TouchableOpacity style={applicationStyles.searchContainer}
                        onPress={(): void => props.setIsSearchInputCollapsed(false)}>
                        <InputIcon name='search' />
                        <Text numberOfLines={1} style={{ flex: 1 }}>
                            {combineSearchInputs(props.searchInputField, props.locationInputField, i18nRenderProp)}
                        </Text>
                        <ClearInputButton visible={true} onPress={(): void => {
                            clearSearch();
                            props.setIsSearchInputCollapsed(false);
                        }} />
                    </TouchableOpacity>
                </View>
            )}
        </I18n>
    );
};

const expandedInput = (props: Props): JSX.Element => {
    const searchInputRef = React.useRef(undefined);
    const searchLocationRef = React.useRef(undefined);
    const clearSearch = (): void => {
        props.setSearchInputField('');
        searchInputRef.current.focus();
    };

    const clearLocation = (): void => {
        props.setLocationInputField('');
        searchLocationRef.current.focus();
    };

    const getOpacity = (input: string): number => input === '' ? .6 : 1;

    return (
        <I18n>
            {(i18nRenderProp: ReactI18nRenderProp): JSX.Element => (

                <View style={{ padding: 4, backgroundColor: colors.teal }}>

                    <TouchableOpacity style={applicationStyles.searchContainer}>
                        <InputIcon name='search' />
                        <TextInput
                            ref={searchInputRef}
                            style={[applicationStyles.searchInput, { opacity: getOpacity(props.searchInputField) }]}
                            onChangeText={(d: string): void => {
                                debug(`SearchInputComponent search text changed to '${d}'`);
                                props.setSearchInputField(d);
                            }}
                            value={props.searchInputField}
                            placeholder={buildTranslatedString(i18nRenderProp.i18n, 'Search for services')} // TODO translate
                            placeholderTextColor={colors.greyishBrown}
                            selectionColor={colors.black}
                        />
                        <ClearInputButton visible={props.searchInputField !== ''} onPress={clearSearch} />
                    </TouchableOpacity>
                    <TouchableOpacity style={applicationStyles.searchContainer}>
                        <InputIcon name='location-on' />
                        <TextInput
                            ref={searchLocationRef}
                            style={[applicationStyles.searchInput, { opacity: getOpacity(props.locationInputField) }]}
                            onChangeText={(d: string): void => {
                                debug(`SearchInputComponent location text changed to '${d}'`);
                                props.setLocationInputField(d);
                            }}
                            value={props.locationInputField}
                            placeholder={buildTranslatedString(i18nRenderProp.i18n, 'Enter city, address, or postal code')} // TODO translate
                            placeholderTextColor={colors.greyishBrown}
                            selectionColor={colors.black}
                        />
                        <ClearInputButton visible={props.locationInputField !== ''} onPress={clearLocation} />
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'row-reverse', display: 'flex', justifyContent: 'space-between', margin: 4 }}>
                        {renderSearchButton(props)}
                        {renderMyLocationButton(props.setLocationInputField)}
                    </View>
                </View >
            )}

        </I18n>
    );
};

const InputIcon = ({ name }: IconProps): JSX.Element => (
    <Icon name={name}
        type='MaterialIcons'
        style={{ color: colors.teal, fontSize: values.mediumIconSize, padding: 5 }}
    />
);

const renderSearchButton = (props: Props): JSX.Element => {

    const text = (
        <Text style={[textStyles.button, { fontSize: 16, padding: 5 }]}>
            <Trans>
                Search
            </Trans>
        </Text>);

    return (
        <TouchableOpacity
            style={[applicationStyles.searchButton, { backgroundColor: colors.lightTeal }]}
            onPress={(): void => {
                props.setIsSearchInputCollapsed(true);
                props.saveSearchTerm(props.searchInputField);
                props.setLocation(props.locationInputField);
            }}>
            {text}
        </TouchableOpacity>
    );
};

const renderMyLocationButton = (saveLocation: Function): JSX.Element => {
    const icon = (
        <Icon
            type={'MaterialIcons'} name={'my-location'}
            style={{ color: colors.greyishBrown, fontSize: 16, padding: 3 }}
        />
    );

    const text = (
        <Text style={[textStyles.button, { color: colors.greyishBrown, fontSize: 12, padding: 3 }]}>
            <Trans>
                My Location
            </Trans>
        </Text>);

    return (
        <TouchableOpacity
            style={[applicationStyles.searchButton, { backgroundColor: colors.white }]}
            onPress={(): Promise<void> => myLocationOnPress(saveLocation)}
        >
            {icon}{text}
        </TouchableOpacity>
    );
};

const myLocationOnPress = async (saveLocation: Function): Promise<void> => {
    const status = await getPermission();
    switch (status) {
        case Permissions.PermissionStatus.GRANTED:
            saveLocation(MY_LOCATION);
            break;
        case Permissions.PermissionStatus.DENIED:
            openAppSettings();
            break;
        case Permissions.PermissionStatus.UNDETERMINED:
            askPermission(saveLocation);
            break;
        default:
            break;
    }
};

const getPermission = (): Promise<Permissions.PermissionStatus> => {
    return Permissions.getAsync(Permissions.LOCATION).then((permissionResponse: Permissions.PermissionResponse) => {
        return permissionResponse.status;
    });
};

const openAppSettings = (): void => {
    if (isAndroid()) {
        IntentLauncher.startActivityAsync(
            IntentLauncher.ACTION_APPLICATION_SETTINGS,
        );
    } else {
        openURL('app-settings:');
    }
};

const askPermission = async (saveLocation: Function): Promise<void> => {
    Permissions.askAsync(Permissions.LOCATION).then((permissionResponse: Permissions.PermissionResponse) => {
        if (permissionResponse.status === Permissions.PermissionStatus.GRANTED) {
            saveLocation(MY_LOCATION);
        }
    });
};

export const extractSearchStrings = (): JSX.Element => (
    <div>
        <Text><Trans>Search for services</Trans></Text>
        <Text>
            <Trans>Enter city, address, or postal code</Trans>
        </Text>
        <Text><Trans>My Location</Trans></Text>
    </div>
);
