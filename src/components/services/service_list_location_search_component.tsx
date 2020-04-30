// tslint:disable:no-expression-statement
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Icon } from 'native-base';
import { Trans } from '@lingui/react';
import { I18n } from '@lingui/react';
import { t } from '@lingui/macro';
import { UserLocation, LatLong } from '../../validation/latlong/types';
import { SetManualUserLocationAction } from '../../stores/manual_user_location';
import { buildGeoCoderUrl, getTextIfValidOrThrow } from '../search/api/fetch_lat_long_from_location';
import { toGeoCoderLatLong } from '../../validation/latlong';
import { applicationStyles, colors, textStyles, values } from '../../application/styles';
import { MY_LOCATION } from '../../application/constants';
import { getDeviceLocation, DeviceLocation } from '../../application/helpers/get_device_location';
import { isLocationFetchTimeoutError, isNoLocationPermissionError } from '../../validation/errors/is_error';
import { EmptyComponent } from '../empty_component/empty_component';

interface Props {
    readonly manualUserLocation: UserLocation;
    readonly setManualUserLocation: (userLocation: UserLocation) => SetManualUserLocationAction;
}

export const ServiceListLocationSearchComponent = (props: Props): JSX.Element => {
    const [locationInputValue, setLocationInputValue]: readonly [string, (s: string) => void] = useState(props.manualUserLocation.label);
    const [isFetchingLatLng, setIsFetchingLatLng]: readonly [boolean, (b: boolean) => void] = useState<boolean>(false);
    const [searchIsCollapsed, setSearchIsCollapsed]: readonly [boolean, (b: boolean) => void] = useState<boolean>(!!props.manualUserLocation.label);

    if (searchIsCollapsed) {
        return (
            <CollapsedSearch
                locationInputValue={locationInputValue}
                setLocationInputValue={setLocationInputValue}
                setSearchIsCollapsed={setSearchIsCollapsed}
            />
        );
    }

    return (
        <ExpandedSearch
            locationInputValue={locationInputValue}
            setLocationInputValue={setLocationInputValue}
            isFetchingLatLng={isFetchingLatLng}
            setIsFetchingLatLng={setIsFetchingLatLng}
            setManualUserLocation={props.setManualUserLocation}
            manualUserLocation={props.manualUserLocation}
            setSearchIsCollapsed={setSearchIsCollapsed}
        />
    );
};

interface CollapsedSearchProps {
    readonly locationInputValue: string;
    readonly setSearchIsCollapsed: (b: boolean) => void;
    readonly setLocationInputValue: (s: string) => void;
}

const CollapsedSearch = (props: CollapsedSearchProps): JSX.Element => {
    const clearOnPress = (): void => {
        props.setSearchIsCollapsed(false);
        props.setLocationInputValue('');
    };
    const wrapperOnPress = (): void => {
        props.setSearchIsCollapsed(false);
    };
    const locationLabel = props.locationInputValue ? <><Trans>Near</Trans>{' '}</> : undefined;
    const locationText = props.locationInputValue === MY_LOCATION ? <Trans>My Location</Trans> : props.locationInputValue;
    return (
        <TouchableOpacity onPress={wrapperOnPress} style={applicationStyles.searchContainerCollapsed}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <LocationIcon />
                <Text style={[textStyles.paragraphStyle, { paddingVertical: 10 }]}>
                    {locationLabel}
                    <Text style={textStyles.paragraphBoldBlackLeft}>{locationText}</Text>
                </Text>
            </View>
            <ClearButton onPress={clearOnPress}/>
        </TouchableOpacity>
    );
};

interface ExpandedSearchProps {
    readonly locationInputValue: string;
    readonly setLocationInputValue: (s: string) => void;
    readonly isFetchingLatLng: boolean;
    readonly setIsFetchingLatLng: (b: boolean) => void;
    readonly setManualUserLocation: Props['setManualUserLocation'];
    readonly manualUserLocation: Props['manualUserLocation'];
    readonly setSearchIsCollapsed: (b: boolean) => void;
}

const ExpandedSearch = (props: ExpandedSearchProps): JSX.Element => {
    const hasMyLocation = props.locationInputValue === MY_LOCATION;
    const LocateButtonOrEmpty = !hasMyLocation ?
        <LocateButton
            onPress={getLocateOnPress(props.setLocationInputValue)}
            isFetchingLatLng={props.isFetchingLatLng}
        />
        :
        <EmptyComponent />;
    const searchIsDisabled = props.locationInputValue.length === 0 || props.isFetchingLatLng;
    return (
        <View>
            <View style={[applicationStyles.searchContainerExpanded, { marginBottom: 4 }]}>
                <SearchInput
                    locationInputValue={props.locationInputValue}
                    setLocationInputValue={props.setLocationInputValue}
                    autoFocus={!!props.manualUserLocation.label}
                />
            </View>
            <View
                style={[
                    applicationStyles.searchContainerExpanded,
                    {
                        backgroundColor: colors.teal,
                        justifyContent: hasMyLocation ? 'flex-end' : 'space-between',
                    },
                ]}
            >
                {LocateButtonOrEmpty}
                <SearchButton
                    onPress={getSearchOnPress(
                        props.setIsFetchingLatLng,
                        props.locationInputValue,
                        props.setManualUserLocation,
                        props.setSearchIsCollapsed,
                        props.locationInputValue === props.manualUserLocation.label,
                    )}
                    isDisabled={searchIsDisabled}
                />
            </View>
        </View>
    );
};

interface SearchInputProps {
    readonly locationInputValue: string;
    readonly autoFocus: boolean;
    readonly setLocationInputValue: (s: string) => void;
}

const SearchInput = (props: SearchInputProps): JSX.Element => {
    const clearOnPress = (): void => {
        props.setLocationInputValue('');
    };
    const ClearButtonOrEmpty = props.locationInputValue ?
        <ClearButton onPress={clearOnPress} />
        :
        <EmptyComponent />;
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <LocationIcon />
            <I18n>
                {
                    (({ i18n }: { readonly i18n: I18n }): JSX.Element =>
                        <TextInput
                            style={applicationStyles.searchInput}
                            onChangeText={props.setLocationInputValue}
                            value={props.locationInputValue}
                            placeholder={i18n._(t`Enter city, address, or postal code`)}
                            placeholderTextColor={colors.greyishBrown}
                            selectionColor={colors.black}
                            autoFocus={props.autoFocus}
                        />
                    )
                }
            </I18n>
            {ClearButtonOrEmpty}
        </View>
    );
};

const ClearButton = (props: { readonly onPress: () => void }): JSX.Element => (
    <TouchableOpacity onPress={props.onPress}>
        <CloseIcon />
    </TouchableOpacity>
);

const LocationIcon = (): JSX.Element => (
    <Icon
        name={'location-on'}
        type='MaterialIcons'
        style={{ color: colors.teal, fontSize: values.smallIconSize, padding: 10 }}
    />
);

const CloseIcon = (): JSX.Element => (
    <Icon
        name={'window-close'}
        type='MaterialCommunityIcons'
        style={{ color: colors.black, fontSize: values.smallIconSize, padding: 10 }}
    />
);

interface SearchButtonProps {
    readonly onPress: () => void;
    readonly isDisabled: boolean;
}

const SearchButton = (props: SearchButtonProps): JSX.Element => (
    <TouchableOpacity
        style={props.isDisabled ? [applicationStyles.searchButton, applicationStyles.disabled] : applicationStyles.searchButton}
        onPress={props.onPress}
        disabled={props.isDisabled}
    >
        <Text style={[textStyles.button, { fontSize: 16 }]}>
            <Trans>Search</Trans>
        </Text>
    </TouchableOpacity>
);

interface LocateButtonProps {
    readonly onPress: () => void;
    readonly isFetchingLatLng: boolean;
}

const LocateButton = (props: LocateButtonProps): JSX.Element => (
    <TouchableOpacity
        style={props.isFetchingLatLng ? [applicationStyles.locateButton, applicationStyles.disabled] : applicationStyles.locateButton}
        onPress={props.onPress}
        disabled={props.isFetchingLatLng}
    >
        <Icon
            type={'MaterialIcons'} name={'my-location'}
            style={{ color: colors.greyishBrown, fontSize: 16, marginRight: 5 }}
        />
        <Text style={[textStyles.button, { color: colors.greyishBrown, fontSize: 12, padding: 3 }]}>
            <Trans>My Location</Trans>
        </Text>
    </TouchableOpacity>
);

const getSearchOnPress = (
    setIsFetchingLatLng: (isFetchingLatLng: boolean) => void,
    locationInputValue: string,
    setManualUserLocation: Props['setManualUserLocation'],
    setSearchIsCollapsed: (b: boolean) => void,
    locationIsUnchanged: boolean,
): () => void => (): void => {
    setSearchIsCollapsed(true);
    if (locationIsUnchanged) {
        return;
    }
    if (locationInputValue === MY_LOCATION) {
        fetchLatLng(
            setIsFetchingLatLng,
            fetchLatLngFromDevice,
            setManualUserLocation,
            MY_LOCATION,
        );
    } else {
        fetchLatLng(
            setIsFetchingLatLng,
            () => fetchLatLngFromServer(locationInputValue),
            setManualUserLocation,
            locationInputValue,
        );
    }
};

const getLocateOnPress = (
    setLocationInputValue: (s: string) => void,
): () => void => (): void => {
    setLocationInputValue(MY_LOCATION);
};

const fetchLatLng = async (
    setIsFetchingLatLng: (isFetchingLatLng: boolean) => void,
    fetchFn: () => Promise<LatLong | undefined>,
    setManualUserLocation: Props['setManualUserLocation'],
    locationLabel: string,
): Promise<void> => {
    setIsFetchingLatLng(true);
    const latLong = await fetchFn().catch(handleFetchError);
    setIsFetchingLatLng(false);
    setManualUserLocation({
        label: locationLabel,
        latLong,
    });
};

const handleFetchError = (error: string): undefined => {
    console.log(error);
    return undefined;
};

// TODO: These both may be handy elsewhere and could be moved into a helper file.
const fetchLatLngFromServer = async (locationValue: string): Promise<LatLong | undefined> => (
    fetch(buildGeoCoderUrl(locationValue))
        .then(getTextIfValidOrThrow)
        .then(JSON.parse)
        .then(toGeoCoderLatLong)
        .catch((error: string) => {
            console.log(error);
            return undefined;
        })
);

const fetchLatLngFromDevice = async (): Promise<LatLong | undefined> => {
    const deviceLocationResponse: DeviceLocation = await getDeviceLocation();
    if (isNoLocationPermissionError(deviceLocationResponse) || isLocationFetchTimeoutError(deviceLocationResponse)) {
        return undefined;
    }
    return {
        lat: deviceLocationResponse.coords.latitude,
        lng: deviceLocationResponse.coords.longitude,
    };
};
