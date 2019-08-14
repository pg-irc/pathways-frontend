import React from 'react';
import { Trans } from '@lingui/react';
import { ErrorScreenComponent } from './ErrorScreenComponent';
import { noInternet } from '../../application/images';

interface Props {
    readonly refresh: () => void;
}

export const DeviceOfflineComponent = (props: Props): JSX.Element => (
    <ErrorScreenComponent
        title={<Trans>Can't reach the internet</Trans>}
        subTitle={<Trans>Services are not available offline. Please connect to the internet and try again.</Trans>}
        imageSource={noInternet}
        refresh={props.refresh}
    />
);
