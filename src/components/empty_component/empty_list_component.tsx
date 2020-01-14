import React from 'react';
import { Text, View, Icon } from 'native-base';
import { colors, textStyles } from '../../application/styles';
import { ImageSourcePropType, ScrollView, Dimensions, Image, TouchableOpacity } from 'react-native';
import { EmptyComponent } from './empty_component';
import { Trans } from '@lingui/react';

const emptyListImageSize = Dimensions.get('screen').width / 3.5;

export interface EmptyListProps {
    readonly refreshScreen?: () => void;
    readonly imageSource: ImageSourcePropType;
    readonly title: JSX.Element;
    readonly header?: JSX.Element;
    readonly subTitle?: JSX.Element;
    readonly additionalContent?: JSX.Element;
}

export const EmptyListComponent: React.StatelessComponent<EmptyListProps> = (props: EmptyListProps): JSX.Element => (
    <ScrollView style={{ flex: 1, backgroundColor: colors.lightGrey }}>
    {props.header}
        <View
            style={{
                flex: 1,
                alignItems: 'center',
                paddingTop: 50,
                paddingHorizontal: 20,
            }}
        >
            <EmptyListImage imageSource={props.imageSource} />
            <EmptyListTitle title={props.title} hasSubTitle={!!props.subTitle} />
            <EmptyListSubtitle subTitle={props.subTitle} />
            <EmptyListAdditionalContent additionalContent={props.additionalContent} />
            <EmptyListRefreshButton refreshScreen={props.refreshScreen} />
        </View>
    </ScrollView>
);

const EmptyListImage = (props: { readonly imageSource: ImageSourcePropType }): JSX.Element => (
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

const EmptyListTitle = (props: { readonly title: JSX.Element, readonly hasSubTitle: boolean }): JSX.Element => {
    const marginBottom = props.hasSubTitle ? 10 : 20;
    return (
        <Text style={[textStyles.headlineH2StyleBlackCenter, { marginBottom }]}>
            {props.title}
        </Text>
    );
};

const EmptyListSubtitle = (props: { readonly subTitle?: JSX.Element  }): JSX.Element => {
    if (!props.subTitle) {
        return <EmptyComponent />;
    }
    return (
        <Text style={[textStyles.paragraphStyleBrownCenter, { marginBottom: 20 }]}>
            {props.subTitle}
        </Text>
    );
};

const EmptyListAdditionalContent = (props: { readonly additionalContent?: JSX.Element  }): JSX.Element => {
    if (!props.additionalContent) {
        return <EmptyComponent />;
    }
    return (
        <View style={{ marginBottom: 20 }}>
            {props.additionalContent}
        </View>
    );
};

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