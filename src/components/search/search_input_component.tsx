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
import { getMyLocationOrLocationInput, LOCALIZED_MY_LOCATION } from '../partial_localization/get_my_location_or_location_input';

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

type Props = SearchProps & SearchActions;

export const SearchInputComponent = (props: Props): JSX.Element => {
    useTraceUpdate('SearchInputComponent', props);
    const [searchLocationInput, setSearchLocationInput]: readonly [string, StringSetterFunction] = useState(props.searchLocation);
    const [searchTermInput, setSearchTermInput]: readonly [string, StringSetterFunction] = useState(props.searchTerm);
    const [showMyLocationButton, setShowMyLocationButton]: readonly [boolean, BooleanSetterFunction] = useState(false);
    const searchTermInputRef = useRef<TextInput>();
    const searchLocationInputRef = useRef<TextInput>();

    if (props.collapseSearchInput) {
        return (
            <View>
                <CollapsedInput
                    searchTermInput={searchTermInput}
                    searchLocationInput={searchLocationInput}
                    showMyLocationButton={showMyLocationButton}
                    setShowMyLocationButton={setShowMyLocationButton}
                    setSearchTermInput={setSearchTermInput}
                    setSearchLocationInput={setSearchLocationInput}
                    saveSearchTerm={props.saveSearchTerm}
                    saveSearchLocation={props.saveSearchLocation}
                    setCollapseSearchInput={props.setCollapseSearchInput}
                />
            </View>
        );
    }
    return (
        <I18n>
        {
            (({ i18n }: { readonly i18n: I18n }): JSX.Element =>
                <View>
                    <ExpandedInput
                        searchTermInput={searchTermInput}
                        searchLocationInput={searchLocationInput}
                        showMyLocationButton={showMyLocationButton}
                        setShowMyLocationButton={setShowMyLocationButton}
                        setSearchTermInput={setSearchTermInput}
                        setSearchLocationInput={setSearchLocationInput}
                        searchTermInputRef={searchTermInputRef}
                        searchLocationInputRef={searchLocationInputRef}
                        onSearchRequest={props.onSearchRequest}
                        i18n={i18n}
                    />
                </View>
            )
        }
        </I18n>
    );
};

export interface CollapsedInputProps {
    readonly searchTermInput: string;
    readonly searchLocationInput: string;
    readonly showMyLocationButton: boolean;
    readonly setShowMyLocationButton: (b: boolean) => void;
    readonly setSearchTermInput: (s: string) => void;
    readonly setSearchLocationInput: (s: string) => void;
    readonly saveSearchTerm: (s: string) => void;
    readonly saveSearchLocation: (s: string) => void;
    readonly setCollapseSearchInput: (b: boolean) => void;
}

const CollapsedInput = (props: CollapsedInputProps): JSX.Element => {
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

const buildBriefSearchString = (searchInput: string, searchLocationInput: string): string | JSX.Element => {
    if (searchLocationInput === '') {
        return searchInput;
    }
    if (searchLocationInput === LOCALIZED_MY_LOCATION) {
        // TODO TRANSLATE STRING
        return <Trans>{searchInput} near My Location</Trans>;
    }
    // TODO TRANSLATE STRING
    return <Trans>{searchInput} near {searchLocationInput}</Trans>;
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
    readonly i18n: I18n;
    readonly onSearchRequest: (searchTerm: string, location: string) => void;
}

const ExpandedInput = (props: ExpandedInputProps): JSX.Element => {
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
                    placeholder={props.i18n._(searchTermPlaceholder)}
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
                    placeholder={props.i18n._(searchLocationPlaceholder)}
                    placeholderTextColor={colors.greyishBrown}
                    selectionColor={colors.black}
                />
                <ClearInputButton visible={props.searchLocationInput !== ''} onPress={clearLocationInput} />
            </TouchableOpacity>
            <View style={{ flexDirection: 'row-reverse', display: 'flex', justifyContent: 'space-between', margin: 4 }}>
                <SearchButton
                    searchTermInput={props.searchTermInput}
                    searchLocationInput={props.searchLocationInput}
                    onSearchRequest={props.onSearchRequest}
                    i18n={props.i18n}
                />
                <MyLocationButton
                    showMyLocationButton={props.showMyLocationButton}
                    i18n={props.i18n}
                    setShowMyLocationButton={props.setShowMyLocationButton}
                    setSearchLocationInput={props.setSearchLocationInput}
                />
            </View>
        </View >
    );
};

interface IconProps {
    readonly name: string;
}

const InputIcon = ({ name }: IconProps): JSX.Element => (
    <Icon name={name}
        type='MaterialIcons'
        style={{ color: colors.teal, fontSize: values.smallIconSize, padding: 10 }}
    />
);

const SearchButton = (props: {
    readonly searchTermInput: string,
    readonly searchLocationInput: string,
    readonly i18n: I18n,
    readonly onSearchRequest: (searchTerm: string, location: string) => void,
}): JSX.Element => {
    const searchLocation = getMyLocationOrLocationInput(props.searchLocationInput, props.i18n);
    return (
        <TouchableOpacity
        style={props.searchTermInput.length === 0 ? [applicationStyles.searchButton, applicationStyles.disabled] : applicationStyles.searchButton}
        disabled={props.searchTermInput.length === 0}
        onPress={(): void => {
            props.onSearchRequest(props.searchTermInput, searchLocation);
        }}
    >
        <Text style={[textStyles.button, { fontSize: 16 }]}>
            <Trans>
                Search
            </Trans>
        </Text>
    </TouchableOpacity>
    );
};

const MyLocationButton = (props: {
    readonly showMyLocationButton: boolean,
    readonly i18n: I18n,
    readonly setShowMyLocationButton: (b: boolean) => void,
    readonly setSearchLocationInput: (s: string) => void,
}): JSX.Element => {
    if (!props.showMyLocationButton) {
        return <EmptyComponent />;
    }
    return (
        <TouchableOpacity
            style={applicationStyles.locateButton}
            onPress={(): void => {
                props.setShowMyLocationButton(false);
                myLocationOnPress(props.setSearchLocationInput, props.i18n);
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
    switch (status) {
        case Permissions.PermissionStatus.GRANTED:
            setSearchLocationInput(i18n._(LOCALIZED_MY_LOCATION));
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
