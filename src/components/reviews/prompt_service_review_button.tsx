import React from 'react';
import { Trans } from '@lingui/react';
import { Text, TouchableOpacity } from 'react-native';
import { colors, textStyles, values } from '../../application/styles';
import { Icon } from 'native-base';

export const PromptServiceReviewButton = (): JSX.Element => (
    <TouchableOpacity
        style={{
            flex: 1,
            flexDirection: 'row',
            alignSelf: 'flex-start',
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 10,
            paddingHorizontal: 15,
            marginLeft: 15,
            marginBottom: 20,
            borderRadius: values.roundedBorderRadius,
            borderColor: colors.grey,
            borderWidth: 1,
        }}
        onPress={() => console.log('navigate to service review screen')}
    >
         <Icon
            name='smile'
            type='FontAwesome5'
            style={{ fontSize: 25, marginRight: 10, color: colors.teal }}
        />
        <Text style={textStyles.buttonTealText}>
            <Trans>Was this service helpful?</Trans>
        </Text>
    </TouchableOpacity>
);