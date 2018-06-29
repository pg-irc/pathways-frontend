// tslint:disable:no-expression-statement readonly-keyword
import React from 'react';
import { Text, Form, Item, Picker, Icon, View, Button } from 'native-base';
import { Image } from 'react-native';
import { Trans } from '@lingui/react';
import { LocaleInfo, Locale } from '../../locale';
import { SetLocale } from '../../stores/locale';

export interface Props {
    readonly isFirstRun: boolean;
    readonly currentLocale: Locale;
    readonly availableLocales: ReadonlyArray<LocaleInfo>;
}

export interface Actions {
    readonly setLocale: (localeCode: string) => SetLocale.Request;
    readonly goToExplore: () => void;
}

// tslint:diable-next-line:no-var-requires
// @ts-ignore: React Native uses require() to load ImageBitmaps; it's best to do this once, outside of render.
const logoImg = require('../../../icon.png');

export function Welcome(props: Props & I18nProps & Actions): JSX.Element {
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
                    { width: 200, height: 200},
                    { marginTop: 50, marginBottom: 20 },
                ]} />
            <Text style={[
                { fontWeight: 'bold', fontSize: 32 },
                { marginBottom: 20 },
            ]}><Trans>Newcomer Connect</Trans></Text>
            <Text style={[
                { textAlign: 'center' },
                { marginBottom: 20 },
            ]}>
                <Trans>Helping you navigate everything you need to settle in Canada, even before you get here</Trans>
            </Text>
            <Form style={[
                { marginBottom: 20 },
            ]}>
                <Item>
                    <Picker
                            mode='dropdown'
                            iosIcon={<Icon name='ios-arrow-down-outline' />}
                            style={{ width: undefined }}
                            placeholder={props.i18n.t`Select your language`}
                            placeholderStyle={{ color: '#bfc6ea' }}
                            placeholderIconColor='#007aff'
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
                <Button full onPress={props.goToExplore}>
                    <Text><Trans>Get started</Trans></Text>
                </Button>
            }
        </View>
    );
}