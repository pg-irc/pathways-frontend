declare type ScrollViewRef = {
    readonly _root: {
        readonly scrollIntoView: (element: JSX.Element) => void,
        readonly scrollToPosition: (x: number, y: number, animated: boolean) => void,
    };
};
