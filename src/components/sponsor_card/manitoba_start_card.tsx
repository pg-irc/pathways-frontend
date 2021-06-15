import React from 'react';
import { Image, TouchableOpacity, I18nManager } from 'react-native';
import { Trans } from '@lingui/react';
import { View, Text } from 'native-base';
import { textStyles, applicationStyles } from '../../application/styles';
import { mbStartLogo, advisor_rtl } from '../../application/images';
import { callToActionStyles } from '../recommended_topics/styles';
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
                <View style={callToActionStyles.callToActionLeftContent}>
                    <Text style={textStyles.headlineH2StyleBlackLeft}>
                        <Trans>Visit Manitoba Start</Trans>
                    </Text>
                    <Text style={[textStyles.paragraphStyleBrown, { marginTop: 12 }]}>
                        <Trans>
                            Get trusted support from a settlement advisor
                        </Trans>
                    </Text>
                </View>
                <Image
                    source={I18nManager.isRTL ? advisor_rtl : mbStartLogo}
                    resizeMode='contain'
                    style={callToActionStyles.advisorImage}
                />
            </View>
        </TouchableOpacity >
    </View>
);
