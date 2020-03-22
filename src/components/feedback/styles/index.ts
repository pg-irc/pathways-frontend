import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

import { Platform } from 'react-native';

import { colors } from '../../../application/styles';
import { getStatusBarHeightForPlatform } from '../../main/get_status_bar_height_for_platform';

interface Styles {
    readonly closeButton: TextStyle;
    readonly footerContainer: ViewStyle;
    readonly footerTab: ViewStyle;
    readonly headerElement: TextStyle;
    readonly headerBackButton: ViewStyle;
    readonly headerContainer: ViewStyle;
    readonly headerLeftTitle: ViewStyle;
    readonly input: TextStyle;
    readonly inputLabel: ViewStyle;
    readonly submitButton: ViewStyle;
    readonly submitButtonDisabled: ViewStyle;
    readonly submitText: TextStyle;
    readonly submitTextDisabled: TextStyle;
}

const styles = StyleSheet.create<Styles>({
    closeButton: {
        color: colors.greyishBrown,
        fontSize: 16,
    },

    headerContainer: {
        backgroundColor: 'white',
        marginTop: getStatusBarHeightForPlatform(),
    },

    headerBackButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: Platform.OS === 'android' ? 0 : 7,
    },

    headerLeftTitle: {
        paddingLeft: 12,
    },

    headerElement: {
        color: colors.teal,
        fontSize: 18,
    },

    input: {
        borderColor: colors.darkerGrey,
        borderWidth: 0.5,
        borderRadius: 8,
        fontSize: 16,
        height: 'auto',
        minHeight: 100,
        padding: 16,
    },

    inputLabel: {
        color: colors.black,
        fontSize: 16,
        paddingLeft: 5,
        paddingBottom: 10,
    },

    footerContainer: {
        alignItems: 'center',
        backgroundColor: colors.white,
        borderTopWidth: 0.5,
        borderTopColor: colors.darkerGrey,
        justifyContent: 'center',
    },

    footerTab: {
        backgroundColor: colors.white,
    },

    submitButton: {
        marginLeft: 30,
        marginRight: 30,
    },

    submitButtonDisabled: {
        backgroundColor: colors.fadedGrey,
    },

    submitText: {
        fontSize: 16,
        color: colors.white,
    },

    submitTextDisabled: {
        fontSize: 16,
        color: colors.white,
    },
});

export default styles;
