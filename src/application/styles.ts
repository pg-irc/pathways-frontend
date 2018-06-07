import { StyleSheet } from 'react-native';

export const colors = {
    lightGrey: 'lightgrey',
    black: 'black',
};

export const applicationStyles = StyleSheet.create({
    bold: {
        fontWeight: 'bold',
    },
    hr: {
        borderWidth: 0.5,
        borderColor: colors.lightGrey,
        marginTop: 20,
        marginBottom: 10,
        marginLeft: -10,
        marginRight: -10,
    },
});