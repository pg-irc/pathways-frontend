import { StyleSheet } from 'react-native';
import { values, colors } from '../../application/styles';

export const taskStyles = StyleSheet.create({
    savedListItem: {
        paddingLeft: 10,
    },
    suggestedListItem: {
        paddingLeft: 10,
        backgroundColor: colors.lighterGrey,
    },
    rightColumn: {
        alignItems: 'center',
    },
    icon: {
        paddingLeft: 10,
        fontSize: values.smallIconSize,
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
