import { PlayerStats } from "./PlayerStats"

export type PlayerAdvancedStats = {
    player_id: number,
    dataset: string,
    per_mode: string,
    season: string,
    season_type: string,
    stats: PlayerStats[]
}