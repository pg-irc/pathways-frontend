// tslint:disable: no-expression-statement
import React from 'react';
import { View, Header, Title, Icon } from 'native-base';
import { colors, textStyles } from '../../application/styles';
import { getStatusBarHeightForPlatform } from '../main/get_status_bar_height_for_platform';
import { isAndroid } from '../../application/helpers/is_android';
import { I18nManager, SectionList, Text, TouchableOpacity, StyleSheet, SectionBase } from 'react-native';
import { CloseLanguageDrawerAction } from '../../stores/user_experience/actions';
import { LocaleCode, localeCodeToLabel, LocaleWithLabel } from '../../application/locales';
import { RegionCode } from '../../validation/region/types';
import * as R from 'ramda';
import { Trans } from '@lingui/react';
import { isRTL } from '../../application/locale_effects';

export interface LanguageDrawerProps {
    readonly currentLocale: LocaleCode;
    readonly currentRegion: RegionCode;
    readonly otherLocales: ReadonlyArray<LocaleWithLabel>;
}

export interface LanguageDrawerActions {
    readonly setLocale: (locale: LocaleCode, flipOrientation: boolean) => void;
    readonly updateNotificationToken: () => void;
    readonly closeLanguageDrawer: () => CloseLanguageDrawerAction;
}

type LocaleListItem = {
    readonly code: string;
    readonly label: string;
    readonly onPress: () => void;
};
type SelectedLocaleListItemInfo = {
    readonly section: LocaleWithLabel & SectionBase<LocaleListItem>;
};

// TO DO complete rest of these types
export interface SectionListItemInfo {
    readonly item: LocaleListItem;
    readonly index: number;
    readonly section: any;
    readonly separators: any;
}

type Props = LanguageDrawerActions & LanguageDrawerProps;

export const LanguageDrawerComponent = (props: Props): JSX.Element => (
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
            <TouchableOpacity onPress={props.closeLanguageDrawer} style={{ padding: 15 }} >
                <Icon name={I18nManager.isRTL ? 'arrow-forward' : 'arrow-back'} style={{ color: colors.white }} />
            </TouchableOpacity >
            <Title style={textStyles.headlineH3StyleWhiteCenter}><Trans>SELECT YOUR LANGUAGE</Trans></Title>
        </Header>
        <LocaleSection {...props} />
    </View>
);

const LocaleSection = (props: Props): JSX.Element => {
    const localeItemBuilder = createLocaleItem(props.setLocale, props.updateNotificationToken);
    const localeSectionData = {
        code: props.currentLocale,
        label: localeCodeToLabel(props.currentLocale),
        data: R.map(localeItemBuilder, props.otherLocales),
    };
    return (
        <View style={{ backgroundColor: colors.white, marginVertical: 12, marginHorizontal: 10 }}>
            <SectionList
                stickySectionHeadersEnabled={true}
                keyExtractor={(item: LocaleWithLabel): string => item.code}
                sections={[localeSectionData]}
                renderItem={LocaleItem}
                renderSectionHeader={SelectedLocaleItem} />
        </View>
    );
};

const createLocaleItem = R.curry((setLocale: (code: LocaleCode, flipOrientation: boolean) => void,
    updateToken: () => void,
    locale: LocaleWithLabel): LocaleListItem => (
    {
        ...locale,
        onPress: (): void => {
            setLocale(locale.code, I18nManager.isRTL !== isRTL(locale.code));
            updateToken();
        },
    }
),
);

const LocaleItem = (sectionListLocaleItem: SectionListItemInfo): JSX.Element => {
    return (
        <TouchableOpacity key={sectionListLocaleItem.item.code} style={styles.localeListItem} onPress={sectionListLocaleItem.item.onPress}>
            <Text style={[textStyles.headlineH4StyleBlackLeft, { marginLeft: 50 }]}>{sectionListLocaleItem.item.label}</Text>
        </TouchableOpacity>
    );
};

const SelectedLocaleItem = ({ section }: SelectedLocaleListItemInfo): JSX.Element => {
    return (
        <View key={section.code} style={styles.localeListItem}>
            <View style={{ marginLeft: 12, marginRight: 7 }}>
                <Icon
                    name='check'
                    type='FontAwesome'
                    style={{ fontSize: 22, color: colors.teal, marginHorizontal: -2, marginVertical: -2 }}
                />
            </View>
            <Text style={[textStyles.headlineH4StyleBlackLeft, { fontWeight: 'bold', marginLeft: 12 }]}>{section.label}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    localeListItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingLeft: 10,
    },
});

const getViewBackgroundColorForPlatform = (): string => (
    isAndroid() ? colors.teal : colors.white
);