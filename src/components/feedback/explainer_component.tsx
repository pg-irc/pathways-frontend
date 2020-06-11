import React from 'react';
import { Text, View, Content } from 'native-base';
import { Trans } from '@lingui/react';
import { Link } from '../link/link_component';

export const ExplainerComponent = (): JSX.Element => {
    const bc211Url = 'https://www.bc211.ca/';
    const bc211InclusionPolicyUrl = 'http://www.bc211.ca/inclusion-policy/';
    const bc211UpdatesEmailUrl = 'mailto:updates@bc211.ca';
    return (
        <View>
            <Text>
                <Trans>Services listed on Arrival Advisor</Trans>
            </Text>
            <Content>
                <Text>
                    <Trans>Where do the services listed on Arrival Advisor come from?</Trans>
                </Text>
                <Text>
                    <Trans>
                        The services listed on Arrival Advisor come from <Link href={bc211Url}>bc211</Link>,
                        a nonprofit information and referral organization that publishes a searchable online directory of community,
                        government, and social services in British Columbia. bc211’s staff members collect and update this services information.
                    </Trans>
                </Text>
                <Text>
                    <Trans>I found some inaccurate or missing services information in the app. What do I do?</Trans>
                </Text>
                <Text>
                    <Trans>
                        You can make a suggestion by clicking “Suggest an update” at the bottom of a service’s detail page in Arrival Advisor.
                        Then, you can provide more information in the form to let us know what needs to be updated.
                        You can choose to leave your contact email so that our team can follow up with you. The Arrival Advisor team will
                        work with bc211 to review your suggestions before we make the final changes.
                    </Trans>
                </Text>
                <Text>
                    <Trans>How can I get my organization or service listed?</Trans>
                </Text>
                <Text>
                    <Trans>
                        You can read <Link href={bc211InclusionPolicyUrl}>bc211’s Inclusion Policy here</Link>
                        to see what organizations and services are listed. If you believe that your
                        organization or service fits the inclusion criteria, you can email <Link href={bc211UpdatesEmailUrl}>updates@bc211.ca</Link>
                        so the bc211 team can review your organization or service.
                    Visit <Link href={bc211Url}>http://www.bc211.ca</Link> for more information.
                    </Trans>
                </Text>
            </Content>
        </View>
    );
};