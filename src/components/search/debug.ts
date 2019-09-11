// tslint:disable:typedef no-expression-statement no-any
import { useRef, useEffect } from 'react';

const DEBUG = false;

export const debug = (s: string): void => {
    if (DEBUG) {
        console.log(s);
    }
};

export const useTraceUpdate = (name: string, newProps: any): void => {
    // flow control is OK in this hook because DEBUG is a constant
    if (!DEBUG) {
        return;
    }
    const reference = useRef(newProps);
    useEffect(() => {
        const changedProps = Object.entries(newProps).reduce((accumulator: any, [key, newValue]) => {
            if (reference.oldProps[key] !== newValue) {
                accumulator[key] = [reference.oldProps[key], newValue];
            }
            return accumulator;
        }, {});
        if (Object.keys(changedProps).length > 0) {
            console.log(`\n${name}: changed props: ${JSON.stringify(changedProps).substring(0, 100)}`);
        }
        reference.oldProps = newProps;
    });
};
