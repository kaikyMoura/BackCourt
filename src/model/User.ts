import { NiceAvatarProps } from "react-nice-avatar";
import { Task } from "./Task";

export type User = {
    id?: number;
    user_name?: string;
    email?: string;
    user_password?: string;
    createdAt?: Date;
    updatedAt?: Date;
    tasks?: Task[];
    user_avatar_options?: NiceAvatarProps | JSON;
}