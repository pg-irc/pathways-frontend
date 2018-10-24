import { StyleSheet, Platform } from 'react-native';

export const colors = {
    topaz: '#11CAC0',
    blueGreen: '#0D9790',
    darkBlueGrey: '#1D4A48',
    white: '#FFFFFF',
    lightGrey: '#EAEAE3',
    lightGrey2: '#D0D0C5',
    deepBlack: '#000000',
    black: '#313131',
    greyishBrown: '#595959',
    darkGreyWithAlpha: 'rgba(0, 0, 0, 0.4)',
    sunYellow: '#FFE22B',
};

export const values = {
    navigationIconSize: 28,
    largeIconSize: 30,
    smallIconSize: 20,
    smallerIconSize: 18,
    smallTextSize: 12,
    roundedBorderRadius: 25,
    lessRoundedBorderRadius: 10,
    contentPadding: 10,
};

export const applicationStyles = StyleSheet.create({
    p: {
        textAlign: 'left',
        color: colors.black,
    },
    body: {
        backgroundColor: colors.lightGrey,
    },
    bold: {
        fontWeight: 'bold',
    },
    subHeading: {
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'left',
    },
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
    title: {
        color: colors.black,
        fontWeight: 'bold',
        fontSize: 30,
        marginTop: 15,
        marginBottom: 10,
        textAlign: 'left',
    },
    subTitle: {
        color: colors.black,
        fontWeight: 'bold',
        fontSize: 20,
        marginTop: 10,
        marginBottom: 7,
        textAlign: 'left',
    },
    divider: {
        marginTop: 20,
    },
    roundedButton: {
        backgroundColor: colors.topaz,
        borderRadius: values.roundedBorderRadius,
    },
    roundedButtonText: {
        fontWeight: 'bold',
        color: colors.white,
    },
    boxShadow: {
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 4,
        elevation: 1,
    },
});

// See https://github.com/mientjan/react-native-markdown-renderer/blob/master/src/lib/styles.js for styles to override.
export const markdownStyles = StyleSheet.create({
    text: {
        textAlign: 'left',
    },
    listUnorderedItemIcon: {
        fontWeight: 'bold',
        fontSize: 35,
        marginLeft: 10,
        marginRight: 10,
        ...Platform.select({
            ios: {
                lineHeight: 36,
            },
            android: {
                lineHeight: 40,
            },
        }),
    },
});
