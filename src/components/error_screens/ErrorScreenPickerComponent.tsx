import React from 'react';
import { Trans } from '@lingui/react';
import { Errors } from '../../errors/types';
import {
    noInternet,
    locationOff,
    locationTimeout,
    serverError,
    noResults,
    arrivalAdvisorGlyphLogo,
} from '../../application/images';
import { ErrorScreenComponent } from './ErrorScreenComponent';
import { LocationSettingsButtonComponent } from '../location_settings_button/location_settings_button_component';

type ErrorScreenPickerComponentProps = {
    readonly errorType: Errors;
    readonly refreshScreen: () => void;
    readonly errorScreenHeader?: JSX.Element;
};

export const ErrorScreenPickerComponent = (props: ErrorScreenPickerComponentProps): JSX.Element => {
    const sharedProps = {
        refreshScreen: props.refreshScreen,
        header: props.errorScreenHeader,
    };
    switch (props.errorType) {
        case Errors.Offline:
            return (
                <ErrorScreenComponent
                    imageSource={noInternet}
                    title={<Trans>Can't reach the internet</Trans>}
                    subTitle={
                        <Trans>
                            Services are not available offline.
                            Please connect to the internet and try again.
                        </Trans>
                    }
                    {...sharedProps}
                />
            );
        case Errors.NoLocationPermission:
            return (
                <ErrorScreenComponent
                    imageSource={locationOff}
                    title={<Trans>Enable location services</Trans>}
                    subTitle={
                        <Trans>
                            To find services, please turn on Location Services
                            for Arrival Advisor in Settings and try again.
                        </Trans>
                    }
                    additionalContent={<LocationSettingsButtonComponent />}
                    {...sharedProps}
                />
            );
        case Errors.LocationFetchTimeout:
            return (
                <ErrorScreenComponent
                    imageSource={locationTimeout}
                    title={<Trans>Check location services</Trans>}
                    subTitle={
                        <Trans>
                            It took too long finding your location.
                            Setting your device's Location Services to “High Accuracy” can sometimes fix this problem.
                        </Trans>
                    }
                    additionalContent={<LocationSettingsButtonComponent />}
                    {...sharedProps}
                />
            );
        case Errors.InvalidServerData:
        case Errors.BadServerResponse:
            return (
                <ErrorScreenComponent
                    imageSource={serverError}
                    title={<Trans>Server error</Trans>}
                    subTitle={
                        <Trans>
                            We’re having difficulty connecting to the server.
                            Please try again later.
                        </Trans>
                    }
                    {...sharedProps}
                />
            );
        case Errors.NoTopicServicesFound:
            return (
                <ErrorScreenComponent
                    imageSource={noResults}
                    title={<Trans>No related services found</Trans>}
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
