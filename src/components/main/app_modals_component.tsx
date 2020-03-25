import React from 'react';
import { AboutComponentWithServerVersion } from '../about/about_component_with_server_version';
import { DisclaimerComponent } from '../disclaimer/disclaimer_component';
import { HeaderMenuStore } from '../../stores/header_menu';

type Props = {
    readonly headerMenuState: HeaderMenuStore;
    readonly closeAboutModal: () => void;
    readonly closeDisclaimerModal: () => void;
};

export const AppModalsComponent = (props: Props): JSX.Element => {
    return (
        <>
            <AboutComponentWithServerVersion
                isVisible={isAboutModalVisible(props.headerMenuState)}
                closeModal={props.closeAboutModal}
            />
            <DisclaimerComponent
                isVisible={isDisclaimerModalVisible(props.headerMenuState)}
                closeModal={props.closeDisclaimerModal}
            />
        </>
    );
};

const isAboutModalVisible = (headerMenuState: HeaderMenuStore): boolean => (
    headerMenuState === HeaderMenuStore.AboutModalIsOpen
);

const isDisclaimerModalVisible = (headerMenuState: HeaderMenuStore): boolean => (
    headerMenuState === HeaderMenuStore.DisclaimerModalIsOpen
);