export type CatalogsMap = { readonly [localeCode: string]: object };

export type Catalog = { readonly [message: string]: string };

export type LocaleCode = string;

export interface LocaleWithLabel {
    readonly code: string;
    readonly label: string;
}

export interface LocaleInfoWithCatalog {
    readonly code: string;
    readonly label: string;
    readonly catalog: object;
}

export interface LocalizedText {
    readonly [localeCode: string]: string;
}

export interface ReactI18n {
    _(str: string): string;
}

export interface ReactI18nRenderProp {
    readonly i18n: ReactI18n;
}
