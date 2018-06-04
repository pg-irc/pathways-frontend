import { StyleSheet } from 'react-native';

export const task = StyleSheet.create({
    wrapper: {
        borderTopColor: 'lightgrey',
        borderTopWidth: 2,
        flexDirection: 'row',
        padding: 10,
    },
    sideColumn: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    centerColumn: {
        flex: 4,
        flexDirection: 'row',
    },
    stackedItems: {
        flex: 1,
        flexDirection: 'column',
    },
    inlineItems: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
});

export const taskDetail = StyleSheet.create({
    wrapper: {
        padding: 10,
    },
    bold: {
        fontWeight: 'bold',
    },
    title: {
        fontWeight: 'bold',
        marginTop: 5,
    },
    actions: {
        marginTop: 15,
        marginBottom: 10,
    },
    row: {
        marginBottom: 15,
    },
    separator: {
        borderWidth: 0.5,
        borderColor: 'lightgrey',
        marginTop: 25,
        marginBottom: 10,
    },
});
