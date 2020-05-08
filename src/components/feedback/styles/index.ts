import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

import { Platform } from 'react-native';

import { colors, values } from '../../../application/styles';
import { getStatusBarHeightForPlatform } from '../../main/get_status_bar_height_for_platform';

interface OtherRemoveServiceStyles {
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

interface ReceiveUpdatesStyles {
    readonly checkboxContainer: ViewStyle;
    readonly checkBox: ViewStyle;
    readonly checkBoxDescription: ViewStyle;
    readonly description: TextStyle;
    readonly emailInputStyle: ViewStyle;
    readonly finishButtonContainer: ViewStyle;
    readonly finishButton: ViewStyle;
    readonly finishButtonSending: ViewStyle;
    readonly finishText: TextStyle;
    readonly checkBoxIcon: TextStyle;
    readonly receiveUpdatesContainer: ViewStyle;
    readonly receiveUpdatesInnerContainer: ViewStyle;
    readonly employeeInputStyle: ViewStyle;
}

const otherRemoveServiceStyles = StyleSheet.create<OtherRemoveServiceStyles>({
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

const receiveUpdatesStyles = StyleSheet.create<ReceiveUpdatesStyles>({
    checkboxContainer: {
        alignItems: 'center',
        flex: 3,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    checkBoxDescription: {
        flex: 3,
    },

    checkBox: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },

    checkBoxIcon: {
        color: colors.teal,
        fontSize: values.smallIconSize,
        paddingRight: 12,
    },

    finishButtonContainer: {
        alignItems: 'center',
        borderTopWidth: 0.5,
        borderTopColor: colors.greyBorder,
        justifyContent: 'flex-end',
        flexDirection: 'row',
        padding: 16,
    },

    finishButton: {
        alignSelf: 'flex-end',
        backgroundColor: 'white',
        borderWidth: 2,
        borderColor: colors.teal,
        borderRadius: values.roundedBorderRadius,
        color: colors.teal,
        paddingVertical: 10,
        paddingHorizontal: 15,
    },

    finishButtonSending: {
        opacity: values.disabledOpacity,
    },

    finishText: {
        color: colors.teal,
        fontSize: 16,
        fontWeight: 'bold',
    },

    receiveUpdatesContainer: {
        backgroundColor: 'white',
        borderRadius: 15,
    },

    receiveUpdatesInnerContainer: {
        flex: 1,
        flexDirection: 'column',
        paddingTop: 24,
        paddingLeft: 24,
        paddingRight: 24,
        // marginBottom: 24,
    },

    description: {
        paddingTop: 8,
        paddingBottom: 8,
    },

    emailInputStyle: {
        fontSize: 14,
        paddingLeft: 0,
        paddingTop: 8,
        paddingBottom: 8,
        borderBottomWidth: 0.5,
        borderBottomColor: colors.darkerGrey,
    },
    employeeInputStyle: {
        fontSize: 14,
        paddingLeft: 0,
        borderBottomWidth: 0.5,
        borderBottomColor: colors.darkerGrey,
    },
});

export { otherRemoveServiceStyles, receiveUpdatesStyles };
