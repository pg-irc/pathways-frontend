import React from 'react';
import { Text, Content } from 'native-base';
import { ParagraphComponent } from '../paragraph/paragraph_component';
import { Trans } from '@lingui/react';
import { values, textStyles, colors } from '../../application/styles';
import { Link } from '../link/link';
import { VERSION } from 'react-native-dotenv';

export interface AboutComponentProps {
    readonly serverVersion: string;
}

export const AboutComponent: React.StatelessComponent<AboutComponentProps> = (props: AboutComponentProps): JSX.Element => {
    const welcomeBcUrl = 'https://www.welcomebc.ca/Start-Your-Life-in-B-C/Newcomers-Guides/Newcomers-Guide-Provincial';
    const githubUrl = 'https://github.com/pg-irc/pathways-frontend';
    const contactUrl = 'https://arrivaladvisor.ca/contact-us';
    const appVersion = wrapWithSpace(VERSION);
    const serverVersion = wrapWithSpace(props.serverVersion);
    return (
        <Content padder style={{ backgroundColor: colors.white }}>
            <Text style={[textStyles.headlineH1StyleBlackLeft, { paddingHorizontal: values.backgroundTextPadding }]}>
                <Trans>About Arrival Advisor</Trans>
            </Text>
            <ParagraphComponent>
                <Trans>
                    Arrival Advisor is a free, multilingual, mobile app that helps immigrants and refugees in British Columbia,
                    Canada find information and services to navigate their settlement journey. The app is currently available
                    in English, French (Canadian), and Arabic. It will soon be available in Chinese Simplified, Chinese
                    Traditional, Korean, Punjabi, and Tagalog.
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
                    project. You can <Link href={githubUrl} style={textStyles.paragraphURL} >view it on GitHub</Link> and <Link
                        href={contactUrl} style={textStyles.paragraphURL} >contact us</Link> to learn how you can support this project.
                </Trans>
            </ParagraphComponent>
            <ParagraphComponent>
                <Trans>Information in this app is provided by the <Link href={welcomeBcUrl}
                    style={textStyles.paragraphURL} >Newcomer's Guide to British Columbia</Link> Copyright
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
    );
};

export const wrapWithSpace = (textContent: JSX.Element | string): JSX.Element => (
    <Text> {textContent} </Text>
);
