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
import { NEAR_MY_LOCATION } from '../../application/constants';

export interface Props {
    readonly currentRefinement: string;
    readonly latLong: LatLong;
    readonly searchTerm: string;
    readonly location: string;
    readonly collapseInput: boolean;
}

export interface Actions {
    readonly refine: (searchTerms: string) => string;
    readonly saveSearchTerm: (s: string) => void;
    readonly setLocation: (s: string) => void;
    readonly setCollapseInput: (b: boolean) => void;
}

const renderMyLocationButton = (saveLocation: Function): JSX.Element => {
    const icon = <Icon
        type={'MaterialIcons'} name={'my-location'}
        style={{ color: colors.greyishBrown, fontSize: 16, padding: 3 }}
    />;

    const text = <Text style={[textStyles.button, { color: colors.greyishBrown, fontSize: 12, padding: 3 }]}>
        <Trans>
            My Location
        </Trans>
    </Text>;

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
            saveLocation(NEAR_MY_LOCATION);
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
            saveLocation(NEAR_MY_LOCATION);
        }
    });
};

const renderSearchButton = (searchTerm: string, location: string,
    setSearchTerm: Function, setSearchLocation: Function, setCollapseInput: Function): JSX.Element => {

    const text = <Text style={[textStyles.button, { fontSize: 16, padding: 5 }]}>
        <Trans>
            Search
        </Trans>
    </Text>;

    return (
        <TouchableOpacity
            style={[applicationStyles.searchButton, { backgroundColor: colors.lightTeal }]}
            onPress={(): void => {
                setCollapseInput(true);
                setSearchTerm(searchTerm);
                setSearchLocation(location);
            }}>
            {text}
        </TouchableOpacity>
    );
};

export type SetShowMyLocationButton = Dispatch<SetStateAction<boolean>>;

export type SetShowSearchButton = Dispatch<SetStateAction<boolean>>;

export const SearchInputComponent = (props: Props & Actions): JSX.Element => {
    useTraceUpdate('SearchInputComponent', props);
    const searchInputRef = React.useRef(undefined);
    const searchLocationRef = React.useRef(undefined);
    const [locationInputField, setLocationInputField]: readonly [string, (s: string) => void] = useState(props.location);
    const [searchInputField, setSearchInputField]: readonly [string, (s: string) => void] = useState(props.searchTerm);
    useEffect(() => {
        debug(`SearchInput Component useEffect with '${props.searchTerm}'`);
        props.refine(props.searchTerm);
    }, [props.latLong]);
    const buildTranslatedString = (i18n: ReactI18n, placeholder: string): string => {
        const _ = i18n._.bind(i18n);
        return _(placeholder);
    };

    const clearSearch = (): void => {
        setSearchInputField('');
        searchInputRef.current.focus();
    };

    const clearLocation = (): void => {
        setLocationInputField('');
        searchLocationRef.current.focus();
    };

    const getOpacity = (input: string): number => input === '' ? .6 : 1;

    const smallInput = (
        <I18n>
            {(i18nRenderProp: ReactI18nRenderProp): JSX.Element => (
                <View style={{ padding: 4, backgroundColor: colors.teal }}>
                    <TouchableOpacity style={applicationStyles.searchContainer}
                        onPress={(): void => props.setCollapseInput(false)}>
                        <InputIcon name='search' />
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <Text style={{ fontWeight: 'bold' }}>{searchInputField}</Text>
                            <Text> <Trans>near</Trans> </Text>
                            <Text style={{ fontWeight: 'bold' }}>{buildTranslatedString(i18nRenderProp.i18n, locationInputField)}</Text>
                        </View>
                        <ClearInputButton visible={true} onPress={(): void => {
                            props.saveSearchTerm('');
                            props.setLocation('');
                            props.setCollapseInput(false);
                        }} />
                    </TouchableOpacity>
                </View>
            )}
        </I18n>
    );

    const bigInput = (
        <I18n>
            {(i18nRenderProp: ReactI18nRenderProp): JSX.Element => (

                <View style={{ padding: 4, backgroundColor: colors.teal }}>

                    <TouchableOpacity style={applicationStyles.searchContainer}>
                        <InputIcon name='search' />
                        <TextInput
                            ref={searchInputRef}
                            style={[applicationStyles.searchInput, { opacity: getOpacity(searchInputField) }]}
                            onChangeText={(d: string): void => {
                                debug(`SearchInputComponent search text changed to '${d}'`);
                                setSearchInputField(d);
                            }}
                            value={searchInputField}
                            placeholder={buildTranslatedString(i18nRenderProp.i18n, 'Search for services')} // TODO translate
                            placeholderTextColor={colors.greyishBrown}
                            selectionColor={colors.black}
                        />
                        <ClearInputButton visible={searchInputField !== ''} onPress={clearSearch} />
                    </TouchableOpacity>
                    <TouchableOpacity style={applicationStyles.searchContainer}>
                        <InputIcon name='location-on' />
                        <TextInput
                            ref={searchLocationRef}
                            style={[applicationStyles.searchInput, { opacity: getOpacity(locationInputField) }]}
                            onChangeText={(d: string): void => {
                                debug(`SearchInputComponent location text changed to '${d}'`);
                                setLocationInputField(d);
                            }}
                            value={locationInputField}
                            placeholder={buildTranslatedString(i18nRenderProp.i18n, 'Enter city, address, or postal code')} // TODO translate
                            placeholderTextColor={colors.greyishBrown}
                            selectionColor={colors.black}
                        />
                        <ClearInputButton visible={locationInputField !== ''} onPress={clearLocation} />
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'row-reverse', display: 'flex', justifyContent: 'space-between', margin: 4 }}>
                        {renderSearchButton(searchInputField, locationInputField, props.saveSearchTerm, props.setLocation, props.setCollapseInput)}
                        {renderMyLocationButton(setLocationInputField)}
                    </View>
                </View >
            )}

        </I18n>
    );
    if (props.collapseInput) {
        return <View>{smallInput}</View>;
    }
    else {
        return <View>{bigInput}</View>;
    }
};

interface IconProps {
    readonly name: string;
}

const InputIcon = ({ name }: IconProps): JSX.Element => (
    <Icon name={name}
        type='MaterialIcons'
        style={{ color: colors.teal, fontSize: values.mediumIconSize, padding: 5 }}
    />
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
