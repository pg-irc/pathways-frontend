// tslint:disable:no-expression-statement readonly-keyword
import React from 'react';
import { Dimensions } from 'react-native';
import { Text, Form, Item, Picker, Icon, View, Button } from 'native-base';
import { Trans } from '@lingui/react';
import { LocaleInfo, Locale } from '../../locale';
import { SetLocale } from '../../stores/locale';
import { RouterProps, Routes, goToRouteWithoutParameter } from '../../application/routing';
import { colors, applicationStyles } from '../../application/styles';

export interface WelcomeProps {
    readonly currentLocale: Locale;
    readonly availableLocales: ReadonlyArray<LocaleInfo>;
}

export interface WelcomeActions {
    readonly setLocale: (localeCode: string) => SetLocale.Request;
}

export function Welcome(props: I18nProps & WelcomeProps & WelcomeActions & RouterProps): JSX.Element {
    const screenWidth = Dimensions.get('screen').width;
    const languagePickerWidth = Math.round(screenWidth / 1.25);
    return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 20,
            backgroundColor: colors.darkBlueGrey,
        }}>
            <Text style={{ fontWeight: 'bold', fontSize: 22, color: colors.white }}>
                <Trans>Welcome to</Trans>
            </Text>
            <Text style={{ fontWeight: 'bold', fontSize: 32, color: colors.white, marginBottom: 10 }}>
                <Trans>Arrival Advisor</Trans>
            </Text>
            <Text style={{ textAlign: 'center', color: colors.white, marginBottom: 40 }}>
                <Trans>For newcomers to Canada. Helping you start your new life in Canada, every step of the way.</Trans>
            </Text>
            <Form style={{ marginBottom: 20, justifyContent: 'center' }}>
                <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 15, color: colors.white, marginBottom: 10 }}>
                    <Trans>Select your language</Trans>
                </Text>
                <Item style={{ marginLeft: 0, borderColor: 'transparent', justifyContent: 'center' }}>
                    <Picker
                        mode='dropdown'
                        iosIcon={<Icon name='ios-arrow-down-outline' />}
                        selectedValue={props.currentLocale.code}
                        onValueChange={props.setLocale}
                        style={{ backgroundColor: colors.lightGrey }}
                    >
                        {props.availableLocales.map((locale: LocaleInfo) => (
                            <Picker.Item key={locale.code} label={locale.label} value={locale.code} />
                        ))}
                    </Picker>
                </Item>
            </Form>
            <View>
                <Button
                    full
                    onPress={goToRouteWithoutParameter(Routes.Home, props.history)}
                    style={[
                        applicationStyles.roundedButton,
                        { width: languagePickerWidth },
                    ]}
                >
                    <Text style={{ fontWeight: 'bold' }}>
                        <Trans>Get started</Trans>
                    </Text>
                </Button>
            </View>
        </View>
    );
}