// tslint:disable:no-expression-statement
import { Trans } from '@lingui/react';
import { t } from '@lingui/macro';
import { History } from 'history';
import * as R from 'ramda';
import React, { Dispatch, SetStateAction, useCallback, useRef, useState } from 'react';
import {
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

export interface OnboardingActions {
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
      image: answerQuestionsOnBoardingImage,
      title: t`Answer a few optional questions to get tailored recommendations for your needs.`,
    },
    {
      id: 3,
      image: settlementJourneyOnBoardingImage,
      title: t`Find service providers near you that can help you through your settlement journey.`,
    },
    {
      id: 4,
      image: bookmarkOnBoardingImage,
      title: t`Bookmark the topics that you find helpful for future use.`,
    },
];

const START_LABEL = t`Start`;
const NEXT_LABEL = t`Next`;

type Props = OnboardingComponentProps & OnboardingActions;

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
    const navigationDots = R.range(0, props.count).map(
        (_: undefined, loopIndex: number): JSX.Element => {
            const dotStyle = props.currentIndex === loopIndex
                ? [styles.dotStyle, styles.activeDot]
                : styles.dotStyle;

            return <View key={loopIndex} style={dotStyle} />;
        },
    );

    return (
        <View style={styles.dotContainer}>
            {navigationDots}
        </View>
    );
};

const useIndexHandler = (): readonly [number, (index: number) => void] => {
    const [index, setIndex]: readonly [number, Dispatch<SetStateAction<number>>]
        = useState<number>(0);

    const onIndexChanged = useCallback<(index: number) => void>(
        (newIndex: number): void => setIndex(newIndex),
        [setIndex],
    );

    return [index, onIndexChanged];
};

export const OnboardingComponent = ({ hideOnboarding, history }: Props): JSX.Element => {
    const swiperRef = useRef<Swiper>();

    const [index, onIndexChanged]: readonly [number, (index: number) => void]
        = useIndexHandler();

    const onSkipPress = useCallback<() => void>(
        (): void => {
            hideOnboarding();
            goToRouteWithoutParameter(Routes.RecommendedTopics, history)();
        },
        [hideOnboarding, history],
    );
    const onActionPress = useCallback<() => void>(
        (): void => {
            if (index === ONBOARDING_DATA.length - 1) {
                onSkipPress();
            } else {
                swiperRef.current.scrollBy(1);
            }
        },
        [index, onSkipPress],
    );

    const slides = mapWithIndex(
        (item: OnboardingData, key: number): JSX.Element => {
            return (
                <OnboardingSlide key={key}>
                    <OnboardingImage source={item.image} />
                    <OnboardingText>
                        <Trans id={item.title} />
                    </OnboardingText>
                </OnboardingSlide>
            );
        },
        ONBOARDING_DATA,
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
                        index={0}
                        horizontal={true}
                        loop={false}
                        onIndexChanged={onIndexChanged}
                        ref={swiperRef}
                        showsButtons={false}
                    >
                    { slides }
                    </Swiper>
                </View>
                <View style={styles.nextButtonSection}>
                    <MultiLineButtonComponent onPress={onActionPress} additionalStyles={styles.nextButton}>
                        <Text style={textStyles.button}>
                            <Trans id={index === ONBOARDING_DATA.length - 1 ? START_LABEL : NEXT_LABEL } />
                        </Text>
                    </MultiLineButtonComponent>
                    <NavigationDots currentIndex={index} count={ONBOARDING_DATA.length}/>
                </View>
            </View>
        </SafeAreaView>
    );
};
