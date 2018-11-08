import React from 'react';
import { Image, Dimensions } from 'react-native';
import { View } from 'native-base';
import { arrivalAdvisorGlyphLogo } from '../../application/images';
import { colors } from '../../application/styles';

export const ExploreDetailHeadingComponent: React.StatelessComponent = (): JSX.Element => {
    const logoHeight = Dimensions.get('screen').height / 6;
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
                source={arrivalAdvisorGlyphLogo}
                resizeMode={'contain'}
                style={{ height: logoHeight }}
            />
        </View>
    );
};
