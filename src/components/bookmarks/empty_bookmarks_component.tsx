import React from 'react';
import { Text, View } from 'native-base';
import { colors, textStyles, imageStyles } from '../../application/styles';
import { Image } from 'react-native';
import { emptyBookmarks } from '../../application/images';

export interface EmptyListProps {
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
            <EmptyBookmarksImage />
            <EmptyBookmarksTitle title={props.title} />
        </View>
    </View>
);

const EmptyBookmarksImage = (): JSX.Element => (
    <Image
        source={emptyBookmarks}
        resizeMode={'contain'}
        style={imageStyles.emptyOrErrorComponentImage}
    />
);

const EmptyBookmarksTitle = (props: { readonly title: JSX.Element }): JSX.Element => (
    <Text style={[textStyles.headlineH2StyleBlackCenter, { marginBottom: 20 }]}>
        {props.title}
    </Text>
);