import React from 'react';
import { Trans } from '@lingui/react';
import { View, Text, Image, Dimensions, ImageSourcePropType, TouchableOpacity } from 'react-native';
import { colors, textStyles } from '../../application/styles';

const errorImageSize = Dimensions.get('screen').width / 3;

type Props = {
    readonly imageSource: ImageSourcePropType;
    readonly title: JSX.Element;
    readonly subTitle: JSX.Element;
    readonly refresh: () => void;
};

export const ErrorScreenComponent = (props: Props): JSX.Element => (
    <View
        style={{
            flex: 1,
            backgroundColor: colors.lightGrey,
            alignItems: 'center',
            paddingTop: 50,
            paddingHorizontal: 10,
        }}
    >
        <Image
            source={props.imageSource}
            resizeMode={'contain'}
            style={{
                height: errorImageSize,
                width: errorImageSize,
            }}
        />
        <Text style={[textStyles.headlineH2StyleBlackCenter, { marginTop: 20, marginBottom: 10 }]}>
            {props.title}
        </Text>
        <Text style={[textStyles.paragraphStyleBrownCenter, { marginBottom: 30 }]}>
            {props.subTitle}
        </Text>
        <TouchableOpacity onPress={props.refresh}>
            <Text>
                <Trans>Try again</Trans>
            </Text>
        </TouchableOpacity>
    </View>
);
