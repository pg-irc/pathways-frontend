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

export const useTraceUpdate = (componentName: string, newProps: any): void => {
    const oldPropsAsUnknown = useRef({ current: newProps }) as unknown;
    const oldProps = oldPropsAsUnknown as HasOldProps;
    useEffect(() => {
        const changedProps = Object.entries(newProps).reduce(getChangedProps(oldProps), {});
        printPropsIfAny(componentName, changedProps);
        oldProps.current = newProps;
    });
};

const getChangedProps = R.curry((oldProps: HasOldProps, accumulator: any, [key, newValue]: [string, any]) => {
    const oldValue = oldProps.current[key];
    if (oldValue !== newValue) {
        accumulator[key] = [oldValue, newValue];
    }
    return accumulator;
});

const printPropsIfAny = (componentName: string, changedProps: object): void => {
    const propsHaveChanged = Object.keys(changedProps).length > 0;
    if (DEBUG && propsHaveChanged) {
        console.log(`\n${componentName}: changed props: ${JSON.stringify(changedProps).substring(0, 100)}`);
    }
};
