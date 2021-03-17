export interface Province {
    readonly code: string;
    readonly fallback: string;
}

export interface LocalizedText {
    readonly [provinceCode: string]: string;
}

export interface ReactI18n {
    _(str: string): string;
}

export interface ReactI18nRenderProp {
    readonly i18n: ReactI18n;
}