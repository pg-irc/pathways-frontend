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
        marginLeft: 25,
        textAlign: 'left',
    },
    nextButton: {
        backgroundColor: colors.darkGrey,
    },
    questionWrapper: {
        marginBottom: 25,
    },
    buttonsWrapper: {
        marginTop: 10,
        marginLeft: 20,
    },
    expandedBG: {
        borderRadius: 30,
        backgroundColor: colors.darkGrey,
        marginRight: 5,
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
    expandedText: {
        color: colors.white,
    },
});
