import React from 'react';
import { Trans } from '@lingui/react';
import { Text, View, Button } from 'native-base';
import { applicationStyles, colors, values } from '../../application/styles';
import { Routes, goToRouteWithoutParameter } from '../../application/routing';
import { History } from 'history';

export interface PersonalizeProps {
    readonly history: History;
}

export const PersonalizeComponent: React.StatelessComponent<PersonalizeProps> = (props: PersonalizeProps): JSX.Element => (
    <View style={[
        applicationStyles.boxShadow,
        {
            backgroundColor: colors.darkBlueGrey,
            borderRadius: values.lessRoundedBorderRadius,
            paddingHorizontal: 20,
            paddingTop: 20,
            paddingBottom: 30,
            marginBottom: 15,
        },
    ]}>
        <Text style={[applicationStyles.subTitle, { color: colors.white }]}>
            <Trans>Personalize My Plan</Trans>
        </Text>
        <Text style={[ applicationStyles.p, { color: colors.white, marginBottom: 15 } ]}>
            <Trans>Get recommended tasks and services for settling in Canada </Trans>
        </Text>
        <Button
            full
            onPress={goToRouteWithoutParameter(Routes.Questionnaire, props.history)}
            style={applicationStyles.roundedButton}
        >
            <Text style={{ fontWeight: 'bold', color: colors.white }}>
                <Trans>Start</Trans>
            </Text>
        </Button>
    </View>
);
