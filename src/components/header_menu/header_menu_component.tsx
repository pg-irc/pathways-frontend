import React from 'react';
import * as R from 'ramda';
import { Text, SectionList, SectionBase, TouchableOpacity, StyleSheet, I18nManager } from 'react-native';
import { History } from 'history';
import { Trans } from '@lingui/react';
import { LocaleInfo } from '../../locale/types';
import { Content, View, Icon, Header } from 'native-base';
import { colors, values, textStyles } from '../../application/styles';
import { goToRouteWithoutParameter } from '../../application/routing';
import { Routes } from '../../application/routing';
import { openURL } from '../link/link';

export interface HeaderMenuProps {
    readonly currentLocale: LocaleInfo;
    readonly availableLocales: ReadonlyArray<LocaleInfo>;
    readonly history: History;
}

export interface HeaderMenuActions {
    readonly setLocale: (locale: string) => void;
    readonly closeMenu: () => void;
}

type Props = HeaderMenuProps & HeaderMenuActions;

export const HeaderMenuComponent = (props: Props): JSX.Element => (
    <View style={{ flex: 1, backgroundColor: colors.lightGrey }}>
        <Content>
            <Header style={{ backgroundColor: colors.lightTeal }} />
            <LocaleSection {...props} />
            <AboutSection {...props} />
        </Content>
    </View>
);

type LocaleListItem = LocaleInfo & {
    readonly onPress: () => void;
};

type LocaleItemBuilder = (locale: LocaleInfo) => LocaleListItem;

type LocaleListItemInfo = {
    readonly item: LocaleListItem;
};

type SelectedLocaleListItemInfo = {
    readonly section: LocaleInfo & SectionBase<LocaleListItem>;
};

const MenuSectionTitle = (props: { readonly title: JSX.Element }): JSX.Element => (
    <Text style={[textStyles.headlineH5StyleBlackLeft, { marginVertical: 10 } ]}>
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

function createLocaleItemBuilder(onPress: (code: string) => void): LocaleItemBuilder {
    return (locale: LocaleInfo): LocaleListItem => {
        return { ...locale, onPress: (): void => onPress(locale.code) };
    };
}

const LocaleItem = ({ item }: LocaleListItemInfo): JSX.Element => {
    return (
        <TouchableOpacity key={item.code} style={styles.localeListItem} onPress={item.onPress}>
            <Text style={[textStyles.headlineH4StyleBlackLeft, { marginLeft: 31 }]}>{item.label}</Text>
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
            <Text style={[ textStyles.headlineH4StyleBlackLeft, { fontWeight: 'bold' }]}>{section.label}</Text>
        </View>
    );
};

const AboutSection = (props: Props): JSX.Element => (
    <View padder>
        <MenuSectionTitle title={<Trans>ABOUT THE APP</Trans>} />
        <AboutListItems {...props} />
    </View>
);

const AboutListItems = (props: Props): JSX.Element => {
    return (
        <View>
            <AboutItem
                icon={<AboutIcon name='mobile' fontSize={35} marginRight={10}/>}
                text={<Trans>About Arrival Advisor</Trans>}
                onPress={buildOnPressForRoute(props, Routes.About)}
            />
            <AboutItem
                icon={<AboutIcon name='file' fontSize={20} marginRight={7}/>}
                text={<Trans>Disclaimer</Trans>}
                onPress={buildOnPressForRoute(props, Routes.Disclaimer)}
            />
            <AboutItem
                icon={<AboutIcon name='lock' fontSize={30} marginRight={5}/>}
                text={<Trans>Privacy policy</Trans>}
                onPress={buildOnPressForURL('https://peacegeeks.org/privacy')}
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
            <Icon
                name={I18nManager.isRTL ? 'arrow-back' : 'arrow-forward'}
                style={{
                    fontSize: values.smallIconSize,
                }}
            />
        </TouchableOpacity>
    );

const buildOnPressForRoute = (props: Props, route: Routes): () => void => (
    (): void => {
        props.closeMenu(); // tslint:disable-line:no-expression-statement
        goToRouteWithoutParameter(route, props.history)(); // tslint:disable-line:no-expression-statement
    }
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
