import React from 'react';
import * as R from 'ramda';
import { Text, SectionList, SectionBase, TouchableOpacity, StyleSheet, I18nManager } from 'react-native';
import { History } from 'history';
import { Trans } from '@lingui/react';
import { LocaleInfo } from '../../locale/types';
import { Content, View, Icon, Header } from 'native-base';
import { colors, values, textStyles } from '../../application/styles';
import { openURL } from '../link/link';
import { isRTL } from '../../locale/effects';
import { DividerComponent } from '../content_layout/divider_component';

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
}

type Props = OwnProps & HeaderMenuProps & HeaderMenuActions;

export const HeaderMenuComponent = (props: Props): JSX.Element => (
    <View style={{ flex: 1, backgroundColor: colors.white }}>
        <Header style={{ backgroundColor: colors.lightTeal }} />
        <Content>
            <LocaleSection {...props} />
            <DividerComponent />
            <AboutSection {...props} />
        </Content>
    </View>
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
    <Text style={[textStyles.headlineH5StyleBlackLeft, { marginVertical: 10 }]}>
        {props.title}
    </Text>
);

const LocaleSection = (props: Props): JSX.Element => {
    const localeItemBuilder = createLocaleItemBuilder(props.setLocale);
    const localeSectionData = {
        ...props.currentLocale,
        data: R.map(localeItemBuilder, props.availableLocales),
    };
    return (
        <View style={{ backgroundColor: colors.white }} padder>
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

function createLocaleItemBuilder(onPress: (code: string, flipOrientation: boolean) => void): LocaleItemBuilder {
    return (locale: LocaleInfo): LocaleListItem => {
        return { ...locale, onPress: (): void => onPress(locale.code, I18nManager.isRTL !== isRTL(locale.code)) };
    };
}

const LocaleItem = (sectionListLocaleItem: SectionListItemInfo): JSX.Element => {
    return (
        <TouchableOpacity key={sectionListLocaleItem.item.code} style={styles.localeListItem} onPress={sectionListLocaleItem.item.onPress}>
            <Text style={[textStyles.headlineH4StyleBlackLeft, { marginLeft: 31 }]}>{sectionListLocaleItem.item.label}</Text>
        </TouchableOpacity>
    );
};

const SelectedLocaleItem = ({ section }: SelectedLocaleListItemInfo): JSX.Element => {
    return (
        <View key={section.code} style={styles.localeListItem}>
            <Icon
                name='check'
                type='FontAwesome'
                style={{ fontSize: values.mediumIconSize, marginRight: 7, color: colors.teal }}
            />
            <Text style={[textStyles.headlineH4StyleBlackLeft, { fontWeight: 'bold' }]}>{section.label}</Text>
        </View>
    );
};

const AboutSection = (props: Props): JSX.Element => (
    <View padder style={{ backgroundColor: colors.white }}>
        <MenuSectionTitle title={<Trans>ABOUT THE APP</Trans>} />
        <AboutListItems {...props} />
    </View>
);

const AboutListItems = (props: Props): JSX.Element => {
    return (
        <View>
            <AboutItem
                icon={<AboutIcon name='mobile' fontSize={35} marginRight={10} />}
                text={<Trans>About Arrival Advisor</Trans>}
                onPress={props.openAboutModal}
            />
            <AboutItem
                icon={<AboutIcon name='file' fontSize={20} marginRight={7} />}
                text={<Trans>Disclaimer</Trans>}
                onPress={props.openDisclaimerModal}
            />
            <AboutItem
                icon={<AboutIcon name='lock' fontSize={30} marginRight={5} />}
                text={<Trans>Privacy policy</Trans>}
                onPress={buildOnPressForURL('https://peacegeeks.org/privacy')}
            />
            <AboutItem
                icon={<AboutIcon name='file' fontSize={20} marginRight={7} />}
                text={<Trans>Terms of Use</Trans>}
                onPress={buildOnPressForURL('https://arrivaladvisor.ca/terms-of-use/')}
            />
        </View>
    );
};

const AboutIcon = (props: { readonly name: string, readonly fontSize: number, readonly marginRight: number }):
    JSX.Element => (
        <Icon
            name={props.name}
            type={'FontAwesome'}
            style={{
                fontSize: props.fontSize,
                marginRight: props.marginRight,
                color: colors.greyishBrown,
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
                marginBottom: 10,
            }}
            onPress={props.onPress}
        >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {props.icon}
                <Text style={[textStyles.headlineH4StyleBlackLeft, { marginLeft: 10 }]}>{props.text}</Text>
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
