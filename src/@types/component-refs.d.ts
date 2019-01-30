interface ScrollToOffsetParams {
    readonly animated: boolean;
    readonly offset: number;
}

declare type FlatListRef = {
    readonly scrollToOffset: (params: ScrollToOffsetParams) => void,
};
