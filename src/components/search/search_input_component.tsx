// tslint:disable: no-expression-statement
import React, { MutableRefObject, useContext, useRef, useState } from 'react';
import { TextInput, TouchableOpacity } from 'react-native';
import { View, Icon, Text } from 'native-base';
import { Trans } from '@lingui/react';
import { t } from '@lingui/macro';
import { values, applicationStyles, colors, textStyles } from '../../application/styles';
import { debug, useTraceUpdate } from '../../application/helpers/use_trace_update';
import { ClearInputButton } from './clear_input_button';
import * as IntentLauncher from 'expo-intent-launcher';
import { isAndroid } from '../../application/helpers/is_android';
import { openURL } from '../link/link_component';
import { EmptyComponent } from '../empty_component/empty_component';
import { ScrollContext, ScrollAnimationContext } from '../main/scroll_animation_context';
import { BooleanSetterFunction, StringSetterFunction } from './search_component';
import { toLocationForQuery, MY_LOCATION_MESSAGE_DESCRIPTOR } from '../partial_localization/to_location_for_query';
import { useAskLocationPermission } from './use_ask_location_permission';
import { MY_LOCATION } from '../../application/constants';
import { SearchServiceData } from '../../validation/search/types';
import { SaveSearchResultsAction } from '../../stores/search';
import { requestLocationPermission } from '../../application/helpers/request_location_permission';
import { PermissionStatus } from 'unimodules-permissions-interface';

export interface SearchProps {
    readonly searchTerm: string;
    readonly searchLocation: string;
    readonly collapseSearchInput: boolean;
    readonly i18n: I18n;
}

export interface SearchActions {
    readonly saveSearchTerm: (searchTerm: string) => void;
    readonly saveSearchLocation: (location: string) => void;
    readonly saveSearchResults: (searchResults: ReadonlyArray<SearchServiceData>) => SaveSearchResultsAction;
    readonly setCollapseSearchInput: (collapseSearchInput: boolean) => void;
    readonly onSearchRequest: (searchTerm: string, location: string) => void;
}

type Props = SearchProps & SearchActions;

export const SearchInputComponent = (props: Props): JSX.Element => {
    const initialSearchLocation = props.searchLocation === MY_LOCATION ? props.i18n._(MY_LOCATION_MESSAGE_DESCRIPTOR) : props.searchLocation;
    useTraceUpdate('SearchInputComponent', props);
    const [searchLocationInput, setSearchLocationInput]: readonly [string, StringSetterFunction] = useState(initialSearchLocation);
    const [searchTermInput, setSearchTermInput]: readonly [string, StringSetterFunction] = useState(props.searchTerm);
    const [showMyLocationButton, setShowMyLocationButton]: readonly [boolean, BooleanSetterFunction] = useState(false);
    const searchTermInputRef = useRef<TextInput>();
    const searchLocationInputRef = useRef<TextInput>();
    const setToMyLocation = (): void => {
        setSearchLocationInput(props.i18n._(MY_LOCATION_MESSAGE_DESCRIPTOR));
        props.saveSearchLocation(props.i18n._(MY_LOCATION_MESSAGE_DESCRIPTOR));
    };
    useAskLocationPermission(setToMyLocation);
    if (props.collapseSearchInput) {
        const clearSearchInputs = (): void => {
            setShowMyLocationButton(true);
            props.saveSearchTerm('');
            props.saveSearchLocation('');
            props.saveSearchResults([]);
            setSearchTermInput('');
            setSearchLocationInput('');
        };
        return (
            <View style={{ paddingTop: 7 }}>
                <CollapsedInput
                    searchTermInput={searchTermInput}
                    searchLocationInput={searchLocationInput}
                    setCollapseSearchInput={props.setCollapseSearchInput}
                    onClear={clearSearchInputs}
                />
            </View>
        );
    }

    return (
        <View style={{ paddingTop: 7 }}>
            <ExpandedInput
                searchTermInput={searchTermInput}
                searchLocationInput={searchLocationInput}
                searchLocation={props.searchLocation}
                showMyLocationButton={showMyLocationButton}
                i18n={props.i18n}
                setShowMyLocationButton={setShowMyLocationButton}
                setSearchTermInput={setSearchTermInput}
                setSearchLocationInput={setSearchLocationInput}
                saveSearchLocation={props.saveSearchLocation}
                saveSearchResults={props.saveSearchResults}
                searchTermInputRef={searchTermInputRef}
                searchLocationInputRef={searchLocationInputRef}
                onSearchRequest={props.onSearchRequest}
                saveSearchTerm={props.saveSearchTerm}
            />
        </View>
    );
};

export interface CollapsedInputProps {
    readonly searchTermInput: string;
    readonly searchLocationInput: string;
    readonly setCollapseSearchInput: (b: boolean) => void;
    readonly onClear: () => void;
}

const CollapsedInput = (props: CollapsedInputProps): JSX.Element => {
    const scrollAnimationContext = useContext(ScrollContext) as ScrollAnimationContext;

    const onPress = (): void => {
        scrollAnimationContext.resetFromInput();
        props.setCollapseSearchInput(false);
    };

    return (
        <View style={{ padding: 4, backgroundColor: colors.teal }}>
            <TouchableOpacity style={applicationStyles.searchContainerCollapsed}
                onPress={onPress}>
                <InputIcon name='search' />
                <Text numberOfLines={1} style={[textStyles.paragraphStyle, { flex: 1 }]}>
                    {buildBriefSearchString(props.searchTermInput, props.searchLocationInput)}
                </Text>
                <ClearInputButton visible={true} onPress={(): void => {
                    props.onClear();
                    props.setCollapseSearchInput(false);
                }} />
            </TouchableOpacity>
        </View>
    );
};

const buildBriefSearchString = (searchTermInput: string, searchLocationInput: string): string | JSX.Element => {
    if (isSearchLocationEmpty(searchLocationInput)) {
        return searchTermInput;
    }
    return <Trans>{searchTermInput} near {searchLocationInput}</Trans>;
};

const isSearchLocationEmpty = (searchLocationInput: string): boolean => (
    searchLocationInput === ''
);

export interface ExpandedInputProps {
    readonly searchTermInput: string;
    readonly searchLocationInput: string;
    readonly searchLocation: string;
    readonly showMyLocationButton: boolean;
    readonly i18n: I18n;
    readonly setShowMyLocationButton: (b: boolean) => void;
    readonly setSearchTermInput: (s: string) => void;
    readonly setSearchLocationInput: (s: string) => void;
    readonly saveSearchLocation: (s: string) => void;
    readonly saveSearchResults: (searchResults: ReadonlyArray<SearchServiceData>) => SaveSearchResultsAction;
    readonly searchTermInputRef: MutableRefObject<TextInput>;
    readonly searchLocationInputRef: MutableRefObject<TextInput>;
    readonly onSearchRequest: (searchTerm: string, location: string) => void;
    readonly saveSearchTerm: (searchTerm: string) => void;
}

const ExpandedInput = (props: ExpandedInputProps): JSX.Element => {
    const scrollAnimationContext = useContext(ScrollContext) as ScrollAnimationContext;

    const searchTermPlaceholder = t`Search for services`;
    const searchLocationPlaceholder = t`Enter city, address, or postal code`;
    const clearTermInput = (): void => {
        props.saveSearchTerm('');
        props.saveSearchResults([]);
        props.setSearchTermInput('');
        props.searchTermInputRef.current.focus();
    };

    const clearLocationInput = (): void => {
        props.setSearchLocationInput('');
        props.saveSearchLocation('');
        props.setShowMyLocationButton(true);
        props.searchLocationInputRef.current.focus();
    };

    const onSearchTermInputFocus = (): void => {
        scrollAnimationContext.resetFromInput();
    };

    const onLocationInputFocus = (): void => {
        props.setShowMyLocationButton(true);
        scrollAnimationContext.resetFromInput();
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
                    onFocus={onSearchTermInputFocus}
                    value={props.searchTermInput}
                    placeholder={props.i18n._(searchTermPlaceholder)}
                    placeholderTextColor={colors.greyishBrown}
                    selectionColor={colors.black}
                    returnKeyType={'done'}
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
                    onFocus={onLocationInputFocus}
                    value={props.searchLocationInput}
                    placeholder={props.i18n._(searchLocationPlaceholder)}
                    placeholderTextColor={colors.greyishBrown}
                    selectionColor={colors.black}
                    returnKeyType={'done'}
                />
                <ClearInputButton visible={props.searchLocationInput !== ''} onPress={clearLocationInput} />
            </TouchableOpacity>
            <View style={{ flexDirection: 'row-reverse', display: 'flex', justifyContent: 'space-between', margin: 4 }}>
                <SearchButton
                    searchTermInput={props.searchTermInput}
                    searchLocationInput={props.searchLocationInput}
                    setSearchLocationInput={props.setSearchLocationInput}
                    saveSearchLocation={props.saveSearchLocation}
                    i18n={props.i18n}
                    onSearchRequest={props.onSearchRequest}
                />
                <MyLocationButton
                    isVisible={props.showMyLocationButton}
                    i18n={props.i18n}
                    setIsVisible={props.setShowMyLocationButton}
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

export type LocationSetter = (location: string) => void;

const SearchButton = (props: {
    readonly searchTermInput: string,
    readonly searchLocationInput: string,
    readonly i18n: I18n,
    readonly setSearchLocationInput: LocationSetter;
    readonly saveSearchLocation: LocationSetter;
    readonly onSearchRequest: (searchTerm: string, location: string) => void,
}): JSX.Element => {
    const location = toLocationForQuery(props.searchLocationInput, props.i18n);
    return (
        <TouchableOpacity
            style={props.searchTermInput.length === 0 ? [applicationStyles.searchButton, applicationStyles.disabled] : applicationStyles.searchButton}
            disabled={props.searchTermInput.length === 0}
            onPress={(): void => { props.onSearchRequest(props.searchTermInput, location); }}
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
    readonly isVisible: boolean,
    readonly i18n: I18n,
    readonly setIsVisible: (b: boolean) => void,
    readonly setSearchLocationInput: (s: string) => void,
}): JSX.Element => {
    if (!props.isVisible) {
        return <EmptyComponent />;
    }
    return (
        <TouchableOpacity
            style={applicationStyles.locateButton}
            onPress={(): void => {
                props.setIsVisible(false);
                myLocationOnPress(props.setSearchLocationInput, props.i18n);
            }}
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
    const status = await requestLocationPermission();
    if (status === PermissionStatus.GRANTED) {
        setSearchLocationInput(i18n._(MY_LOCATION_MESSAGE_DESCRIPTOR));
    } else {
        openAppSettings();
    }
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