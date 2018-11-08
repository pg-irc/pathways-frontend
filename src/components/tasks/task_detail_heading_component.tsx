import React from 'react';
import { Image, Dimensions } from 'react-native';
import { View } from 'native-base';
import { arrivalAdvisorGlyphLogo } from '../../application/images';
import { colors } from '../../application/styles';

export const TaskDetailHeadingComponent: React.StatelessComponent = (): JSX.Element => {
    const logoHeight = Dimensions.get('screen').height / 8;
    return (
        <View style={{
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 10,
            backgroundColor: colors.lightGrey,
        }}>
            <Image
                source={arrivalAdvisorGlyphLogo}
                resizeMode={'contain'}
                style={{ height: logoHeight }}
            />
        </View>
    );
};