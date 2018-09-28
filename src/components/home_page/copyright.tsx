// tslint:disable:no-expression-statement

import React from 'react';
import { View, Text } from 'native-base';
import { values } from '../../application/styles';
import { Link } from '../link/link';

const welcomeBcUrl = 'https://www.welcomebc.ca/Start-Your-Life-in-B-C/Newcomers-Guides/Newcomers-Guide-Provincial';

export const CopyrightComponent: React.StatelessComponent = (): JSX.Element => {
    const link = <Link href={welcomeBcUrl} text={welcomeBcUrl} style={{ fontSize: values.smallTextSize }} />;
    return (
        <View style={[{ marginTop: 10 }]}>
            <Text style={[{ fontSize: values.smallTextSize, textAlign: 'center' }]}>
                British Columbia Newcomers' Guide to Resources and Services
                . WelcomeBC {link} Copyright Province of British Columbia. All rights reserved.
            </Text>
        </View>
   );
};
