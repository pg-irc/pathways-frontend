// tslint:disable:no-expression-statement readonly-keyword
import React, { Dispatch, useReducer } from 'react';
import { Dimensions, Image, View } from 'react-native';
import { Text, Form, Picker, Item, Icon } from 'native-base';
import { Trans } from '@lingui/react';
import { LocaleCode } from '../../application/locales';
import { SaveLocaleRequestAction } from '../../stores/locale/actions';
import { Routes, goToRouteWithoutParameter } from '../../application/routing';
import { applicationStyles, colors, textStyles, getBoldFontStylesForOS } from '../../application/styles';
import { welcomeHeader } from '../../application/images';
import { History } from 'history';
import { EmptyComponent } from '../empty_component/empty_component';
import { RegionCode, RegionLocaleState } from '../../validation/region/types';
import { SaveRegionAction } from '../../stores/user_profile';
import { LocaleWithLabel } from '../../application/locales';
import * as constants from '../../application/constants';
import { needsTextDirectionChange } from '../../application/locale_effects';
import { buildDefaultState, reducer } from './reducer';
import { SelectRegionLocaleAction } from './actions';
import { TouchableOpacity } from 'react-native-gesture-handler';

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
    const [selectedRegionState, dispatch]: readonly [RegionLocaleState, Dispatch<SelectRegionLocaleAction>] = useReducer(
        reducer, buildDefaultState(),
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
            <View style={{
                justifyContent: 'flex-start',
                alignItems: 'center',
                flex: 1,
                flexDirection: 'column',
            }}>
                <Image
                    source={welcomeHeader}
                    resizeMode='contain'
                    style={{
                        width: Dimensions.get('window').width,
                        height: Dimensions.get('window').width * 34 / 36,
                        backgroundColor: '#e1f5ff',
                    }}
                />
                <Text style={[textStyles.paragraphStyleBlackCenter, { marginTop: 20, marginBottom: 32 }]}>
                    <Trans>Settling in Canada is now easier.</Trans>
                </Text>
                <Form style={{ justifyContent: 'center' }}>
                    <LocalePicker
                        state={selectedRegionState}
                        dispatch={dispatch}
                        visible={selectedRegionState.region !== undefined}
                    />
                </Form>
                <RegionSelectView
                    dispatch={dispatch}
                    visible={selectedRegionState.region === undefined}
                />
                <View>
                    <StartButton
                        visible={
                            selectedRegionState.region !== undefined
                            && selectedRegionState.locale !== undefined}
                        onStartButtonPress={onStartButtonPress} />
                </View>
            </View>
    );
}

export interface PickerProps {
    readonly state: RegionLocaleState;
    readonly dispatch: Dispatch<SelectRegionLocaleAction>;
    readonly visible: boolean;
}

const LocalePicker = (props: PickerProps): JSX.Element => {
    const placeholder = 'Select language';
    if (!props.visible) {
        return <EmptyComponent />;
    }
    return (
        <View>
            <Text style={textStyles.headlineH3StyleBlackCenter}><Trans>Select language</Trans></Text>
            <View style={applicationStyles.pickerContainer}>
                <Item style={applicationStyles.pickerItem}>
                    <Picker
                        mode='dropdown'
                        placeholder={placeholder}
                        selectedValue={props.state.locale}
                        placeholderStyle={[getBoldFontStylesForOS(), { color: colors.teal }]}
                        onValueChange={(locale: string): void => onLocaleChange(props.dispatch, locale)}
                        style={applicationStyles.picker}
                        iosIcon={<Icon name='keyboard-arrow-down' type='MaterialIcons' />}
                    >
                        <Picker.Item key='' label={placeholder} value={placeholder} />
                        {props.state.availableLocales.map((locale: LocaleWithLabel): JSX.Element => (
                            <Picker.Item key={locale.code} label={locale.label} value={locale.code} />
                        ))}
                    </Picker>
                </Item>
            </View>
        </View>
    );
};

const onLocaleChange = (dispatch: Dispatch<SelectRegionLocaleAction>, locale: string): void => {
    dispatch({ type: constants.SELECT_LOCALE, payload: { locale } });
};

export interface StartButtonProps {
    readonly visible: boolean;
    readonly onStartButtonPress: () => void;
}

const StartButton = (props: StartButtonProps): JSX.Element => {
    if (props.visible) {
        return (
            <TouchableOpacity
                onPress= {props.onStartButtonPress}
                style= {[applicationStyles.tealButton, { paddingHorizontal: 45, paddingVertical: 14, marginTop: 8}]}
            >
                <Text style={textStyles.welcomeButton}><Trans>Start</Trans></Text>
            </TouchableOpacity>
        );
    }
    return <EmptyComponent />;
};

export interface RegionSelectProps {
    readonly dispatch: Dispatch<SelectRegionLocaleAction>;
    readonly visible: boolean;
}

const RegionSelectView = (props: RegionSelectProps): JSX.Element => {
    if (!props.visible) {
        return (<EmptyComponent />);
    }
    return (
        <View style={{width: '100%', alignItems: 'center'}}>
            <Text style={textStyles.headlineH3StyleBlackCenter}><Trans>Select province</Trans></Text>
            <RegionButton
                text={'British Columbia'}
                setRegion= {(): void => {onRegionPicked(props.dispatch, RegionCode.BC); }}
            />
            <RegionButton
                text={'Manitoba'}
                setRegion= {(): void => {onRegionPicked(props.dispatch, RegionCode.MB); }}
            />
        </View>
    );
};

const RegionButton = (props: {text: string, setRegion: () => void}): JSX.Element => {
    return (
        <View style={{width: '100%', marginTop: 16}}>
            <TouchableOpacity
                onPress= {props.setRegion}
                style= {[applicationStyles.tealButton, {marginHorizontal: 32, paddingVertical: 14}]}
            >
                <Text style={textStyles.welcomeButton}>{props.text}</Text>
            </TouchableOpacity>
        </View>
    );
};

const onRegionPicked = (dispatch: Dispatch<SelectRegionLocaleAction>, region: RegionCode): void => {
    return dispatch({ type: constants.SELECT_REGION, payload: { region } });
};
