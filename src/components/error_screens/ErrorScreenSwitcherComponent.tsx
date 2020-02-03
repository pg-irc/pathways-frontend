import React from 'react';
import { Trans } from '@lingui/react';
import { Errors } from '../../validation/errors/types';
import {
    noInternet,
    locationOff,
    locationTimeout,
    serverError,
    arrivalAdvisorGlyphLogo,
    noMatchingSearchResults,
    invalidSearchLocation,
} from '../../application/images';
import { ErrorScreenComponent } from './ErrorScreenComponent';
import { AppSettingsButtonComponent, SettingsType } from '../app_settings_button/app_settings_button_component';
import { isAndroid } from '../../helpers/is_android';
import { View, Text } from 'native-base';
import { textStyles, bulletPoint } from '../../application/styles';

type ErrorScreenSwitcherComponentProps = {
    readonly errorType: Errors;
    readonly refreshScreen: () => void;
    readonly header?: JSX.Element;
};

export const ErrorScreenSwitcherComponent = (props: ErrorScreenSwitcherComponentProps): JSX.Element => {
    const sharedProps = {
        refreshScreen: props.refreshScreen,
        header: props.header,
    };
    switch (props.errorType) {
        case Errors.Offline:
            return (
                <ErrorScreenComponent
                    imageSource={noInternet}
                    title={<Trans>Can't reach the internet</Trans>}
                    subTitle={getSubTitleForError(Errors.Offline)}
                    {...sharedProps}
                />
            );
        case Errors.NoLocationPermission:
            return (
                <ErrorScreenComponent
                    imageSource={locationOff}
                    title={<Trans>Enable location services</Trans>}
                    subTitle={getSubTitleForError(Errors.NoLocationPermission)}
                    additionalContent={getAdditionalContentForError(Errors.NoLocationPermission)}
                    {...sharedProps}
                />
            );
        case Errors.LocationFetchTimeout:
            return (
                <ErrorScreenComponent
                    imageSource={locationTimeout}
                    title={<Trans>Check location services</Trans>}
                    subTitle={getSubTitleForError(Errors.LocationFetchTimeout)}
                    additionalContent={getAdditionalContentForError(Errors.LocationFetchTimeout)}
                    {...sharedProps}
                />
            );
        case Errors.InvalidServerData:
        case Errors.BadServerResponse:
            return (
                <ErrorScreenComponent
                    imageSource={serverError}
                    title={<Trans>Server error</Trans>}
                    subTitle={getSubTitleForError(Errors.BadServerResponse)}
                    {...sharedProps}
                />
            );
        case Errors.NoMatchingSearchResults:
            return (
                <ErrorScreenComponent
                    imageSource={noMatchingSearchResults}
                    title={<Trans>Your search did not match any services. Try to:</Trans>}
                    additionalContent={getAdditionalContentForError(Errors.NoMatchingSearchResults)}
                    {...sharedProps}
                />
            );
        case Errors.InvalidSearchLocation:
            return (
                <ErrorScreenComponent
                    imageSource={invalidSearchLocation}
                    title={<Trans>Invalid location. Try:</Trans>}
                    additionalContent={getAdditionalContentForError(Errors.InvalidSearchLocation)}
                    {...sharedProps}
                />
            )
        default:
        case Errors.Exception:
            return (
                <ErrorScreenComponent
                    imageSource={arrivalAdvisorGlyphLogo}
                    title={<Trans>An error occurred</Trans>}
                    {...sharedProps}
                />
            );
    }
};

const getSubTitleForError = (error: Errors): JSX.Element | undefined => {
    switch (error) {
        case Errors.Offline:
            return (
                <Trans>
                    Services are not available offline.
                    Please connect to the internet and try again.
                </Trans>
            );
        case Errors.NoLocationPermission:
            return (
                <Trans>
                    To find services, please turn on Location Services
                    for Arrival Advisor in Settings and try again.
                </Trans>
            );
        case Errors.LocationFetchTimeout:
            return isAndroid() ?
                <Trans>
                    It took too long finding your location.
                    Setting your device's Location Services to “High Accuracy” can sometimes fix this problem.
                </Trans>
                :
                <Trans>It took too long finding your location.</Trans>;
        case Errors.InvalidServerData:
        case Errors.BadServerResponse:
            return (
                <Trans>
                    We’re having difficulty connecting to the server.
                    Please try again later.
                </Trans>
            );
        default:
            return undefined;
    }
};

const getAdditionalContentForError = (error: Errors): JSX.Element | undefined => {
    switch (error) {
        case (Errors.NoLocationPermission):
            return isAndroid() ?
                <AppSettingsButtonComponent settingsType={SettingsType.AndroidAppSettings} />
                :
                <AppSettingsButtonComponent settingsType={SettingsType.IOSAppSettings} />;
        case (Errors.LocationFetchTimeout):
            return isAndroid() ?
                <AppSettingsButtonComponent settingsType={SettingsType.AndroidAppLocation} />
                :
                undefined;
        case (Errors.NoMatchingSearchResults):
            return renderNoMatchingResultsSuggestions();
        case (Errors.InvalidSearchLocation):
            return renderInvalidSearchLocationSuggestions();
        default:
            return undefined;
    }
};

const renderNoMatchingResultsSuggestions = (): JSX.Element => (
    <View>
        <Text style={textStyles.paragraphStyleBrown}>
            {bulletPoint} <Trans>Search for a different keyword</Trans>
        </Text>
        <Text style={textStyles.paragraphStyleBrown}>
            {bulletPoint} <Trans>Double check for spelling</Trans>
        </Text>
        <Text style={textStyles.paragraphStyleBrown}>
            {bulletPoint} <Trans>Ensure your search is in English</Trans>
        </Text>
    </View>
);

const renderInvalidSearchLocationSuggestions = (): JSX.Element => (
    <View>
        <Text style={textStyles.paragraphStyleBrown}>
            {bulletPoint} <Trans>My location</Trans>
        </Text>
        <Text style={textStyles.paragraphStyleBrown}>
            {bulletPoint} <Trans>City - "Vancouver"</Trans>
        </Text>
        <Text style={textStyles.paragraphStyleBrown}>
            {bulletPoint} <Trans>Street - "Kingsway"</Trans>
        </Text>
        <Text style={textStyles.paragraphStyleBrown}>
            {bulletPoint} <Trans>Postal Code - "V5Y 1V4" </Trans>
        </Text>
    </View>
);