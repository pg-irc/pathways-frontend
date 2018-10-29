import React from 'react';
import { Trans } from '@lingui/react';
import { Text, View, Button } from 'native-base';
import { colors, applicationStyles, textStyles } from '../../application/styles';

export const taskAddedNotification = (): JSX.Element => {
    return (
        <Text style={[{ color: colors.white }]}>
            <Trans>Task added to plan</Trans>
        </Text>
    );
}

export const questionnaireInformationNotification = (goToQuestionnaire: () => void): JSX.Element => {
    return (
        <View>
            <Text style={[{ textAlign: 'left', padding: 10 }]}>
                <Trans>Help us recommend you tasks by answering a few questions.</Trans>
            </Text>
            <View style={[{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }]}>
                <Button onPress={goToQuestionnaire} style={applicationStyles.orangeButton}>
                    <Text style={textStyles.button}><Trans>Go to questionnaire</Trans></Text>
                </Button>
            </View>
        </View>
    );
};