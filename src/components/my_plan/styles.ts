import { StyleSheet } from 'react-native';
import { colors, values } from '../../application/styles';

export const myPlanStyles = StyleSheet.create({
    icon: {
        marginLeft: 10,
        marginRight: 10,
        fontSize: values.smallIconSize,
    },
    suggestedTasks: {
        backgroundColor: colors.lighterGrey,
    },
    listItemLabel: {
        alignItems: 'center',
    },
    infoIcon: {
        fontSize: values.smallerIconSize,
        color: colors.darkGrey,
    },
    divider: {
        marginTop: 20,
    },
    recommendedText: {
        fontSize: values.smallTextSize,
    },
});
