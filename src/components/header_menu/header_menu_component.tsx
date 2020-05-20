// tslint:disable: no-expression-statement
import React from 'react';
import * as R from 'ramda';
import { Text, SectionList, SectionBase, TouchableOpacity, StyleSheet, I18nManager, Image } from 'react-native';
import { History } from 'history';
import { Trans } from '@lingui/react';
import { LocaleInfo } from '../../locale/types';
import { Content, View, Icon, Header, Title } from 'native-base';
import { colors, textStyles } from '../../application/styles';
import { openURL } from '../link/link';
import { isRTL } from '../../locale/effects';
import { getStatusBarHeightForPlatform } from '../main/get_status_bar_height_for_platform';
import { arrivalAdvisorGlyphLogo } from '../../application/images';
import { isAndroid } from '../../application/helpers/is_android';

type OwnProps = {
    readonly history: History;
    readonly closeMenu: () => void;
    readonly openAboutModal: () => void;
    readonly openDisclaimerModal: () => void;
};

export interface HeaderMenuProps {
    readonly currentLocale: LocaleInfo;
    readonly availableLocales: ReadonlyArray<LocaleInfo>;
}

export interface HeaderMenuActions {
    readonly setLocale: (locale: string, flipOrientation: boolean) => void;
    readonly updateNotificationToken: () => void;
}

type Props = OwnProps & HeaderMenuProps & HeaderMenuActions;

export const HeaderMenuComponent = (props: Props): JSX.Element => (
    <View style={{ flex: 1, backgroundColor: getViewBackgroundColorForPlatform() }}>
        <Header style={{ backgroundColor: colors.lightTeal, marginTop: getStatusBarHeightForPlatform(), alignItems: 'center', justifyContent: 'flex-start' }}>
            <Image source={arrivalAdvisorGlyphLogo} style={{ height: 24, width: 24, marginHorizontal: 10 }} />
            <Title style={textStyles.headlineH3StyleWhiteCenter}>Arrival Advisor</Title>
        </Header>
        <Content style={{ backgroundColor: colors.white }}>
            <LocaleSection {...props} />
            <Divider />
            <AboutSection {...props} />
        </Content>
    </View>
);

const getViewBackgroundColorForPlatform = (): string => (
    isAndroid() ? colors.teal : colors.white
);

type LocaleListItem = LocaleInfo & {
    readonly onPress: () => void;
};

type LocaleItemBuilder = (locale: LocaleInfo) => LocaleListItem;

// TO DO complete rest of these types
export interface SectionListItemInfo {
    readonly item: LocaleListItem;
    readonly index: number;
    readonly section: any;
    readonly separators: any;
};

type SelectedLocaleListItemInfo = {
    readonly section: LocaleInfo & SectionBase<LocaleListItem>;
};

const MenuSectionTitle = (props: { readonly title: JSX.Element }): JSX.Element => (
    <Text style={[textStyles.headlineH5StyleBlackLeft, { marginVertical: 10, marginHorizontal: 10 }]}>
        {props.title}
    </Text>
);

const LocaleSection = (props: Props): JSX.Element => {
    const localeItemBuilder = createLocaleItemBuilder(props.setLocale, props.updateNotificationToken);
    const localeSectionData = {
        ...props.currentLocale,
        data: R.map(localeItemBuilder, props.availableLocales),
    };
    return (
        <View style={{ backgroundColor: colors.white, marginVertical: 12, marginHorizontal: 10 }}>
            <MenuSectionTitle title={<Trans>SELECT YOUR LANGUAGE</Trans>} />
            <SectionList
                stickySectionHeadersEnabled={true}
                keyExtractor={(item: LocaleInfo): string => item.code}
                sections={[localeSectionData]}
                renderItem={LocaleItem}
                renderSectionHeader={SelectedLocaleItem} />
        </View>
    );
};

function createLocaleItemBuilder(setLocale: (code: string, flipOrientation: boolean) => void, updateToken: () => void): LocaleItemBuilder {
    return (locale: LocaleInfo): LocaleListItem => {
        return {
            ...locale, onPress: (): void => {
                setLocale(locale.code, I18nManager.isRTL !== isRTL(locale.code));
                updateToken();
            },
        };
    };
}

const LocaleItem = (sectionListLocaleItem: SectionListItemInfo): JSX.Element => {
    return (
        <TouchableOpacity key={sectionListLocaleItem.item.code} style={styles.localeListItem} onPress={sectionListLocaleItem.item.onPress}>
            <Text style={[textStyles.headlineH4StyleBlackLeft, { marginLeft: 52 }]}>{sectionListLocaleItem.item.label}</Text>
        </TouchableOpacity>
    );
};

const SelectedLocaleItem = ({ section }: SelectedLocaleListItemInfo): JSX.Element => {
    return (
        <View key={section.code} style={styles.localeListItem}>
            <View style={{ borderWidth: 1, marginLeft: 12, marginRight: 7 }}>
                <Icon
                    name='check'
                    type='FontAwesome'
                    style={{ fontSize: 20, color: colors.teal }}
                />
            </View>
            <Text style={[textStyles.headlineH4StyleBlackLeft, { fontWeight: 'bold', marginLeft: 10 }]}>{section.label}</Text>
        </View>
    );
};

const AboutSection = (props: Props): JSX.Element => (
    <View style={{ backgroundColor: colors.white, marginVertical: 12, marginHorizontal: 10  }}>
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
                icon={<AboutIcon name='lock' fontSize={30} marginRight={3}  marginVertical={-4} />}
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
    readonly name: string, readonly fontSize: number, readonly marginRight: number, readonly marginVertical: number }): JSX.Element => (
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
                <View style={{ borderWidth: 1, marginLeft: 12 }}>
                    {props.icon}
                </View>
                <Text style={[textStyles.headlineH4StyleBlackLeft, { marginLeft: 15 }]}>{props.text}</Text>
            </View>
        </TouchableOpacity>
    );

const buildOnPressForURL = (url: string): () => void => (
    (): void => openURL(url)
);

const styles = StyleSheet.create({
    localeListItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingLeft: 10,
    },
});

const Divider = (): JSX.Element => (
    <View style={{ height: 1, backgroundColor: colors.grey }}/>
);