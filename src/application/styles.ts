import { StyleSheet, Platform } from 'react-native';

export const colors = {
    black: 'black',
    lightGrey: 'lightgrey',
    lighterGrey: '#F5F5F5',
    darkGrey: '#666666',
    darkGreyWithAlpha: 'rgba(0, 0, 0, 0.4)',
    blue: '#FFF',
    brightBlue: '#0066ff',
    white: 'white',
    urlColor: 'blue',
};

export const values = {
    smallIconSize: 20,
    smallerIconSize: 18,
    smallTextSize: 12,
};

export const applicationStyles = StyleSheet.create({
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
    pageTitle: {
        fontWeight: 'bold',
        fontSize: 22,
        marginTop: 10,
        marginBottom: 20,
        textAlign: 'left',
    },
    divider: {
        marginTop: 20,
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
