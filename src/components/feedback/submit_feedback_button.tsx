import React from 'react';
import { EmptyComponent } from '../empty_component/empty_component';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { applicationStyles, textStyles } from '../../application/styles';
import { Text } from 'native-base';
import { Trans } from '@lingui/react';

export const SubmitFeedbackButton = (props: { readonly isVisible: boolean, readonly onPress: () => void }): JSX.Element => {
    if (!props.isVisible) {
        return <EmptyComponent />;
    }
    return (
        <TouchableOpacity
            style={[applicationStyles.tealButton, {
                paddingVertical: 12,
                marginTop: 12,
                marginBottom: 12,
                marginHorizontal: 24 }]}
            onPress={props.onPress}
        >
            <Text style={textStyles.tealButton}>
                <Trans>Submit</Trans>
            </Text>
        </TouchableOpacity>
    );
};
