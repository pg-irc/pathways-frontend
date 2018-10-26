// tslint:disable:no-expression-statement readonly-keyword
import React from 'react';
import { Dimensions, Image } from 'react-native';
import { Text, Form, Item, Picker, Icon, View, Button } from 'native-base';
import { Trans } from '@lingui/react';
import { LocaleInfo, Locale } from '../../locale';
import { SetLocale } from '../../stores/locale';
import { RouterProps, Routes, goToRouteWithoutParameter } from '../../application/routing';
import { colors, applicationStyles, textStyles } from '../../application/styles';

export interface WelcomeProps {
    readonly currentLocale: Locale;
    readonly availableLocales: ReadonlyArray<LocaleInfo>;
}

export interface WelcomeActions {
    readonly setLocale: (localeCode: string) => SetLocale.Request;
}

// tslint:disable-next-line:no-var-requires
const arrivalAdvisorLogo = require('../../../assets/images/aa_logo.png');

export function Welcome(props: I18nProps & WelcomeProps & WelcomeActions & RouterProps): JSX.Element {
    const screenWidth = Dimensions.get('screen').width;
    return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 20,
            backgroundColor: colors.topaz,
        }}>
            <Image
                source={arrivalAdvisorLogo}
                resizeMode={'contain'}
                style={{
                    width: screenWidth / 2.15,
                    height: screenWidth / 2.15,
                    marginBottom: 20,
                }}
            />
            <Text style={[ textStyles.paragraphStyleWhiteCenter, { marginBottom: 30  } ]}>
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
                    style={[ applicationStyles.orangeButton, { paddingHorizontal: 20 } ]}
                >
                    <Text style={textStyles.orangeButton}>
                        <Trans>Start</Trans>
                    </Text>
                </Button>
            </View>
        </View>
    );
}