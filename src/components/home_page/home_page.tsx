import React from 'react';
import { Trans } from '@lingui/react';
import { View, Content, Text } from 'native-base';
import { applicationStyles } from '../../application/styles';
import { CopyrightComponent } from '../copyright/copyright';
import { HomePageProps, HomePageActions } from './props';
import { LearnSectionComponent } from './learn_section_component';
import { MyPlanComponent } from './my_plan_component';

export { HomePageProps, HomePageActions } from './props';

type AllHomePageProps = I18nProps & HomePageProps & HomePageActions;

export const HomePageComponent: React.StatelessComponent<AllHomePageProps> = (props: AllHomePageProps): JSX.Element => {
    return (
        <Content padder>
            <Text style={[
                applicationStyles.bold,
                { textAlign: 'left' },
                { marginBottom: 20 },
            ]}>
                <Trans>Arrival Advisor helps you start your new life in Canada, every step of the way.</Trans>
            </Text>
            <View style={applicationStyles.hr} />
            <Text style={applicationStyles.bold}><Trans>LEARN ABOUT</Trans></Text>
            <LearnSectionComponent {...props} />
            <MyPlanComponent {...props} />
            <CopyrightComponent />
        </Content >
    );
};
