import { I18nProvider } from '@lingui/react';

export interface Props {
    readonly catalogs: Catalogs;
    readonly language: string;
}

export interface Actions { }

export const MyI18nProvider = I18nProvider;
