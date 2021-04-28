import { LocaleWithLabel } from "../../application/locales";

export interface Region {
    readonly code: RegionCode;
    readonly fallback: RegionCode;
}

export enum RegionCode {
    BC = 'bc',
    MB = 'mb',
}

export interface RegionLocaleMap {
    readonly region: RegionCode;
    readonly availableLocales: ReadonlyArray<LocaleWithLabel>;
}

export type SelectProvinceAction =
    | { readonly type: RegionCode.BC }
    | { readonly type: RegionCode.MB }
    | { readonly type: undefined };