import React from 'react';
import { TouchableOpacity, Dimensions, Image, I18nManager } from 'react-native';
import { Content, View, Text, Button, Icon } from 'native-base';
import { Trans } from '@lingui/react';
import { History } from 'history';
import { applicationStyles, colors, textStyles, values } from '../../application/styles';
import { arrivalAdvisorGlyphLogo } from '../../application/images';
import { Routes, goToRouteWithoutParameter } from '../../application/routing';
import { Link } from '../link/link';

export interface HomeProps {
    readonly history: History;
}

export const HomeComponent: React.StatelessComponent<HomeProps> = (props: HomeProps): JSX.Element => {
    return (
        <Content padder style={applicationStyles.body} >
            <PersonalizeComponent {...props} />
            <AboutButtonComponent {...props} />
            <CopyrightComponent />
        </Content >
    );
};

export const PersonalizeComponent = (props: HomeProps): JSX.Element => (
    <View style={[
        applicationStyles.boxShadowBelow,
        {
            backgroundColor: colors.orange,
            borderRadius: values.lessRoundedBorderRadius,
            padding: 20,
            marginBottom: 15,
        },
    ]}>
        <PersonalizeComponentContent />
        <PersonalizeComponentButton {...props} />
    </View>
);

const PersonalizeComponentContent = (): JSX.Element => {
    const logoSize = Dimensions.get('screen').width / 6;
    return (
        <View style={{ flexDirection: 'row', marginBottom: 15 }}>
            <View style={{ flex: 3 }}>
                <Text style={textStyles.headlineH2StyleWhiteLeft}>
                    <Trans>Personalize Your Recommended Topics</Trans>
                </Text>
                <Text style={textStyles.paragraphStyleWhiteleft}>
                    <Trans>Get recommended topics for settling in Canada </Trans>
                </Text>
            </View>
            <Image
                source={arrivalAdvisorGlyphLogo}
                resizeMode={'contain'}
                style={{
                    flex: 1,
                    width: logoSize,
                    height: logoSize,
                    marginBottom: 20,
                }}
            />
        </View>
    );
};

const PersonalizeComponentButton = (props: HomeProps): JSX.Element => (
    <Button
        full
        onPress={goToRouteWithoutParameter(Routes.Questionnaire, props.history)}
        style={[applicationStyles.whiteButton, applicationStyles.boxShadowBelow]}
    >
        <Text style={textStyles.whiteButton}>
            <Trans>Start</Trans>
        </Text>
    </Button>
);

export const AboutButtonComponent = (props: HomeProps): JSX.Element => (
    <TouchableOpacity
        onPress={goToRouteWithoutParameter(Routes.About, props.history)}
        style={[
            applicationStyles.boxShadowBelow,
            {
                backgroundColor: colors.white,
                borderRadius: values.lessRoundedBorderRadius,
                paddingHorizontal: 20,
                paddingVertical: 10,
            },
        ]}>
        <Icon type='FontAwesome' name={'mobile'} style={{ color: colors.topaz }} />
        <Text style={[textStyles.headlineH2StyleBlackLeft, { marginVertical: 5 }]}>
            <Trans>About the app</Trans>
        </Text>
        <Text style={textStyles.paragraphStyle}>
            <Trans>Learn more about Arrival Advisor and how we help</Trans>
        </Text>
        <View style={{ alignItems: 'flex-end' }}>
            <Icon name={I18nManager.isRTL ? 'arrow-back' : 'arrow-forward'} style={{ fontSize: values.smallIconSize }}/>
        </View>
    </TouchableOpacity>
);

export const CopyrightComponent = (): JSX.Element => {
    const welcomeBcUrl = 'https://www.welcomebc.ca/Start-Your-Life-in-B-C/Newcomers-Guides/Newcomers-Guide-Provincial';
    const link = <Link
        href={welcomeBcUrl}
        text={'Newcomer\'s Guide to British Columbia'}
        style={{ fontSize: 12, fontWeight: 'bold' }}
    />;
    return (
        <View style={{ marginTop: 40 }}>
            <Text style={textStyles.paragraphSmallStyleCenter}>
                Information in this app is provided by the {link} Copyright 2018 Province of British Columbia. All rights reserved.
            </Text>
        </View>
   );
};
