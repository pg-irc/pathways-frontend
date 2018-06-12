import { StyleSheet } from 'react-native';
import { colors, values } from '../../application/styles';

export const questionnaireStyles = StyleSheet.create({
    introText: {
        marginBottom: 20,
    },
});

export const questionStyles = StyleSheet.create({
    explanationText: {
        fontSize: values.smallTextSize,
        color: colors.darkGrey,
        marginTop: 5,
        marginLeft: 20,
    },
    continueButton: {
        backgroundColor: colors.darkGrey,
    },
    questionWrapper: {
        marginBottom: 25,
    },
    buttonsWrapper: {
        marginLeft: 20,
    },
});