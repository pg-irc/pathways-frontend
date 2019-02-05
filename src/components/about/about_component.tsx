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
    const welcomeBCLink = <Link href={welcomeBcUrl} text={'Newcomer\'s Guide to British Columbia'} style={textStyles.paragraphURL} />;
    const githubUrl = 'https://github.com/pg-irc/pathways-frontend';
    const githubLink = <Link href={githubUrl} text={'view it on GitHub'} style={textStyles.paragraphURL} />;
    const contactUrl = 'https://peacegeeks.org/contact';
    const contactLink = <Link href={contactUrl} text={'contact us'} style={textStyles.paragraphURL} />;
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
                    you need to get started in your new community. Explore newcomer topics and services without ever needing
                    to create an account. Access important information no matter where you are: the newcomer topics provided
                    by Arrival Advisor are saved to your phone so you can view them, even without internet. You can fill out
                    some questions to get personalized recommendations of topics and services to settle in British Columbia.
                    Arrival Advisor is anonymous and your answers are only used to operate the app's recommendations.
                    We never save or share your personal data with funders or any third parties.
            </Trans>
            </ParagraphComponent>
            <ParagraphComponent>
                <Trans>
                    The Arrival Advisor app is designed in partnership with settlement providers in Metro Vancouver, and
                    immigrants and refugees like you. We gratefully acknowledge the financial support of the Province of
                    British Columbia through the Ministry of Jobs, Trade and Technology, as well as Google.org Canada.
                    Special thanks also goes to individual donors who make this project possible. Arrival Advisor is an
                    open-source project. You can {githubLink} and {contactLink} to learn how you can support this project.
            </Trans>
            </ParagraphComponent>
            <ParagraphComponent>
                <Trans>
                    Information in this app is provided by the {welcomeBCLink} Copyright 2018 Province of British Columbia.
                    All rights reserved.
                </Trans>
            </ParagraphComponent>
            <ParagraphComponent>
                <Trans>
                    This is Arrival Advisor version: {VERSION}
                </Trans>
            </ParagraphComponent>
            <ParagraphComponent>
                <Trans>
                    Server version: {props.serverVersion}
                </Trans>
            </ParagraphComponent>
        </Content>
    );
};
