import { LocaleWithLabel } from "../../application/locales";

export interface Region {
    readonly code: RegionCode;
    readonly fallback: RegionCode;
}

export enum RegionCode {
    BC = 'bc',
    MB = 'mb',
}

export interface RegionLocaleState {
    readonly region: RegionCode;
    readonly locale: string;
    readonly availableLocales: ReadonlyArray<LocaleWithLabel>;
}
