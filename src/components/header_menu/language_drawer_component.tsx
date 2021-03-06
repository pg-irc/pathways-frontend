// tslint:disable: no-expression-statement
import React from 'react';
import { View, Header, Title, Icon } from 'native-base';
import { colors, textStyles, applicationStyles } from '../../application/styles';
import { getStatusBarHeightForPlatform } from '../main/get_status_bar_height_for_platform';
import { I18nManager, SectionList, Text, TouchableOpacity, SectionBase } from 'react-native';
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
    readonly saveLocale: (locale: LocaleCode, flipOrientation: boolean) => void;
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
    <View style={{ flex: 1, backgroundColor: colors.white }}>
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
        <View padder>
            <LanguageAvailabilityDisclaimer region={props.currentRegion} />
            <LocaleSection {...props} />
        </View>
    </View>
);

const LanguageAvailabilityDisclaimer = (props: { readonly region: RegionCode }): JSX.Element => {
    const translatedDisclaimer = props.region === RegionCode.MB ?
        <Trans>Information about Manitoba is available in the following languages:</Trans> :
        <Trans>Information about British Columbia is available in the following languages:</Trans>;
    return <Text style={textStyles.paragraphStyleBrown}>{translatedDisclaimer}</Text>;
};

const LocaleSection = (props: Props): JSX.Element => {
    const localeItemBuilder = createLocaleItem(props.saveLocale, props.updateNotificationToken, props.closeLanguageDrawer);
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
    closeLanguageDrawer: () => CloseLanguageDrawerAction,
    locale: LocaleWithLabel): LocaleListItem => (
    {
        ...locale,
        onPress: (): void => {
            setLocale(locale.code, I18nManager.isRTL !== isRTL(locale.code));
            updateToken();
            closeLanguageDrawer();
        },
    }
),
);

const LocaleItem = (sectionListLocaleItem: SectionListItemInfo): JSX.Element => (
    <TouchableOpacity key={sectionListLocaleItem.item.code} style={applicationStyles.listItem} onPress={sectionListLocaleItem.item.onPress}>
        <Text style={[textStyles.headlineH4StyleBlackLeft, { marginLeft: 50 }]}>{sectionListLocaleItem.item.label}</Text>
    </TouchableOpacity>
);

const SelectedLocaleItem = ({ section }: SelectedLocaleListItemInfo): JSX.Element => {
    return (
        <View key={section.code} style={applicationStyles.listItem}>
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
