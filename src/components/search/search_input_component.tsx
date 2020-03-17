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
    readonly collapseSearchInput: boolean;
}

export interface SearchActions {
    readonly saveSearchTerm: (searchTerm: string) => void;
    readonly saveSearchLocation: (location: string) => void;
    readonly setCollapseSearchInput: (collapseSearchInput: boolean) => void;
    readonly onSearchRequest: (searchTerm: string, location: string) => void;
}

interface IconProps {
    readonly name: string;
}

type Props = SearchProps & SearchActions;

export const SearchInputComponent = (props: Props): JSX.Element => {
    useTraceUpdate('SearchInputComponent', props);
    const [searchLocationInput, setSearchLocationInput]: readonly [string, StringSetterFunction] = useState(props.searchLocation);
    const [searchTermInput, setSearchTermInput]: readonly [string, StringSetterFunction] = useState(props.searchTerm);
    const [showMyLocationButton, setShowMyLocationButton]: readonly [boolean, BooleanSetterFunction] = useState(false);
    const searchTermInputRef = useRef<TextInput>();
    const searchLocationInputRef = useRef<TextInput>();

    if (props.collapseSearchInput) {
        const collapsedInputProps = {
            ...props, searchTermInput, searchLocationInput, setSearchTermInput, setSearchLocationInput: setSearchLocationInput,
            showMyLocationButton, setShowMyLocationButton,
        };
        return (
            <View>
                <CollapsedInput {...collapsedInputProps} />
            </View>
        );
    }
    const searchProps = {
        ...props, searchTermInput, searchLocationInput, setSearchTermInput, setSearchLocationInput: setSearchLocationInput,
        searchTermInputRef, searchLocationInputRef, showMyLocationButton, setShowMyLocationButton,
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

const buildBriefSearchString = (searchInput: string, searchLocationInput: string, i18nRenderProp: ReactI18nRenderProp): string => {
    if (searchInput === '') {
        return '';
    }
    if (searchLocationInput === '') {
        return searchInput;
    }
    if (searchLocationInput === MY_LOCATION) {
        return searchInput + ' ' + buildTranslatedString(i18nRenderProp.i18n, 'near my location');
    }
    return searchInput + ' near ' + searchLocationInput;
};

export interface CollapsedInputProps {
    readonly searchTermInput: string;
    readonly searchLocationInput: string;
    readonly showMyLocationButton: boolean;
    readonly setShowMyLocationButton: (b: boolean) => void;
    readonly setSearchTermInput: (s: string) => void;
    readonly setSearchLocationInput: (s: string) => void;
}

const CollapsedInput = (props: Props & CollapsedInputProps): JSX.Element => {
    const clearSearchInputs = (): void => {
        props.setShowMyLocationButton(true);
        props.saveSearchTerm('');
        props.saveSearchLocation('');
        props.setSearchTermInput('');
        props.setSearchLocationInput('');
    };

    return (
        <I18n>
            {(i18nRenderProp: ReactI18nRenderProp): JSX.Element => (
                <View style={{ padding: 4, backgroundColor: colors.teal }}>
                    <TouchableOpacity style={applicationStyles.searchContainer}
                        onPress={(): void => props.setCollapseSearchInput(false)}>
                        <InputIcon name='search' />
                        <Text numberOfLines={1} style={[textStyles.paragraphStyle, { flex: 1 }]}>
                            {buildBriefSearchString(props.searchTermInput, props.searchLocationInput, i18nRenderProp)}
                        </Text>
                        <ClearInputButton visible={true} onPress={(): void => {
                            clearSearchInputs();
                            props.setCollapseSearchInput(false);
                        }} />
                    </TouchableOpacity>
                </View>
            )}
        </I18n>
    );
};

export interface ExpandedInputProps {
    readonly searchTermInput: string;
    readonly searchLocationInput: string;
    readonly showMyLocationButton: boolean;
    readonly setShowMyLocationButton: (b: boolean) => void;
    readonly setSearchTermInput: (s: string) => void;
    readonly setSearchLocationInput: (s: string) => void;
    readonly searchTermInputRef: MutableRefObject<TextInput>;
    readonly searchLocationInputRef: MutableRefObject<TextInput>;
}

const ExpandedInput = (props: Props & ExpandedInputProps): JSX.Element => {

    const clearTermInput = (): void => {
        props.setSearchTermInput('');
        props.searchTermInputRef.current.focus();
    };

    const clearLocationInput = (): void => {
        props.setSearchLocationInput('');
        props.setShowMyLocationButton(true);
        props.searchLocationInputRef.current.focus();
    };

    const getOpacity = (input: string): number => input === '' ? .6 : 1;

    return (
        <I18n>
            {(i18nRenderProp: ReactI18nRenderProp): JSX.Element => (

                <View style={{ padding: 4, backgroundColor: colors.teal }}>

                    <TouchableOpacity style={applicationStyles.searchContainer}>
                        <InputIcon name='search' />
                        <TextInput
                            ref={props.searchTermInputRef}
                            style={[applicationStyles.searchInput, { opacity: getOpacity(props.searchTermInput) }]}
                            onChangeText={(text: string): void => {
                                debug(`SearchInputComponent search text changed to '${text}'`);
                                props.setSearchTermInput(text);
                            }}
                            value={props.searchTermInput}
                            placeholder={buildTranslatedString(i18nRenderProp.i18n, 'Search for services')}
                            placeholderTextColor={colors.greyishBrown}
                            selectionColor={colors.black}
                        />
                        <ClearInputButton visible={props.searchTermInput !== ''} onPress={clearTermInput} />
                    </TouchableOpacity>
                    <TouchableOpacity style={applicationStyles.searchContainer}>
                        <InputIcon name='location-on' />
                        <TextInput
                            ref={props.searchLocationInputRef}
                            style={[applicationStyles.searchInput, { opacity: getOpacity(props.searchLocationInput) }]}
                            onChangeText={(text: string): void => {
                                debug(`SearchInputComponent location text changed to '${text}'`);
                                props.setSearchLocationInput(text);
                            }}
                            onFocus={(): void => props.setShowMyLocationButton(true)}
                            value={props.searchLocationInput}
                            placeholder={buildTranslatedString(i18nRenderProp.i18n, 'Enter city, address, or postal code')}
                            placeholderTextColor={colors.greyishBrown}
                            selectionColor={colors.black}
                        />
                        <ClearInputButton visible={props.searchLocationInput !== ''} onPress={clearLocationInput} />
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

const renderSearchButton = (props: Props & ExpandedInputProps): JSX.Element => (
    <TouchableOpacity
        style={[applicationStyles.searchButton, { backgroundColor: colors.lightTeal }]}
        onPress={(): void => {
            props.onSearchRequest(props.searchTermInput, props.searchLocationInput);
        }}>
        <Text style={[textStyles.button, { fontSize: 16 }]}>
            <Trans>
                Search
            </Trans>
        </Text>
    </TouchableOpacity>
);

const renderMyLocationButton = (props: ExpandedInputProps): JSX.Element => {
    if (!props.showMyLocationButton) {
        return <EmptyComponent />;
    }
    return (
        <TouchableOpacity
            style={[applicationStyles.searchButton, { backgroundColor: colors.white }]}
            onPress={(): void => {
                props.setShowMyLocationButton(false);
                myLocationOnPress(props.setSearchLocationInput);
            }
            }
        >
            <Icon
                type={'MaterialIcons'} name={'my-location'}
                style={{ color: colors.greyishBrown, fontSize: 16, padding: 3 }}
            />
            <Text style={[textStyles.button, { color: colors.greyishBrown, fontSize: 12, padding: 3 }]}>
                <Trans>
                    My Location
                </Trans>
            </Text>
        </TouchableOpacity>
    );
};

const myLocationOnPress = async (setSearchLocationInput: (location: string) => void): Promise<void> => {
    const status = await getPermission();
    switch (status) {
        case Permissions.PermissionStatus.GRANTED:
            setSearchLocationInput(MY_LOCATION);
            break;
        case Permissions.PermissionStatus.DENIED:
            openAppSettings();
            break;
        case Permissions.PermissionStatus.UNDETERMINED:
            askPermission(setSearchLocationInput);
            break;
        default:
            break;
    }
};

const getPermission = (): Promise<Permissions.PermissionStatus> => {
    return Permissions.getAsync(Permissions.LOCATION).
        then((permissionResponse: Permissions.PermissionResponse): Permissions.PermissionStatus => {
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

const askPermission = async (setSearchLocationInput: (location: string) => void): Promise<void> => {
    Permissions.askAsync(Permissions.LOCATION).
        then((permissionResponse: Permissions.PermissionResponse): void => {
            if (permissionResponse.status === Permissions.PermissionStatus.GRANTED) {
                setSearchLocationInput(MY_LOCATION);
            }
        });
};

export const extractSearchStrings = (): JSX.Element => (
    <View>
        <Text><Trans>Search for services</Trans></Text>
        <Text>
            <Trans>Enter city, address, or postal code</Trans>
        </Text>
        <Text><Trans>My Location</Trans></Text>
    </View>
);
