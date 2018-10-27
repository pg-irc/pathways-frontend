// tslint:disable:no-expression-statement

import React from 'react';
import { View, Text } from 'native-base';
import { values, colors } from '../../application/styles';
import { Link } from '../link/link';

const welcomeBcUrl = 'https://www.welcomebc.ca/Start-Your-Life-in-B-C/Newcomers-Guides/Newcomers-Guide-Provincial';

export const CopyrightComponent: React.StatelessComponent = (): JSX.Element => {
    const link =
        <Link
            href={welcomeBcUrl}
            text={'Newcomer\'s Guide to British Columbia'}
            style={{
                fontSize: values.smallTextSize,
                color: colors.greyishBrown,
                fontWeight: 'bold',
                textDecorationLine: 'underline',
            }}
        />;
    return (
        <View style={[{ marginTop: 40 }]}>
            <Text style={{
                fontFamily: 'Avenir',
                fontSize: values.smallTextSize,
                color: colors.greyishBrown,
                textAlign: 'center',
                lineHeight: 20,
            }}>
                Information in this app is provided by the {link} Copyright 2018 Province of British Columbia. All rights reserved.
            </Text>
        </View>
   );
};
