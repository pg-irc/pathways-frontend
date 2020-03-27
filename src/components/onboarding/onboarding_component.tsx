// tslint:disable:no-expression-statement
import { Trans } from '@lingui/react';
import { t } from '@lingui/macro';
import { History } from 'history';
import * as R from 'ramda';
import React, { Dispatch, MutableRefObject, SetStateAction, useCallback, useRef, useState } from 'react';
import {
    I18nManager,
    Image,
    ImageSourcePropType,
    SafeAreaView,
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

interface IndexHandlerInterface {
    readonly index: number;
    readonly swiperIndex: number;
    readonly isLastSwiperSlide: () => boolean;
    readonly scrollNext: () => void;
    readonly onSwiperIndexChanged: (i: number) => void;
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

enum STEP {
    FORWARD = 1,
    BACKWARD = -1,
}

/**
 * This hook aims to abstract out the confusing handling of indexes.
 * Though the natural indexing works for the UI elements. A separate indexer is needed for
 * react-native-swiper to handle the RTL scenario
 */
const useIndexHandler = (swiperRef: MutableRefObject<Swiper>): IndexHandlerInterface  => {
    const initialSwiperIndex = I18nManager.isRTL ? ONBOARDING_DATA.length - 1 : 0;

    const lastSwiperIndex = I18nManager.isRTL ? 0 : ONBOARDING_DATA.length - 1;

    const [index, setIndex]: readonly [number, Dispatch<SetStateAction<number>>]
        = useState<number>(0);

    const [swiperIndex, setSwiperIndex]: readonly [number, Dispatch<SetStateAction<number>>]
        = useState<number>(initialSwiperIndex);

    const isLastSwiperSlide = useCallback<() => boolean>(
        (): boolean => swiperIndex === lastSwiperIndex,
        [swiperIndex],
    );

    const onSwiperIndexChanged = useCallback<(i: number) => void>(
        (newIndex: number): void => {
            setSwiperIndex(newIndex);
            setIndex(I18nManager.isRTL ? ONBOARDING_DATA.length - 1 - newIndex : newIndex);
        },
        [setIndex, setSwiperIndex],
    );

    const scrollNext = useCallback<() => void>(
        (): void => {
            swiperRef.current.scrollBy(I18nManager.isRTL ? STEP.BACKWARD : STEP.FORWARD);
        },
        [],
    );

    return {
        index,
        swiperIndex,
        isLastSwiperSlide,
        scrollNext,
        onSwiperIndexChanged,
    };
};

export const OnboardingComponent = ({ hideOnboarding, history }: Props): JSX.Element => {
    const swiperRef = useRef<Swiper>();

    const {
        index,
        swiperIndex,
        onSwiperIndexChanged,
        isLastSwiperSlide,
        scrollNext,
    }: IndexHandlerInterface = useIndexHandler(swiperRef);

    const onSkipPress = useCallback<() => void>(
        (): void => {
            hideOnboarding();
            goToRouteWithoutParameter(Routes.RecommendedTopics, history)();
        },
        [hideOnboarding, history],
    );

    const onActionPress = useCallback<() => void>(
        (): void => {
            if (isLastSwiperSlide()) {
                onSkipPress();
            } else {
                scrollNext();
            }
        },
        [scrollNext, onSkipPress],
    );

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
                        onIndexChanged={onSwiperIndexChanged}
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
                            <Trans id={isLastSwiperSlide() ? t`Start` : t`Next` } />
                        </Text>
                    </MultiLineButtonComponent>
                    <NavigationDots currentIndex={index} count={ONBOARDING_DATA.length}/>
                </View>
            </View>
        </SafeAreaView>
    );
};
