import React from 'react';
import { EmptyComponent } from '../empty_component/empty_component';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { textStyles, colors, values } from '../../application/styles';
import { Text } from 'native-base';
import { Trans } from '@lingui/react';
import { View } from 'react-native';

export const SubmitFeedbackButton = (props: {
    readonly isVisible: boolean, readonly disabled: boolean, readonly onPress: () => void,
}): JSX.Element => {
    if (!props.isVisible) {
        return <EmptyComponent />;
    }
    return (
        <View style={{ borderTopWidth: 1, borderColor: colors.greyBorder }}>
        <TouchableOpacity
            style={{
                backgroundColor: props.disabled ? colors.fadedGrey : colors.teal,
                paddingVertical: 12,
                marginTop: 12,
                marginBottom: 12,
                marginHorizontal: 24,
                borderRadius: values.roundedBorderRadius,
            }}
            disabled={props.disabled}
            onPress={props.onPress}
        >
            <Text style={textStyles.tealButton}>
                <Trans>Submit</Trans>
            </Text>
        </TouchableOpacity>
        </View>
    );
};
