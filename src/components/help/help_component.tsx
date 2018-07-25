import React from 'react';
import * as R from 'ramda';
import { Text, View, Icon, Button, Content } from 'native-base';
import { Trans } from '@lingui/react';
import { I18nManager } from 'react-native';
import { applicationStyles, colors } from '../../application/styles';

export interface HelpComponentProps {
}

export interface HelpComponentActions {
}

type AllProps = HelpComponentProps & HelpComponentActions;

interface HelpContact {
    readonly icon: string;
    readonly description: string;
}

const fixture: ReadonlyArray<HelpContact> = [
    {
        icon: 'phone',
        description: 'Emergencies (9-1-1)',
    },
    {
        icon: 'phone',
        description: 'HealthLinkBC: multilingual health information (8-1-1)',
    },
    {
        icon: 'phone',
        description: 'Mental health & trauma support',
    },
    {
        icon: 'phone',
        description: 'Legal aid help line',
    },
    {
        icon: 'phone',
        description: 'Other multilingual helplines',
    },
    {
        icon: 'email',
        description: 'Contact app team for technical issues',
    },
];

export const HelpComponent: React.StatelessComponent<AllProps> =
    (_: AllProps): JSX.Element => (
        <Content padder>
            <View style={[{ flexDirection: 'column' }]}>
                <Text style={applicationStyles.pageTitle}><Trans>{'Help & Support'}</Trans></Text>
                <Text><Trans>If you are having difficulty with settlement in Canada, get in touch with a settlement worker.</Trans></Text>
                <ContactSettlementWorkerButton />
                <Text style={applicationStyles.subHeading}><Trans>FOR ADDITIONAL ASSISTANCE</Trans></Text>
                {R.map(createContactComponent, fixture)}
            </View>
        </Content>
    );

const ContactSettlementWorkerButton: React.StatelessComponent = (): JSX.Element => (
    <View style={[{ flexDirection: 'row', justifyContent: 'center', paddingTop: 10, paddingBottom: 40 }]}>
        <Button style={[{ backgroundColor: colors.darkGrey }]}>
            <Text><Trans>CONTACT SETTLEMENT WORKER</Trans></Text>
        </Button>
    </View>
);

const createContactComponent = (contact: HelpContact): JSX.Element => (
    <View key={contact.description} style={[
        { flexDirection: 'column' },
    ]} >
        <View style={[{ flexDirection: 'row' }]}>
            <Icon style={[
                { justifyContent: 'flex-start' },
                { marginLeft: 10 },
                { marginRight: 10 },
            ]} type='MaterialCommunityIcons' name={contact.icon} />

            <Text style={[
                { flex: 1 },
                { justifyContent: 'flex-start' },
            ]}>{contact.description}</Text>

            <Icon style={[
                { justifyContent: 'flex-end' },
                { marginLeft: 10 },
                { marginRight: 10 },
            ]} name={I18nManager.isRTL ? 'arrow-back' : 'arrow-forward'} />

        </View>
        <View style={applicationStyles.hr} />
    </View>
);
