export type CatalogsMap = { readonly [localeCode: string]: object };

export type Catalog = { readonly [message: string]: object };

export interface LocaleWithLabel {
    readonly code: string;
    readonly label: string;
}

// TODO remove this type
export interface LocaleInfoWithCatalog {
    readonly code: string;
    readonly label: string;
    readonly catalog: object;
}

// TODO remove this type, just use string. Definitely get rid of the logic around fallback
export type LocaleCode = string;

export interface LocalizedText {
    readonly [localeCode: string]: string;
}

export interface ReactI18n {
    _(str: string): string;
}

export interface ReactI18nRenderProp {
    readonly i18n: ReactI18n;
}
