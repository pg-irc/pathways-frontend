import React from 'react';
import { View, Text, Dimensions, Image, ImageSourcePropType } from 'react-native';
import { textStyles } from '../../application/styles';
import {
    communityOnBoardingImage,
    answerQuestionsOnBoardingImage,
    settlementJourneyOnBoardingImage,
    bookmarkOnBoardingImage,
} from '../../application/images';
import { Trans } from '@lingui/react';
import { SwipeableContentComponent } from '../swipeable_content/swipeable_content_component';

const onboardingImageWidth = Dimensions.get('screen').width / 1.25;

const onboardingImageHeight = Dimensions.get('screen').height / 2;

const onboardingSlideHeight = Dimensions.get('screen').height / 1.25;

export const OnboardingComponent = (): JSX.Element => {
    return (
        <View style={{ flex: 1, justifyContent: 'space-around', alignItems: 'center' }}>
            <Text>Close</Text>
            <SwipeableContentComponent contentItems={getContentItems()}/>
        </View>
    );
};

const getContentItems = (): ReadonlyArray<JSX.Element> => (
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
        }}
    />
);

const OnboardingText = (props: { readonly text: JSX.Element }): JSX.Element => (
    <Text style={textStyles.onboarding}>
        {props.text}
    </Text>
);

const OnboardingSlide = (props: { readonly children: ReadonlyArray<JSX.Element> }): JSX.Element => (
    <View
        style={{
            height: onboardingSlideHeight,
            justifyContent: 'space-around',
            alignItems: 'center',
            paddingHorizontal: 10,
        }}
    >
        {props.children}
    </View>
);
