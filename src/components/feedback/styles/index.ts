import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { colors, values, getNormalFontFamily, getBoldFontStylesForOS, getTextAlignForLanguage } from '../../../application/styles';
import { getStatusBarHeightForPlatform } from '../../main/get_status_bar_height_for_platform';

interface OtherRemoveServiceStyles {
    readonly closeButton: TextStyle;
    readonly headerContainer: ViewStyle;
    readonly input: TextStyle;
}

interface ContactInformationStyles {
    readonly checkboxContainer: ViewStyle;
    readonly checkBox: ViewStyle;
    readonly checkBoxDescription: ViewStyle;
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
});

const contactInformationStyles = StyleSheet.create<ContactInformationStyles>({
    checkboxContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 24,
        paddingHorizontal: 15,
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

    finishButtonWithoutEmail: {
        backgroundColor: 'white',
        borderWidth: 2,
        borderColor: colors.teal,
        borderRadius: values.roundedBorderRadius,
        color: colors.teal,
        paddingVertical: 12,
        paddingHorizontal: 15,
        marginHorizontal: 24,
        marginBottom: 12,
    },

    finishButtonWithEmail: {
        backgroundColor: colors.teal,
        borderWidth: 2,
        borderColor: colors.teal,
        borderRadius: values.roundedBorderRadius,
        color: colors.teal,
        paddingVertical: 12,
        paddingHorizontal: 24,
        marginHorizontal: 24,
        marginBottom: 12,
    },

    finishTextWithoutEmail: {
        textAlign: 'center',
        color: colors.teal,
        fontSize: 18,
        ...getBoldFontStylesForOS(),
    },

    finishTextWithEmail: {
        textAlign: 'center',
        color: colors.white,
        fontSize: 18,
        ...getBoldFontStylesForOS(),
    },

    contactInformationContainer: {
        flex: 1,
    },

    contactInformationInnerContainer: {
        flexDirection: 'column',
        paddingTop: 24,
        paddingBottom: 8,
    },
    employeeInputStyle: {
        fontSize: 14,
        paddingLeft: 0,
        borderBottomWidth: 0.5,
        borderBottomColor: colors.darkerGrey,
        paddingTop: 8,
        paddingBottom: 8,
        fontFamily: getNormalFontFamily(),
    },
});

export { otherRemoveServiceStyles, contactInformationStyles };
