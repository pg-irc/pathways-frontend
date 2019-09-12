// tslint:disable:typedef no-expression-statement no-any
import { useRef, useEffect } from 'react';
import * as R from 'ramda';

const DEBUG = false;

export const debug = (s: string): void => {
    if (DEBUG) {
        console.log(s);
    }
};

interface HasOldProps {
    // tslint:disable-next-line:readonly-keyword
    current: { readonly [name: string]: any };
}

export const useTraceUpdate = (name: string, props: any): void => {
    const prevAsUnknown = useRef({ current: props }) as unknown;
    const prev = prevAsUnknown as HasOldProps;
    useEffect(() => {
        const changedProps = Object.entries(props).reduce(reducer(prev), {});
        printPropsIfAny(name, changedProps);
        prev.current = props;
    });
};

const reducer = R.curry((reference: HasOldProps, accumulator: any, [key, newValue]: [string, any]) => {
    const oldValue = reference.current[key];
    if (oldValue !== newValue) {
        accumulator[key] = [oldValue, newValue];
    }
    return accumulator;
});

const printPropsIfAny = (componentName: string, changedProps: object): void => {
    if (Object.keys(changedProps).length > 0) {
        console.log(`\n${componentName}: changed props: ${JSON.stringify(changedProps).substring(0, 100)}`);
    }
};
