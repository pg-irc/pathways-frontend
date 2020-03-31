import React from 'react';
import { AboutComponentWithServerVersion } from '../about/about_component_with_server_version';
import { DisclaimerComponent } from '../disclaimer/disclaimer_component';

type Props = {
    readonly isAboutModalVisible: boolean;
    readonly isDisclaimerModalVisible: boolean;
    readonly closeAboutModal: () => void;
    readonly closeDisclaimerModal: () => void;
};

export const AppModalsComponent = (props: Props): JSX.Element => (
    <>
        <AboutComponentWithServerVersion
            isVisible={props.isAboutModalVisible}
            closeModal={props.closeAboutModal}
        />
        <DisclaimerComponent
            isVisible={props.isDisclaimerModalVisible}
            closeModal={props.closeDisclaimerModal}
        />
    </>
);