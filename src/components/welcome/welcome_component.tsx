// tslint:disable:no-expression-statement readonly-keyword
import React from 'react';
import { Dimensions, Image, ImageBackground, View } from 'react-native';
import { Text, Form, Button } from 'native-base';
import { Trans } from '@lingui/react';
import { LocaleInfo, Locale } from '../../locale';
import { SaveLocaleRequestAction } from '../../stores/locale/actions';
import { Routes, goToRouteWithoutParameter } from '../../application/routing';
import { applicationStyles, colors, textStyles } from '../../application/styles';
import { arrivalAdvisorLogo, landingPhoto, peacegeeksLogo } from '../../application/images';
import { History } from 'history';
import { needsTextDirectionChange } from '../../locale/effects';
import { Picker } from '@react-native-picker/picker';

export interface WelcomeProps {
    readonly currentLocale: Locale;
    readonly availableLocales: ReadonlyArray<LocaleInfo>;
    readonly showOnboarding: boolean;
    readonly history: History;
}

export interface WelcomeActions {
    readonly setLocale: (localeCode: string, flipOrientation: boolean) => SaveLocaleRequestAction;
}

type Props = WelcomeProps & WelcomeActions;

export function WelcomeComponent(props: Props): JSX.Element {
    const arrivalAdvisorLogoSize = Dimensions.get('screen').width / 2.15;

    const handleChange = (localeCode: string): void => {
        const flipOrientation = needsTextDirectionChange(localeCode);
        if (localeCode !== props.currentLocale.code || flipOrientation) {
            props.setLocale(localeCode, flipOrientation);
        }
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
                <Text style={[textStyles.paragraphStyleWhiteCenter, { marginBottom: 30 }]}>
                    <Trans>Settling in Canada is now easier.</Trans>
                </Text>
                <Form style={{ marginBottom: 20, justifyContent: 'center' }}>
                    <Text style={[textStyles.paragraphBoldWhiteLeft, { marginBottom: 10 }]}>
                        <Trans>Select your language</Trans>
                    </Text>
                    <Picker
                        mode='dropdown'
                        selectedValue={props.currentLocale.code}
                        onValueChange={handleChange}
                        style={{ marginLeft: 0, borderColor: 'transparent', justifyContent: 'center', backgroundColor: colors.white }}
                    >
                        {props.availableLocales.map((locale: LocaleInfo) => (
                            <Picker.Item key={locale.code} label={locale.label} value={locale.code} />
                        ))}
                    </Picker>
                </Form>
                <View>
                    <Button
                        full
                        onPress={onStartButtonPress(props)}
                        style={[applicationStyles.tealButton, { paddingHorizontal: 20 }]}
                    >
                        <Text style={textStyles.button}>
                            <Trans>Start</Trans>
                        </Text>
                    </Button>
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
                        height: 45,
                        marginTop: 10,
                        marginBottom: 20,
                    }}
                />
            </View>
        </ImageBackground>
    );
}

const onStartButtonPress = (props: Props): () => void => {
    if (props.showOnboarding) {
        return goToRouteWithoutParameter(Routes.Onboarding, props.history);
    }
    return goToRouteWithoutParameter(Routes.RecommendedTopics, props.history);
};
