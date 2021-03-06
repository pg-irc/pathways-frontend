import { StyleSheet, Platform, Dimensions, TextStyle } from 'react-native';
import { I18nManager } from 'react-native';
import { isAndroid } from './helpers/is_android';
import { getStatusBarHeightForPlatform } from '../components/main/get_status_bar_height_for_platform';

export const colors = {
    pale: '#ffebcb',
    lightTeal: '#4fb3bf',
    teal: '#00838f',
    lightBlue: '#f1fcfa',
    blueGreen: '#0d9790',
    blueGreenDark: '#136f63',
    grey: '#DEDEDE',
    // Rename to surface
    lightGrey: '#eee5d9',
    darkerGrey: '#d0d0c5',
    fadedGrey: '#e5e5e5',
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
    greyBorder: '#dedede',
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
    disabledOpacity: .5,
};

const fontStyle = 'normal';
const letterSpacing = 0;
const buttonLetterSpacing = 0.2;

export const bulletPoint = '\u2022';

export const getNormalFontFamily = (): string => (
    isAndroid() ? 'AvenirBook' : 'Avenir'
);

export const getNormalFontStylesForOS = (): object => (
    {
        fontFamily: getNormalFontFamily(),
        fontWeight: 'normal',
        fontStyle,
    }
);

export const getBoldFontStylesForOS = (): object => (
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

// For most components setting textAlign to 'left' ensures it's properly
// swapped over to 'right' when we switch to a RTL language. For others, like the TextInput component,
// this is not the case so we need to call this to set it explicitly.
export const getTextAlignForLanguage = (): TextStyle => (
    { textAlign: I18nManager.isRTL ? 'right' : 'left' }
);

export const getViewBackgroundColorForPlatform = (): string => (
    isAndroid() ? colors.teal : colors.white
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
    headlineH3StyleBrownLeft: {
        fontSize: 16,
        textAlign: 'left',
        color: colors.greyishBrown,
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
    paragraphStyle: {
        fontSize: 16,
        lineHeight: 21,
        textAlign: 'left',
        color: colors.black,
        letterSpacing,
        ...getNormalFontStylesForOS(),
    },
    paragraphStyleBrown: {
        fontSize: 16,
        lineHeight: 21,
        textAlign: 'left',
        color: colors.greyishBrown,
        letterSpacing,
        ...getNormalFontStylesForOS(),
    },
    paragraphStyleTeal: {
        fontSize: 16,
        lineHeight: 21,
        textAlign: 'left',
        color: colors.teal,
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
        fontSize: 15,
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
    paragraphStyleBlackCenter: {
        fontSize: 16,
        lineHeight: 21,
        textAlign: 'center',
        color: colors.black,
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
    headlineH5StyleWhiteLeft: {
        fontSize: 11,
        textAlign: 'left',
        color: colors.white,
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
    welcomeButton: {
        fontSize: 16,
        textAlign: 'center',
        color: colors.white,
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
        fontSize: 15,
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
    suggestionText: {
        fontSize: 16,
        lineHeight: 21,
        textAlign: 'left',
        color: colors.black,
        letterSpacing,
        paddingHorizontal: 0,
        ...getNormalFontStylesForOS(),
    },
    captionStyleLeft: {
        fontSize: 16,
        textAlign: 'left',
        ...getNormalFontStylesForOS(),
    },
    messageLink: {
        fontSize: 15,
        lineHeight: 21,
        textAlign: 'left',
        color: colors.teal,
        letterSpacing,
        ...getBoldFontStylesForOS(),
    },
    link: {
        fontFamily: getNormalFontFamily(),
        color: colors.teal,
        textDecorationLine: 'underline',
    },
    buttonTealText: {
        fontSize: 15,
        textAlign: 'left',
        color: colors.teal,
        letterSpacing,
        ...getBoldFontStylesForOS(),
    },
    pickerTealText: {
        fontSize: 16,
        lineHeight: 21,
        color: colors.teal,
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
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingVertical: 9,
        alignItems: 'center',
        backgroundColor: colors.lightTeal,
    },
    locateButton: {
        borderRadius: values.roundedBorderRadius,
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingVertical: 9,
        alignItems: 'center',
        backgroundColor: colors.white,
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
        ...getTextAlignForLanguage(),
    },
    searchContainerExpanded: {
        backgroundColor: colors.white,
        borderRadius: values.lessRoundedBorderRadius,
        margin: 4,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 1,
    },
    searchContainerCollapsed: {
        backgroundColor: colors.white,
        borderRadius: values.lessRoundedBorderRadius,
        margin: 4,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        overflow: 'hidden',
        maxWidth: '100%',
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
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.25,
        shadowRadius: 5,
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
        bottom: '10%',
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
    disabled: {
        opacity: values.disabledOpacity,
    },
    header: {
        marginTop: getStatusBarHeightForPlatform(),
        borderBottomColor: 'transparent',
    },
    headerLeft: {
        justifyContent: 'flex-end',
        paddingLeft: 5,
    },
    headerRight: {
        alignItems: 'center',
    },
    headerContainer: {
        backgroundColor: 'white',
        marginTop: getStatusBarHeightForPlatform(),
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingLeft: 0,
    },
    input: {
        borderColor: colors.darkerGrey,
        borderWidth: 0.5,
        borderRadius: 8,
        fontSize: 16,
        height: 'auto',
        minHeight: 100,
        padding: 16,
        fontFamily: getNormalFontFamily(),
        ...getTextAlignForLanguage(),
    },
    pickerItem: {
        justifyContent: 'center',
        borderColor: 'transparent',
        width: 195,
    },
    picker: {
        justifyContent: 'center',
        backgroundColor: colors.white,
        borderRadius: 50,
        height: 40,
        width: 195,
    },
    pickerContainer: {
        justifyContent: 'center',
        marginVertical: 16,
        borderColor: colors.teal,
        borderRadius: 50,
        borderWidth: 2,
        height: 48,
        width: 232,
    },
    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingLeft: 10,
    },
});

// See https://github.com/mientjan/react-native-markdown-renderer/blob/master/src/lib/styles.js for styles to override.
export const markdownStyles = StyleSheet.create({
    body: {
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
        ...textStyles.link,
    },
});

const emptyOrErrorImageSize = Dimensions.get('screen').width / 3.5;

export const imageStyles = StyleSheet.create({
    emptyOrErrorComponentImage: {
        height: emptyOrErrorImageSize,
        width: emptyOrErrorImageSize,
        marginBottom: 20,
    },
});
