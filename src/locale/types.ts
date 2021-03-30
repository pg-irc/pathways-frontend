export type CatalogsMap = { readonly [localeCode: string]: object };

export type Catalog = { readonly [message: string]: object };

// TODO remove this type, just use string and have a getter function
// for looking up the label for a given code
export interface LocaleInfo {
    readonly code: string;
    readonly label: string;
}

// TODO remove this type
export interface LocaleInfoWithCatalog extends LocaleInfo {
    readonly catalog: object;
}

// TODO remove this type, just use string. Definitely get rid of the logic around fallback
export interface Locale {
    readonly code: string;
    readonly fallback: string;
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
