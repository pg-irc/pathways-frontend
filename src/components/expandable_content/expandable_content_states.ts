
export enum ExpandableContentStates {
    doesNotCollapse,
    isCollapsed,
    isExpanded,
}

export const defaultExpandableContentState = ExpandableContentStates.doesNotCollapse;

export const isDefaultState = (currentState: ExpandableContentStates): boolean => (
    currentState === defaultExpandableContentState
);

export const shouldShowButton = (currentState: ExpandableContentStates): boolean => (
    currentState === ExpandableContentStates.isCollapsed ||
    currentState === ExpandableContentStates.isExpanded
);

export const toggleExpandedState = (currentState: ExpandableContentStates): ExpandableContentStates => {
    if (isDefaultState(currentState)) {
        return currentState;
    }

    return currentState === ExpandableContentStates.isCollapsed ?
        ExpandableContentStates.isExpanded :
        ExpandableContentStates.isCollapsed;
};
