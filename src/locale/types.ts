// tslint:disable:no-class readonly-keyword
export type CatalogsMap = { readonly [localeCode: string]: object };

export type Catalog = { readonly [message: string]: object };

export interface LocaleInfo {
    readonly code: string;
    readonly label: string;
}

export interface LocaleInfoWithCatalog extends LocaleInfo {
    readonly catalog: object;
}

export interface Locale {
    readonly code: string;
    readonly fallback: string;
}

export interface LocalizedText {
    readonly [localeCode: string]: string;
}

export class I18nRenderProp {
    _(str: string): string {
        return str;
    }
}