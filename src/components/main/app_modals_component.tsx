import React from 'react';
import { RegionCode } from '../../validation/region/types';
import { AboutComponentWithServerVersion } from '../about/about_component_with_server_version';
import { DisclaimerComponent } from '../disclaimer/disclaimer_component';

type Props = {
    readonly isAboutModalVisible: boolean;
    readonly isDisclaimerModalVisible: boolean;
    readonly region: RegionCode;
    readonly closeAboutModal: () => void;
    readonly closeDisclaimerModal: () => void;
};

export const AppModalsComponent = (props: Props): JSX.Element => (
    <>
        <AboutComponentWithServerVersion
            isVisible={props.isAboutModalVisible}
            closeModal={props.closeAboutModal}
            region={props.region}
        />
        <DisclaimerComponent
            isVisible={props.isDisclaimerModalVisible}
            closeModal={props.closeDisclaimerModal}
        />
    </>
);