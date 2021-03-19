export interface Province {
    readonly code: ProvinceCode;
    readonly fallback: ProvinceCode;
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

export enum ProvinceCode {
    BC = 'bc',
    MB = 'mb',
}