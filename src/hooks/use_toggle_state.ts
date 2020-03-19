import { Dispatch, SetStateAction, useCallback, useState } from 'react';

export interface ToggleStateApi {
    readonly state: boolean;
    readonly on: () => void;
    readonly off: () => void;
    readonly toggle: () => void;
}

export const useToggleState = (initialValue?: boolean): ToggleStateApi => {
    const [state, setState]: readonly[boolean, Dispatch<SetStateAction<boolean>>] = useState<boolean>(initialValue);

    const on = useCallback(
        (): void => setState(true),
        [setState],
    );

    const off = useCallback(
        (): void => setState(false),
        [setState],
    );

    const toggle = useCallback(
        (): void => setState(!state),
        [state, setState],
    );

    return {
        state,
        on,
        off,
        toggle,
    };
};