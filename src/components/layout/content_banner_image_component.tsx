import React from 'react';
import { View, Image, Dimensions, ImageProps } from 'react-native';
import { colors } from '../../application/styles';
import { arrivalAdvisorGlyphLogo } from '../../application/images';

interface Props {
    readonly imageSource: ImageProps;
}

export const ContentBannerImageComponent = (props: Props): JSX.Element => {
    const logoHeight = Dimensions.get('screen').height / 8;
    return (
        <View style={{
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 10,
            backgroundColor: colors.lightGrey,
            borderBottomWidth: 1,
            borderBottomColor: colors.darkerGrey,
            marginHorizontal: -10,
            marginTop: -10,
        }}>
            <Image
                source={props.imageSource || arrivalAdvisorGlyphLogo}
                resizeMode={'contain'}
                style={{ height: logoHeight }}
            />
        </View>
    );
};