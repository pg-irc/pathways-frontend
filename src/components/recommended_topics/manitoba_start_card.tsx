import React from 'react';
import { Image, TouchableOpacity, I18nManager } from 'react-native';
import { Trans } from '@lingui/react';
import { View, Text } from 'native-base';
import { textStyles, applicationStyles } from '../../application/styles';
import { advisorMB, advisor_rtl } from '../../application/images';
import { callToActionStyles } from './styles';
import { openURL } from '../link/link_component';

export const ManitobaStartCard = (): JSX.Element => (
    <View style={[
        applicationStyles.boxShadowBelow,
        callToActionStyles.callToActionContainer,
    ]}>
        <TouchableOpacity
            onPress={(): void => openURL('https://manitobastart.com/ ')}
        >
            <View style={callToActionStyles.callToActionContent}>
                <View style={callToActionStyles.callToActionUpperContent}>
                    <Text style={textStyles.headlineH2StyleBlackLeft}>
                        <Trans>Visit Manitoba Start</Trans>
                    </Text>
                </View>
                <Image
                    source={I18nManager.isRTL ? advisor_rtl : advisorMB}
                    resizeMode='contain'
                    style={callToActionStyles.advisorImage}
                />
            </View>
            <Text style={[textStyles.paragraphStyleBrown, callToActionStyles.callToActionBottomContent]}>
                <Trans>
                    Get trusted support from a settlement advisor
                </Trans>
            </Text>
        </TouchableOpacity >
    </View>
);
