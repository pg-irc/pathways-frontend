import React from 'react';
import { Dimensions } from 'react-native';
import { Button, Text, Icon, View } from 'native-base';
import { Trans } from '@lingui/react';
import { applicationStyles, textStyles, colors } from '../../application/styles';

export interface TaskDetailServicesButtonActions {
    readonly onServicesButtonPress: () => void;
}

type Props =  TaskDetailServicesButtonActions;

export const TaskDetailServicesButtonComponent: React.StatelessComponent<Props> = (props: Props): JSX.Element => (
    <Button
        rounded
        onPress={props.onServicesButtonPress}
        style={getButtonStyles()}
    >
        <View style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 40,
        }}>
            <Icon type={'FontAwesome'} name={'map-marker'} style={{ color: colors.white, marginRight: 5 }} />
            <Text style={textStyles.button}>
                <Trans>Find a service</Trans>
            </Text>
        </View>
    </Button>

);

const getButtonStyles = (): object => (
    [
        getButtonPosition(),
        applicationStyles.boxShadowBelow,
        applicationStyles.orangeButton,
    ]
);

const getButtonPosition = (): object => {
    const height = Dimensions.get('screen').height;
    const position = Math.round(height / 25);
    return {
        position: 'absolute',
        left: position,
        bottom: position,
    };
};