export enum ExpandableTextStates {
    isNotExpandable,
    isExpandableAndCollapsed,
    isExpandableAndExpanded,
}

export const getNextExpandableTextState = (currentState: ExpandableTextStates): ExpandableTextStates => {
    if (currentState === ExpandableTextStates.isNotExpandable) {
        return ExpandableTextStates.isExpandableAndCollapsed;
    }
    if (currentState === ExpandableTextStates.isExpandableAndCollapsed) {
        return ExpandableTextStates.isExpandableAndExpanded;
    }
    if (currentState === ExpandableTextStates.isExpandableAndExpanded) {
        return ExpandableTextStates.isExpandableAndCollapsed;
    }
    return ExpandableTextStates.isNotExpandable;
};
