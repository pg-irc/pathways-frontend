// tslint:disable: no-expression-statement
import React from 'react';
import { History } from 'history';
import { Image, TouchableOpacity, I18nManager, FlatList, ListRenderItemInfo } from 'react-native';
import { Trans } from '@lingui/react';
import { View, Text, Button, Icon } from 'native-base';
import { goToRouteWithoutParameter, Routes } from '../../application/routing';
import { textStyles, applicationStyles } from '../../application/styles';
import { advisor, recommendationBubble } from '../../application/images';
import { callToActionStyles } from './styles';
import { EmptyComponent } from '../empty_component/empty_component';
import { MarkdownComponent } from '../../../src/components/markdown/markdown_component';
import { Alert } from '../../validation/content/types';

type Props = { readonly history: History };

type AlertProps = {
    readonly alerts: ReadonlyArray<Alert>;
    readonly showLinkAlerts: boolean;
    readonly hideLinkAlerts: () => void;
};

export const AlertComponent = (props: AlertProps): JSX.Element => {
    return (
        <View>
            <FlatList
                style={{ paddingTop: 8 }}
                data={props.alerts}
                keyExtractor={(alert: Alert): string => alert.id}
                ListEmptyComponent={EmptyComponent}
                renderItem={({ item }: ListRenderItemInfo<Alert>): JSX.Element => renderAlert(item, props)} />
        </View>
    );
};

const renderAlert = (alert: Alert, props: AlertProps): JSX.Element => {
    return (
        <View style={[
            applicationStyles.boxShadowBelow,
            callToActionStyles.callToActionContainer,
        ]}>
            <Text style={textStyles.headlineH2StyleBlackLeft}>
                {alert.heading}
            </Text>
            <MarkdownComponent
                showLinkAlerts={props.showLinkAlerts}
                hideLinkAlerts={props.hideLinkAlerts}>
                {alert.content}
            </MarkdownComponent>
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
