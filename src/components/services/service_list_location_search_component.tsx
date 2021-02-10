// tslint:disable:no-expression-statement
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Icon } from 'native-base';
import { Trans } from '@lingui/react';
import { I18n } from '@lingui/react';
import { t } from '@lingui/macro';
import { UserLocation, LatLong } from '../../validation/latlong/types';
import { SetManualUserLocationAction } from '../../stores/manual_user_location';
import { fetchLatLongFromLocation } from '../../api/fetch_lat_long_from_location';
import { applicationStyles, colors, textStyles, values } from '../../application/styles';
import { MY_LOCATION } from '../../application/constants';
import { EmptyComponent } from '../empty_component/empty_component';
import { MY_LOCATION_MESSAGE_DESCRIPTOR, toLocationForQuery, isLocalizedMyLocation } from '../partial_localization/to_location_for_query';
import { isMyLocation } from '../../api/fetch_lat_long_from_location';
import { Topic } from '../../selectors/topics/types';
import { BuildServicesRequestAction } from '../../stores/services/actions';

interface Props {
    readonly topic: Topic;
    readonly manualUserLocation: UserLocation;
    readonly customLatLong: LatLong;
    readonly setManualUserLocation: (userLocation: UserLocation) => SetManualUserLocationAction;
    readonly dispatchServicesRequest: (topic: Topic, manualUserLocation: UserLocation) => BuildServicesRequestAction;
}

export const ServiceListLocationSearchComponent = (props: Props): JSX.Element => {
    const [locationInputValue, setLocationInputValue]: readonly [string, (s: string) => void] = useState(props.manualUserLocation.humanReadableLocation);
    const [isFetchingLatLng, setIsFetchingLatLng]: readonly [boolean, (b: boolean) => void] = useState<boolean>(false);
    const [searchIsCollapsed, setSearchIsCollapsed]: readonly [boolean, (b: boolean) => void] = useState<boolean>(!!props.manualUserLocation.humanReadableLocation);

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
        <I18n>
        {
            (({ i18n }: { readonly i18n: I18n }): JSX.Element =>
                <ExpandedSearch
                    topic={props.topic}
                    dispatchServicesRequest={props.dispatchServicesRequest}
                    locationInputValue={locationInputValue}
                    setLocationInputValue={setLocationInputValue}
                    isFetchingLatLng={isFetchingLatLng}
                    setIsFetchingLatLng={setIsFetchingLatLng}
                    setManualUserLocation={props.setManualUserLocation}
                    manualUserLocation={props.manualUserLocation}
                    setSearchIsCollapsed={setSearchIsCollapsed}
                    i18n={i18n}
                    customLatLong={props.customLatLong}
                />
            )
        }
        </I18n>
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
    readonly i18n: I18n;
    readonly topic: Topic;
    readonly dispatchServicesRequest: (topic: Topic, manualUserLocation: UserLocation) => BuildServicesRequestAction;
    readonly customLatLong: LatLong;
}

const ExpandedSearch = (props: ExpandedSearchProps): JSX.Element => {
    const searchIsDisabled = props.locationInputValue.length === 0 || props.isFetchingLatLng;
    const isCachedLocationValid = props.locationInputValue === props.manualUserLocation.humanReadableLocation;
    const collapseSearch = (): void => { props.setSearchIsCollapsed(true); };
    const lookupLocationLatLong = (): void => {
            getSearchOnPress(
            props.setIsFetchingLatLng,
            props.locationInputValue,
            props.setManualUserLocation,
            props.setSearchIsCollapsed,
            props.i18n,
            props.topic,
            props.dispatchServicesRequest,
            props.customLatLong
        );
    };
    const onSearchButtonPress = isCachedLocationValid ? collapseSearch : lookupLocationLatLong;

    return (
        <View>
            <View style={[applicationStyles.searchContainerExpanded, { marginBottom: 4 }]}>
                <SearchInput
                    locationInputValue={props.locationInputValue}
                    setLocationInputValue={props.setLocationInputValue}
                    autoFocus={!!props.manualUserLocation.humanReadableLocation}
                    i18n={props.i18n}
                />
            </View>
            <View
                style={[
                    applicationStyles.searchContainerExpanded,
                    {
                        backgroundColor: colors.teal,
                        justifyContent: hasMyLocation(props.locationInputValue, props.i18n) ? 'flex-end' : 'space-between',
                    },
                ]}
            >
                {renderLocateButtonOrEmpty(props.locationInputValue, props.isFetchingLatLng, props.i18n, props.setLocationInputValue)}
                <SearchButton
                    onPress={onSearchButtonPress}
                    isDisabled={searchIsDisabled}
                />
            </View>
        </View>
    );
};

const renderLocateButtonOrEmpty = (
    locationInputValue: string,
    isFetchingLatLng: boolean,
    i18n: I18n,
    setLocationInputValue: (s: string) => void,
): JSX.Element => {
    if (hasMyLocation(locationInputValue, i18n)) {
        return <EmptyComponent />;
    }

    return (
        <LocateButton
        onPress={getLocateOnPress(setLocationInputValue, i18n)}
        isFetchingLatLng={isFetchingLatLng}
        />
    );
};

const hasMyLocation = (locationInputValue: string, i18n: I18n): boolean => (
    isMyLocation(locationInputValue) || isLocalizedMyLocation(locationInputValue, i18n)
);

const getLocateOnPress = (setLocationInputValue: (s: string) => void, i18n: I18n): () => void => (): void => {
    setLocationInputValue(i18n._(MY_LOCATION_MESSAGE_DESCRIPTOR));
};

interface SearchInputProps {
    readonly locationInputValue: string;
    readonly autoFocus: boolean;
    readonly setLocationInputValue: (s: string) => void;
    readonly i18n: I18n;
}

const SearchInput = (props: SearchInputProps): JSX.Element => {
    const value = props.locationInputValue === MY_LOCATION ? props.i18n._(t`My Location`) : props.locationInputValue;
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
                <TextInput
                    style={applicationStyles.searchInput}
                    onChangeText={props.setLocationInputValue}
                    value={value}
                    placeholder={props.i18n._(t`Enter city, address, or postal code`)}
                    placeholderTextColor={colors.greyishBrown}
                    selectionColor={colors.black}
                    autoFocus={props.autoFocus}
                    returnKeyType={'done'}
                />
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

const getSearchOnPress = async (
    setIsFetchingLatLng: (isFetchingLatLng: boolean) => void,
    locationInputValue: string,
    setManualUserLocation: Props['setManualUserLocation'],
    setSearchIsCollapsed: (b: boolean) => void,
    i18n: I18n,
    topic: Topic,
    dispatchServicesRequest: (topic: Topic, manualUserLocation: UserLocation) => BuildServicesRequestAction,
    customLatLong: LatLong
): Promise<void> => {
    const location = toLocationForQuery(locationInputValue, i18n);
    setSearchIsCollapsed(true);
    setIsFetchingLatLng(true);
    try {
        const latLong = await fetchLatLongFromLocation(location, customLatLong);
        setManualUserLocation({
            humanReadableLocation: locationInputValue,
            latLong: latLong,
        });
        dispatchServicesRequest(topic, { humanReadableLocation: locationInputValue, latLong: latLong });
    } finally {
        setIsFetchingLatLng(false);
    }
};