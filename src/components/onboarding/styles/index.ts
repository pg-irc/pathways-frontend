import {
    Dimensions,
    StyleSheet,
    Platform,
    TextStyle,
    ViewStyle,
} from 'react-native';

import { getNormalFontStylesForOS, colors } from '../../../application/styles';

const { width, height } = Dimensions.get('window');

interface OnboardingStyles {
    readonly activeDot: ViewStyle;
    readonly dot: ViewStyle;
    readonly onboardingText: TextStyle;
    readonly onboardingContainer: ViewStyle;
    readonly skipButton: ViewStyle;
    readonly slideSection: ViewStyle;
    readonly skipButtonSection: ViewStyle;
}

const onboardingStyles = StyleSheet.create<OnboardingStyles>({
    activeDot: {
      backgroundColor: '#6f6f6f',
      width: width * 0.02,
      height: width * 0.02,
      borderRadius: width * 0.01,
      marginLeft: width * 0.005,
      marginRight: width * 0.005,
      marginTop: height * 0.015,
    },

    dot: {
      backgroundColor: 'rgba(111,111,111,0.3)',
      marginTop: height * 0.015,
      width: width * 0.02,
      height: width * 0.02,
      borderRadius: width * 0.01,
      marginLeft: width * 0.005,
      marginRight: width * 0.005,
    },

    onboardingContainer: {
        flex: 1,
    },

    onboardingText: {
        color: colors.black,
        fontSize: 18,
        textAlign: 'center',
        paddingHorizontal: 32,
        ...getNormalFontStylesForOS(),
    },

    slideSection: {
      flex: 1,
      flexDirection: 'row',
      backgroundColor: 'transparent',
      justifyContent: 'center',
      alignItems: 'center',
    },

    skipButtonSection: {
        height: height * 0.2,
        backgroundColor: 'transparent',
    },

    skipButton: {
        alignSelf: 'flex-end',
        justifyContent: 'center',
        paddingTop: Platform.OS === 'ios' ? 30 : 40,
        paddingRight: 25,
    },
});

export default onboardingStyles;
