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
