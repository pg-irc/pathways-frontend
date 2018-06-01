export type CatalogsMap = {readonly [localeCode: string]: object};

export type Catalog = {readonly [message: string]: object};

export interface Locale {
    readonly code: string;
    readonly label: string;
    readonly catalog: object;
    readonly isRTL: boolean;
}

export interface LocalizedText {
    readonly [localeCode: string]: string;
}