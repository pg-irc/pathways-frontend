// tslint:disable:typedef no-expression-statement no-any
import { useRef, useEffect } from 'react';

const DEBUG = true;

export const debug = (s: string): void => {
    if (DEBUG) {
        console.log(s);
    }
};

export const useTraceUpdate = (name: string, props: any): void => {
    const prev = useRef(props);
    useEffect(() => {
        const changedProps = Object.entries(props).reduce((ps: any, [key, v]) => {
            if (prev.current[key] !== v) {
                ps[key] = [prev.current[key], v];
            }
            return ps;
        }, {});
        if (Object.keys(changedProps).length > 0) {
            const ddd = JSON.stringify(changedProps);
            const eee = ddd.substring(0, 100);
            console.log(`\n${name}: changed props: ${eee}`);
        }
        prev.current = props;
    });
};
