import { I18nProvider as LinguiI18nProvider } from '@lingui/react';

export interface Props {
    readonly catalogs: Catalogs;
    readonly language: string;
}

export interface Actions { }

export const I18nProvider = LinguiI18nProvider;
