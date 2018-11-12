// tslint:disable:no-expression-statement

import React from 'react';
import { View, Text } from 'native-base';
import { textStyles } from '../../application/styles';
import { Link } from '../link/link';

const welcomeBcUrl = 'https://www.welcomebc.ca/Start-Your-Life-in-B-C/Newcomers-Guides/Newcomers-Guide-Provincial';

export const CopyrightComponent: React.StatelessComponent = (): JSX.Element => {
    const link = <Link
        href={welcomeBcUrl}
        text={'Newcomer\'s Guide to British Columbia'}
        style={{ fontSize: 12, fontWeight: 'bold' }}
    />;
    return (
        <View style={{ marginTop: 40 }}>
            <Text style={textStyles.paragraphSmallStyleCenter}>
                Information in this app is provided by the {link} Copyright 2018 Province of British Columbia. All rights reserved.
            </Text>
        </View>
   );
};
