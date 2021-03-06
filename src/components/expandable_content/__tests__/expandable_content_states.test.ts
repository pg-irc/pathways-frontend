// tslint:disable:no-expression-statement
import { toggleExpandedState, ExpandableContentStates, shouldShowReadMoreButton } from '../expandable_content_states';

describe('toggleExpandedState', () => {

    it('returns doesNotCollapse unchanged', () => {
        expect(toggleExpandedState(ExpandableContentStates.doesNotCollapse)).
            toBe(ExpandableContentStates.doesNotCollapse);
    });

    it('toggles isCollapsed to isExpanded', () => {
        expect(toggleExpandedState(ExpandableContentStates.isCollapsed)).
            toBe(ExpandableContentStates.isExpanded);
    });

    it('toggles isExpanded to isCollapsed', () => {
        expect(toggleExpandedState(ExpandableContentStates.isExpanded)).
            toBe(ExpandableContentStates.isCollapsed);
    });
});

describe('the expand button', () => {
    it('does not appear when expansion is disabled', () => {
        expect(shouldShowReadMoreButton(ExpandableContentStates.doesNotCollapse)).toBeFalsy();
    });

    it('appears when expandable component is collapsed', () => {
        expect(shouldShowReadMoreButton(ExpandableContentStates.isCollapsed)).toBeTruthy();
    });

    it('appears when expandable component is expanded', () => {
        expect(shouldShowReadMoreButton(ExpandableContentStates.isExpanded)).toBeTruthy();
    });
});
