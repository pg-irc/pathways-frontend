// tslint:disable:no-expression-statement
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Icon } from 'native-base';
import { Trans } from '@lingui/react';
import { I18n } from '@lingui/react';
import { t } from '@lingui/macro';
import { UserLocation, LatLong } from '../../validation/latlong/types';
import { SetManualUserLocationAction } from '../../stores/manual_user_location';
import { buildGeoCoderUrl, getTextIfValidOrThrow } from '../search/api/use_fetch_lat_long_from_location';
import { toGeoCoderLatLong } from '../../validation/latlong';
import { applicationStyles, colors, textStyles, values } from '../../application/styles';
import { MY_LOCATION } from '../../application/constants';
import { getDeviceLocation, DeviceLocation } from '../../async/location';
import { isLocationFetchTimeoutError, isNoLocationPermissionError } from '../../validation/errors/is_error';

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
        />
    );
};

interface CollapsedSearchProps {
    readonly locationInputValue: string;
    readonly setSearchIsCollapsed: (b: boolean) => void;
}

const CollapsedSearch = (props: CollapsedSearchProps): JSX.Element => {
    const closeOnPress = (): void => props.setSearchIsCollapsed(false);
    const translatedLocation = props.locationInputValue === MY_LOCATION ? <Trans>My Location</Trans> : props.locationInputValue;
    return (
        <View style={[applicationStyles.searchContainer, { justifyContent: 'space-between', marginTop: 10 }]}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <LocationIcon />
                <Text style={[textStyles.paragraphStyle, { paddingVertical: 10 }]}>
                    <Trans>Near</Trans> <Text style={textStyles.paragraphBoldBlackLeft}>{translatedLocation}</Text>
                </Text>
            </View>
            <TouchableOpacity onPress={closeOnPress}>
                <CloseIcon />
            </TouchableOpacity>
        </View>
    );
};

interface ExpandedSearchProps {
    readonly locationInputValue: string;
    readonly setLocationInputValue: (s: string) => void;
    readonly isFetchingLatLng: boolean;
    readonly setIsFetchingLatLng: (b: boolean) => void;
    readonly setManualUserLocation: Props['setManualUserLocation'];
}

const ExpandedSearch = (props: ExpandedSearchProps): JSX.Element => {
    return (
        <View>
            <View style={[applicationStyles.searchContainer, { marginTop: 10 } ]}>
                <SearchInput
                    locationInputValue={props.locationInputValue}
                    setLocationInputValue={props.setLocationInputValue}
                />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 3 }}>
                <LocateButton
                    onPress={getLocateOnPress(
                        props.setIsFetchingLatLng,
                        props.setManualUserLocation,
                    )}
                    isFetchingLatLng={props.isFetchingLatLng}
                />
                <SearchButton
                    onPress={getSearchOnPress(
                        props.setIsFetchingLatLng,
                        props.locationInputValue,
                        props.setManualUserLocation,
                    )}
                    isFetchingLatLng={props.isFetchingLatLng}
                />
            </View>
        </View>
    );
};

interface SearchInputProps {
    readonly locationInputValue: string;
    readonly setLocationInputValue: (s: string) => void;
}

const SearchInput = (props: SearchInputProps): JSX.Element => (
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
                    />
                )
            }
        </I18n>
    </View>
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
    readonly isFetchingLatLng: boolean;
}

const SearchButton = (props: SearchButtonProps): JSX.Element => (
    <TouchableOpacity
        style={[
            applicationStyles.searchButton,
            {
                backgroundColor: colors.lightTeal,
                opacity: props.isFetchingLatLng ? values.disabledOpacity : 1,
            },
        ]}
        onPress={props.onPress}
        disabled={props.isFetchingLatLng}
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
        style={[
            applicationStyles.searchButton,
            {
                backgroundColor: colors.white,
                opacity: props.isFetchingLatLng ? values.disabledOpacity : 1,
            },
        ]}
        onPress={props.onPress}
        disabled={props.isFetchingLatLng}
    >
        <Icon
            type={'MaterialIcons'} name={'my-location'}
            style={{ color: colors.greyishBrown, fontSize: 16, marginRight: 5 }}
        />
        <Text style={[textStyles.button, { color: colors.greyishBrown, fontSize: 12 }]}>
            <Trans>My Location</Trans>
        </Text>
    </TouchableOpacity>
);

const getSearchOnPress = (
    setIsFetchingLatLng: (isFetchingLatLng: boolean) => void,
    locationInputValue: string,
    setManualUserLocation: Props['setManualUserLocation'],
): () => Promise<void> => async (): Promise<void> => {
    if (locationInputValue === MY_LOCATION) return;
    setIsFetchingLatLng(true);
    const latLong = await fetchLatLngFromServer(locationInputValue);
    setIsFetchingLatLng(false);

    if (!latLong) return;
    setManualUserLocation({
        label: locationInputValue,
        latLong,
    });
};

const getLocateOnPress = (
    setIsFetchingLatLng: (isFetchingLatLng: boolean) => void,
    setManualUserLocation: Props['setManualUserLocation'],
): () => Promise<void> => async (): Promise<void> => {
    setIsFetchingLatLng(true);
    const latLong = await fetchLatLngFromDevice();
    setIsFetchingLatLng(false);

    if (!latLong) return;
    setManualUserLocation({
        label: MY_LOCATION,
        latLong,
    });
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