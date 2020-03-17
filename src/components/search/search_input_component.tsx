// tslint:disable: no-expression-statement
import React, { useState, MutableRefObject, useRef } from 'react';
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
import { BooleanSetterFunction, StringSetterFunction } from './search_component';

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

interface IconProps {
    readonly name: string;
}

type Props = SearchProps & SearchActions;

export const SearchInputComponent = (props: Props): JSX.Element => {
    useTraceUpdate('SearchInputComponent', props);
    const [locationInput, setLocationInput]: readonly [string, StringSetterFunction] = useState(props.searchLocation);
    const [termInput, setTermInput]: readonly [string, StringSetterFunction] = useState(props.searchTerm);
    const [showMyLocationButton, setShowMyLocationButton]: readonly [boolean, BooleanSetterFunction] = useState(false);
    const termInputRef = useRef<TextInput>();
    const locationInputRef = useRef<TextInput>();

    if (props.isSearchInputCollapsed) {
        const collapsedInputProps = { ...props, termInput, locationInput, setTermInput, setLocationInput,
            showMyLocationButton, setShowMyLocationButton,
        };
        return (
            <View>
                <CollapsedInput {...collapsedInputProps} />
            </View>
        );
    }
    const searchProps = { ...props, termInput, locationInput, setTermInput, setLocationInput,
            termInputRef, locationInputRef, showMyLocationButton, setShowMyLocationButton,
        };
    return (
        <View>
            <ExpandedInput {...searchProps} />
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

export interface CollapsedInputProps {
    readonly termInput: string;
    readonly locationInput: string;
    readonly showMyLocationButton: boolean;
    readonly setShowMyLocationButton: (b: boolean) => void;
    readonly setTermInput: (s: string) => void;
    readonly setLocationInput: (s: string) => void;
}

const CollapsedInput = (props: Props & CollapsedInputProps): JSX.Element => {
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

export interface ExpandedInputProps {
    readonly termInput: string;
    readonly locationInput: string;
    readonly showMyLocationButton: boolean;
    readonly setShowMyLocationButton: (b: boolean) => void;
    readonly setTermInput: (s: string) => void;
    readonly setLocationInput: (s: string) => void;
    readonly termInputRef: MutableRefObject<TextInput>;
    readonly locationInputRef: MutableRefObject<TextInput>;
}

const ExpandedInput = (props: Props & ExpandedInputProps): JSX.Element => {

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
                            onChangeText={(text: string): void => {
                                debug(`SearchInputComponent search text changed to '${text}'`);
                                props.setTermInput(text);
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
                            onChangeText={(text: string): void => {
                                debug(`SearchInputComponent location text changed to '${text}'`);
                                props.setLocationInput(text);
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
                        {renderMyLocationButton(props)}
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

const renderSearchButton = (props: Props & ExpandedInputProps): JSX.Element => {

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

const renderMyLocationButton = (props: ExpandedInputProps): JSX.Element => {
    if (!props.showMyLocationButton) {
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
                props.setShowMyLocationButton(false);
                myLocationOnPress(props.setLocationInput);
                }
            }
        >
            {icon}{text}
        </TouchableOpacity>
    );
};

const myLocationOnPress = async (setLocationInput: (location: string) => void): Promise<void> => {
    const status = await getPermission();
    switch (status) {
        case Permissions.PermissionStatus.GRANTED:
            setLocationInput(MY_LOCATION);
            break;
        case Permissions.PermissionStatus.DENIED:
            openAppSettings();
            break;
        case Permissions.PermissionStatus.UNDETERMINED:
            askPermission(setLocationInput);
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

const askPermission = async (setLocationInput: (location: string) => void): Promise<void> => {
    Permissions.askAsync(Permissions.LOCATION).then((permissionResponse: Permissions.PermissionResponse): void => {
        if (permissionResponse.status === Permissions.PermissionStatus.GRANTED) {
            setLocationInput(MY_LOCATION);
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
