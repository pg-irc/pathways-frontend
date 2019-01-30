import { View, Text } from 'native-base';
import { Link } from '../link/link';
import { textStyles } from '../../application/styles';

export const CopyrightComponent = (): JSX.Element => {
    const welcomeBcUrl = 'https://www.welcomebc.ca/Start-Your-Life-in-B-C/Newcomers-Guides/Newcomers-Guide-Provincial';
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