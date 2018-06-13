import { StyleSheet } from 'react-native';

// use application wide settings once PR #117 is merged
export const appColors = {
    lightGrey: 'lightgrey',
    lighterGrey: '#F5F5F5',
    darkGrey: '#666666',
};

export const exploreStyles = StyleSheet.create({
    sectionButton: {
        height: 100,
        width: 100,
    },
    sectionButtonContent: {
        width: 100,
        margin: 15,
    },
    sectionButtonCaption: {
        width: 100,
        textAlign: 'center',
    },
});
