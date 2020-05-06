// tslint:disable: no-expression-statement
import React, { useState, MutableRefObject, useRef } from 'react';
import { TextInput, TouchableOpacity } from 'react-native';
import { View, Icon, Text } from 'native-base';
import { Trans, I18n } from '@lingui/react';
import { t } from '@lingui/macro';
import { values, applicationStyles, colors, textStyles } from '../../application/styles';
import { debug, useTraceUpdate } from '../../application/helpers/use_trace_update';
import { ClearInputButton } from './clear_input_button';
import * as IntentLauncher from 'expo-intent-launcher';
import * as Permissions from 'expo-permissions';
import { isAndroid } from '../../application/helpers/is_android';
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

const buildBriefSearchString = (searchInput: string, searchLocationInput: string): string => {
    if (searchInput === '') {
        return '';
    }
    if (searchLocationInput === '') {
        return searchInput;
    }
    if (searchLocationInput === MY_LOCATION) {
        return searchInput + ' ' + 'near my location';
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
        <View style={{ padding: 4, backgroundColor: colors.teal }}>
                <TouchableOpacity style={applicationStyles.searchContainerCollapsed}
                    onPress={(): void => props.setCollapseSearchInput(false)}>
                    <InputIcon name='search' />
                    <Text numberOfLines={1} style={[textStyles.paragraphStyle, { flex: 1 }]}>
                        {buildBriefSearchString(props.searchTermInput, props.searchLocationInput)}
                    </Text>
                    <ClearInputButton visible={true} onPress={(): void => {
                        clearSearchInputs();
                        props.setCollapseSearchInput(false);
                    }} />
                </TouchableOpacity>
        </View>
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
    const searchTermPlaceholder = t`Search for services`;
    const searchLocationPlaceholder = t`Enter city, address, or postal code`;
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
            {
                (({ i18n }: I18nProps): JSX.Element =>
                    <View style={{ padding: 4, backgroundColor: colors.teal }}>
                        <TouchableOpacity style={applicationStyles.searchContainerExpanded}>
                            <InputIcon name='search' />
                            <TextInput
                                ref={props.searchTermInputRef}
                                style={[applicationStyles.searchInput, { opacity: getOpacity(props.searchTermInput) }]}
                                onChangeText={(text: string): void => {
                                    debug(`SearchInputComponent search text changed to '${text}'`);
                                    props.setSearchTermInput(text);
                                }}
                                value={props.searchTermInput}
                                placeholder={i18n._(searchTermPlaceholder)}
                                placeholderTextColor={colors.greyishBrown}
                                selectionColor={colors.black}
                            />
                            <ClearInputButton visible={props.searchTermInput !== ''} onPress={clearTermInput} />
                        </TouchableOpacity>
                        <TouchableOpacity style={applicationStyles.searchContainerExpanded}>
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
                                placeholder={i18n._(searchLocationPlaceholder)}
                                placeholderTextColor={colors.greyishBrown}
                                selectionColor={colors.black}
                            />
                            <ClearInputButton visible={props.searchLocationInput !== ''} onPress={clearLocationInput} />
                        </TouchableOpacity>
                        <View style={{ flexDirection: 'row-reverse', display: 'flex', justifyContent: 'space-between', margin: 4 }}>
                            {renderSearchButton(props)}
                            {renderMyLocationButton(props, i18n)}
                        </View>
                    </View >
                )
            }
        </I18n>
    );
};

const InputIcon = ({ name }: IconProps): JSX.Element => (
    <Icon name={name}
        type='MaterialIcons'
        style={{ color: colors.teal, fontSize: values.smallIconSize, padding: 10 }}
    />
);

const renderSearchButton = (props: Props & ExpandedInputProps): JSX.Element => (
    <TouchableOpacity
        style={props.searchTermInput.length === 0 ? [applicationStyles.searchButton, applicationStyles.disabled] : applicationStyles.searchButton}
        disabled={props.searchTermInput.length === 0}
        onPress={(): void => {
            props.onSearchRequest(props.searchTermInput, props.searchLocationInput);
        }}
    >
        <Text style={[textStyles.button, { fontSize: 16 }]}>
            <Trans>
                Search
            </Trans>
        </Text>
    </TouchableOpacity>
);

const renderMyLocationButton = (props: ExpandedInputProps, i18n: I18n): JSX.Element => {
    if (!props.showMyLocationButton) {
        return <EmptyComponent />;
    }
    return (
        <TouchableOpacity
            style={applicationStyles.locateButton}
            onPress={(): void => {
                props.setShowMyLocationButton(false);
                myLocationOnPress(props.setSearchLocationInput, i18n);
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

const myLocationOnPress = async (setSearchLocationInput: (location: string) => void, i18n: I18n): Promise<void> => {
    const status = await getPermission();
    const myLocationInput = t`My Location`;
    switch (status) {
        case Permissions.PermissionStatus.GRANTED:
            setSearchLocationInput(i18n._(myLocationInput));
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