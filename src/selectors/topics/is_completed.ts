import { Task } from '../../stores/topics';

export const isCompleted = (task: Task): boolean => task.completed;
