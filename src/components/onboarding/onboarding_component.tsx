// tslint:disable:no-expression-statement
import { Trans } from '@lingui/react';
import { t } from '@lingui/macro';
import * as R from 'ramda';
import React, { Dispatch, SetStateAction, useCallback, useState } from 'react';
import {
    Dimensions,
    Image,
    ImageSourcePropType,
    View,
    SafeAreaView,
    TouchableOpacity,
    Text,
} from 'react-native';
import Swiper from 'react-native-swiper';
import { History } from 'history';

import { Routes, goToRouteWithoutParameter } from '../../application/routing';
import { mapWithIndex } from '../../application/map_with_index';
import { textStyles, colors } from '../../application/styles';
import {
    communityOnBoardingImage,
    answerQuestionsOnBoardingImage,
    settlementJourneyOnBoardingImage,
    bookmarkOnBoardingImage,
} from '../../application/images';
import { HideOnboardingAction } from '../../stores/user_profile';
import { MultiLineButtonComponent } from '../mutiline_button/multiline_button_component';

import styles from './styles';

const onboardingImageWidth = Dimensions.get('screen').width / 1.55;

const onboardingImageHeight = Dimensions.get('screen').height / 2.25;

const startButtonWidth = Dimensions.get('screen').width / 2;

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
        resizeMode={'contain'}
        style={{
            height: onboardingImageHeight,
            width: onboardingImageWidth,
            marginBottom: 30,
        }}
    />
);

const OnboardingText = (props: { readonly children: JSX.Element }): JSX.Element => (
    <Text style={styles.onboardingText}>
        {props.children}
    </Text>
);

const OnboardingSlide = (props: { readonly children: ReadonlyArray<JSX.Element> }): JSX.Element => (
    <View
        style={{
            flex: 3,
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 10,
        }}
    >
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
    const renderDot = (_: undefined, loopIndex: number): JSX.Element => {
        return <NavigationDot key={loopIndex} currentIndex={props.currentIndex} loopIndex={loopIndex} />;
    };
    return (
        <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: 50,
        }}>
            {R.range(0, props.count).map(renderDot)}
        </View>
    );
};

const NavigationDot = (props: { readonly currentIndex: number, readonly loopIndex: number}): JSX.Element => {
    const dotSize = 8;
    const dotStyle = { width: dotSize, height: dotSize, borderRadius: dotSize / 2, marginHorizontal: 5 };
    if (props.currentIndex === props.loopIndex) {
        return <View style={{ ...dotStyle, backgroundColor: colors.topaz }} />;
    }
    return <View style={{ ...dotStyle, backgroundColor: colors.lightGrey }} />;
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

export const OnboardingComponent = (props: Props): JSX.Element => {
    const [index, onIndexChanged]: readonly [number, (index: number) => void]
        = useIndexHandler();

    const onButtonPress = (): void => {
        props.hideOnboarding();
        goToRouteWithoutParameter(Routes.RecommendedTopics, props.history)();
    };

    return (
        <SafeAreaView style={styles.onboardingContainer}>
            <SkipButton onPress={onButtonPress}/>
                <Swiper
                    activeDot={<View style={{ display: 'none' }} />}
                    dot={<View style={{ display: 'none' }} />}
                    index={0}
                    horizontal={true}
                    loadMinimal={true}
                    loop={false}
                    onIndexChanged={onIndexChanged}
                    showsButtons={false}
                >
                    {
                        mapWithIndex((item: OnboardingData, key: number): JSX.Element => {
                            return (
                                <OnboardingSlide key={key}>
                                    <OnboardingImage source={item.image} />
                                    <OnboardingText>
                                        <Trans id={item.title} />
                                    </OnboardingText>
                                </OnboardingSlide>
                            );
                        }, ONBOARDING_DATA)
                    }
                </Swiper>
                <View style={styles.skipButtonSection}>
                    <MultiLineButtonComponent
                        onPress={() => {}}
                        additionalStyles={{ flex: 0, width: startButtonWidth }}>
                        <Text style={textStyles.button}>
                            <Trans id={index === ONBOARDING_DATA.length - 1 ? START_LABEL : NEXT_LABEL } />
                        </Text>
                    </MultiLineButtonComponent>
                    <NavigationDots currentIndex={index} count={ONBOARDING_DATA.length}/>
                </View>
        </SafeAreaView>
    );
};
