import React from 'react';
import { Trans } from '@lingui/react';
import { View } from 'react-native';
import { Tab, Tabs } from 'native-base';

const testOrganization = {
    title: 'Mosaic',
    description: `Assists immigrants, refugees, and newcomers in the course of their settlement and integration into
                  Canadian society. Provides employment services… family services, interpretation and translation,
                  language instruction, legal information, settlement services, and victim and family violence services
                  from multiple sites in Metro Vancouver. Also provides employment services under contract to BC Employment
                  and Assistance (BCEA); see WorkBC listings for details. Office hours are 9 am to 5 pm Monday to Friday.
                  Nonprofit society, registered charity.`,
    address: 'Head Office 5575 Boundary Road Vancouver, BC V5R 2P9',
    phone: '604-254-9626',
    fax: '604-254-3932',
    website: 'http://mosaicbc.org',
    email: 'email@email.com',
    lastVerified: '2018-07-25',
};

// export interface OrganizationDetailComponentProps {
//     readonly organization: any;
// }

export const OrganizationDetailComponent = (): JSX.Element => (
    <Tabs>
        <Tab heading='Tab1'>
            <View>
            </View>
        </Tab>
        <Tab heading='Tab2'>
            <View>

            </View>
        </Tab>
  </Tabs>
);