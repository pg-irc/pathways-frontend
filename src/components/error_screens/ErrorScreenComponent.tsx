import React from 'react';
import { Trans } from '@lingui/react';
import { View, Text, Image, Dimensions, ImageSourcePropType, TouchableOpacity } from 'react-native';
import { colors, textStyles } from '../../application/styles';
import { Icon } from 'native-base';
import { EmptyComponent } from '../empty_component/empty_component';

const errorImageSize = Dimensions.get('screen').width / 3.5;

type ErrorScreenComponentProps = {
    readonly refreshScreen: () => void;
    readonly imageSource: ImageSourcePropType;
    readonly title: JSX.Element;
    readonly header?: JSX.Element;
    readonly subTitle?: JSX.Element;
    readonly additionalContent?: JSX.Element;
};

export const ErrorScreenComponent = (props: ErrorScreenComponentProps): JSX.Element => (
    <View style={{ flex: 1, backgroundColor: colors.lightGrey }}>
        {props.header}
        <View
            style={{
                flex: 1,
                alignItems: 'center',
                paddingTop: 50,
                paddingHorizontal: 20,
            }}
        >
            <ErrorScreenImage imageSource={props.imageSource} />
            <ErrorScreenTitle title={props.title} hasSubTitle={!!props.subTitle} />
            <ErrorScreenSubTitle subTitle={props.subTitle} />
            <ErrorScreenAdditionalContent additionalContent={props.additionalContent} />
            <ErrorScreenRefreshButton refreshScreen={props.refreshScreen} />
        </View>
    </View>
);

const ErrorScreenImage = (props: { readonly imageSource: ImageSourcePropType }): JSX.Element => (
    <Image
        source={props.imageSource}
        resizeMode={'contain'}
        style={{
            height: errorImageSize,
            width: errorImageSize,
            marginBottom: 20,
        }}
    />
);

const ErrorScreenTitle = (props: { readonly title: JSX.Element, readonly hasSubTitle: boolean }): JSX.Element => {
    const marginBottom = props.hasSubTitle ? 10 : 20;
    return (
        <Text style={[textStyles.headlineH2StyleBlackCenter, { marginBottom }]}>
            {props.title}
        </Text>
    );
};

const ErrorScreenSubTitle = (props: { readonly subTitle?: JSX.Element  }): JSX.Element => {
    if (!props.subTitle) {
        return <EmptyComponent />;
    }
    return (
        <Text style={[textStyles.paragraphStyleBrownCenter, { marginBottom: 20 }]}>
            {props.subTitle}
        </Text>
    );
};

const ErrorScreenAdditionalContent = (props: { readonly additionalContent?: JSX.Element  }): JSX.Element => {
    if (!props.additionalContent) {
        return <EmptyComponent />;
    }
    return (
        <View style={{ marginBottom: 20 }}>
            {props.additionalContent}
        </View>
    );
};

const ErrorScreenRefreshButton = (props: { readonly refreshScreen: () => void }): JSX.Element => (
    <TouchableOpacity onPress={props.refreshScreen} style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Icon name={'refresh'} type={'FontAwesome'} style={{ color: colors.teal, fontSize: 17, marginRight: 10 }} />
        <Text style={[textStyles.paragraphBoldBlackLeft, { color: colors.teal }]}>
            <Trans>Try again</Trans>
        </Text>
    </TouchableOpacity>
);
