// tslint:disable:no-expression-statement
import { toggleExpandedState, ExpandableTextStates, shouldShowButton } from '../expandable_text_states';

describe('toggleExpandedState', () => {

    it('returns doesNotCollapse unchanged', () => {
        expect(toggleExpandedState(ExpandableTextStates.doesNotCollapse)).
            toBe(ExpandableTextStates.doesNotCollapse);
    });

    it('toggles isCollapsed to isExpanded', () => {
        expect(toggleExpandedState(ExpandableTextStates.isCollapsed)).
            toBe(ExpandableTextStates.isExpanded);
    });

    it('toggles isExpanded to isCollapsed', () => {
        expect(toggleExpandedState(ExpandableTextStates.isExpanded)).
            toBe(ExpandableTextStates.isCollapsed);
    });
});

describe('the expand button', () => {
    it('does not appear when expansion is disabled', () => {
        expect(shouldShowButton(ExpandableTextStates.doesNotCollapse)).toBeFalsy();
    });

    it('appears when expandable component is collapsed', () => {
        expect(shouldShowButton(ExpandableTextStates.isCollapsed)).toBeTruthy();
    });

    it('appears when expandable component is expanded', () => {
        expect(shouldShowButton(ExpandableTextStates.isExpanded)).toBeTruthy();
    });
});
