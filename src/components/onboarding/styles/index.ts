import {
    Dimensions,
    ImageStyle,
    Platform,
    ScaledSize,
    StyleSheet,
    TextStyle,
    ViewStyle,
} from 'react-native';

import { getNormalFontStylesForOS, colors } from '../../../application/styles';

const { width, height }: ScaledSize = Dimensions.get('window');

const ONBOARDING_IMAGE_WIDTH = width / 1.55;

const ONBOARDING_IMAGE_HEIGHT = height / 2.25;

interface OnboardingStyles {
    readonly activeDot: ViewStyle;
    readonly container: ViewStyle;
    readonly dotStyle: ViewStyle;
    readonly dotContainer: ViewStyle;
    readonly nextButtonSection: ViewStyle;
    readonly nextButton: ViewStyle;
    readonly onboardingContainer: ViewStyle;
    readonly onboardingImage: ImageStyle;
    readonly onboardingText: TextStyle;
    readonly onboardingSlideContainer: ViewStyle;
    readonly onboardingSlide: ViewStyle;
    readonly skipButton: ViewStyle;
    readonly slideSection: ViewStyle;
}

const DOT_SIZE = 8;

const onboardingStyles = StyleSheet.create<OnboardingStyles>({
    activeDot: {
        backgroundColor: colors.teal,
    },

    container: {
        flex: 1,
    },

    dotContainer: {
        flex: 0.65,
        alignItems: 'flex-end',
        flexDirection: 'row',
        justifyContent: 'center',
    },

    dotStyle: {
        backgroundColor: colors.lightGrey,
        borderRadius: DOT_SIZE / 2,
        color: colors.lightGrey,
        height: DOT_SIZE,
        marginHorizontal: 5,
        width: DOT_SIZE,
    },

    nextButtonSection: {
        flex: 1,
        justifyContent: 'space-between',
        paddingBottom: 20,
    },

    nextButton: {
        flex: 0.35,
        width: '80%',
    },

    onboardingContainer: {
        flex: 6,
    },

    onboardingSlideContainer: {
        flex: 5,
    },

    onboardingImage: {
        height: ONBOARDING_IMAGE_HEIGHT,
        width: ONBOARDING_IMAGE_WIDTH,
        marginBottom: 30,
    },

    onboardingSlide: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 10,
    },

    onboardingText: {
        color: colors.black,
        fontSize: 18,
        textAlign: 'center',
        paddingHorizontal: 32,
        paddingTop: 16,
        ...getNormalFontStylesForOS(),
    },

    slideSection: {
      flex: 1,
      flexDirection: 'row',
      backgroundColor: 'transparent',
      justifyContent: 'center',
      alignItems: 'center',
    },

    skipButton: {
        alignSelf: 'flex-end',
        justifyContent: 'center',
        paddingTop: Platform.OS === 'ios' ? 30 : 40,
        paddingRight: 25,
    },
});

export default onboardingStyles;
