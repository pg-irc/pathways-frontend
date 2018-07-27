import React from 'react';
import { Text } from 'native-base';
import { Trans } from '@lingui/react';
import { goToRouteWithoutParameter, Routes, RouterProps } from '../../application/routing';

export const MyPlanIntroComponent: React.StatelessComponent<RouterProps> = (props: RouterProps): JSX.Element => (
    <Text style={[
        { textAlign: 'left' },
        { marginBottom: 20 },
    ]}>
        <Trans>Plan everything you need to do as a newcomer to Canada. Want to know what next steps
        you need to take? <Text onPress={goToRouteWithoutParameter(Routes.Questionnaire, props.history)}
                style={[{ color: 'blue' }]}><Trans>Answer some questions</Trans></Text> to get tasks and
                tips recommended for you.</Trans>
    </Text>
);

export const EmptyMyPlanIntroComponent: React.StatelessComponent<RouterProps> =
    (props: RouterProps): JSX.Element => (
        // About the funny line break below: Need to keep "to <Text" on the same line so
        // the space after "to" is not truncated
        <Text style={[
            { textAlign: 'left' },
            { marginBottom: 20 },
        ]}>
            <Trans>You haven't personalized your Plan yet. Would you like to <Text
                onPress={goToRouteWithoutParameter(Routes.Questionnaire, props.history)}
                style={[{ color: 'blue' }]}><Trans>answer some questions</Trans></Text> to
                get your most relevant tasks?</Trans>
        </Text>
    );
