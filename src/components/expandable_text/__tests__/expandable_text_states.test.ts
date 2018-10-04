// tslint:disable:no-expression-statement
import { getNextExpandableTextState, ExpandableTextStates } from '../expandable_text_states';

describe('getNextExpandableTextState', () => {

    it('returns isExpandableAndCollapsed from isNotExpandable', () => {
        const currentState = ExpandableTextStates.isNotExpandable;
        const nextState = getNextExpandableTextState(currentState);
        expect(nextState).toBe(ExpandableTextStates.isExpandableAndCollapsed);
    });

    it('returns isExpandableAndExpanded from isExpandableAndCollapsed', () => {
        const currentState = ExpandableTextStates.isExpandableAndCollapsed;
        const nextState = getNextExpandableTextState(currentState);
        expect(nextState).toBe(ExpandableTextStates.isExpandableAndExpanded);
    });

    it('returns isExpandableAndCollapsed from isExpandableAndExpanded', () => {
        const currentState = ExpandableTextStates.isExpandableAndExpanded;
        const nextState = getNextExpandableTextState(currentState);
        expect(nextState).toBe(ExpandableTextStates.isExpandableAndCollapsed);
    });
});