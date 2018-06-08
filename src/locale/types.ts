export type CatalogsMap = {readonly [localeCode: string]: object};

export type Catalog = {readonly [message: string]: object};

export interface Locale {
    readonly code: string;
    readonly label: string;
    readonly catalog: object;
    readonly isRTL: boolean;
}

export interface LocaleInfo {
    readonly code: string;
    readonly fallback: string;
}

export interface LocalizedText {
    readonly [localeCode: string]: string;
}