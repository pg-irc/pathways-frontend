// tslint:disable:no-expression-statement
import { getTaskState, TaskStates } from '../task_states';

describe('getTaskState tests', () => {

    describe('state.CompletedInPlan value returned', () => {

        it('when in plan and completed', () => {
            const taskStatus = {inPlan: true, completed: true};
            expect(getTaskState(taskStatus)).toBe(TaskStates.CompletedInPlan);
        });
    });

    describe('state.CompletedNotInPlan value returned', () => {

        it('when not in plan and completed', () => {
            const taskStatus = {inPlan: false, completed: true};
            expect(getTaskState(taskStatus)).toBe(TaskStates.CompletedNotInPlan);
        });
    });

    describe('state.InProgress value returned', () => {

        it('when in plan and not completed', () => {
            const taskStatus = {inPlan: true, completed: false};
            expect(getTaskState(taskStatus)).toBe(TaskStates.InProgress);
        });
    });

    describe('state.Available value returned', () => {

        it('when not in plan and not completed', () => {
            const taskStatus = {inPlan: false, completed: false};
            expect(getTaskState(taskStatus)).toBe(TaskStates.Available);
        });

    });
});