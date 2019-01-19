// tslint:disable:max-line-length
import React from 'react';
import { Text, Content, View } from 'native-base';
import { Trans } from '@lingui/react';
import { applicationStyles, textStyles, colors } from '../../application/styles';
import { ExpandableContentComponent } from '../expandable_content/expandable_content_component';
import { mapWithIndex } from '../../application/map_with_index';
import { SelectableText } from '../selectable_text';
import { VERSION } from 'react-native-dotenv';

const aboutTitle = <Trans>About</Trans>;
const aboutText = <Trans>Arrival Advisor is an app that fast-tracks newcomers in Canada to successful resettlement, by connecting newcomers with a personalized directory of settlement services tailored to their needs, circumstances and stages of settlement. Designed alongside immigrants, refugees, community service providers and coordinating organizations, the app helps newcomers more effectively navigate their resettlement experience in Canada, bridging current gaps in timely and actionable information.</Trans>;

const privacyTitle = <Trans>Privacy</Trans>;
const privacyPolicyTextP1 = <Trans>The Arrival Advisor app does not collect any information about its users. In the future, users will have the ability to create accounts so they can access their Arrival Advisor data from multiple devices, such as both a phone and a computer, in which case their information will be stored on our servers.</Trans>;
const privacyPolicyTextP2 = <Trans>Any change in the app that affect users’ privacy will be clearly indicated to the user through the app, and users will be able to opt out of collection of all personally identifiable information.</Trans>;
const privacyPolicyTextP3 = <Trans>Our goal is that the app will always be useful without saving any personal information.</Trans>;
const privacyPolicyTextP4 = <Trans>We do (soon) collect information about the performance of the Arrival Advisor app, including records of the app crahsing. We may also collect information about how often diferent app content is accessed by all our users.</Trans>;
const privacyPolicyParagraphs: ReadonlyArray<JSX.Element> = [privacyPolicyTextP1, privacyPolicyTextP2, privacyPolicyTextP3, privacyPolicyTextP4];

const disclaimerTitle = <Trans>Disclaimer</Trans>;
const disclaimerTextP1 = <Trans>The Arrival Advisor app contains information from the BC government’s Newcomer’s Guide available at www.welcomebc.ca and the BC211 database of service providers (www.bc211.ca). The app provides links to services and information, however we do not guarantee the accuracy of the information or the quality of the services provided. The inclusion of any services, links to website does not imply an endorsement or recommendation of those services.</Trans>;
const disclaimerTextP2 = <Trans>Users of the Arrival Advisor app do so at their own risk. PeaceGeeks will not be liable for any damages incurred as a result of or related to the use of the app.</Trans>;
const disclaimerParagraphs: ReadonlyArray<JSX.Element> = [disclaimerTextP1, disclaimerTextP2];

const versionTitle = <Trans>Version</Trans>;

export interface AboutComponentProps {
    readonly serverVersion: string;
}

export const AboutComponent: React.StatelessComponent<AboutComponentProps> = (props: AboutComponentProps): JSX.Element => {
    const versionText = <Text><Trans>This is Arrival Advisor version</Trans> {VERSION}, <Trans>server version</Trans> {props.serverVersion}</Text>;
    const aboutSection = <SelectableText style={textStyles.paragraphStyle}>{aboutText}</SelectableText>;
    const privacySection = <ParagraphContent paragraphs={privacyPolicyParagraphs} />;
    const disclaimerSection = <ParagraphContent paragraphs={disclaimerParagraphs} />;
    const versionSection = <SelectableText style={textStyles.paragraphStyle}>{versionText}</SelectableText>;
    return (
        <Content padder style={applicationStyles.body}>
            <Section title={aboutTitle} content={aboutSection} />
            <Section title={privacyTitle} content={privacySection} />
            <Section title={disclaimerTitle} content={disclaimerSection} />
            <Section title={versionTitle} content={versionSection} />
        </Content>
    );
};

const Section = (props: { readonly title: JSX.Element, readonly content: JSX.Element }): JSX.Element => (
    <View style={{ backgroundColor: colors.white, marginHorizontal: -10, marginTop: -10, marginBottom: 30, padding: 10 }}>
        <Text style={textStyles.headlineH1StyleBlackLeft}>{props.title}</Text>
        <ExpandableContentComponent content={props.content} />
    </View>
);

const ParagraphContent = (props: { readonly paragraphs: ReadonlyArray<JSX.Element> }): JSX.Element => (
    <View>
        {
            mapWithIndex((paragraph: JSX.Element, index: number) =>
                <SelectableText key={index} style={[textStyles.paragraphStyle, { marginBottom: 20 }]}>{paragraph}</SelectableText>,
                props.paragraphs)
        }
    </View>
);
