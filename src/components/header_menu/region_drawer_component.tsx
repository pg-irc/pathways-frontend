// tslint:disable: no-expression-statement
import React from 'react';
import { View, Header, Title, Icon, Text } from 'native-base';
import { applicationStyles, colors, textStyles } from '../../application/styles';
import { getStatusBarHeightForPlatform } from '../main/get_status_bar_height_for_platform';
import { Alert, AlertButton, I18nManager, TouchableOpacity } from 'react-native';
import { Trans, I18n } from '@lingui/react';
import { CloseRegionDrawerAction } from '../../stores/user_experience/actions';
import { RegionCode, regionCodeToLabel } from '../../validation/region/types';
import { SaveRegionAction } from '../../stores/user_profile';
import * as R from 'ramda';
import { LocaleCode, ReactI18n, ReactI18nRenderProp } from '../../application/locales';
import { SaveLocaleRequestAction } from '../../stores/locale/actions';
import { isRTL } from '../../application/locale_effects';

export interface RegionDrawerProps {
    readonly currentLocale: LocaleCode;
    readonly currentRegion: RegionCode;
}

export interface RegionDrawerActions {
    readonly closeRegionDrawer: () => CloseRegionDrawerAction;
    readonly saveLocale: (localeCode: string, flipOrientation: boolean) => SaveLocaleRequestAction;
    readonly saveRegion: (region: RegionCode) => SaveRegionAction;
}

type Props = RegionDrawerProps & RegionDrawerActions;

export const RegionDrawerComponent = (props: Props): JSX.Element => (
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
            <TouchableOpacity onPress={props.closeRegionDrawer} style={{ padding: 15 }} >
                <Icon name={I18nManager.isRTL ? 'arrow-forward' : 'arrow-back'} style={{ color: colors.white }} />
            </TouchableOpacity >
            <Title style={textStyles.headlineH3StyleWhiteCenter}><Trans>SELECT YOUR REGION</Trans></Title>
        </Header>
        <RegionSection {...props} />
    </View>
);

const RegionSection = (props: Props): JSX.Element => {
    const otherRegion = props.currentRegion === RegionCode.BC ? RegionCode.MB : RegionCode.BC;
    return (
        <View>
            <SelectedRegionItem currentRegion={props.currentRegion} />
            <OtherRegion
                otherRegion={otherRegion}
                {...props} />
        </View>
    );
};

const SelectedRegionItem = (props: { readonly currentRegion: RegionCode }): JSX.Element => (
    <View key={props.currentRegion} style={applicationStyles.listItem}>
        <View style={{ marginLeft: 12, marginRight: 7 }}>
            <Icon
                name='check'
                type='FontAwesome'
                style={{ fontSize: 22, color: colors.teal, marginHorizontal: -2, marginVertical: -2 }}
            />
        </View>
        <Text style={[textStyles.headlineH4StyleBlackLeft, { fontWeight: 'bold', marginLeft: 12 }]}>
            {regionCodeToLabel(props.currentRegion)}
        </Text>
    </View>
);

const OtherRegion = (props: Props & { readonly otherRegion: RegionCode }): JSX.Element => {
    const defaultLocale = 'en';
    const unsupportedLanguageAlert = (i18n: ReactI18n,
        setLocale: (locale: LocaleCode, flipOrientation: boolean) => SaveLocaleRequestAction): void => {

        const onContinue = (): void => {
            setLocale(defaultLocale, I18nManager.isRTL !== isRTL(defaultLocale));
            props.saveRegion(props.otherRegion);
        };

        const _ = i18n._.bind(i18n);
        const heading = 'Language not available';
        const message = 'Information about Manitoba is only available in English';
        const cancelOption = 'Cancel';
        const languageOption = 'Continue';
        // tslint:disable-next-line: readonly-array
        const buttons: AlertButton[] = [
            { text: _(cancelOption), style: 'cancel' },
            { text: _(languageOption), onPress: (): void => onContinue() },
        ];
        // tslint:disable-next-line:no-expression-statement
        Alert.alert(_(heading), _(message),
            I18nManager.isRTL ? R.reverse(buttons) : buttons,
        );
    };
    const onRegionPress = (i18nRenderProp: ReactI18nRenderProp): void => {
        if (props.otherRegion === RegionCode.MB && props.currentLocale !== defaultLocale) {
            unsupportedLanguageAlert(i18nRenderProp.i18n, props.saveLocale);
        } else {
            props.saveRegion(props.otherRegion);
        }
        props.closeRegionDrawer();
    };

    return (
        <I18n>
            {(i18nRenderProp: ReactI18nRenderProp): JSX.Element => (
                <TouchableOpacity key={props.otherRegion} style={applicationStyles.listItem} onPress={(): void => onRegionPress(i18nRenderProp)}>
                    <Text style={[textStyles.headlineH4StyleBlackLeft, { marginLeft: 50 }]}>{regionCodeToLabel(props.otherRegion)}</Text>
                </TouchableOpacity>
            )}
        </I18n>

    );
};