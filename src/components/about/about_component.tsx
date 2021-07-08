import React from 'react';
import Modal from 'react-native-modal';
import { Text, Content, View } from 'native-base';
import { Image } from 'react-native';
import { ParagraphComponent } from '../paragraph/paragraph_component';
import { Trans } from '@lingui/react';
import { values, textStyles, colors } from '../../application/styles';
import { Link } from '../link/link_component';
import { VERSION, ALGOLIA_SERVICES_INDEX } from 'react-native-dotenv';
import { CloseButtonComponent } from '../close_button_component';
import { RegionCode } from '../../validation/region/types';
import { welcomeBCLogo, bc211Logo, mbStartLogo, mb211Logo } from '../../application/images';

type Props = {
    readonly serverVersion: string;
    readonly isVisible: boolean;
    readonly region: RegionCode;
    readonly closeModal: () => void;
};

export const AboutComponent: React.StatelessComponent<Props> = (props: Props): JSX.Element => {
    const githubUrl = 'https://github.com/pg-irc/pathways-frontend';
    const contactUrl = 'https://arrivaladvisor.ca/contact-us';
    return (
        <Modal isVisible={props.isVisible}>
            <View padder style={{ backgroundColor: colors.white, borderRadius: 5, flex: 1 }}>
                <CloseButtonComponent
                    onPress={props.closeModal}
                    color={colors.black}
                    additionalStyle={{ paddingTop: 0, paddingRight: 0 }}
                />
                <Content>
                    <Text style={[textStyles.headlineH1StyleBlackLeft, { paddingHorizontal: values.backgroundTextPadding }]}>
                        <Trans>About Arrival Advisor</Trans>
                    </Text>
                    <ParagraphComponent>
                        <Trans>
                            Arrival Advisor is a free, multilingual, mobile app that helps immigrants and refugees in Canada
                            find information and services to navigate their settlement journey. Arrival Advisor is offered in multiple languages.
                        </Trans>
                    </ParagraphComponent>
                    <ParagraphComponent>
                        <Trans>
                            The newcomer topics provided by Arrival Advisor are saved to your phone so you can view them, even without internet.
                            Arrival Advisor is anonymous and your answers are only used to operate the app's recommendations.
                            We never save or share your personal data with funders or any third parties.

                        </Trans>
                    </ParagraphComponent>
                    <ParagraphComponent>
                        <Trans>
                            The Arrival Advisor app is created by PeaceGeeks in partnership with settlement organizations and immigrants and
                            refugees like you. Arrival Advisor is an open-source project.
                            You can view it on <Link href={githubUrl} style={textStyles.link} >GitHub</Link> and&#160;
                            <Link href={contactUrl} style={textStyles.link} >contact us</Link> to learn how you can support this project.
                        </Trans>
                    </ParagraphComponent>
                    <ParagraphComponent>
                        <Trans>This is Arrival Advisor version:</Trans> {VERSION}
                    </ParagraphComponent>
                    <ParagraphComponent>
                        <Trans>Server version:</Trans> {props.serverVersion}
                    </ParagraphComponent>
                    <ParagraphComponent>
                        <Trans>Index:</Trans> {ALGOLIA_SERVICES_INDEX}
                    </ParagraphComponent>
                    <Text style={[textStyles.headlineH2StyleBlackLeft, { paddingHorizontal: values.backgroundTextPadding, paddingBottom: 20}]}>
                        <Trans>Information in Arrival Advisor</Trans>
                    </Text>
                    <RegionSpecificInformation {...props} />
                </Content>
            </View>
        </Modal>
    );
};

const RegionSpecificInformation = (props: { readonly region: RegionCode }): JSX.Element => {
    if (props.region === RegionCode.BC) {
        return (
            <BCSpecificInformation/>
        );
    } else {
        return (
            <MBSpecificInformation/>
        );
    }
};

const BCSpecificInformation = (): JSX.Element => {
    const welcomeBcUrl = 'https://www.welcomebc.ca/Start-Your-Life-in-B-C/Newcomers-Guides/Newcomers-Guide-Provincial';
    const bc211Url = 'http://www.bc211.ca/';
    return (
        <View>
            <ParagraphComponent>
                <Trans>
                    Topics in this app come from <Link href={welcomeBcUrl} style={textStyles.link}>Newcomers'
                    Guide to British Columbia</Link>. Copyright 2018 Province of British Columbia. All rights reserved.
                </Trans>
            </ParagraphComponent>
            <ParagraphComponent>
                <Trans>Services come from <Link href={bc211Url}style={textStyles.link}>BC211</Link>.</Trans>
            </ParagraphComponent>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start'}}>
                <Image source={welcomeBCLogo} style={{height: 72, width: 172, marginRight: 16}} />
                <Image source={bc211Logo} style={{height: 72, width: 109}} />
            </View>
        </View>
    );
};

const MBSpecificInformation = (): JSX.Element => {
    const mb211Url = 'https://mb.211.ca/';
    return (
        <View>
            <ParagraphComponent>
                <Trans>Topics in this app come from the Winnipeg Introduction for Newcomers Workbook and Fact Sheets.</Trans>
            </ParagraphComponent>
            <ParagraphComponent>
                <Trans>Services come from <Link href={mb211Url} style={textStyles.link}>211 Manitoba</Link>.</Trans>
            </ParagraphComponent>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start'}}>
                <Image source={mbStartLogo} style={{height: 72, width: 95, marginRight: 16}} />
                <Image source={mb211Logo} style={{height: 72, width: 149}} />
            </View>
        </View>
    );
};