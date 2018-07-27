// tslint:disable:no-expression-statement

import React from 'react';
import { View, Text } from 'native-base';
import { values, colors } from '../../application/styles';
import { Linking } from 'react-native';

const welcomeBcUrl = 'https://www.welcomebc.ca/Start-Your-Life-in-B-C/Newcomers-Guides/Newcomers-Guide-Provincial';

export const CopyrightComponent: React.StatelessComponent = (): JSX.Element => (
    <View style={[{ marginTop: 10 }]}>
        <Text style={[{ fontSize: values.smallTextSize, textAlign: 'center' }]}>
            British Columbia Newcomers' Guide to Resources and Services.
            WelcomeBC <Text
                onPress={(): void => { Linking.openURL(welcomeBcUrl); }}
                style={[
                    { color: colors.urlColor },
                    { fontSize: values.smallTextSize },
                ]}>{welcomeBcUrl}</Text> Copyright Province of British Columbia. All rights reserved.
        </Text>
    </View>
);
