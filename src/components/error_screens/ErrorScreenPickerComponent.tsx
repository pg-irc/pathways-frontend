import React from 'react';
import { Trans } from '@lingui/react';
import { View, Text, Image, Dimensions, ImageSourcePropType, TouchableOpacity } from 'react-native';
import { colors, textStyles } from '../../application/styles';
import { Errors } from '../../errors/types';
import { noInternet } from '../../application/images';

const errorImageSize = Dimensions.get('screen').width / 3;

type ErrorScreenPickerComponentProps = {
    readonly errorType: Errors;
    readonly refreshScreen: () => void;
};

export const ErrorScreenPickerComponent = (props: ErrorScreenPickerComponentProps): JSX.Element => {
    switch (props.errorType) {
        default:
        case Errors.Offline:
            return (
                <ErrorScreenComponent
                    title={<Trans>Can't reach the internet</Trans>}
                    subTitle={<Trans>Services are not available offline. Please connect to the internet and try again.</Trans>}
                    imageSource={noInternet}
                    refreshScreen={props.refreshScreen}
                />
            );
    }
};

type ErrorScreenComponentProps = {
    readonly imageSource: ImageSourcePropType;
    readonly title: JSX.Element;
    readonly subTitle: JSX.Element;
    readonly refreshScreen: () => void;
};

const ErrorScreenComponent = (props: ErrorScreenComponentProps): JSX.Element => (
    <View
        style={{
            flex: 1,
            backgroundColor: colors.lightGrey,
            alignItems: 'center',
            paddingTop: 50,
            paddingHorizontal: 10,
        }}
    >
        <ErrorScreenImage imageSource={props.imageSource} />
        <ErrorScreenTitle title={props.title} />
        <ErrorScreenSubTitle subTitle={props.subTitle} />
        <ErrorScreenRefreshButton refreshScreen={props.refreshScreen} />
    </View>
);

const ErrorScreenImage = (props: { readonly imageSource: ImageSourcePropType }): JSX.Element => (
    <Image
        source={props.imageSource}
        resizeMode={'contain'}
        style={{
            height: errorImageSize,
            width: errorImageSize,
        }}
    />
);

const ErrorScreenTitle = (props: { readonly title: JSX.Element  }): JSX.Element => (
    <Text style={[textStyles.headlineH2StyleBlackCenter, { marginTop: 20, marginBottom: 10 }]}>
        {props.title}
    </Text>
);

const ErrorScreenSubTitle = (props: { readonly subTitle: JSX.Element  }): JSX.Element => (
    <Text style={[textStyles.paragraphStyleBrownCenter, { marginBottom: 10 }]}>
        {props.subTitle}
    </Text>
);

const ErrorScreenRefreshButton = (props: { readonly refreshScreen: () => void }): JSX.Element => (
    <TouchableOpacity onPress={props.refreshScreen}>
        <Text>
            <Trans>Try again</Trans>
        </Text>
    </TouchableOpacity>
);
