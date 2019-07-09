import React from 'react';
import { AboutComponentWithServerVersion } from '../about/about_component_with_server_version';
import { DisclaimerComponent } from '../disclaimer/disclaimer_component';

type Props = {
    readonly isAboutVisible: boolean;
    readonly isDisclaimerVisible: boolean;
    readonly closeAboutModal: () => void;
    readonly closeDisclaimerModal: () => void;
};

export const AppModalsComponent: React.StatelessComponent<Props> = (props: Props): JSX.Element => {
    return (
        <>
            <AboutComponentWithServerVersion
                isVisible={props.isAboutVisible}
                closeModal={props.closeAboutModal}
            />
            <DisclaimerComponent
                isVisible={props.isDisclaimerVisible}
                closeModal={props.closeDisclaimerModal}
            />
        </>
    );
};