// tslint:disable: no-expression-statement
import React from 'react';
import { History } from 'history';
import { Image, TouchableOpacity, I18nManager, FlatList, ListRenderItemInfo } from 'react-native';
import { Trans } from '@lingui/react';
import { View, Text, Button, Icon } from 'native-base';
import { goToRouteWithoutParameter, Routes } from '../../application/routing';
import { textStyles, applicationStyles, values } from '../../application/styles';
import { advisor, advisor_rtl, recommendationBubble } from '../../application/images';
import { callToActionStyles } from './styles';
import { EmptyComponent } from '../empty_component/empty_component';
import { MarkdownComponent } from '../../../src/components/markdown/markdown_component';
import { Alert } from '../../validation/content/types';
import { RegionCode } from '../../validation/region/types';

type Props = {
    readonly history: History;
    readonly region: RegionCode;
};

type AlertProps = {
    readonly alerts: ReadonlyArray<Alert>;
    readonly showLinkAlerts: boolean;
    readonly hideLinkAlerts: () => void;
};

export const AlertComponent = (props: AlertProps): JSX.Element => (
    <View>
        <FlatList
            style={{ paddingTop: 8 }}
            data={props.alerts}
            keyExtractor={(alert: Alert): string => alert.id}
            ListEmptyComponent={EmptyComponent}
            renderItem={({ item }: ListRenderItemInfo<Alert>): JSX.Element => renderAlert(item, props)} />
    </View>
);

const renderAlert = (alert: Alert, props: AlertProps): JSX.Element => (
    <View style={[
        applicationStyles.boxShadowBelow,
        callToActionStyles.callToActionContainer,
    ]}>
        <Text style={[textStyles.headlineH2StyleBlackLeft, { paddingHorizontal: values.backgroundTextPadding }]}>
            {alert.heading}
        </Text>
        <MarkdownComponent
            showLinkAlerts={props.showLinkAlerts}
            hideLinkAlerts={props.hideLinkAlerts}>
            {alert.content}
        </MarkdownComponent>
    </View>
);

export const CallToActionFullComponent = (props: Props): JSX.Element => (
    <View style={[
        applicationStyles.boxShadowBelow,
        callToActionStyles.callToActionContainer,
    ]}>
        <FullComponentContent />
        <FullComponentButton {...props} />
    </View >
);

const FullComponentContent = (): JSX.Element => (
    <View>
        <View style={callToActionStyles.callToActionContent}>
            <View style={callToActionStyles.callToActionLeftContent}>
                <Text style={textStyles.headlineH2StyleBlackLeft}>
                    <Trans>Get important topics based on your needs</Trans>
                </Text>
                <Text style={[textStyles.paragraphStyleBrown, { marginTop: 12 }]}>
                    <Trans>
                        Answer some questions about your situation
                    </Trans>
                </Text>
            </View>
            <Image
                source={I18nManager.isRTL ? advisor_rtl : advisor}
                resizeMode='contain'
                style={callToActionStyles.advisorImage}
            />
        </View>
    </View>
);

const FullComponentButton = (props: Props): JSX.Element => (
    <Button
        full
        onPress={(): void => goToRouteWithoutParameter(Routes.Questionnaire, props.history)}
        style={[applicationStyles.tealButton, applicationStyles.boxShadowBelow, { marginTop: 24 }]}
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
            onPress={(): void => goToRouteWithoutParameter(Routes.Questionnaire, props.history)}
            style={[
                applicationStyles.boxShadowBelow,
                callToActionStyles.callToActionPartialContainer,
            ]}
        >
            {buildRecommendationContent(rightColumnContent)}
        </TouchableOpacity>
    );
};

export const CallToActionPartialSubComponent = (): JSX.Element => (
    <Text style={[textStyles.paragraphStyleBrown, callToActionStyles.callToActionPartialContent]}>
        <Trans>
            Based on your answers, we recommend these topics for you:
        </Trans>
    </Text>
);

const buildRecommendationContent = (rightColumnContent: JSX.Element): JSX.Element => (
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
