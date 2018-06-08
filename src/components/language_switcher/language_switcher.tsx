import React from 'react';
import { View, Text, Button } from 'react-native';
import { Trans } from '@lingui/react';
import { Locale, LocaleInfo } from '../../locale/types';

export interface Props {
    readonly currentLocale: Locale;
    readonly availableLocales: ReadonlyArray<LocaleInfo>;
}

export interface Actions {
    setLocale(locale: string): void;
}

export type LanguageSwitcherProps = Props & Actions;

export const LanguageSwitcher = (props: LanguageSwitcherProps): JSX.Element => {
    const { currentLocale, availableLocales, setLocale }: LanguageSwitcherProps = props;
    return (
        <View>
            <View style={{ alignItems: 'center' }}>
                {availableLocales.map((locale: LocaleInfo) => (
                    <Button key={locale.code}
                            title={locale.label}
                            onPress={(): void => setLocale(locale.code)}
                            disabled={locale.code === currentLocale.code} />
                ))}
            </View>
            <View style={{alignItems: 'flex-start'}}>
                <Text style={{textAlign: 'left'}}>
                    <Trans>This sentence exists to demonstrate the translation functionality that exists in this application.</Trans>
                </Text>
            </View>
        </View>
    );
};