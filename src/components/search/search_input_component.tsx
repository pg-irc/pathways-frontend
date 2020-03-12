// tslint:disable: no-expression-statement

import React, { useState, Dispatch, SetStateAction, MutableRefObject, useRef } from 'react';
import { TextInput, TouchableOpacity } from 'react-native';
import { View, Icon, Text } from 'native-base';
import { Trans, I18n } from '@lingui/react';
import { values, applicationStyles, colors, textStyles } from '../../application/styles';
import { debug, useTraceUpdate } from '../../helpers/debug';
import { ReactI18nRenderProp, ReactI18n } from '../../locale/types';
import { ClearInputButton } from './clear_input_button';
import * as IntentLauncher from 'expo-intent-launcher';
import * as Permissions from 'expo-permissions';
import { isAndroid } from '../../helpers/is_android';
import { openURL } from '../link/link';
import { MY_LOCATION } from '../../application/constants';
import { EmptyComponent } from '../empty_component/empty_component';

export interface SearchProps {
    readonly searchTerm: string;
    readonly searchLocation: string;
    readonly isSearchInputCollapsed: boolean;
}

export interface SearchActions {
    readonly saveSearchTerm: (searchTerm: string) => void;
    readonly saveSearchLocation: (location: string) => void;
    readonly setIsSearchInputCollapsed: (isSearchInputCollapsed: boolean) => void;
    readonly onSearchPress: (searchTerm: string, location: string) => void;
}

interface SearchInputProps {
    readonly termInput: string;
    readonly locationInput: string;
    readonly termInputRef: MutableRefObject<TextInput>;
    readonly locationInputRef: MutableRefObject<TextInput>;
    readonly showMyLocationButton: boolean;
    readonly setShowMyLocationButton: (b: boolean) => void;
    readonly setTermInput: (s: string) => void;
    readonly setLocationInput: (s: string) => void;
}

interface IconProps {
    readonly name: string;
}

type Props = SearchProps & SearchActions & SearchInputProps;

export type SetShowMyLocationButton = Dispatch<SetStateAction<boolean>>;

export type SetShowSearchButton = Dispatch<SetStateAction<boolean>>;

export const SearchInputComponent = (props: SearchProps & SearchActions): JSX.Element => {
    useTraceUpdate('SearchInputComponent', props);
    const [locationInput, setLocationInput]: readonly [string, (s: string) => void] = useState(props.searchLocation);
    const [termInput, setTermInput]: readonly [string, (s: string) => void] = useState(props.searchTerm);
    const [showMyLocationButton, setShowMyLocationButton]: readonly [boolean, SetShowMyLocationButton] = useState(false);
    const termInputRef = useRef<TextInput>(undefined);
    const locationInputRef = useRef<TextInput>(undefined);
    const searchProps = { ...props, termInput, locationInput, setTermInput, setLocationInput, termInputRef, locationInputRef, showMyLocationButton, setShowMyLocationButton };

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
    const clearSearchInputs = (): void => {
        props.setShowMyLocationButton(true);
        props.saveSearchTerm('');
        props.saveSearchLocation('');
        props.setTermInput('');
        props.setLocationInput('');
    };

    return (
        <I18n>
            {(i18nRenderProp: ReactI18nRenderProp): JSX.Element => (
                <View style={{ padding: 4, backgroundColor: colors.teal }}>
                    <TouchableOpacity style={applicationStyles.searchContainer}
                        onPress={(): void => props.setIsSearchInputCollapsed(false)}>
                        <InputIcon name='search' />
                        <Text numberOfLines={1} style={[textStyles.paragraphStyle, { flex: 1 }]}>
                            {combineSearchInputs(props.termInput, props.locationInput, i18nRenderProp)}
                        </Text>
                        <ClearInputButton visible={true} onPress={(): void => {
                            clearSearchInputs();
                            props.setIsSearchInputCollapsed(false);
                        }} />
                    </TouchableOpacity>
                </View>
            )}
        </I18n>
    );
};

const expandedInput = (props: Props): JSX.Element => {

    const clearTermInput = (): void => {
        props.setTermInput('');
        props.termInputRef.current.focus();
    };

    const clearLocationInput = (): void => {
        props.setLocationInput('');
        props.setShowMyLocationButton(true);
        props.locationInputRef.current.focus();
    };

    const getOpacity = (input: string): number => input === '' ? .6 : 1;

    return (
        <I18n>
            {(i18nRenderProp: ReactI18nRenderProp): JSX.Element => (

                <View style={{ padding: 4, backgroundColor: colors.teal }}>

                    <TouchableOpacity style={applicationStyles.searchContainer}>
                        <InputIcon name='search' />
                        <TextInput
                            ref={props.termInputRef}
                            style={[applicationStyles.searchInput, { opacity: getOpacity(props.termInput) }]}
                            onChangeText={(d: string): void => {
                                debug(`SearchInputComponent search text changed to '${d}'`);
                                props.setTermInput(d);
                            }}
                            value={props.termInput}
                            placeholder={buildTranslatedString(i18nRenderProp.i18n, 'Search for services')} // TODO translate
                            placeholderTextColor={colors.greyishBrown}
                            selectionColor={colors.black}
                        />
                        <ClearInputButton visible={props.termInput !== ''} onPress={clearTermInput} />
                    </TouchableOpacity>
                    <TouchableOpacity style={applicationStyles.searchContainer}>
                        <InputIcon name='location-on' />
                        <TextInput
                            ref={props.locationInputRef}
                            style={[applicationStyles.searchInput, { opacity: getOpacity(props.locationInput) }]}
                            onChangeText={(d: string): void => {
                                debug(`SearchInputComponent location text changed to '${d}'`);
                                props.setLocationInput(d);
                            }}
                            onFocus= {(): void => props.setShowMyLocationButton(true)}
                            value={props.locationInput}
                            placeholder={buildTranslatedString(i18nRenderProp.i18n, 'Enter city, address, or postal code')} // TODO translate
                            placeholderTextColor={colors.greyishBrown}
                            selectionColor={colors.black}
                        />
                        <ClearInputButton visible={props.locationInput !== ''} onPress={clearLocationInput} />
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'row-reverse', display: 'flex', justifyContent: 'space-between', margin: 4 }}>
                        {renderSearchButton(props)}
                        {renderMyLocationButton(props.setLocationInput, props.showMyLocationButton, props.setShowMyLocationButton)}
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
                props.onSearchPress(props.termInput, props.locationInput);
            }}>
            {text}
        </TouchableOpacity>
    );
};

const renderMyLocationButton =
(saveLocation: (location: string) => void, showMyLocationButton: boolean, setShowMyLocationButton: (showMyLocationButtn: boolean) => void)
: JSX.Element => {
    if (!showMyLocationButton) {
        return <EmptyComponent />;
    }
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
            onPress={(): void => {
                setShowMyLocationButton(false);
                myLocationOnPress(saveLocation);
                }
            }
        >
            {icon}{text}
        </TouchableOpacity>
    );
};

const myLocationOnPress = async (saveLocation: (location: string) => void): Promise<void> => {
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
    return Permissions.getAsync(Permissions.LOCATION).then((permissionResponse: Permissions.PermissionResponse): Permissions.PermissionStatus => {
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

const askPermission = async (saveLocation: (location: string) => void): Promise<void> => {
    Permissions.askAsync(Permissions.LOCATION).then((permissionResponse: Permissions.PermissionResponse): void => {
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
