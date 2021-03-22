// tslint:disable:no-expression-statement readonly-keyword
import React from 'react';
import { Dimensions, Image, ImageBackground, View } from 'react-native';
import { Text, Form, Button, Picker, Item, Icon } from 'native-base';
import { Trans } from '@lingui/react';
import { LocaleInfo, Locale } from '../../locale';
import { ResetLocaleAction, SaveLocaleRequestAction } from '../../stores/locale/actions';
import { Routes, goToRouteWithoutParameter } from '../../application/routing';
import { applicationStyles, colors, textStyles, getBoldFontStylesForOS } from '../../application/styles';
import { arrivalAdvisorLogo, landingPhoto, peacegeeksLogo } from '../../application/images';
import { History } from 'history';
import { needsTextDirectionChange } from '../../locale/effects';
import { EmptyComponent } from '../empty_component/empty_component';
import { RegionCode } from '../../validation/region/types';
import { SaveRegionAction } from '../../stores/user_profile';

export interface WelcomeProps {
    readonly currentLocale: Locale;
    readonly currentRegion: RegionCode;
    readonly availableLocales: ReadonlyArray<LocaleInfo>;
    readonly showOnboarding: boolean;
    readonly history: History;
}

export interface WelcomeActions {
    readonly setLocale: (localeCode: string, flipOrientation: boolean) => SaveLocaleRequestAction;
    readonly resetLocale: () => ResetLocaleAction;
    readonly saveRegion: (regionCode: RegionCode) => SaveRegionAction;
}

type Props = WelcomeProps & WelcomeActions;

export function WelcomeComponent(props: Props): JSX.Element {
    const arrivalAdvisorLogoSize = Dimensions.get('screen').width / 2.15;

    const handleLocaleChange = (localeCode: string): void => {
        const flipOrientation = needsTextDirectionChange(localeCode);
        if (localeCode !== props.currentLocale.code || flipOrientation) {
            props.setLocale(localeCode, flipOrientation);
        }
    };

    const handleRegionChange = (regionCode: RegionCode): void => {
        props.saveRegion(regionCode);
        props.resetLocale();
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
                    <Item style={applicationStyles.pickerItem}>
                        <Picker
                            mode='dropdown'
                            placeholder='Select province'
                            selectedValue={props.currentRegion}
                            placeholderStyle={[getBoldFontStylesForOS(), { color: colors.teal }]}
                            onValueChange={handleRegionChange}
                            style={applicationStyles.picker}
                            iosIcon={<Icon name='keyboard-arrow-down' type='MaterialIcons' />}
                        >
                            <Picker.Item key='' label='Select province' value='Select Region' />
                            <Picker.Item key='bc' label='British Columbia' value={RegionCode.BC} />
                            <Picker.Item key='mb' label='Manitoba' value={RegionCode.MB} />
                        </Picker>
                    </Item>
                    <Item style={applicationStyles.pickerItem}>
                        <Picker
                            mode='dropdown'
                            placeholder='Select language'
                            selectedValue={props.currentLocale.code}
                            placeholderStyle={[getBoldFontStylesForOS(), { color: colors.teal }]}
                            onValueChange={handleLocaleChange}
                            style={applicationStyles.picker}
                            enabled={props.currentRegion ? true : false}
                            iosIcon={<Icon name='keyboard-arrow-down' type='MaterialIcons' />}
                        >
                            {props.availableLocales.map((locale: LocaleInfo) => (
                                <Picker.Item key={locale.code} label={locale.label} value={locale.code} />
                            ))}
                        </Picker>
                    </Item>
                </Form>
                <View>
                    <StartButton {...props} />
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

const StartButton = (props: Props): JSX.Element => {
    if (props.currentRegion && props.currentLocale.code) {
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

const onStartButtonPress = (props: Props): void => {
    if (props.showOnboarding) {
        return goToRouteWithoutParameter(Routes.Onboarding, props.history);
    }
    return goToRouteWithoutParameter(Routes.RecommendedTopics, props.history);
};
