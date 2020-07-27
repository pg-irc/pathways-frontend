// tslint:disable:no-expression-statement
import React from 'react';
import { t } from '@lingui/macro';
import { View, Text  } from 'react-native';
import { Content } from 'native-base';
import { HeaderComponent } from './header_component';
import { goToRouteWithParameter, Routes, RouterProps } from '../../application/routing';
import { useHistory } from 'react-router-native';
import { CloseAction } from '../../stores/feedback';
import { textStyles, values } from '../../application/styles';
import { Trans } from '@lingui/react';
import { ParagraphComponent } from '../paragraph/paragraph_component';
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
        <Content>
            <HeaderComponent
                headerLabel={t`Service listed on Arrival Advisor`}
                close={onClosePress}
            />
        <View style={{ marginVertical: 10 }}>
            <Text style={[textStyles.headlineH2StyleBlackLeft, { paddingHorizontal: values.backgroundTextPadding }]}>
                <Trans>Where do the services listed on Arrival Advisor come from?</Trans>
            </Text>
            <ParagraphComponent>
                <Trans>
                The services listed on Arrival Advisor come from bc211, a nonprofit information and referral organization that publishes a searchable online directory of community, government, and social services in British Columbia. bc211’s staff members collect and update this services information.
                </Trans>
            </ParagraphComponent>
            <Text style={[textStyles.headlineH2StyleBlackLeft, { paddingHorizontal: values.backgroundTextPadding }]}>
                <Trans>I found some inaccurate or missing services information in the app. What do I do?</Trans>
            </Text>
            <ParagraphComponent>
                <Trans>
                You can make a suggestion by clicking “Suggest an update” at the bottom of a service’s detail page in Arrival Advisor. Then, you can provide more information in the form to let us know what needs to be updated. You can choose to leave your contact email so that our team can follow up with you. The Arrival Advisor team will work with bc211 to review your suggestions before we make the final changes.
                </Trans>
            </ParagraphComponent>
            <Text style={[textStyles.headlineH2StyleBlackLeft, { paddingHorizontal: values.backgroundTextPadding }]}>
                <Trans>How can I get my organization or service listed?</Trans>
            </Text>
            <ParagraphComponent>
                <Trans>
                You can read bc211’s Inclusion Policy here to see what organizations and services are listed. If you believe that your organization or service fits the inclusion criteria, you can email <Link href={'mailto:support@expo.io'} style={textStyles.link}>updates@bc211.ca</Link> so the bc211 team can review your organization or service. Visit <Link href={'http://www.bc211.ca'} style={textStyles.link} >bc211</Link> for more information.
                </Trans>
            </ParagraphComponent>
        </View>
        </Content>
    );
}