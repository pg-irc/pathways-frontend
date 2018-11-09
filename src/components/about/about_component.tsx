// tslint:disable:max-line-length
import React from 'react';
import { Text, Content } from 'native-base';
import { applicationStyles, textStyles } from '../../application/styles';
import { ExpandableText } from '../expandable_text/expandable_text';

const aboutText = 'Arrival Advisor is an app that fast-tracks newcomers in Canada to successful resettlement, by connecting newcomers with a personalized directory of settlement services tailored to their needs, circumstances and stages of settlement. Designed alongside immigrants, refugees, community service providers and coordinating organizations, the app helps newcomers more effectively navigate their resettlement experience in Canada, bridging current gaps in timely and actionable information.';
const privacyPolicyText = 'The Arrival Advisor app does not collect any information about its users. In the future, users will have the ability to create accounts so they can access their Arrival Advisor data from multiple devices, such as both a phone and a computer, in which case their information will be stored on our servers. Any change in the app that affect users’ privacy will be clearly indicated to the user through the app, and users will be able to opt out of collection of all personally identifiable information. Our goal is that the app will always be useful without saving any personal information.';
const disclaimerText = 'The Arrival Advisor app contains information from the BC government’s Newcomer’s Guide available at www.welcomebc.ca and the BC211 database of service providers (www.bc211.ca). The app provides links to services and information, however we do not guarantee the accuracy of the information or the quality of the services provided. The inclusion of any services, links to website does not imply an endorsement or recommendation of those services. Users of the Arrival Advisor app do so at their own risk. PeaceGeeks will not be liable for any damages incurred as a result of or related to the use of the app.';

export const AboutComponent: React.StatelessComponent = (): JSX.Element => (
    <Content padder style={applicationStyles.body}>
        <Text style={textStyles.headlineH1StyleBlackLeft}>About</Text>
        <ExpandableText text={aboutText} isMarkdown={false}/>
        <Text style={textStyles.headlineH1StyleBlackLeft}>Privacy</Text>
        <ExpandableText text={privacyPolicyText} isMarkdown={false}/>
        <Text style={textStyles.headlineH1StyleBlackLeft}>Disclaimer</Text>
        <ExpandableText text={disclaimerText} isMarkdown={false}/>
    </Content>
);