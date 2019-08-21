import React from 'react';
import { Trans } from '@lingui/react';
import { Errors } from '../../errors/types';
import {
    noInternet,
    locationOff,
    locationTimeout,
    serverError,
    arrivalAdvisorGlyphLogo,
} from '../../application/images';
import { ErrorScreenComponent } from './ErrorScreenComponent';
import { AppSettingsButtonComponent, SettingsType } from '../app_settings_button/app_settings_button_component';
import { isAndroid } from '../../helpers/is_os';

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
        default:
        case Errors.Exception:
            return (
                <ErrorScreenComponent
                    imageSource={arrivalAdvisorGlyphLogo}
                    title={<Trans>An error occured</Trans>}
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
        default:
            return undefined;
    }
};
