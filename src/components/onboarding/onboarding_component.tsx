// tslint:disable:no-expression-statement
import React from 'react';
import { View, Text, Dimensions, Image, ImageSourcePropType } from 'react-native';
import { History } from 'history';
import { textStyles, colors } from '../../application/styles';
import {
    communityOnBoardingImage,
    answerQuestionsOnBoardingImage,
    settlementJourneyOnBoardingImage,
    bookmarkOnBoardingImage,
} from '../../application/images';
import { Trans } from '@lingui/react';
import { SwipeableContentComponent } from '../swipeable_content/swipeable_content_component';
import { SetOnboardingAction } from '../../stores/onboarding/actions';
import { CloseButtonComponent } from '../close_button/close_button_component';
import { Routes, goToRouteWithoutParameter } from '../../application/routing';
import { MultiLineButtonComponent } from '../mutiline_button/multiline_button_component';

const onboardingImageWidth = Dimensions.get('screen').width / 1.25;

const onboardingImageHeight = Dimensions.get('screen').height / 2;

const onboardingSlideHeight = Dimensions.get('screen').height / 1.25;

const startButtonWidth = Dimensions.get('screen').width / 2;

interface OnboardingComponentProps {
    readonly history: History;
}

export interface OnboardingActions {
    readonly setOnboarding: () => SetOnboardingAction;
}

type Props = OnboardingComponentProps & OnboardingActions;

export const OnboardingComponent = (props: Props): JSX.Element => {
    const onCloseButtonPress = (): void => {
        props.setOnboarding();
        goToRouteWithoutParameter(Routes.RecommendedTopics, props.history)();
    };
    const onPersonalizeButtonPress = (): void => {
        props.setOnboarding();
        goToRouteWithoutParameter(Routes.Questionnaire, props.history)();
    };
    const swipeableContent = buildSwipeableContent(onPersonalizeButtonPress);
    return (
        <View style={{ flex: 1 }}>
            <CloseButtonComponent
                onPress={onCloseButtonPress}
                color={colors.black}
            />
            <SwipeableContentComponent contentItems={swipeableContent}/>
        </View>
    );
};

const buildSwipeableContent = (onPersonalizeButtonPress: () => void): ReadonlyArray<JSX.Element> => (
    [
        <OnboardingSlide>
            <OnboardingImage source={communityOnBoardingImage} />
            <OnboardingText
                text={<Trans>Arrival Advisor is your go-to guide to getting settled in your new community.</Trans>}
            />
        </OnboardingSlide>,
        <OnboardingSlide>
            <OnboardingImage source={answerQuestionsOnBoardingImage}/>
            <OnboardingText
                text={<Trans>Answer a few optional questions to get tailored recommendations for your needs.</Trans>}
            />
        </OnboardingSlide>,
        <OnboardingSlide>
            <OnboardingImage source={settlementJourneyOnBoardingImage}/>
            <OnboardingText
                text={<Trans>Find service providers near you that can help you through your settlement journey.</Trans>}
            />
        </OnboardingSlide>,
        <OnboardingSlide>
            <OnboardingImage source={bookmarkOnBoardingImage}/>
            <OnboardingText
                text={<Trans>Bookmark the topics that you find helpful for future use.</Trans>}
            />
            <MultiLineButtonComponent
                onPress={onPersonalizeButtonPress}
                additionalStyles={{ flex: 0, width: startButtonWidth }}>
                <Text style={textStyles.button}>
                    <Trans>Start</Trans>
                </Text>
            </MultiLineButtonComponent>
        </OnboardingSlide>,
    ]
);

const OnboardingImage = (props: { readonly source: ImageSourcePropType }): JSX.Element => (
    <Image
        source={props.source}
        resizeMode={'contain'}
        style={{
            height: onboardingImageHeight,
            width: onboardingImageWidth,
            marginBottom: 30,
        }}
    />
);

const OnboardingText = (props: { readonly text: JSX.Element }): JSX.Element => (
    <Text style={[textStyles.onboarding, { marginBottom: 30 }]}>
        {props.text}
    </Text>
);

const OnboardingSlide = (props: { readonly children: ReadonlyArray<JSX.Element> }): JSX.Element => (
    <View
        style={{
            height: onboardingSlideHeight,
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 10,
        }}
    >
        {props.children}
    </View>
);
