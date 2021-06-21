// tslint:disable: no-expression-statement
import React from 'react';
import { View, Header, Title, Icon, Text } from 'native-base';
import { applicationStyles, colors, getViewBackgroundColorForPlatform, textStyles } from '../../application/styles';
import { getStatusBarHeightForPlatform } from '../main/get_status_bar_height_for_platform';
import { Alert, AlertButton, I18nManager, TouchableOpacity } from 'react-native';
import { Trans, I18n } from '@lingui/react';
import { CloseRegionDrawerAction, OpenLanguageDrawerAction } from '../../stores/user_experience/actions';
import { RegionCode, regionCodeToLabel } from '../../validation/region/types';
import { SaveRegionAction } from '../../stores/user_profile';
import * as R from 'ramda';
import { ReactI18n, ReactI18nRenderProp } from '../../application/locales';

export interface RegionDrawerProps {
    readonly region: RegionCode;
}

export interface RegionDrawerActions {
    readonly closeRegionDrawer: () => CloseRegionDrawerAction;
    readonly openLanguageDrawer: () => OpenLanguageDrawerAction;
    readonly saveRegion: (region: RegionCode) => SaveRegionAction;
}

type Props = RegionDrawerProps & RegionDrawerActions;

export const RegionDrawerComponent = (props: Props): JSX.Element => (
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
            <TouchableOpacity onPress={props.closeRegionDrawer} style={{ padding: 15 }} >
                <Icon name={I18nManager.isRTL ? 'arrow-forward' : 'arrow-back'} style={{ color: colors.white }} />
            </TouchableOpacity >
            <Title style={textStyles.headlineH3StyleWhiteCenter}><Trans>SELECT YOUR REGION</Trans></Title>
        </Header>
        <RegionSection {...props} />
    </View>
);

const RegionSection = (props: Props): JSX.Element => {
    const otherRegion = props.region === RegionCode.BC ? RegionCode.MB : RegionCode.BC;
    return (
        <View>
            <SelectedRegionItem currentRegion={props.region} />
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
    const unsupportedLanguageAlert = (i18n: ReactI18n, openLanguageDrawer: () => OpenLanguageDrawerAction): void => {
        const _ = i18n._.bind(i18n);
        const heading = 'Language not available';
        const message = 'Information about Manitoba is only available in English and French';
        const cancelOption = 'Cancel';
        const languageOption = 'Select language';
        // tslint:disable-next-line: readonly-array
        const buttons: AlertButton[] = [
            { text: _(cancelOption), style: 'cancel' },
            { text: _(languageOption), onPress: (): OpenLanguageDrawerAction => openLanguageDrawer() },
        ];
        // tslint:disable-next-line:no-expression-statement
        Alert.alert(_(heading), _(message),
            I18nManager.isRTL ? R.reverse(buttons) : buttons,
        );
    };

    return (
        <I18n>
            {(i18nRenderProp: ReactI18nRenderProp): JSX.Element => (
                <TouchableOpacity key={props.otherRegion} style={applicationStyles.listItem} onPress={(): void => unsupportedLanguageAlert(i18nRenderProp.i18n, props.openLanguageDrawer)}>
                    <Text style={[textStyles.headlineH4StyleBlackLeft, { marginLeft: 50 }]}>{regionCodeToLabel(props.otherRegion)}</Text>
                </TouchableOpacity>
            )}
        </I18n>

    );
};