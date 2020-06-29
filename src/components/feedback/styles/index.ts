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
    readonly input: TextStyle;
    readonly submitButton: ViewStyle;
    readonly submitText: TextStyle;
    readonly submitTextDisabled: TextStyle;
}

interface ContactInformationStyles {
    readonly checkboxContainer: ViewStyle;
    readonly checkBox: ViewStyle;
    readonly checkBoxDescription: ViewStyle;
    readonly finishButtonContainer: ViewStyle;
    readonly finishButtonWithoutEmail: ViewStyle;
    readonly finishButtonWithEmail: ViewStyle;
    readonly finishTextWithoutEmail: TextStyle;
    readonly finishTextWithEmail: TextStyle;
    readonly checkBoxIcon: TextStyle;
    readonly contactInformationContainer: ViewStyle;
    readonly contactInformationInnerContainer: ViewStyle;
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
        alignItems: 'center',
    },

    headerBackButton: {
        flex: 1,
        flexDirection: 'row',
        paddingLeft: Platform.OS === 'android' ? 0 : 7,
        borderWidth: 2,
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

    submitText: {
        fontSize: 16,
        color: colors.white,
    },

    submitTextDisabled: {
        fontSize: 16,
        color: colors.white,
    },
});

const contactInformationStyles = StyleSheet.create<ContactInformationStyles>({
    checkboxContainer: {
        alignItems: 'center',
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

    finishButtonWithoutEmail: {
        alignSelf: 'flex-end',
        backgroundColor: 'white',
        borderWidth: 2,
        borderColor: colors.teal,
        borderRadius: values.roundedBorderRadius,
        color: colors.teal,
        paddingVertical: 10,
        paddingHorizontal: 15,
    },

    finishButtonWithEmail: {
        alignSelf: 'flex-end',
        backgroundColor: colors.teal,
        borderWidth: 2,
        borderColor: colors.teal,
        borderRadius: values.roundedBorderRadius,
        color: colors.teal,
        paddingVertical: 10,
        paddingHorizontal: 15,
    },

    finishTextWithoutEmail: {
        color: colors.teal,
        fontSize: 16,
        fontWeight: 'bold',
    },

    finishTextWithEmail: {
        color: colors.white,
        fontSize: 16,
        fontWeight: 'bold',
    },

    contactInformationContainer: {
        backgroundColor: 'white',
        borderRadius: 15,
    },

    contactInformationInnerContainer: {
        flex: 1,
        flexDirection: 'column',
        paddingLeft: 24,
        paddingRight: 24,
        justifyContent: 'space-evenly',
        paddingBottom: 8,
    },
    employeeInputStyle: {
        fontSize: 14,
        paddingLeft: 0,
        borderBottomWidth: 0.5,
        borderBottomColor: colors.darkerGrey,
        paddingTop: 8,
        paddingBottom: 8,
    },
});

export { otherRemoveServiceStyles, contactInformationStyles };
