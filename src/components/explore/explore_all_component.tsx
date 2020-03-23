import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { View, Content, Icon, Text } from 'native-base';
import { ExploreSection } from '../../selectors/explore/types';
import { colors, values, textStyles, applicationStyles } from '../../application/styles';
import { Trans } from '@lingui/react';
import { RouterProps, Routes, goToRouteWithParameter } from '../../application/routing';
import { getColorForExploreIcon } from './get_color_for_explore_icon';
import { mapWithIndex } from '../../application/map_with_index';
import { BackButtonComponent } from '../header_button/back_button_component';
import { MenuButtonComponent } from '../header_button/menu_button_component';
import { renderHeader } from '../main/render_header';
import { OpenHeaderMenuAction } from '../../stores/header_menu';

export interface ExploreAllProps {
    readonly sections: ReadonlyArray<ExploreSection>;
}

export interface ExploreAllActions {
    readonly openHeaderMenu: () => OpenHeaderMenuAction;
}

type Props = ExploreAllProps & ExploreAllActions & RouterProps;

export const ExploreAllComponent = (props: Props): JSX.Element => (
    <View style={{ flex: 1 }}>
        <Header {...props} />
        <Content padder style={{ backgroundColor: colors.white }}>
            <Text style={[textStyles.headlineH1StyleBlackLeft, { paddingHorizontal: values.backgroundTextPadding } ]}>
                <Trans>Learn all about B.C.</Trans>
            </Text>
            <View style={styles.buttonsWrapper}>
                {mapWithIndex((section: ExploreSection, index: number) => (
                    buildButton(
                        getLearnButtonContent(section),
                        goToRouteWithParameter(Routes.LearnDetail, section.id, props.history),
                        index,
                    )
                ), props.sections)}
            </View>
        </Content>
    </View>
);

const Header = (props: Props): JSX.Element => {
    const textColor = colors.black;
    const backgroundColor = colors.white;
    const leftButton = <BackButtonComponent history={props.history} textColor={textColor} />;
    const rightButton =
        <MenuButtonComponent
            onPress={props.openHeaderMenu}
            textColor={textColor}
        />;
    return renderHeader({ backgroundColor, leftButton, rightButtons: [rightButton] });
};

const buildButton = (buttonContent: JSX.Element, buttonOnPress: () => void, index: number): JSX.Element => (
    <TouchableOpacity onPress={buttonOnPress} style={[applicationStyles.boxShadowBelow, styles.button]} key={index}>
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
