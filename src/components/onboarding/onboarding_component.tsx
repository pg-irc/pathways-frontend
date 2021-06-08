// tslint:disable:no-expression-statement
import { Trans } from '@lingui/react';
import { t } from '@lingui/macro';
import { History } from 'history';
import * as R from 'ramda';
import React, { Dispatch, SetStateAction, useRef, useState } from 'react';
import {
    I18nManager,
    Image,
    ImageSourcePropType,
    SafeAreaView,
    Platform,
    PlatformOSType,
    TouchableOpacity,
    Text,
    View,
} from 'react-native';
import Swiper from 'react-native-swiper';

import { Routes, goToRouteWithoutParameter } from '../../application/routing';
import { mapWithIndex } from '../../application/helpers/map_with_index';
import { textStyles } from '../../application/styles';
import {
    answerQuestionsOnBoardingImage,
    settlementJourneyOnBoardingImage,
    bookmarkOnBoardingImage,
    welcomeBCLogo,
    bc211Logo,
    mbStartLogo,
    mb211Logo,
} from '../../application/images';
import { HideOnboardingAction } from '../../stores/user_profile';
import { MultiLineButtonComponent } from '../mutiline_button/multiline_button_component';
import styles from './styles';
import { RegionCode } from '../../validation/region/types';

enum STEP {
    FORWARD = 1,
    BACKWARD = -1,
}

const ONBOARDING_DATA_LENGTH = 4;

export interface OnboardingComponentActions {
    readonly hideOnboarding: () => HideOnboardingAction;
}
export interface OnboardingComponentProps {
    readonly region: RegionCode;
}

interface OwnProps {
    readonly history: History;
}

interface OnboardingData {
    readonly id: number;
    readonly ImageElement: JSX.Element;
    readonly TitleElement: JSX.Element;
}

type Props = OnboardingComponentProps & OnboardingComponentActions & OwnProps;

const OnboardingImage = (props: { readonly source: ImageSourcePropType }): JSX.Element => (
    <Image
        source={props.source}
        resizeMode='contain'
        style={styles.onboardingImage}
    />
);

const BCOnboardingImages = (): JSX.Element => (
    <View style={{ flexDirection: 'column', alignItems: 'center'}}>
        <Image
            source={welcomeBCLogo}
            resizeMode='contain'
            style={{height: 80, width: 190, marginBottom: 16}}
        />
        <Image
            source={bc211Logo}
            resizeMode='contain'
            style={{height: 92, width: 140, marginBottom: 40}}
        />
    </View>
);

const MBOnboardingImages = (): JSX.Element => (
    <View style={{ flexDirection: 'column', alignItems: 'center'}}>
        <Image
            source={mbStartLogo}
            resizeMode='contain'
            style={{height: 106, width: 140, marginBottom: 16}}
        />
        <Image
            source={mb211Logo}
            resizeMode='contain'
            style={{height: 68, width: 140, marginBottom: 40}}
        />
    </View>
);

const OnboardingText = (props: { readonly children: JSX.Element }): JSX.Element => (
    <Text style={styles.onboardingText}>
        {props.children}
    </Text>
);

const OnboardingSlide = (props: { readonly children: ReadonlyArray<JSX.Element> }): JSX.Element => (
    <View style={styles.onboardingSlide}>
        {props.children}
    </View>
);

const WelcomeText = (props: { readonly children: JSX.Element }): JSX.Element => (
    <Text style={textStyles.headlineH2StyleBlackCenter}>
        {props.children}
    </Text>
);

const SkipButton = ({ onPress }: { readonly onPress: () => void }): JSX.Element => {
    return (
        <TouchableOpacity style={styles.skipButton} onPress={onPress}>
            <Text style={textStyles.headline6}>
                <Trans>Skip</Trans>
            </Text>
        </TouchableOpacity>
    );
};

const NavigationDots = (props: { readonly currentIndex: number, readonly count: number }): JSX.Element => {
    const navigationDots = R.map((loopIndex: number): JSX.Element => {
            const dotStyle = props.currentIndex === loopIndex
                ? [styles.dotStyle, styles.activeDot]
                : styles.dotStyle;
            return <View key={loopIndex} style={dotStyle} />;
        },
        R.range(0, props.count),
    );

    return (
        <View style={styles.dotContainer}>
            {navigationDots}
        </View>
    );
};

function computeSwiperIndex(index: number, isRTL: boolean, platform: PlatformOSType): number {
    if (platform === 'android' && isRTL) {
        return ONBOARDING_DATA_LENGTH - 1 - index;
    }

    return index;
}

const getOnboardingData = (region: RegionCode): ReadonlyArray<OnboardingData> => [
    {
    id: 1,
    ImageElement: region === RegionCode.MB ? (<MBOnboardingImages/>) : (<BCOnboardingImages/>),
    TitleElement: (<OnboardingText>
                        <Trans id={t`Your go-to guide to getting settled in your new community.`} />
                    </OnboardingText>),
    },
    {
    id: 2,
    ImageElement: (<OnboardingImage source={bookmarkOnBoardingImage} />),
    TitleElement: (<OnboardingText>
                        <Trans id={t`Bookmark the topics and services that you find helpful for future use.`} />
                    </OnboardingText>),
    },
    {
    id: 3,
    ImageElement: (<OnboardingImage source={settlementJourneyOnBoardingImage} />),
    TitleElement: (<OnboardingText>
                        <Trans id={t`Find service providers near you that can help you through your settlement journey.`} />
                    </OnboardingText>),
    },
    {
    id: 4,
    ImageElement: (<OnboardingImage source={answerQuestionsOnBoardingImage} />),
    TitleElement: (<OnboardingText>
                        <Trans id={t`Answer a few optional questions to get tailored recommendations for your needs.`} />
                    </OnboardingText>),
    },
];

export const OnboardingComponent = (props: Props): JSX.Element => {
    const swiperRef = useRef<Swiper>();

    const [index, setIndex]: readonly [number, Dispatch<SetStateAction<number>>]
        = useState<number>(0);

    const swiperIndex: number = computeSwiperIndex(index, I18nManager.isRTL, Platform.OS);

    const scrollDirection: STEP = I18nManager.isRTL && Platform.OS === 'android' ? STEP.BACKWARD : STEP.FORWARD;

    const onSkipPress = (): void => {
        props.hideOnboarding();
        goToRouteWithoutParameter(Routes.RecommendedTopics, props.history);
    };

    const onIndexChange = (newIndex: number): void => {
        setIndex(computeSwiperIndex(newIndex, I18nManager.isRTL, Platform.OS));
    };

    const onActionPress = (): void => {
        if (index === ONBOARDING_DATA_LENGTH - 1) {
            onSkipPress();
        } else {
            swiperRef.current.scrollBy(scrollDirection);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <SkipButton onPress={onSkipPress}/>
            <View style={styles.onboardingContainer}>
                <View style={styles.onboardingSlideContainer}>
                    <Swiper
                        // We don't want to display Swiper's built in dot display
                        activeDot={<View style={{ display: 'none' }} />}
                        dot={<View style={{ display: 'none' }} />}
                        index={swiperIndex}
                        horizontal={true}
                        loop={false}
                        onIndexChanged={onIndexChange}
                        ref={swiperRef}
                        showsButtons={false}
                    >
                        {
                            mapWithIndex(
                                (item: OnboardingData, slideIndex: number): JSX.Element => {
                                    return (
                                        <OnboardingSlide key={slideIndex}>
                                            {item.ImageElement}
                                            {
                                                slideIndex === 0 &&
                                                <WelcomeText>
                                                    <Trans>Welcome to Arrival Advisor</Trans>
                                                </WelcomeText>
                                            }
                                            {item.TitleElement}
                                        </OnboardingSlide>
                                    );
                                },
                                getOnboardingData(props.region),
                            )
                        }
                    </Swiper>
                </View>
                <View style={styles.nextButtonSection}>
                    <MultiLineButtonComponent onPress={onActionPress} additionalStyles={styles.nextButton}>
                        <Text style={textStyles.button}>
                            <Trans id={index === ONBOARDING_DATA_LENGTH - 1 ? t`Start` : t`Next` } />
                        </Text>
                    </MultiLineButtonComponent>
                    <NavigationDots currentIndex={index} count={ONBOARDING_DATA_LENGTH}/>
                </View>
            </View>
        </SafeAreaView>
    );
};
