// tslint:disable: no-expression-statement
import React from 'react';
import { Text, TouchableOpacity, Image } from 'react-native';
import { History } from 'history';
import { Trans } from '@lingui/react';
import { LocaleCode, localeCodeToLabel } from '../../application/locales';
import { Content, View, Icon, Header, Title } from 'native-base';
import { colors, textStyles, applicationStyles } from '../../application/styles';
import { openURL } from '../link/link_component';
import { getStatusBarHeightForPlatform } from '../main/get_status_bar_height_for_platform';
import { arrivalAdvisorGlyphLogo, peacegeeksColorLogo, mb211Logo, mbStartLogo, bc211Logo, welcomeBCLogo } from '../../application/images';
import { isAndroid } from '../../application/helpers/is_android';
import { RegionCode, regionCodeToLabel } from '../../validation/region/types';
import { OpenLanguageDrawerAction } from '../../stores/user_experience/actions';

type OwnProps = {
    readonly history: History;
    readonly closeMenu: () => void;
    readonly openAboutModal: () => void;
    readonly openDisclaimerModal: () => void;
};

export interface HeaderMenuProps {
    readonly currentLocale: LocaleCode;
    readonly currentRegion: RegionCode;
}

export interface HeaderMenuActions {
    readonly openLanguageDrawer: () => OpenLanguageDrawerAction;
}

type Props = OwnProps & HeaderMenuProps & HeaderMenuActions;

export const HeaderMenuComponent = (props: Props): JSX.Element => (
    <View style={{ flex: 1, backgroundColor: getViewBackgroundColorForPlatform() }}>
        <Header
            style={{
                backgroundColor: colors.lightTeal,
                marginTop: getStatusBarHeightForPlatform(),
                alignItems: 'center',
                justifyContent: 'flex-start',
            }}
            androidStatusBarColor={colors.teal}
        >
            <Image source={arrivalAdvisorGlyphLogo} style={{ height: 24, width: 24, marginHorizontal: 10 }} />
            <Title style={textStyles.headlineH3StyleWhiteCenter}>Arrival Advisor</Title>
        </Header>
        <Content style={{ backgroundColor: colors.white }}>
            <RegionSection currentRegion={props.currentRegion} />
            <LocaleSection currentLocale={props.currentLocale} openLanguageDrawer={props.openLanguageDrawer} />
            <Divider />
            <AboutSection {...props} />
            <Divider />
            <LogoSection currentRegion={props.currentRegion} />
        </Content>
    </View>
);

const getViewBackgroundColorForPlatform = (): string => (
    isAndroid() ? colors.teal : colors.white
);

type LocaleListItem = {
    readonly code: string;
    readonly label: string;
    readonly onPress: () => void;
};

// TO DO complete rest of these types
export interface SectionListItemInfo {
    readonly item: LocaleListItem;
    readonly index: number;
    readonly section: any;
    readonly separators: any;
}

const MenuSectionTitle = (props: { readonly title: JSX.Element }): JSX.Element => (
    <Text style={[textStyles.headlineH5StyleBlackLeft, { marginVertical: 10, marginHorizontal: 10 }]}>
        {props.title}
    </Text>
);

const RegionSection = (props: { readonly currentRegion: RegionCode }): JSX.Element => {
    return (
        <View style={{ backgroundColor: colors.white, marginHorizontal: 10 }}>
            <MenuSectionTitle title={<Trans>SELECT YOUR PROVINCE</Trans>} />
            <View key={props.currentRegion} style={[applicationStyles.listItem, { justifyContent: 'space-between' }]}>
                <Text style={[textStyles.headlineH4StyleBlackLeft, { fontWeight: 'bold' }]}>{regionCodeToLabel(props.currentRegion)}</Text>
                <TouchableOpacity >
                    <Text style={[textStyles.headlineH4StyleBlackLeft, { fontWeight: 'bold', color: colors.teal }]}><Trans>Change</Trans></Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const LocaleSection = (props: { readonly currentLocale: LocaleCode, readonly openLanguageDrawer: () => OpenLanguageDrawerAction }): JSX.Element => {
    return (
        <View style={{ backgroundColor: colors.white, marginHorizontal: 10 }}>
            <MenuSectionTitle title={<Trans>SELECT YOUR PROVINCE</Trans>} />
            <View key={props.currentLocale} style={[applicationStyles.listItem, { justifyContent: 'space-between' }]}>
                <Text style={[textStyles.headlineH4StyleBlackLeft, { fontWeight: 'bold' }]}>{localeCodeToLabel(props.currentLocale)}</Text>
                <TouchableOpacity onPress={props.openLanguageDrawer}>
                    <Text style={[textStyles.headlineH4StyleBlackLeft, { fontWeight: 'bold', color: colors.teal }]}><Trans>Change</Trans></Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const AboutSection = (props: Props): JSX.Element => (
    <View style={{ backgroundColor: colors.white, marginVertical: 12, marginHorizontal: 10 }}>
        <MenuSectionTitle title={<Trans>ABOUT THE APP</Trans>} />
        <AboutListItems {...props} />
    </View>
);

const AboutListItems = (props: Props): JSX.Element => {
    return (
        <View>
            <AboutItem
                icon={<AboutIcon name='mobile' fontSize={35} marginRight={8} marginVertical={-6} />}
                text={<Trans>About Arrival Advisor</Trans>}
                onPress={props.openAboutModal}
            />
            <AboutItem
                icon={<AboutIcon name='file' fontSize={20} marginRight={5} marginVertical={0} />}
                text={<Trans>Disclaimer</Trans>}
                onPress={props.openDisclaimerModal}
            />
            <AboutItem
                icon={<AboutIcon name='lock' fontSize={30} marginRight={3} marginVertical={-4} />}
                text={<Trans>Privacy policy</Trans>}
                onPress={buildOnPressForURL('https://peacegeeks.org/privacy')}
            />
            <AboutItem
                icon={<AboutIcon name='file' fontSize={20} marginRight={5} marginVertical={0} />}
                text={<Trans>Terms of Use</Trans>}
                onPress={buildOnPressForURL('https://arrivaladvisor.ca/terms-of-use/')}
            />
        </View>
    );
};

const AboutIcon = (props: {
    readonly name: string, readonly fontSize: number, readonly marginRight: number, readonly marginVertical: number
}): JSX.Element => (
    <Icon
        name={props.name}
        type={'FontAwesome'}
        style={{
            fontSize: props.fontSize,
            marginRight: props.marginRight,
            marginVertical: props.marginVertical,
            color: colors.greyishBrown,
            textAlign: 'center',
        }}
    />
);

const AboutItem = (props: { readonly icon: JSX.Element, readonly text: JSX.Element, readonly onPress: () => void }):
    JSX.Element => (
    <TouchableOpacity
        style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingVertical: 10,
            paddingLeft: 10,
        }}
        onPress={props.onPress}
    >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ marginLeft: 12 }}>
                {props.icon}
            </View>
            <Text style={[textStyles.headlineH4StyleBlackLeft, { marginLeft: 15 }]}>{props.text}</Text>
        </View>
    </TouchableOpacity>
);

const LogoSection = (props: { readonly currentRegion: RegionCode }): JSX.Element => (
    <View style={{ backgroundColor: colors.white, marginVertical: 12, marginHorizontal: 10 }}>
        <MenuSectionTitle title={<Trans>BROUGHT TO YOU BY</Trans>} />
        <LogoItems {...props} />
    </View>
);

const LogoItems = (props: { readonly currentRegion: RegionCode }): JSX.Element => {
    if (props.currentRegion === RegionCode.MB) {
        return (
            <View style={{ flexDirection: 'row', marginHorizontal: 10 }}>
                <Image source={peacegeeksColorLogo} style={{ height: 40, width: 65 }} />
                <Image source={mbStartLogo} style={{ height: 40, width: 53, marginHorizontal: 16 }} />
                <Image source={mb211Logo} style={{ height: 40, width: 84 }} />
            </View>
        );
    } else {
        return (
            <View style={{ flexDirection: 'row', marginHorizontal: 10 }}>
                <Image source={peacegeeksColorLogo} style={{ height: 40, width: 65 }} />
                <Image source={welcomeBCLogo} style={{ height: 40, width: 95, marginHorizontal: 16 }} />
                <Image source={bc211Logo} style={{ height: 40, width: 61 }} />
            </View>
        );
    }
};

const buildOnPressForURL = (url: string): () => void => (
    (): void => openURL(url)
);

const Divider = (): JSX.Element => (
    <View style={{ height: 1, backgroundColor: colors.grey }} />
);
