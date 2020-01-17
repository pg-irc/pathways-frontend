import React from 'react';
import { Text, View } from 'native-base';
import { colors, textStyles } from '../../application/styles';
import { ImageSourcePropType, Dimensions, Image } from 'react-native';

const emptyListImageSize = Dimensions.get('screen').width / 3.5;

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
        style={{
            height: emptyListImageSize,
            width: emptyListImageSize,
            marginBottom: 20,
        }}
    />
);

const EmptyBookmarksTitle = (props: { readonly title: JSX.Element }): JSX.Element => (
    <Text style={[textStyles.headlineH2StyleBlackCenter, { marginBottom: 20 }]}>
        {props.title}
    </Text>
);