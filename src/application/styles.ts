import { StyleSheet } from 'react-native';

export const colors = {
    lightGrey: 'lightgrey',
    lighterGrey: '#F5F5F5',
    darkGrey: '#666666',
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
    hr: {
        borderWidth: 0.5,
        borderColor: colors.lightGrey,
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
    },
});
