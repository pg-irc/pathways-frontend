export const isServiceDetailStringEmpty = (serviceDetail: string): boolean => (
    !serviceDetail || serviceDetail === 'N/A'
);

// tslint:disable-next-line: no-any
export const isServiceDetailArrayEmpty = (serviceDetailArray: ReadonlyArray<any>): boolean => (
    !serviceDetailArray.length
);