// tslint:disable:no-expression-statement readonly-keyword
import React from 'react';
import { Dimensions, Image, ImageBackground } from 'react-native';
import { Text, Form, Item, Picker, Icon, View, Button } from 'native-base';
import { Trans } from '@lingui/react';
import { LocaleInfo, Locale } from '../../locale';
import { SetLocale } from '../../stores/locale';
import { Routes, goToRouteWithoutParameter, goToRouteWithParameter } from '../../application/routing';
import { colors, applicationStyles, textStyles } from '../../application/styles';
import { arrivalAdvisorLogo, landingPhoto, peacegeeksLogo } from '../../application/images';
import { History } from 'history';

export interface WelcomeProps {
    readonly currentLocale: Locale;
    readonly availableLocales: ReadonlyArray<LocaleInfo>;
    readonly showOnboarding: boolean;
    readonly history: History;
}

export interface WelcomeActions {
    readonly setLocale: (localeCode: string) => SetLocale.Request;
}

type Props = WelcomeProps & WelcomeActions;

export function WelcomeComponent(props: Props): JSX.Element {
    const arrivalAdvisorLogoSize = Dimensions.get('screen').width / 2.15;
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
                    <Item style={{ marginLeft: 0, borderColor: 'transparent', justifyContent: 'center' }}>
                        <Picker
                            mode='dropdown'
                            iosIcon={<Icon name='ios-arrow-down' />}
                            selectedValue={props.currentLocale.code}
                            onValueChange={props.setLocale}
                            style={{ backgroundColor: colors.white }}
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
        return goToFirstPageOfOnboarding(props.history);
    }
    return goToRecommendedTopics(props.history);
};

const goToFirstPageOfOnboarding = (history: History): () => void => {
    return goToRouteWithParameter(Routes.Onboarding, '0', history);
};

const goToRecommendedTopics = (history: History): () => void => {
    return goToRouteWithoutParameter(Routes.RecommendedTopics, history);
};
