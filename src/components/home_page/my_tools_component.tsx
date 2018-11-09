import React from 'react';
import { I18nManager, TouchableOpacity, StyleSheet } from 'react-native';
import { Trans } from '@lingui/react';
import { View, Text, Icon } from 'native-base';
import { History } from 'history';
import { colors, values, textStyles, applicationStyles } from '../../application/styles';
import { Routes, goToRouteWithoutParameter } from '../../application/routing';

export interface MyToolsProps {
    readonly history: History;
}

export const MyToolsComponent: React.StatelessComponent<MyToolsProps> = (props: MyToolsProps): JSX.Element => (
    <View>
        <Text style={[ textStyles.headlineH5StyleBlackLeft, styles.sectionTitle ]}>
            <Trans>MY TOOLS</Trans>
        </Text>
        <View style={styles.buttonsWrapper}>
            {buildButton(getMyPlanButtonContent(), goToRouteWithoutParameter(Routes.MyPlan, props.history))}
            {buildButton(getLearnButtonContent(), goToRouteWithoutParameter(Routes.Learn, props.history))}
            {buildButton(getNeedHelpButtonContent(), goToRouteWithoutParameter(Routes.Help, props.history))}
            {buildButton(getMyPrivacyButtonContent(), goToRouteWithoutParameter(Routes.Help, props.history))}
        </View>
    </View>
);

const buildButton = (buttonContent: JSX.Element, buttonOnPress: () => void): JSX.Element => (
    <TouchableOpacity onPress={buttonOnPress} style={[applicationStyles.boxShadowBelow, styles.button]}>
        {buttonContent}
        <View style={styles.buttonArrowIconWrapper}>
            <Icon name={I18nManager.isRTL ? 'arrow-back' : 'arrow-forward'} style={{ fontSize: values.smallIconSize }}/>
        </View>
    </TouchableOpacity>
);

const getMyPlanButtonContent = (): JSX.Element => (
    getButtonContent(
        'th-list',
        <Trans>My Plan</Trans>,
        <Trans>Keep track of everything I need to do to settle in Canada</Trans>,
    )
);

const getLearnButtonContent = (): JSX.Element => (
    getButtonContent(
        'book',
        <Trans>Learn</Trans>,
        <Trans>Find out about my community and available services</Trans>,
    )
);

const getNeedHelpButtonContent = (): JSX.Element => (
    getButtonContent(
        'phone',
        <Trans>Need Help?</Trans>,
        <Trans>Contact a settlement agency near me</Trans>,
    )
);

const getMyPrivacyButtonContent = (): JSX.Element => (
    getButtonContent(
        'lock',
        <Trans>My Privacy</Trans>,
        <Trans>Your data is never shared with anyone</Trans>,
    )
);

const getButtonContent = (icon: string, title: JSX.Element, description: JSX.Element): JSX.Element => (
    <View>
        <Icon type='FontAwesome' name={icon} style={styles.buttonContentIcon}/>
        <Text style={textStyles.headlineH2StyleBlackLeft}>{title}</Text>
        <Text style={textStyles.paragraphStyle}>{description}</Text>
    </View>
);

const styles = StyleSheet.create({
    sectionTitle: {
        marginLeft: 10,
        marginTop: 10,
    },
    button: {
        justifyContent: 'space-between',
        width: '48%',
        backgroundColor: colors.white,
        borderRadius: values.lessRoundedBorderRadius,
        marginTop: 10,
        padding: 15,
    },
    buttonContentIcon: {
        color: colors.topaz,
        fontSize: values.largeIconSize,
        alignSelf: 'flex-start',
        marginBottom: 5,
    },
    buttonArrowIconWrapper: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 10,
    },
    buttonsWrapper: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
    },
});
