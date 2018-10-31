import React from 'react';
import * as R from 'ramda';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { View, Content, Icon, Text } from 'native-base';
import { ExploreSection } from '../../selectors/explore/types';
import { colors, values, textStyles, applicationStyles } from '../../application/styles';
import { Trans } from '@lingui/react';
import { RouterProps, Routes, goToRouteWithParameter } from '../../application/routing';

export interface ExploreAllProps {
    readonly sections: ReadonlyArray<ExploreSection>;
}

type AllExploreProps = ExploreAllProps & RouterProps;

export const ExploreAllComponent: React.StatelessComponent<AllExploreProps> =
    (props: AllExploreProps): JSX.Element => {
        const mapWithIndex = R.addIndex(R.map);
        return (
            <Content padder style={applicationStyles.body}>
                <Text style={textStyles.headlineH1StyleBlackLeft}>
                    <Trans>Learn</Trans>
                </Text>
                <Text style={textStyles.headlineH4StyleBlackLeft}>
                    <Trans>Find out about my community and available services.</Trans>
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
        );
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
                    color: getColorForIcon(section.icon),
                },
            ]}
        />
        <Text style={textStyles.headlineH2StyleBlackLeft}>{section.name}</Text>
        <Text style={textStyles.paragraphStyle}>{section.description}</Text>
    </View>
);

const getColorForIcon = (icon: string): string => {
    switch (icon) {
        case 'street-view':
            return colors.turquoiseBlue;
        case 'building':
            return colors.orange;
        case 'dollar':
            return colors.aquaMarine;
        case 'heartbeat':
            return colors.vermillion;
        case 'graduation-cap':
            return colors.blueGreenDark;
        case 'handshake-o':
            return colors.melon;
        case 'briefcase':
            return colors.sepia;
        case 'balance-scale':
            return colors.purple;
        default:
        case 'car':
            return colors.blueGreen;

    }
};

const styles = StyleSheet.create({
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
