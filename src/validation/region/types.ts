export interface Region {
    readonly code: RegionCode;
    readonly fallback: RegionCode;
}

export enum RegionCode {
    BC = 'bc',
    MB = 'mb',
}