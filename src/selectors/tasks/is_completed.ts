import { Task } from '../../stores/tasks';

export const isCompleted = (task: Task): boolean => task.completed;
