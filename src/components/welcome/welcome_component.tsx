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
import { RegionCode, RegionLocaleState } from '../../validation/region/types';
import { SaveRegionAction } from '../../stores/user_profile';
import { LocaleWithLabel } from '../../application/locales';
import * as constants from '../../application/constants';
import { needsTextDirectionChange } from '../../application/locale_effects';
import { reducer } from './index';
import { SelectRegionLocaleAction } from './action';

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

export function WelcomeComponent(props: Props): JSX.Element {
    const arrivalAdvisorLogoSize = Dimensions.get('screen').width / 2.15;

    const [selectedRegionState, dispatch]: readonly [RegionLocaleState, Dispatch<SelectRegionLocaleAction>] = useReducer(
        reducer, { region: undefined, locale: undefined, availableLocales: [] },
    );

    const onStartButtonPress = (): void => {
        const flipOrientation = needsTextDirectionChange(selectedRegionState.locale);
        props.saveLocale(selectedRegionState.locale, flipOrientation);
        props.saveRegion(selectedRegionState.region);
        if (props.showOnboarding) {
            return goToRouteWithoutParameter(Routes.Onboarding, props.history);
        }
        return goToRouteWithoutParameter(Routes.RecommendedTopics, props.history);
    };

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
                    <RegionPicker
                        state={selectedRegionState}
                        dispatch={dispatch}
                    />
                    <LocalePicker
                        state={selectedRegionState}
                        dispatch={dispatch}
                    />
                </Form>
                <View>
                    <StartButton
                        state={selectedRegionState}
                        onStartButtonPress={onStartButtonPress} />
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

export interface PickerProps {
    readonly state: RegionLocaleState;
    readonly dispatch: Dispatch<SelectRegionLocaleAction>;
}

const RegionPicker = (props: PickerProps): JSX.Element => {

    return (
        <Item style={applicationStyles.pickerItem}>
            <Picker
                mode='dropdown'
                placeholder='Select province'
                selectedValue={props.state.region}
                placeholderStyle={[getBoldFontStylesForOS(), { color: colors.teal }]}
                onValueChange={(region: RegionCode): void => props.dispatch({ type: constants.SELECT_REGION, payload: { region } })}
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

const LocalePicker = (props: PickerProps): JSX.Element => {
    const placeholder = 'Select language';

    return (
        <Item style={applicationStyles.pickerItem}>
            <Picker
                mode='dropdown'
                placeholder={placeholder}
                selectedValue={props.state.locale}
                placeholderStyle={[getBoldFontStylesForOS(), { color: colors.teal }]}
                onValueChange={(locale: string): void => props.dispatch({ type: constants.SELECT_LOCALE, payload: { locale } })}
                style={applicationStyles.picker}
                enabled={!!props.state.region}
                iosIcon={<Icon name='keyboard-arrow-down' type='MaterialIcons' />}
            >
                <Picker.Item key='' label={placeholder} value={placeholder} />
                {props.state.availableLocales.map((locale: LocaleWithLabel): JSX.Element => (
                    <Picker.Item key={locale.code} label={locale.label} value={locale.code} />
                ))}
            </Picker>
        </Item>
    );
};

export interface StartButtonProps {
    readonly state: RegionLocaleState;
    readonly onStartButtonPress: () => void;
}

const StartButton = (props: StartButtonProps): JSX.Element => {
    if (props.state) {
        return (
            <Button
                full
                onPress={(): void => props.onStartButtonPress()}
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
