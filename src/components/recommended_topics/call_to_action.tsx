import React from 'react';
import { History } from 'history';
import { Dimensions, Image, TouchableOpacity, I18nManager } from 'react-native';
import { Trans } from '@lingui/react';
import { View, Text, Button, Icon } from 'native-base';
import { goToRouteWithoutParameter, Routes } from '../../application/routing';
import { textStyles, applicationStyles, colors, values } from '../../application/styles';
import { advisor, recommendationBubble } from '../../application/images';

type Props = { readonly history: History };

export const CallToActionFullComponent = (props: Props): JSX.Element => {
    return (
        <View>
            <View style={[
                applicationStyles.boxShadowBelow,
                {
                    backgroundColor: colors.lightGrey,
                    borderRadius: values.lessRoundedBorderRadius,
                    padding: 20,
                    marginBottom: 10,
                },
            ]}>
                <FullComponentContent />
                <FullComponentButton {...props} />
            </View>
            <View style={{ alignItems: 'center'}}>
                <Icon type={'FontAwesome'} name={'angle-down'} style={{ color: colors.lightGrey }} />
            </View>
        </View>
    );
};

const FullComponentContent = (): JSX.Element => {
    const logoSize = Dimensions.get('screen').width / 4;
    return (
        <View>
            <View style={{ flex: 5, flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                <View style={{ flex: 3 }}>
                    <Text style={[textStyles.headlineH5StyleBlackLeft, { color: colors.greyishBrown, marginBottom: 20 }]}>
                        <Trans>GETTING STARTED</Trans>
                    </Text>
                    <Text style={textStyles.headlineH2StyleBlackLeft}>
                        <Trans>Get information based on your needs</Trans>
                    </Text>
                </View>
                <Image
                    source={advisor}
                    resizeMode={'contain'}
                    style={{
                        flex: 2,
                        width: logoSize,
                        height: logoSize,
                    }}
                />
            </View>
            <Text style={[textStyles.paragraphStyleBrown, { marginBottom: 20 }]}>
                <Trans>
                    Answer a few questions about your situation to get personalized
                    recommendations of topics and services to help you settle in British Columbia.
                </Trans>
            </Text>
        </View>
    );
};

const FullComponentButton = (props: Props): JSX.Element => (
    <Button
        full
        onPress={goToRouteWithoutParameter(Routes.Questionnaire, props.history)}
        style={[applicationStyles.tealButton, applicationStyles.boxShadowBelow]}
    >
        <Text style={textStyles.tealButton}>
            <Trans>Answer questions</Trans>
        </Text>
    </Button>
);

export const CallToActionFullSubComponent = (): JSX.Element => {
    const rightColumnContent = (
        <Text style={[textStyles.paragraphStyleBrown, { paddingLeft: 5 }]}>
            <Trans>
                Once you answer some questions, your recommendations will show up below.
                For now, here are some topics we recommend for everyone:
            </Trans>
        </Text>
    );
    return buildRecommendationContent(rightColumnContent);
};

export const CallToActionPartialComponent = (props: Props): JSX.Element => {
    const rightColumnContent = (
        <View>
            <Text style={[textStyles.headlineH5StyleBlackLeft, { color: colors.greyishBrown, paddingTop: 4 }]}>
                <Trans>UPDATE MY RECOMMENDATIONS</Trans>
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={[textStyles.headline6, { marginRight: 10 }]}>
                    <Trans>Go back to questions</Trans>
                </Text>
                <Icon
                    type={'FontAwesome'}
                    name={I18nManager.isRTL ? 'arrow-left' : 'arrow-right'}
                    style={{
                        color: colors.teal,
                        fontSize: 15,
                    }}
                />
            </View>
        </View>
    );
    return (
        <TouchableOpacity
            onPress={goToRouteWithoutParameter(Routes.Questionnaire, props.history)}
            style={[
                applicationStyles.boxShadowBelow,
                {
                    backgroundColor: colors.lightGrey,
                    borderRadius: values.lessRoundedBorderRadius,
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingVertical: 15,
                    paddingHorizontal: 10,
                    marginBottom: 15,
                },
            ]}
        >
            {buildRecommendationContent(rightColumnContent)}
        </TouchableOpacity>
    );
};

export const CallToActionPartialSubComponent = (): JSX.Element => {
    return (
        <Text style={[textStyles.paragraphStyleBrown, { paddingHorizontal: values.backgroundTextPadding }]}>
            <Trans>
                Based on your answers, we recommend these topics for you:
            </Trans>
        </Text>
    );
};

const buildRecommendationContent = (rightColumnContent: JSX.Element): JSX.Element => {
    const logoSize = Dimensions.get('screen').width / 9;
    return (
        <View style={{ flex: 4, flexDirection: 'row', alignItems: 'center' }}>
            <Image
                source={recommendationBubble}
                resizeMode={'contain'}
                style={{
                    flex: 1,
                    width: logoSize,
                    height: logoSize,
                    padding: 5,
                }}
            />
            <View style={{ flex: 3 }}>
                {rightColumnContent}
            </View>
        </View>
    );
};
