import { ErrorResponse } from './../../model/ErrorReponse';
import { Task } from "@/model/Task";
import { TaskStatus } from "@/model/TaskStatus";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/model/ApiResponse";
import api from '..';

export const createTask = async (task: Task): Promise<ApiResponse<unknown>> => {
    try {
        const response = await api.post('/task/create', task)
        return {
            success: true,
            message: response.data.data
        }
    } catch (err) {
        if (axios.isAxiosError(err)) {
            const axiosError = err as AxiosError<ErrorResponse>;
            if (axiosError.response) {
                return {
                    success: false,
                    error: axiosError.response.data.details
                };
            }
        }
    }
    return {
        error: "Erro interno no servidor"
    }
}

export const fetchUserTasks = async (user_id: string): Promise<ApiResponse<Task[]>> => {
    try {
        const response = await api.post(`/task/list/${user_id}`)
        return {
            success: true,
            message: response.data.data
        }
    } catch (err) {
        if (axios.isAxiosError(err)) {
            const axiosError = err as AxiosError<ErrorResponse>;
            if (axiosError.response) {
                return {
                    success: false,
                    error: axiosError.response.data.details
                };
            }
        }
    }
    return {
        error: "Erro interno no servidor"
    }
}
export const filterByTaskStatus = async (user_id: string, status: TaskStatus): Promise<ApiResponse<Task[]>> => {
    try {
        const response = await api.post(`/task/list/${user_id}`)
        response.data.filter((task: Task) => task.status === status).toArray()
        return {
            success: true,
            data: response.data.data
        }
    } catch (err) {
        if (axios.isAxiosError(err)) {
            const axiosError = err as AxiosError<ErrorResponse>;
            if (axiosError.response) {
                return {
                    success: false,
                    error: axiosError.response.data.details
                };
            }
        }
    }
    return {
        error: "Erro interno no servidor"
    }
}