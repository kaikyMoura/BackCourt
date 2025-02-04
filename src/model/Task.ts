import { TaskStatus } from "./TaskStatus";
import { TaskPriority } from "./TaskPriority";

export type Task = {
    id?: number;
    title: string;
    description?: string;
    priority: TaskPriority;
    status: TaskStatus;
    dueDate: Date;
    createdAt?: Date;
    updatedAt?: Date;
    userId?: string;
    user?: object;
}