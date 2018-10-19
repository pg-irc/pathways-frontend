import React from 'react';
import { I18nManager, TouchableOpacity, StyleSheet } from 'react-native';
import { Trans } from '@lingui/react';
import { View, Text, Icon } from 'native-base';
import { History } from 'history';
import { applicationStyles, colors, values } from '../../application/styles';
import { Routes, goToRouteWithoutParameter } from '../../application/routing';

export interface MyToolsProps {
    readonly history: History;
}

export const MyToolsComponent: React.StatelessComponent<MyToolsProps> = (props: MyToolsProps): JSX.Element => (
    <View>
        <Text style={styles.sectionTitle}>
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
    <TouchableOpacity
        onPress={buttonOnPress}
        style={styles.button}
    >
        {buttonContent}
        <View style={styles.buttonArrowIconWrapper}>
            <Icon name={I18nManager.isRTL ? 'arrow-back' : 'arrow-forward'} style={{ fontSize: values.smallIconSize }}/>
        </View>
    </TouchableOpacity>
);

const getMyPlanButtonContent = (): JSX.Element => (
    <View>
        <Icon type='FontAwesome' name='check' style={styles.buttonContentIcon}/>
        <Text style={applicationStyles.subTitle}>
            <Trans>My Plan</Trans>
        </Text>
        <Text style={styles.buttonContentText}>
            <Trans>Keep track of everything I need to do to settle in Canada</Trans>
        </Text>
    </View>
);

const getLearnButtonContent = (): JSX.Element => (
    <View>
        <Icon type='FontAwesome' name='book' style={styles.buttonContentIcon}/>
        <Text style={applicationStyles.subTitle}>
            <Trans>Learn</Trans>
        </Text>
        <Text style={styles.buttonContentText}>
            <Trans>Find out about my community and available services</Trans>
        </Text>
    </View>
);

const getNeedHelpButtonContent = (): JSX.Element => (
    <View>
        <Icon type='FontAwesome' name='phone' style={styles.buttonContentIcon}/>
        <Text style={applicationStyles.subTitle}>
            <Trans>Need Help?</Trans>
        </Text>
        <Text style={styles.buttonContentText}>
            <Trans>Contact a settlement agency near me</Trans>
        </Text>
    </View>
);

const getMyPrivacyButtonContent = (): JSX.Element => (
    <View>
        <Icon type='FontAwesome' name='lock' style={styles.buttonContentIcon}/>
        <Text style={applicationStyles.subTitle}>
            <Trans>My Privacy?</Trans>
        </Text>
        <Text style={styles.buttonContentText}>
            <Trans>Your data is never shared with anyone</Trans>
        </Text>
    </View>
);

const styles = StyleSheet.create({
    sectionTitle: {
        color: colors.black,
        fontSize: values.smallTextSize,
        fontWeight: 'bold',
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
    },
    buttonContentText: {
        color: colors.greyishBrown,
        textAlign: 'left',
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
