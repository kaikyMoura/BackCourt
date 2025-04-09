import { ApiResponse } from "@/types/ApiResponse";
import { ErrorResponse } from "@/types/ErrorReponse";
import axios, { AxiosError } from "axios";
import api from "..";
import { Team } from "@/types/Team";

export const get_teams = async (team_name?: string, limit?: number, page?: number, pageSize?: number): Promise<ApiResponse<Team[]>> => {
    const params = new URLSearchParams();

    try {
        if (team_name) params.append("team_name", team_name);
        if (limit) params.append("limit", limit.toString());
        if (page) params.append("page", page.toString());
        if (pageSize) params.append("pageSize", pageSize.toString());

        const response = await api.get(`/teams?${params.toString()}`);
        return {
            success: true,
            data: response.data
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
        error: "Internal server error"
    }
}