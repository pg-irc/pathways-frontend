// tslint:disable:no-expression-statement readonly-keyword
import React, { Dispatch, useReducer } from 'react';
import { Dimensions, Image, ImageBackground, View } from 'react-native';
import { Text, Form, Button, Picker, Item, Icon } from 'native-base';
import { Trans } from '@lingui/react';
import { LocaleCode } from '../../application/locales';
import { SaveLocaleRequestAction } from '../../stores/locale/actions';
import { Routes, goToRouteWithoutParameter } from '../../application/routing';
import { applicationStyles, colors, textStyles, getBoldFontStylesForOS } from '../../application/styles';
import { arrivalAdvisorLogo, landingPhoto, peacegeeksLogo } from '../../application/images';
import { History } from 'history';
import { EmptyComponent } from '../empty_component/empty_component';
import { RegionCode, RegionLocaleMap, SelectRegionAction, SelectLocaleAction } from '../../validation/region/types';
import { SaveRegionAction } from '../../stores/user_profile';
import { LocaleWithLabel } from '../../application/locales';
import * as constants from '../../application/constants';

export interface WelcomeProps {
    readonly currentLocale: LocaleCode;
    readonly currentRegion: RegionCode;
    readonly showOnboarding: boolean;
    readonly history: History;
}

export interface WelcomeActions {
    readonly saveLocale: (localeCode: string, flipOrientation: boolean) => SaveLocaleRequestAction;
    readonly saveRegion: (regionCode: RegionCode) => SaveRegionAction;
}

type Props = WelcomeProps & WelcomeActions;
type SelectRegionLocaleAction = SelectRegionAction | SelectLocaleAction;

export function WelcomeComponent(props: Props): JSX.Element {
    const arrivalAdvisorLogoSize = Dimensions.get('screen').width / 2.15;
    const getAvailableLocales = (region: RegionCode): ReadonlyArray<LocaleWithLabel> => {
        switch (region) {
            case RegionCode.MB:
                return [{ code: 'en', label: 'English' }];
            case RegionCode.BC:
                return [
                    { code: 'en', label: 'English' },
                    { code: 'ar', label: 'عربى' },
                    { code: 'fr', label: 'Français' },
                    { code: 'ko', label: '한국어' },
                    { code: 'pa', label: 'ਪੰਜਾਬੀ' },
                    { code: 'tl', label: 'Tagalog' },
                    { code: 'zh_CN', label: '简体中文' },
                    { code: 'zh_TW', label: '繁體中文' },
                ];
            default:
                return [];
        }
    };

    const reducer = (regionState: RegionLocaleMap, action: SelectRegionLocaleAction): RegionLocaleMap => {
        switch (action.type) {
            case constants.SELECT_REGION:
                return {
                    ...regionState,
                    region: action.payload.region,
                    locale: undefined,
                    availableLocales: getAvailableLocales(action.payload.region),
                };
            case constants.SELECT_LOCALE:
                return {
                    ...regionState,
                    locale: action.payload.locale,
                };
            default:
                return {
                    ...regionState,
                    region: undefined,
                    availableLocales: [],
                };
        }
    };

    const [selectedRegionState, dispatch]: readonly [RegionLocaleMap, Dispatch<SelectRegionLocaleAction>] = useReducer(
        reducer, { region: undefined, locale: undefined, availableLocales: [] },
    );

    return (
        <ImageBackground
            source={landingPhoto}
            resizeMode={'stretch'}
            style={{
                width: '100%',
                height: '100%',
            }}
        >
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                padding: 20,
            }}>
                <Image
                    source={arrivalAdvisorLogo}
                    resizeMode={'contain'}
                    style={{
                        width: arrivalAdvisorLogoSize,
                        height: arrivalAdvisorLogoSize,
                        marginBottom: 20,
                    }}
                />
                <Text style={[textStyles.paragraphStyleWhiteCenter, { marginBottom: 20 }]}>
                    <Trans>Settling in Canada is now easier.</Trans>
                </Text>
                <Form style={{ marginBottom: 20, justifyContent: 'center' }}>
                    {RegionPicker(selectedRegionState, dispatch)}
                    {LocalePicker(selectedRegionState, dispatch)}
                </Form>
                <View>
                    <StartButton
                        selectedRegionState={selectedRegionState}
                        currentLocale={props.currentLocale}
                        currentRegion={props.currentRegion}
                        showOnboarding={props.showOnboarding}
                        history={props.history}
                        saveLocale={props.saveLocale}
                        saveRegion={props.saveRegion} />
                </View>
            </View>
            <View style={{ justifyContent: 'flex-end', alignItems: 'center' }}>
                <Text style={textStyles.paragraphStyleWhiteleft}>
                    <Trans>Created by</Trans>
                </Text>
                <Image
                    source={peacegeeksLogo}
                    resizeMode={'contain'}
                    style={{
                        height: 46,
                        width: 96,
                        marginTop: 10,
                        marginBottom: 20,
                    }}
                />
            </View>
        </ImageBackground>
    );
}

const RegionPicker = (state: RegionLocaleMap, dispatch: Dispatch<SelectRegionAction>): JSX.Element => {

    return (
        <Item style={applicationStyles.pickerItem}>
            <Picker
                mode='dropdown'
                placeholder='Select province'
                selectedValue={state.region}
                placeholderStyle={[getBoldFontStylesForOS(), { color: colors.teal }]}
                onValueChange={(region: RegionCode): void => dispatch({ type: constants.SELECT_REGION, payload: { region } })}
                style={applicationStyles.picker}
                iosIcon={<Icon name='keyboard-arrow-down' type='MaterialIcons' />}
            >
                <Picker.Item key='' label='Select province' value={false} />
                <Picker.Item key='bc' label='British Columbia' value={RegionCode.BC} />
                <Picker.Item key='mb' label='Manitoba' value={RegionCode.MB} />
            </Picker>
        </Item >
    );
};

const LocalePicker = (state: RegionLocaleMap, dispatch: Dispatch<SelectLocaleAction>): JSX.Element => {
    const placeholder = 'Select language';

    return (
        <Item style={applicationStyles.pickerItem}>
            <Picker
                mode='dropdown'
                placeholder={placeholder}
                selectedValue={state.locale}
                placeholderStyle={[getBoldFontStylesForOS(), { color: colors.teal }]}
                onValueChange={(locale: string): void => dispatch({ type: constants.SELECT_LOCALE, payload: { locale } })}
                style={applicationStyles.picker}
                enabled={state.region ? true : false}
                iosIcon={<Icon name='keyboard-arrow-down' type='MaterialIcons' />}
            >
                <Picker.Item key='' label={placeholder} value={placeholder} />
                {state.availableLocales.map((locale: LocaleWithLabel): JSX.Element => (
                    <Picker.Item key={locale.code} label={locale.label} value={locale.code} />
                ))}
            </Picker>
        </Item>
    );
};

export interface StartButtonProps {
    readonly currentLocale: LocaleCode;
    readonly selectedRegionState: RegionLocaleMap;
    readonly currentRegion: RegionCode;
    readonly showOnboarding: boolean;
    readonly history: History;
    readonly saveLocale: (localeCode: string, flipOrientation: boolean) => SaveLocaleRequestAction;
    readonly saveRegion: (regionCode: RegionCode) => SaveRegionAction;
}

const StartButton = (props: StartButtonProps): JSX.Element => {
    if (props.selectedRegionState) {
        return (
            <Button
                full
                onPress={(): void => onStartButtonPress(props)}
                style={[applicationStyles.tealButton, { paddingHorizontal: 20 }]}
            >
                <Text style={textStyles.button}>
                    <Trans>Start</Trans>
                </Text>
            </Button>
        );
    }
    return <EmptyComponent />;
};

const onStartButtonPress = (props: StartButtonProps): void => {
    props.saveLocale(props.selectedRegionState.locale, true);
    props.saveRegion(props.selectedRegionState.region);
    if (props.showOnboarding) {
        return goToRouteWithoutParameter(Routes.Onboarding, props.history);
    }
    return goToRouteWithoutParameter(Routes.RecommendedTopics, props.history);
};
