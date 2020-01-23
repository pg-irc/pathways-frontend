import { StyleSheet, Platform } from 'react-native';
import { I18nManager } from 'react-native';
import { isAndroid } from '../helpers/is_android';

export const colors = {
    pale: '#ffebcb',
    lightTeal: '#4fb3bf',
    teal: '#00838f',
    blueGreen: '#0d9790',
    blueGreenDark: '#136f63',
    // Rename to surface
    lightGrey: '#eee5d9',
    darkerGrey: '#d0d0c5',
    greyishBrown: '#595959',
    black: '#313131',
    sunYellow: '#f2b134',
    white: '#ffffff',
    darkGreyWithAlpha: 'rgba(0, 0, 0, 0.4)',
    turquoiseBlue: '#07a0c3',
    aquaMarine: '#03cea4',
    vermillion: '#f34213',
    melon: '#fc7a57',
    sepia: '#8b572a',
    purple: '#541388',
    burntSienna: '#ED604B',
    sunshine: '#f2b134',
    topaz: '#11cac0',
};

export const values = {
    navigationIconSize: 28,
    heroIconSize: 60,
    largeIconSize: 30,
    mediumIconSize: 25,
    smallIconSize: 20,
    smallerIconSize: 18,
    roundedBorderRadius: 25,
    lessRoundedBorderRadius: 10,
    backgroundTextPadding: 5,
};

const fontStyle = 'normal';
const letterSpacing = 0;
const buttonLetterSpacing = 0.2;

export const getNormalFontFamily = (): string => (
    isAndroid() ? 'AvenirBook' : 'Avenir'
);

const getNormalFontStylesForOS = (): object => (
    {
        fontFamily: getNormalFontFamily(),
        fontWeight: 'normal',
        fontStyle,
    }
);

const getBoldFontStylesForOS = (): object => (
    isAndroid() ?
        {
            fontFamily: 'AvenirBlack',
            fontWeight: 'normal',
            fontStyle,
        }
        :
        {
            fontFamily: 'Avenir',
            fontWeight: '900',
            fontStyle,
        }
);

// return 'right' when in RTL mode to align to the left also in RTL mode
const getAlwaysLeftTextAlign = (): object => (
    { textAlign: I18nManager.isRTL ? 'right' : 'left' }
);

export const textStyles = StyleSheet.create({
    headline6: {
        fontSize: 16,
        lineHeight: 21,
        color: colors.teal,
        letterSpacing,
        ...getBoldFontStylesForOS(),
    },
    headlineH1StyleBlackLeft: {
        fontSize: 24,
        lineHeight: 36,
        textAlign: 'left',
        color: colors.black,
        letterSpacing,
        ...getBoldFontStylesForOS(),
    },
    headlineH2StyleWhiteLeft: {
        fontSize: 18,
        textAlign: 'left',
        color: colors.white,
        letterSpacing,
        ...getBoldFontStylesForOS(),
    },
    headlineH2StyleBlackLeft: {
        fontSize: 18,
        textAlign: 'left',
        color: colors.black,
        letterSpacing,
        ...getBoldFontStylesForOS(),
    },
    headlineH2StyleBlackCenter: {
        fontSize: 18,
        textAlign: 'center',
        color: colors.black,
        letterSpacing,
        ...getBoldFontStylesForOS(),
    },
    headlineH3StyleBlackLeft: {
        fontSize: 16,
        textAlign: 'left',
        color: colors.black,
        letterSpacing,
        ...getBoldFontStylesForOS(),
    },
    headlineH3StyleBlackCenter: {
        fontSize: 16,
        textAlign: 'center',
        color: colors.black,
        letterSpacing,
        ...getBoldFontStylesForOS(),
    },
    headlineH3StyleWhiteCenter: {
        fontSize: 16,
        textAlign: 'center',
        color: colors.white,
        letterSpacing,
        ...getBoldFontStylesForOS(),
    },
    headlineH4StyleBlackLeft: {
        fontSize: 16,
        lineHeight: 21,
        textAlign: 'left',
        color: colors.black,
        letterSpacing,
        ...getNormalFontStylesForOS(),
    },
    paragraphBoldBlackLeft: {
        fontSize: 16,
        lineHeight: 21,
        textAlign: 'left',
        color: colors.black,
        letterSpacing,
        ...getBoldFontStylesForOS(),
    },
    paragraphBoldWhiteLeft: {
        fontSize: 16,
        lineHeight: 21,
        textAlign: 'left',
        color: colors.white,
        letterSpacing,
        ...getBoldFontStylesForOS(),
    },
    paragraphStyleWhiteleft: {
        fontSize: 16,
        lineHeight: 21,
        textAlign: 'left',
        color: colors.white,
        letterSpacing,
        ...getNormalFontStylesForOS(),
    },
    alwaysLeftAlign: {
        ...getAlwaysLeftTextAlign(),
    },
    paragraphStyle: {
        fontSize: 16,
        lineHeight: 21,
        textAlign: 'left',
        color: colors.black,
        letterSpacing,
        ...getNormalFontStylesForOS(),
    },
    alwaysLeftParagraphStyle: {
        fontSize: 16,
        lineHeight: 21,
        color: colors.black,
        letterSpacing,
        ...getNormalFontStylesForOS(),
        ...getAlwaysLeftTextAlign(),
    },
    paragraphStyleBrown: {
        fontSize: 16,
        lineHeight: 21,
        textAlign: 'left',
        color: colors.greyishBrown,
        letterSpacing,
        ...getNormalFontStylesForOS(),
    },
    paragraphStyleBrownCenter: {
        fontSize: 16,
        lineHeight: 21,
        textAlign: 'center',
        color: colors.greyishBrown,
        letterSpacing,
        ...getNormalFontStylesForOS(),
    },
    paragraphSmallStyleLeft: {
        fontSize: 12,
        lineHeight: 21,
        textAlign: 'left',
        color: colors.black,
        letterSpacing,
        ...getNormalFontStylesForOS(),
    },
    paragraphURL: {
        fontSize: 15,
        lineHeight: 21,
        textDecorationLine: 'underline',
        textAlign: 'left',
        color: colors.greyishBrown,
        letterSpacing,
        ...getBoldFontStylesForOS(),
    },
    URL: {
        fontSize: 15,
        lineHeight: 21,
        textDecorationLine: 'underline',
        textAlign: 'left',
        color: colors.teal,
        letterSpacing,
        ...getBoldFontStylesForOS(),
    },
    headlineH3StyleURL: {
        fontSize: 16,
        textAlign: 'left',
        textDecorationLine: 'underline',
        color: colors.teal,
        letterSpacing,
        ...getBoldFontStylesForOS(),
    },
    paragraphStyleWhiteCenter: {
        fontSize: 16,
        lineHeight: 21,
        textAlign: 'center',
        color: colors.white,
        letterSpacing,
        ...getNormalFontStylesForOS(),
    },
    headlineH5StyleBlackLeft: {
        fontSize: 11,
        textAlign: 'left',
        color: colors.black,
        letterSpacing,
        ...getBoldFontStylesForOS(),
    },
    headlineH5StyleBlackCenter: {
        fontSize: 11,
        textAlign: 'center',
        color: colors.black,
        letterSpacing,
        ...getBoldFontStylesForOS(),
    },
    button: {
        fontSize: 18,
        textAlign: 'center',
        color: colors.white,
        letterSpacing: buttonLetterSpacing,
        ...getBoldFontStylesForOS(),
    },
    tealButton: {
        fontSize: 18,
        textAlign: 'center',
        color: colors.white,
        letterSpacing: buttonLetterSpacing,
        ...getBoldFontStylesForOS(),
    },
    whiteTealButton: {
        fontSize: 18,
        textAlign: 'center',
        color: colors.teal,
        letterSpacing: buttonLetterSpacing,
        ...getBoldFontStylesForOS(),
    },
    contentTitle: {
        fontSize: 22,
        textAlign: 'left',
        color: colors.black,
        letterSpacing,
        ...getBoldFontStylesForOS(),
    },
    onboarding: {
        fontSize: 18,
        color: colors.black,
        textAlign: 'center',
        ...getNormalFontStylesForOS(),
    },
    listItemDetail: {
        fontSize: 13,
        lineHeight: 21,
        textAlign: 'left',
        color: colors.greyishBrown,
        letterSpacing,
        ...getNormalFontStylesForOS(),
    },
    toast: {
        fontSize: 15,
        textAlign: 'left',
        color: colors.white,
        letterSpacing,
        ...getBoldFontStylesForOS(),
    },
});

export const applicationStyles = StyleSheet.create({
    hr: {
        borderTopWidth: 0.5,
        borderColor: colors.lightGrey,
        flexDirection: 'row',
        flex: 1,
        marginTop: 20,
        marginBottom: 10,
        marginLeft: -10,
        marginRight: -10,
    },
    tealButton: {
        backgroundColor: colors.teal,
        borderRadius: values.roundedBorderRadius,
    },
    searchButton: {
        borderRadius: values.roundedBorderRadius,
        alignSelf: 'flex-start',
        flexDirection: 'row',
        paddingHorizontal: 15,
        paddingVertical: 4,
    },
    whiteTealButton: {
        backgroundColor: colors.white,
        borderRadius: values.roundedBorderRadius,
        borderColor: colors.teal,
        borderWidth: 2,
    },
    searchInput: {
        fontSize: 16,
        fontFamily: getNormalFontFamily(),
        flex: 1,
        height: 36,
    },
    searchContainer: {
        backgroundColor: colors.white,
        borderRadius: values.lessRoundedBorderRadius,
        margin: 4,
        flexDirection: 'row',
        alignItems: 'center',
    },
    boxShadowBelow: {
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 1,
    },
    boxShadowAbove: {
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 1,
    },
    thinGreyBorderBelow: {
        borderBottomWidth: 1,
        borderColor: colors.darkerGrey,
    },
    body: {
        backgroundColor: colors.lightGrey,
    },
    toast: {
        marginBottom: 65,
        borderRadius: 10,
        ...Platform.select({
            ios: {
                marginHorizontal: -10,
            },
            android: {
                marginHorizontal: 10,
            },
        }),
    },
});

// See https://github.com/mientjan/react-native-markdown-renderer/blob/master/src/lib/styles.js for styles to override.
export const markdownStyles = StyleSheet.create({
    text: {
        textAlign: 'left',
        color: colors.greyishBrown,
        fontFamily: getNormalFontFamily(),
        fontSize: 16,
        lineHeight: 21,
        paddingHorizontal: values.backgroundTextPadding,
    },
    heading: {
        marginTop: 10,
        ...getBoldFontStylesForOS(),
    },
    heading1: {
        lineHeight: 23,
        fontSize: 18,
    },
    heading2: {
        lineHeight: 22,
        fontSize: 17,
    },
    heading3: {
        lineHeight: 21,
        fontSize: 16,
    },
    listUnorderedItemIcon: {
        fontWeight: 'bold',
        fontSize: 35,
        marginLeft: 10,
        marginRight: 10,
        color: colors.greyishBrown,
        ...Platform.select({
            ios: {
                lineHeight: 36,
            },
            android: {
                lineHeight: 40,
            },
        }),
    },
    link: {
        fontFamily: getNormalFontFamily(),
        color: colors.teal,
        textDecorationLine: 'underline',
    },
});
