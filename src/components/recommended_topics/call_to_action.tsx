// tslint:disable: no-expression-statement
import React from 'react';
import { History } from 'history';
import { Image, TouchableOpacity, I18nManager } from 'react-native';
import { Trans } from '@lingui/react';
import { View, Text, Button, Icon } from 'native-base';
import { goToRouteWithoutParameter, Routes } from '../../application/routing';
import { textStyles, applicationStyles, colors, markdownStyles } from '../../application/styles';
import { advisor, recommendationBubble } from '../../application/images';
import { openURL, LinkTypes } from '../link/link';
import { AnalyticsLinkPressedAction } from '../../stores/analytics';
import { buildAnalyticsLinkContext } from '../../sagas/analytics/events';

import { callToActionStyles } from './styles';

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
    const onLinkPress = (): void => {
        openURL(BCCDC_COVID_LINK);

        analyticsLinkPressed(
            currentPathForAnalytics,
            buildAnalyticsLinkContext(LINK_CONTEXT_MODEL, LINK_CONTEXT_TITLE),
            LinkTypes.website,
            BCCDC_COVID_LINK,
        );
    };

    return (
        <View style={[
            applicationStyles.boxShadowBelow,
            callToActionStyles.callToActionContainer,
        ]}>
            <View style={callToActionStyles.covidTitleContainer}>
                <Text style={textStyles.headlineH2StyleBlackLeft}>
                    <Trans>COVID-19 information</Trans>
                </Text>
            </View>
            <Text style={[textStyles.paragraphStyleBrown, callToActionStyles.covidUpperContent]}>
                <Trans>
                    Many of our listed services are transitioning to alternate
                    service delivery methods. Please check service providers'
                    websites for details.
                </Trans>
            </Text>
            <Text style={textStyles.paragraphStyleBrown}>
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
};

export const CallToActionFullComponent = (props: Props): JSX.Element => {
    return (
        <View>
            <View style={[
                applicationStyles.boxShadowBelow,
                callToActionStyles.callToActionContainer,
            ]}>
                <FullComponentContent />
                <FullComponentButton {...props} />
            </View>
        </View>
    );
};

const FullComponentContent = (): JSX.Element => {
    return (
        <View>
            <View style={callToActionStyles.callToActionContent}>
                <View style={callToActionStyles.callToActionUpperContent}>
                    <Text style={[textStyles.headlineH5StyleBlackLeft, callToActionStyles.callToActionTitle]}>
                        <Trans>GETTING STARTED</Trans>
                    </Text>
                    <Text style={textStyles.headlineH2StyleBlackLeft}>
                        <Trans>Get information based on your needs</Trans>
                    </Text>
                </View>
                <Image
                    source={advisor}
                    resizeMode='contain'
                    style={callToActionStyles.advisorImage}
                />
            </View>
            <Text style={[textStyles.paragraphStyleBrown, callToActionStyles.callToActionBottomContent]}>
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
        <Text style={[textStyles.paragraphStyleBrown, callToActionStyles.callToActionRightContent]}>
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
            <Text style={[textStyles.headlineH5StyleBlackLeft, callToActionStyles.updateRecommendationTitle]}>
                <Trans>UPDATE MY RECOMMENDATIONS</Trans>
            </Text>
            <View style={callToActionStyles.updateRecommendationContainer}>
                <Text style={[textStyles.headline6, callToActionStyles.updateRecommendationSubtitle]}>
                    <Trans>Go back to questions</Trans>
                </Text>
                <Icon
                    type='FontAwesome'
                    name={I18nManager.isRTL ? 'arrow-left' : 'arrow-right'}
                    style={callToActionStyles.updateRecommendationIcon}
                />
            </View>
        </View>
    );
    return (
        <TouchableOpacity
            onPress={goToRouteWithoutParameter(Routes.Questionnaire, props.history)}
            style={[
                applicationStyles.boxShadowBelow,
                callToActionStyles.callToActionPartialContainer,
            ]}
        >
            {buildRecommendationContent(rightColumnContent)}
        </TouchableOpacity>
    );
};

export const CallToActionPartialSubComponent = (): JSX.Element => {
    return (
        <Text style={[textStyles.paragraphStyleBrown, callToActionStyles.callToActionPartialContent]}>
            <Trans>
                Based on your answers, we recommend these topics for you:
            </Trans>
        </Text>
    );
};

const buildRecommendationContent = (rightColumnContent: JSX.Element): JSX.Element => {
    return (
        <View style={{ flex: 4, flexDirection: 'row', alignItems: 'center' }}>
            <Image
                source={recommendationBubble}
                resizeMode='contain'
                style={callToActionStyles.recommendationBubbleImage}
            />
            <View style={callToActionStyles.recommendationRightContent}>
                {rightColumnContent}
            </View>
        </View>
    );
};
