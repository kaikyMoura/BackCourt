import { ApiResponse } from "@/types/ApiResponse";
import { ErrorResponse } from "@/types/ErrorReponse";
import { Player } from "@/types/Player";
import { PlayerAdvancedStats } from "@/types/PlayerAdvancedStats";
import { PlayerAwardDetails } from "@/types/PlayerAwardDetails";
import { PlayerCareerStatsResponse } from "@/types/PlayerCareerStatsResponse";
import { PlayerInfo } from "@/types/PlayerInfo";
import axios, { AxiosError } from "axios";
import api from "..";

const get_players = async (is_active?: boolean | true, player_name?: string, limit?: number, page?: number, pageSize?: number): Promise<ApiResponse<Player[]>> => {
    const params = new URLSearchParams();

    try {
        if (is_active) params.append("is_active", is_active.toString());
        if (player_name) params.append("player_name", player_name);
        if (limit) params.append("limit", limit.toString());
        if (page) params.append("page", page.toString());
        if (pageSize) params.append("pageSize", pageSize.toString());

        const response = await api.get(`/players?${params.toString()}`);
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

const get_player_info = async (player_id?: number, player_name?: string): Promise<ApiResponse<PlayerInfo>> => {
    const params = new URLSearchParams();

    try {
        if (player_id) params.append("player_id", player_id.toString());
        if (player_name) params.append("player_name", player_name);

        const response = await api.get("/players/player/info", { params: params });

        console.log(response.data)
        return {
            success: true,
            data: response.data[0]
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

const get_player_carrer_stats = async (player_id?: number | string,
    season_type?: "Regular Season" | "Post season" | "Playoffs", season?: string, page?: number, pageSize?: number):
    Promise<ApiResponse<PlayerCareerStatsResponse>> => {
    const params = new URLSearchParams();

    try {
        if (season_type) params.append("season_type", season_type.toString())
        if (season) params.append("season", season);
        if (page) params.append("page", page.toString());
        if (pageSize) params.append("pageSize", pageSize.toString());

        const response = await api.get(`players/stats/career/${player_id}`, { params: params });
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

const get_player_awards = async (player_id?: number | string, detailed?: boolean): Promise<ApiResponse<{ sumary: string, details?: PlayerAwardDetails[] }>> => {
    try {

        const response = await api.get(`players/player/awards/${player_id}`, { params: { detailed: detailed } });
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


const get_player_advanced_stats = async (player_id: number | string, dataset:
    "Overall" | "LastNGames" | "DaysRestModified" | "Opponent"
    ,
    per_mode: "Totals" | "Per36" | "PerGame",
    season?: string,
    season_type?: "Regular Season" | "Pre Season" | "Playoffs"): Promise<ApiResponse<PlayerAdvancedStats>> => {
    const params = new URLSearchParams();

    try {
        if (dataset) params.append("dataset", dataset);
        if (per_mode) params.append("per_mode", per_mode);
        if (season) params.append("season", season.toString());
        if (season_type) params.append("season_type", season_type.toString())

        const response = await api.get(`players/stats/advanced/${player_id}`, { params: params });
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

export {
    get_player_advanced_stats, get_player_awards, get_player_carrer_stats, get_player_info, get_players
};

