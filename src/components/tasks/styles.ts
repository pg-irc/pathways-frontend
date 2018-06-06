import { StyleSheet } from 'react-native';

export const task = StyleSheet.create({
    listItem: {
        paddingLeft: 10,
    },
    rightColumn: {
        alignItems: 'center',
    },
    starIcon: {
        fontSize: 20,
        paddingLeft: 10,
    },
});

export const taskDetailStyles = StyleSheet.create({
    title: {
        marginTop: 5,
    },
    actions: {
        marginTop: 15,
        marginBottom: 10,
    },
    iconText: {
        justifyContent: 'center',
    },
    tabs: {
        marginLeft: -10,
        marginRight: -10,
    },
    tabContent: {
        padding: 10,
    },
    row: {
        marginTop: 10,
        marginBottom: 10,
    },
});
