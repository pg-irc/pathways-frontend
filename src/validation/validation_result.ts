export interface ValidationResult<T> {
    readonly isValid: boolean;
    readonly validData?: ReadonlyArray<T>;
    readonly errors?: string;
}
