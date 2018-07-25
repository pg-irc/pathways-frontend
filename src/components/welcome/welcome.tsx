// tslint:disable:no-expression-statement readonly-keyword
import React from 'react';
import { Text, Form, Item, Picker, Icon, View, Button } from 'native-base';
import { Image } from 'react-native';
import { Trans } from '@lingui/react';
import { LocaleInfo, Locale } from '../../locale';
import { SetLocale } from '../../stores/locale';
import { RouterProps, Routes, goToRouteWithoutParameter } from '../../application/routing';

export interface WelcomeProps {
    readonly isFirstRun: boolean;
    readonly currentLocale: Locale;
    readonly availableLocales: ReadonlyArray<LocaleInfo>;
}

export interface WelcomeActions {
    readonly setLocale: (localeCode: string) => SetLocale.Request;
}

// @ts-ignore: React Native uses require() to load ImageBitmaps; it's best to do this once, outside of render.
// tslint:disable-next-line:no-var-requires
const logoImg = require('../../../assets/images/icon.png');

export function Welcome(props: I18nProps & WelcomeProps & WelcomeActions & RouterProps): JSX.Element {
    return (
        <View style={[
            {
                flex: 1,
                justifyContent: 'flex-start',
                alignItems: 'center',
                padding: 20,
            },
        ]}>
            <Image
                source={logoImg}
                style={[
                    { flex: 1 },
                    { width: 200, height: 200 },
                    { marginTop: 50, marginBottom: 20 },
                ]} />
            <Text style={[
                { fontWeight: 'bold', fontSize: 32 },
                { marginBottom: 20 },
            ]}><Trans>Arrival Advisor</Trans></Text>
            <Text style={[
                { textAlign: 'center' },
                { marginBottom: 20 },
            ]}>
                <Trans>For immigrants and refugees new to Canada. Arrival Advisor is here
                    to help you start your new life in Canada, every step of the way.</Trans>
            </Text>
            <Form style={[
                { marginBottom: 20 },
            ]}>
                <Text style={[
                    { textAlign: 'left' },
                    { marginBottom: 20 },
                ]}>
                    <Trans>Select your language:</Trans>
                </Text>
                <Item style={{ marginLeft: 0, width: '100%' }}>
                    <Picker
                        mode='dropdown'
                        iosIcon={<Icon name='ios-arrow-down-outline' />}
                        selectedValue={props.currentLocale.code}
                        onValueChange={props.setLocale}>
                        {props.availableLocales.map((locale: LocaleInfo) => (
                            <Picker.Item key={locale.code} label={locale.label} value={locale.code} />
                        ))}
                    </Picker>
                </Item>
            </Form>
            {props.isFirstRun ?
                undefined :
                <Button full onPress={goToRouteWithoutParameter(Routes.Home, props.history)}>
                    <Text><Trans>Get started</Trans></Text>
                </Button>
            }
        </View>
    );
}