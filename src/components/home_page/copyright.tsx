import React from 'react';
import { View, Text } from 'native-base';
import { values } from '../../application/styles';

export const CopyrightComponent: React.StatelessComponent = (): JSX.Element => (
    <View style={[{marginTop: 10}]}>
        <Text style={[{fontSize: values.smallTextSize, textAlign: 'center'}]}>
            British Columbia Newcomers' Guide to Resources and Services. WelcomeBC
            https://www.welcomebc.ca/Start-Your-Life-in-B-C/Newcomers-Guides/Newcomers-Guide-Provincial
            Copyright Province of British Columbia. All rights reserved.
        </Text>
    </View>
);