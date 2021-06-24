// tslint:disable:no-expression-statement max-line-length
import React from 'react';
import { t } from '@lingui/macro';
import { Text  } from 'react-native';
import { Content, Container, View } from 'native-base';
import { HeaderComponent } from './header_component';
import { RouterProps, goBack } from '../../application/routing';
import { CloseAction } from '../../stores/feedback';
import { textStyles } from '../../application/styles';
import { Trans } from '@lingui/react';
import { Link } from '../link/link_component';
import { memoryHistory } from '../../application';
import { RegionCode } from '../../validation/region/types';

export interface ExplainFeedbackActions {
    readonly close: () => CloseAction;
}

export interface ExplainFeedbackProps {
    readonly region: RegionCode;
}

type Props = ExplainFeedbackActions & RouterProps & ExplainFeedbackProps;

export const ExplainFeedbackComponent = (props: Props): JSX.Element => {
    const onClosePress = (): void => {
        props.close();
        goBack(memoryHistory);
    };

    const regionName = getRegionName(props.region);
    const serviceName = getServiceName(props.region);
    const serviceUrl = getServiceUrl(props.region);

    return (
        <Container>
            <HeaderComponent
                headerLabel={t`Services listed on Arrival Advisor`}
                close={onClosePress}
            />
        <Content>
            <View style={{ paddingTop: 15, paddingHorizontal: 15 }}>
                <Text style={textStyles.headlineH2StyleBlackLeft}>
                    <Trans>Where do the services listed on Arrival Advisor come from?</Trans>
                </Text>
                <Text style={[textStyles.paragraphStyle, { marginTop: 10, marginBottom: 20 }]}>
                    <Trans>
                    The services listed on Arrival Advisor come from <Link href={serviceUrl} style={textStyles.link} >{serviceName}</Link>, a nonprofit information and referral organization that publishes a searchable online directory of community, government, and social services in {regionName}. {serviceName}’s staff members collect and update this services information.
                    </Trans>
                </Text>
                <Text style={textStyles.headlineH2StyleBlackLeft}>
                    <Trans>I found some inaccurate or missing services information in the app. What do I do?</Trans>
                </Text>
                <Text style={[textStyles.paragraphStyle, { marginTop: 10, marginBottom: 20 }]}>
                    <Trans>
                    You can make a suggestion by clicking “Suggest an update” at the bottom of a service’s detail page in Arrival Advisor. Then, you can provide more information in the form to let us know what needs to be updated. You can choose to leave your contact email so that our team can follow up with you. The Arrival Advisor team will work with {serviceName} to review your suggestions before we make the final changes.
                    </Trans>
                </Text>
                <Text style={textStyles.headlineH2StyleBlackLeft}>
                    <Trans>How can I get my organization or service listed?</Trans>
                </Text>
                <Text style={[textStyles.paragraphStyle, { marginTop: 10, marginBottom: 20 }]}>
                    <ServiceInclusionText region={props.region} />
                </Text>
                <Text style={textStyles.headlineH2StyleBlackLeft}>
                    <Trans>How is PeaceGeeks and {serviceName} using the information collected?</Trans>
                </Text>
                <Text style={[textStyles.paragraphStyle, { marginTop: 10, marginBottom: 20 }]}>
                    <Trans>
                    When you give feedback about a service, PeaceGeeks collect and shares with {serviceName} your suggestions as well as the name of the service you're commenting on. We record the date and time the suggestion was received. If you choose to provide your email address, we collect that so that PeaceGeeks or {serviceName} may contact you regarding your suggested change. If you work at the service provider organization, you will have the option to also share your full name, job title and organization name. It is useful for us to know that the suggestion comes from someone who is familiar with the organization's work. See also PeaceGeeks' general <Link href={'https://peacegeeks.org/privacy/'} style={textStyles.link}>privacy policy</Link> and <ServiceFAQText region={props.region} />.
                   </Trans>
                </Text>
            </View>
        </Content>
    </Container>
    );
};

const getServiceName = (region: RegionCode): string => {
    if (region === RegionCode.MB) {
        return '211 Manitoba';
    }
    return 'bc211';
};

const getRegionName = (region: RegionCode): string => {
    if (region === RegionCode.MB) {
        return 'Manitoba';
    }
    return 'British Columbia';
};

const getServiceUrl = (region: RegionCode): string => {
    if (region === RegionCode.MB) {
        return 'https://mb.211.ca/';
    }
    return 'http://www.bc211.ca';
};

const ServiceInclusionText = (props: { readonly region: RegionCode }): JSX.Element => {
    if (props.region === RegionCode.MB) {
        return (
            <Trans>
                You can read <Link href={'https://mb.211.ca/forserviceproviders/'} style={textStyles.link}>211 Manitoba’s Inclusion Policy here</Link> to see what organizations and services are listed. You can also find more information and a form to list your organization or service on <Link href={'https://mb.211.ca/forserviceproviders/'} style={textStyles.link}>the 211 Manitoba website</Link>. Visit <Link href={'https://mb.211.ca/'} style={textStyles.link} >mb.211.ca</Link> for more information.
            </Trans>
        );
    }
    return (
        <Trans>
            You can read <Link href={'http://www.bc211.ca/inclusion-policy/'} style={textStyles.link}>bc211’s Inclusion Policy here</Link> to see what organizations and services are listed. If you believe that your organization or service fits the inclusion criteria, you can email <Link href={'mailto:updates@bc211.ca'} style={textStyles.link}>updates@bc211.ca</Link> so the bc211 team can review your organization or service. Visit <Link href={'http://www.bc211.ca'} style={textStyles.link} >http://www.bc211.ca</Link> for more information.
        </Trans>
    );
};

const ServiceFAQText = (props: { readonly region: RegionCode }): JSX.Element => {
    if (props.region === RegionCode.MB) {
        return <Link href={'https://mb.211.ca/faq/'} style={textStyles.link}>211 Manitoba's FAQ page</Link>;
    }
    return <Link href={'http://www.bc211.ca/terms-of-use-and-privacy/'} style={textStyles.link}>bc211's privacy page</Link>;
};