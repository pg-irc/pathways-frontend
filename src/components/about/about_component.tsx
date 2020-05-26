import React from 'react';
import Modal from 'react-native-modal';
import { Text, Content, View } from 'native-base';
import { ParagraphComponent } from '../paragraph/paragraph_component';
import { Trans } from '@lingui/react';
import { values, textStyles, colors } from '../../application/styles';
import { Link } from '../link/link';
import { VERSION } from 'react-native-dotenv';
import { CloseButtonComponent } from '../close_button_component';
import { LinkIcon } from '../link_icon_component';

type Props = {
    readonly serverVersion: string;
    readonly isVisible: boolean;
    readonly closeModal: () => void;
};

export const AboutComponent: React.StatelessComponent<Props> = (props: Props): JSX.Element => {
    const welcomeBcUrl = 'https://www.welcomebc.ca/Start-Your-Life-in-B-C/Newcomers-Guides/Newcomers-Guide-Provincial';
    const githubUrl = 'https://github.com/pg-irc/pathways-frontend';
    const contactUrl = 'https://arrivaladvisor.ca/contact-us';
    const appVersion = wrapWithSpace(VERSION);
    const serverVersion = wrapWithSpace(props.serverVersion);
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
                            Arrival Advisor is a free, multilingual, mobile app that helps immigrants and refugees in British Columbia,
                            Canada find information and services to navigate their settlement journey. Arrival Advisor is offered in English,
                            Arabic, Chinese Simplified, Chinese Traditional, French (Canadian), Korean, Punjabi, and Tagalog.
                        </Trans>
                    </ParagraphComponent>
                    <ParagraphComponent>
                        <Trans>
                            From finding a job to learning English, accessing health care, and more, Arrival Advisor has everything
                            you need to get started in your new community. Explore topics and services without ever needing
                            to create an account. Access important information no matter where you are: the newcomer topics provided
                            by Arrival Advisor are saved to your phone so you can view them, even without internet. You can fill out
                            some questions to get personalized recommendations of topics and services to settle in British Columbia.
                            Arrival Advisor is anonymous and your answers are only used to operate the app's recommendations.
                            We never save or share your personal data with funders or any third parties.
                        </Trans>
                    </ParagraphComponent>
                    <ParagraphComponent>
                        <Trans>
                            The Arrival Advisor app is created by PeaceGeeks in partnership with settlement organizations in Metro
                            Vancouver, as well as immigrants and refugees like you. This project is possible thanks to funding by the
                            Province of British Columbia and Google.org Canada in partnership with LEAP | Pecaut Centre for Social Impact.
                            Special thanks also goes to individual donors who make this project possible. Arrival Advisor is an open-source
                            project. You can view it on <Link href={githubUrl} style={textStyles.link} >GitHub</Link><LinkIcon /> and <Link
                                href={contactUrl} style={textStyles.link} >contact us</Link><LinkIcon /> to learn how you can support this project.
                        </Trans>
                    </ParagraphComponent>
                    <ParagraphComponent>
                        <Trans>Information in this app is provided by the <Link href={welcomeBcUrl}
                            style={textStyles.link} >Newcomers Guide to British Columbia</Link><LinkIcon /> Copyright
                            2018 Province of British Columbia. All rights reserved.
                        </Trans>
                    </ParagraphComponent>
                    <ParagraphComponent>
                        <Trans>This is Arrival Advisor version:</Trans>
                        {appVersion}
                    </ParagraphComponent>
                    <ParagraphComponent>
                        <Trans>Server version:</Trans>
                        {serverVersion}
                    </ParagraphComponent>
                </Content>
            </View>
        </Modal>
    );
};

const wrapWithSpace = (textContent: JSX.Element | string): JSX.Element => (
    <Text> {textContent} </Text>
);
