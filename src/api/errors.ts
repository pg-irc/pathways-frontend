// tslint:disable:no-class no-expression-statement no-this
export class APIError extends Error {
    constructor(m: string) {
        super(m);
        Object.setPrototypeOf(this, APIError.prototype);
    }
}