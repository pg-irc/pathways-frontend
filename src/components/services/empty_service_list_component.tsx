import React from 'react';
import { Text, View, Icon } from 'native-base';
import { colors, textStyles, imageStyles } from '../../application/styles';
import { ImageSourcePropType, Image, TouchableOpacity } from 'react-native';
import { EmptyComponent } from '../empty_component/empty_component';
import { Trans } from '@lingui/react';

export interface EmptyServiceListProps {
    readonly refreshScreen: () => void;
    readonly imageSource: ImageSourcePropType;
    readonly title: JSX.Element;
}

export const EmptyServiceListComponent = (props: EmptyServiceListProps): JSX.Element => (
    <View style={{ flex: 1, backgroundColor: colors.lightGrey }}>
        <View
            style={{
                flex: 1,
                alignItems: 'center',
                paddingTop: 50,
                paddingHorizontal: 20,
            }}
        >
            <EmptyListImage imageSource={props.imageSource} />
            <EmptyListTitle title={props.title} />
            <EmptyListRefreshButton refreshScreen={props.refreshScreen} />
        </View>
    </View>
);

const EmptyListImage = (props: { readonly imageSource: ImageSourcePropType }): JSX.Element => (
    <Image
        source={props.imageSource}
        resizeMode={'contain'}
        style={imageStyles.emptyOrErrorComponentImage}
    />
);

const EmptyListTitle = (props: { readonly title: JSX.Element }): JSX.Element => (
    <Text style={[textStyles.headlineH2StyleBlackCenter, { marginBottom: 20 }]}>
        {props.title}
    </Text>
);

const EmptyListRefreshButton = (props: { readonly refreshScreen: () => void }): JSX.Element => {
    if (!props.refreshScreen) {
        return <EmptyComponent />;
    }
    return (
        <TouchableOpacity onPress={props.refreshScreen} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
            <Icon name={'refresh'} type={'FontAwesome'} style={{ color: colors.teal, fontSize: 17, marginRight: 10 }} />
            <Text style={[textStyles.paragraphBoldBlackLeft, { color: colors.teal }]}>
                <Trans>Try again</Trans>
            </Text>
        </TouchableOpacity>
    );
};