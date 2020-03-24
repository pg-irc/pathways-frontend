// tslint:disable: no-expression-statement
import React, { useCallback } from 'react';
import { History } from 'history';
import { Dimensions, Image, TouchableOpacity, I18nManager } from 'react-native';
import { Trans } from '@lingui/react';
import { View, Text, Button, Icon } from 'native-base';
import { goToRouteWithoutParameter, Routes } from '../../application/routing';
import { textStyles, applicationStyles, colors, markdownStyles, values } from '../../application/styles';
import { advisor, recommendationBubble } from '../../application/images';
import { openURL, LinkTypes } from '../link/link';
import { AnalyticsLinkPressedAction } from '../../stores/analytics';
import { buildAnalyticsLinkContext } from '../../sagas/analytics/events';

type Props = { readonly history: History };

type CovidComponentProps = {
    readonly analyticsLinkPressed: (currentPath: string, linkContext: string, linkType: string, linkValue: string) => AnalyticsLinkPressedAction;
    readonly currentPathForAnalytics: string;
};

const BCCDC_COVID_LINK = 'http://www.bccdc.ca/health-info/diseases-conditions/covid-19';
const LINK_CONTEXT_MODEL = 'Alert';
const LINK_CONTEXT_TITLE = 'covid19';

export const CovidComponent = ({
    analyticsLinkPressed,
    currentPathForAnalytics,
}: CovidComponentProps): JSX.Element => {
    const onLinkPress = useCallback(
        (): void => {
            openURL(BCCDC_COVID_LINK);

            analyticsLinkPressed(
                currentPathForAnalytics,
                buildAnalyticsLinkContext(LINK_CONTEXT_MODEL, LINK_CONTEXT_TITLE),
                LinkTypes.website,
                BCCDC_COVID_LINK,
            );
        },
        [analyticsLinkPressed, currentPathForAnalytics],
    );

    return (
        <View style={[
            applicationStyles.boxShadowBelow,
            {
                backgroundColor: colors.lightGrey,
                borderRadius: values.lessRoundedBorderRadius,
                padding: 20,
                marginBottom: 10,
            },
        ]}>
            <View style={{ flex: 1, marginBottom: 10 }}>
                <Text style={textStyles.headlineH2StyleBlackLeft}>
                    <Trans>COVID-19 information</Trans>
                </Text>
            </View>
            <Text style={[textStyles.paragraphStyleBrown, { marginBottom: 20 }]}>
                <Trans>
                    Many of our listed services are transitioning to alternate
                    service delivery methods. Please check service providers'
                    websites for details.
                </Trans>
            </Text>
            <Text style={[textStyles.paragraphStyleBrown, { marginBottom: 20 }]}>
                <Trans>
                    Questions about COVID-19? Get the latest information from
                    <Text>{' '}</Text>
                    <Text style={markdownStyles.link} onPress={onLinkPress}>
                        BC Centre for Disease Control
                        <Text style={markdownStyles.link}>{' '}</Text>
                        <Icon name='external-link' type='FontAwesome' style={{ fontSize: 12, color: colors.teal }} />
                    </Text>
                    .
                </Trans>
            </Text>
        </View>
    );
}

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
