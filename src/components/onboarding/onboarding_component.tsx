// tslint:disable:no-expression-statement
import { Trans } from '@lingui/react';
import { t } from '@lingui/macro';
import { History } from 'history';
import _ from 'lodash';
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
import { mapWithIndex } from '../../application/map_with_index';
import { textStyles } from '../../application/styles';
import {
    communityOnBoardingImage,
    answerQuestionsOnBoardingImage,
    settlementJourneyOnBoardingImage,
    bookmarkOnBoardingImage,
} from '../../application/images';
import { HideOnboardingAction } from '../../stores/user_profile';
import { MultiLineButtonComponent } from '../mutiline_button/multiline_button_component';

import styles from './styles';

enum STEP {
    FORWARD = 1,
    BACKWARD = -1,
}
export interface OnboardingComponentActions {
    readonly hideOnboarding: () => HideOnboardingAction;
}
interface OnboardingComponentProps {
    readonly history: History;
}

interface OnboardingData {
    readonly id: number;
    readonly image: ImageSourcePropType;
    readonly title: string;
}

const ONBOARDING_DATA: ReadonlyArray<OnboardingData> = [
    {
      id: 1,
      image: communityOnBoardingImage,
      title: t`Your go-to guide to getting settled in your new community.`,
    },
    {
      id: 2,
      image: bookmarkOnBoardingImage,
      title: t`Bookmark the topics that you find helpful for future use.`,
    },
    {
      id: 3,
      image: settlementJourneyOnBoardingImage,
      title: t`Find service providers near you that can help you through your settlement journey.`,
    },
    {
      id: 4,
      image: answerQuestionsOnBoardingImage,
      title: t`Answer a few optional questions to get tailored recommendations for your needs.`,
    },
];

type Props = OnboardingComponentProps & OnboardingComponentActions;

const OnboardingImage = (props: { readonly source: ImageSourcePropType }): JSX.Element => (
    <Image
        source={props.source}
        resizeMode='contain'
        style={styles.onboardingImage}
    />
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

            console.log();

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
        return ONBOARDING_DATA.length - 1 - index;
    }

    return index;
}

export const OnboardingComponent = ({ hideOnboarding, history }: Props): JSX.Element => {
    const swiperRef = useRef<Swiper>();

    const [index, setIndex]: readonly [number, Dispatch<SetStateAction<number>>]
        = useState<number>(0);

    const swiperIndex: number = computeSwiperIndex(index, I18nManager.isRTL, Platform.OS);

    const scrollDirection: STEP = I18nManager.isRTL && Platform.OS === 'android' ? STEP.BACKWARD : STEP.FORWARD;

    const onSkipPress = (): void => {
        hideOnboarding();
        goToRouteWithoutParameter(Routes.RecommendedTopics, history)();
    };

    const onIndexChange = _.debounce((newIndex: number): void => {
        setIndex(computeSwiperIndex(newIndex, I18nManager.isRTL, Platform.OS));
    }, 300, { leading: true });

    const onActionPress = _.debounce((): void => {
        if (index === ONBOARDING_DATA.length - 1) {
            onSkipPress();
        } else {
            swiperRef.current.scrollBy(scrollDirection);
        }
    }, 300, { leading: true });

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
                                            <OnboardingImage source={item.image} />
                                            {
                                                slideIndex === 0 &&
                                                <WelcomeText>
                                                    <Trans>Welcome to Arrival Advisor</Trans>
                                                </WelcomeText>
                                            }
                                            <OnboardingText>
                                                <Trans id={item.title} />
                                            </OnboardingText>
                                        </OnboardingSlide>
                                    );
                                },
                                ONBOARDING_DATA,
                            )
                        }
                    </Swiper>
                </View>
                <View style={styles.nextButtonSection}>
                    <MultiLineButtonComponent onPress={onActionPress} additionalStyles={styles.nextButton}>
                        <Text style={textStyles.button}>
                            <Trans id={index === ONBOARDING_DATA.length - 1 ? t`Start` : t`Next` } />
                        </Text>
                    </MultiLineButtonComponent>
                    <NavigationDots currentIndex={index} count={ONBOARDING_DATA.length}/>
                </View>
            </View>
        </SafeAreaView>
    );
};
