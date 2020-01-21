import React from 'react';
import { Text, View } from 'native-base';
import { colors, textStyles, imageStyles } from '../../application/styles';
import { ImageSourcePropType, Image } from 'react-native';

export interface EmptyListProps {
    readonly imageSource: ImageSourcePropType;
    readonly title: JSX.Element;
}

export const EmptyBookmarksComponent = (props: EmptyListProps): JSX.Element => (
    <View style={{ flex: 1, backgroundColor: colors.lightGrey }}>
        <View
            style={{
                flex: 1,
                alignItems: 'center',
                paddingTop: 50,
                paddingHorizontal: 20,
            }}
        >
            <EmptyBookmarksImage imageSource={props.imageSource} />
            <EmptyBookmarksTitle title={props.title} />
        </View>
    </View>
);

const EmptyBookmarksImage = (props: { readonly imageSource: ImageSourcePropType }): JSX.Element => (
    <Image
        source={props.imageSource}
        resizeMode={'contain'}
        style={imageStyles.emptyOrErrorComponentImage}
    />
);

const EmptyBookmarksTitle = (props: { readonly title: JSX.Element }): JSX.Element => (
    <Text style={[textStyles.headlineH2StyleBlackCenter, { marginBottom: 20 }]}>
        {props.title}
    </Text>
);