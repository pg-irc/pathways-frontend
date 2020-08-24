// tslint:disable:no-expression-statement max-line-length
import React from 'react';
import { t } from '@lingui/macro';
import { Text  } from 'react-native';
import { Content, Container, View } from 'native-base';
import { HeaderComponent } from './header_component';
import { goToRouteWithParameter, Routes, RouterProps } from '../../application/routing';
import { useHistory } from 'react-router-native';
import { CloseAction } from '../../stores/feedback';
import { textStyles } from '../../application/styles';
import { Trans } from '@lingui/react';
import { Link } from '../link/link_component';

export interface ExplainFeedbackActions {
    readonly close: () => CloseAction;
}
type props = ExplainFeedbackActions & RouterProps;

export const ExplainFeedbackComponent = (props: props): JSX.Element => {
    const history = useHistory();
    const onClosePress = (): void => {
        props.close();
        goToRouteWithParameter(Routes.ServiceDetail, props.match.params.serviceId, history)();
    };

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
                    The services listed on Arrival Advisor come from <Link href={'http://www.bc211.ca'} style={textStyles.link} >bc211</Link>, a nonprofit information and referral organization that publishes a searchable online directory of community, government, and social services in British Columbia. bc211’s staff members collect and update this services information.
                    </Trans>
                </Text>
                <Text style={textStyles.headlineH2StyleBlackLeft}>
                    <Trans>I found some inaccurate or missing services information in the app. What do I do?</Trans>
                </Text>
                <Text style={[textStyles.paragraphStyle, { marginTop: 10, marginBottom: 20 }]}>
                    <Trans>
                    You can make a suggestion by clicking “Suggest an update” at the bottom of a service’s detail page in Arrival Advisor. Then, you can provide more information in the form to let us know what needs to be updated. You can choose to leave your contact email so that our team can follow up with you. The Arrival Advisor team will work with bc211 to review your suggestions before we make the final changes.
                    </Trans>
                </Text>
                <Text style={textStyles.headlineH2StyleBlackLeft}>
                    <Trans>How can I get my organization or service listed?</Trans>
                </Text>
                <Text style={[textStyles.paragraphStyle, { marginTop: 10, marginBottom: 20 }]}>
                    <Trans>
                    You can read <Link href={'http://www.bc211.ca/inclusion-policy/'} style={textStyles.link}>bc211’s Inclusion Policy here</Link> to see what organizations and services are listed. If you believe that your organization or service fits the inclusion criteria, you can email <Link href={'mailto:updates@bc211.ca'} style={textStyles.link}>updates@bc211.ca</Link> so the bc211 team can review your organization or service. Visit <Link href={'http://www.bc211.ca'} style={textStyles.link} >http://www.bc211.ca</Link> for more information.
                    </Trans>
                </Text>
                <Text style={textStyles.headlineH2StyleBlackLeft}>
                    <Trans>How is PeaceGeeks and bc211 using the information collected?</Trans>
                </Text>
                <Text style={[textStyles.paragraphStyle, { marginTop: 10, marginBottom: 20 }]}>
                    <Trans>
                    When you give feedback about a service, PeaceGeeks collect and shares with bc211 your suggestions as well as the name of the service you're commenting on. We record the date and time the suggestion was received. If you choose to provide your email address, we collect that so that PeaceGeeks or bc211 may contact you regarding your suggested change. If you work at the service provider organization, you will have the option to also share your full name, job title and organization name. It is useful for us to know that the suggestion comes from someone who is familiar with the organization's work. See also PeaceGeeks' general <Link href={'https://peacegeeks.org/privacy/'} style={textStyles.link}>privacy policy</Link> and bc211's <Link href={'http://www.bc211.ca/terms-of-use-and-privacy/'} style={textStyles.link}>privacy page</Link>.
                   </Trans>
                </Text>
            </View>
        </Content>
    </Container>
    );
};
