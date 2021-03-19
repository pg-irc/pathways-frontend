export interface Region {
    readonly code: RegionCode;
    readonly fallback: RegionCode;
}

export interface LocalizedText {
    readonly [regionCode: string]: string;
}

export interface ReactI18n {
    _(str: string): string;
}

export interface ReactI18nRenderProp {
    readonly i18n: ReactI18n;
}

export enum RegionCode {
    BC = 'bc',
    MB = 'mb',
}