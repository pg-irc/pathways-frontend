import { StyleSheet } from 'react-native';
import { values, colors } from '../../application/styles';

export const taskStyles = StyleSheet.create({
    suggestedListItem: {
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
        height: 'auto',
        marginBottom: 10,
    },
});
