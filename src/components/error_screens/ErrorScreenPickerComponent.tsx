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

type ErrorScreenPickerComponentProps = {
    readonly errorType: Errors;
    readonly refreshScreen: () => void;
    readonly errorScreenHeaderComponent?: JSX.Element;
};

export const ErrorScreenPickerComponent = (props: ErrorScreenPickerComponentProps): JSX.Element => {
    const sharedProps = {
        refreshScreen: props.refreshScreen,
        errorScreenHeaderComponent: props.errorScreenHeaderComponent,
    };
    switch (props.errorType) {
        case Errors.Offline:
            return (
                <ErrorScreenComponent
                    title={<Trans>Can't reach the internet</Trans>}
                    subTitle={
                        <Trans>
                            Services are not available offline.
                            Please connect to the internet and try again.
                        </Trans>
                    }
                    imageSource={noInternet}
                    {...sharedProps}
                />
            );
        case Errors.NoLocationPermission:
            return (
                <ErrorScreenComponent
                    title={<Trans>Enable location services</Trans>}
                    subTitle={
                        <Trans>
                            To find services, please turn on Location Services
                            for Arrival Advisor in Settings and try again.
                        </Trans>
                    }
                    imageSource={locationOff}
                    {...sharedProps}
                />
            );
        case Errors.LocationFetchTimeout:
            return (
                <ErrorScreenComponent
                    title={<Trans>Check location services</Trans>}
                    subTitle={
                        <Trans>
                            It took too long finding your location.
                            Setting your device's Location Services to “High Accuracy” can sometimes fix this problem.
                        </Trans>
                    }
                    imageSource={locationTimeout}
                    {...sharedProps}
                />
            );
        case Errors.InvalidServerData:
        case Errors.BadServerResponse:
            return (
                <ErrorScreenComponent
                    title={<Trans>Server error</Trans>}
                    subTitle={
                        <Trans>
                            We’re having difficulty connecting to the server.
                            Please try again later.
                        </Trans>
                    }
                    imageSource={serverError}
                    {...sharedProps}
                />
            );
        case Errors.NoTopicServicesFound:
            return (
                <ErrorScreenComponent
                    title={<Trans>No related services found</Trans>}
                    imageSource={noResults}
                    {...sharedProps}
                />
            );
        default:
        case Errors.Exception:
            return (
                <ErrorScreenComponent
                    title={<Trans>An error occured</Trans>}
                    imageSource={arrivalAdvisorGlyphLogo}
                    {...sharedProps}
                />
            );
    }
};
