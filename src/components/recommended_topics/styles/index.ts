import { Dimensions, ImageStyle, StyleSheet, TextStyle, ViewStyle } from 'react-native';

import { colors, values } from '../../../application/styles';

interface CallToActionStyles {
    readonly advisorImage: ImageStyle;
    readonly callToActionContainer: ViewStyle;
    readonly callToActionContent: ViewStyle;
    readonly callToActionBottomContent: ViewStyle;
    readonly callToActionPartialContainer: ViewStyle;
    readonly callToActionPartialContent: TextStyle;
    readonly callToActionRightContent: ViewStyle;
    readonly callToActionTitle: TextStyle;
    readonly callToActionUpperContent: ViewStyle;
    readonly covidTitleContainer: ViewStyle;
    readonly covidUpperContent: ViewStyle;
    readonly recommendationBubbleImage: ImageStyle;
    readonly recommendationIcon: TextStyle;
    readonly recommendationRightContent: ViewStyle;
    readonly updateRecommendationContainer: ViewStyle;
    readonly updateRecommendationIcon: TextStyle;
    readonly updateRecommendationSubtitle: TextStyle;
    readonly updateRecommendationTitle: TextStyle;
}

interface RecommendedTopicsStyle {
    readonly taskListHeaderContainer: ViewStyle;
    readonly taskListHeaderTitle: TextStyle;
    readonly recommendedListContainer: ViewStyle;
    readonly recommendedListTitleContainer: ViewStyle;
    readonly recommendedListTitle: TextStyle;
}

const logoSize = Dimensions.get('screen').width / 4;

const recommendationImageSize = Dimensions.get('screen').width / 9;

const callToActionStyles = StyleSheet.create<CallToActionStyles>({
    advisorImage: {
        flex: 2,
        width: logoSize,
        height: logoSize,
    },

    callToActionContainer: {
        backgroundColor: colors.lightGrey,
        borderRadius: values.lessRoundedBorderRadius,
        padding: 20,
        marginBottom: 20,
    },

    callToActionContent: {
        flex: 5,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },

    callToActionUpperContent: {
        flex: 3,
    },

    callToActionBottomContent: {
        marginBottom: 20,
    },

    callToActionPartialContainer: {
        backgroundColor: colors.lightGrey,
        borderRadius: values.lessRoundedBorderRadius,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
        paddingHorizontal: 10,
        marginBottom: 15,
    },

    callToActionPartialContent: {
        paddingHorizontal: values.backgroundTextPadding,
    },

    callToActionTitle: {
        color: colors.greyishBrown,
        marginBottom: 20,
    },

    callToActionRightContent: {
        paddingLeft: 5,
    },

    covidTitleContainer: {
        flex: 1,
        marginBottom: 10,
    },

    covidUpperContent: {
        marginBottom: 20,
    },

    recommendationIcon: {
        fontSize: values.smallerIconSize,
        color: colors.lightTeal,
    },

    recommendationBubbleImage: {
        flex: 1,
        width: recommendationImageSize,
        height: recommendationImageSize,
        padding: 5,
    },

    recommendationRightContent: {
        flex: 3,
    },

    updateRecommendationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    updateRecommendationIcon: {
        color: colors.teal,
        fontSize: 15,
    },

    updateRecommendationSubtitle: {
        marginRight: 10,
    },

    updateRecommendationTitle: {
        color: colors.greyishBrown,
        paddingTop: 4,
    },

});

const recommendedTopicsStyles = StyleSheet.create<RecommendedTopicsStyle>({
    taskListHeaderContainer: {
        backgroundColor: colors.white,
        paddingTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
    },

    taskListHeaderTitle: {
        marginBottom: 10,
        paddingHorizontal: values.backgroundTextPadding,
    },

    recommendedListContainer: {
        backgroundColor: colors.lightGrey,
    },

    recommendedListTitleContainer: {
        alignItems: 'center',
        flexDirection: 'row',
    },

    recommendedListTitle: {
        marginVertical: 15,
        marginRight: 5,
        paddingHorizontal: values.backgroundTextPadding,
    },
});

export {
    callToActionStyles,
    recommendedTopicsStyles,
};