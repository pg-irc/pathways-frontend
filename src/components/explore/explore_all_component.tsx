// tslint:disable: no-expression-statement
import React, { useRef } from 'react';
import { TouchableOpacity, StyleSheet, NativeSyntheticEvent, ScrollViewProps, ScrollView } from 'react-native';
import { View, Icon, Text } from 'native-base';
import { ExploreSection } from '../../selectors/explore/types';
import { colors, values, textStyles, applicationStyles } from '../../application/styles';
import { Trans } from '@lingui/react';
import { RouterProps, Routes, goToRouteWithParameter } from '../../application/routing';
import { getColorForExploreIcon } from './get_color_for_explore_icon';
import { mapWithIndex } from '../../application/helpers/map_with_index';
import { OpenHeaderMenuAction } from '../../stores/user_experience/actions';
import { HelpAndMenuButtonHeaderComponent } from '../help_and_menu_button_header/help_and_menu_button_header_component';
import { memoryHistory } from '../../application';
import { OffsetHook, useOffset } from '../use_offset';
import { useScrollViewToOffset } from '../use_scroll_view_to_offset';

export interface ExploreAllProps {
    readonly sections: ReadonlyArray<ExploreSection>;
}

export interface ExploreAllActions {
    readonly openHeaderMenu: () => OpenHeaderMenuAction;
}

type Props = ExploreAllProps & ExploreAllActions & RouterProps;

export const ExploreAllComponent = (props: Props): JSX.Element => {
    const scrollViewRef = useRef<ScrollView>();
    const { offset, setOffset, offsetFromRouteLocation }: OffsetHook = useOffset();
    useScrollViewToOffset(scrollViewRef, offsetFromRouteLocation);
    const scrollViewThrottle = 8;
    return (
        <View style={{ flex: 1 }}
        >
            <HelpAndMenuButtonHeaderComponent {...props} />
            <ScrollView
                ref={scrollViewRef}
                style={{ backgroundColor: colors.white, padding: 10 }}
                onScroll={(e: NativeSyntheticEvent<ScrollViewProps>): void => setOffset(e.nativeEvent.contentOffset.y)}
                scrollEventThrottle={scrollViewThrottle}
            >
                <Text style={[textStyles.headlineH1StyleBlackLeft, { paddingHorizontal: values.backgroundTextPadding } ]}>
                    <Trans>Learn all about B.C.</Trans>
                </Text>
                <View style={styles.buttonsWrapper}>
                    {mapWithIndex((section: ExploreSection, index: number) => (
                        buildButton(
                            getLearnButtonContent(section),
                            index,
                            section.id,
                            offset,
                        )
                    ), props.sections)}
                </View>
            </ScrollView>
        </View>
    );
};

const buildButton = (buttonContent: JSX.Element, index: number, sectionId: string, offset: number): JSX.Element => (
    <TouchableOpacity
        onPress={(): void => goToRouteWithParameter(Routes.LearnDetail, sectionId, memoryHistory, offset)}
        style={[applicationStyles.boxShadowBelow, styles.button]}
        key={index}
    >
        {buttonContent}
    </TouchableOpacity>
);

const getLearnButtonContent = (section: ExploreSection): JSX.Element => (
    <View>
        <Icon
            type='FontAwesome'
            name={section.icon}
            style={[
                styles.buttonContentIcon,
                {
                    color: getColorForExploreIcon(section.icon),
                },
            ]}
        />
        <Text style={textStyles.headlineH2StyleBlackLeft}>
        <Trans id={section.name} />
        </Text>
        <Text style={[textStyles.paragraphStyle, { color: colors.greyishBrown }]}>
        <Trans id={section.description} />
        </Text>
    </View>
);

const styles = StyleSheet.create({
    button: {
        justifyContent: 'space-between',
        width: '47%',
        backgroundColor: colors.lightGrey,
        borderRadius: values.lessRoundedBorderRadius,
        marginTop: 15,
        padding: 15,
    },
    buttonContentIcon: {
        color: colors.teal,
        fontSize: values.smallIconSize,
        alignSelf: 'flex-start',
        marginBottom: 10,
    },
    buttonsWrapper: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
    },
});
