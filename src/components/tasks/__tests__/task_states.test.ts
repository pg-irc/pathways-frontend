// tslint:disable:no-expression-statement
import { getTaskState, TaskStates } from '../task_states';

describe('getTaskState tests', () => {

    describe('state.CompletedInPlan value returned', () => {

        it('when in plan and completed', () => {
            const inPlan = true;
            const completed = true;
            expect(getTaskState(inPlan, completed)).toBe(TaskStates.CompletedInPlan);
        });
    });

    describe('state.CompletedNotInPlan value returned', () => {

        it('when completed and not in plan', () => {
            const inPlan = false;
            const completed = true;
            expect(getTaskState(inPlan, completed)).toBe(TaskStates.CompletedNotInPlan);
        });
    });

    describe('state.InProgress value returned', () => {

        it('when in plan and not completed', () => {
            const inPlan = true;
            const completed = false;
            expect(getTaskState(inPlan, completed)).toBe(TaskStates.InProgress);
        });
    });

    describe('state.Available value returned', () => {

        it('when not in plan and not completed', () => {
            const inPlan = false;
            const completed = false;
            expect(getTaskState(inPlan, completed)).toBe(TaskStates.Available);
        });

    });
});