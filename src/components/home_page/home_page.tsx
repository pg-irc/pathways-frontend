import React from 'react';
import { Trans } from '@lingui/react';
import { View, Content, Text } from 'native-base';
import { applicationStyles } from '../../application/styles';
import { CopyrightComponent } from './copyright';
import { HomePageProps, HomePageActions } from './props';
import { LearnSectionComponent } from './learn_section_component';
import { MyPlanComponent } from './my_plan_component';
import { RouterProps } from '../../application/routing';

export { HomePageProps, HomePageActions } from './props';

type AllHomePageProps = I18nProps & HomePageProps & HomePageActions & RouterProps;

export const HomePageComponent: React.StatelessComponent<AllHomePageProps> = (props: AllHomePageProps): JSX.Element => {
    return (
        <Content padder>
            {introduction()}
            <LearnSectionComponent {...props} />
            <MyPlanComponent {...props} />
            <CopyrightComponent />
        </Content >
    );
};

const introduction = (): JSX.Element => (
    <View style={[
        { backgroundColor: 'darkblue' },
    ]}>
        <Text style={[
            applicationStyles.bold,
            { color: 'white' },
            { textAlign: 'left' },
            { fontWeight: 'bold' },
            { fontSize: 22 },
            { marginTop: 20 },
            { marginLeft: 20 },
            { marginRight: 20 },
            { marginBottom: 20 },
        ]}>
            <Trans>Arrival Advisor helps you start your new life in Canada, every step of the way.</Trans>
        </Text>
        <View style={applicationStyles.hr} />
    </View>
);
