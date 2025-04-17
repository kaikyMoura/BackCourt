import { PlayerCareerStatsList } from "./PlayerStatsList";

export type PlayerCareerStatsResponse = {
  season_type: string,
  totals?: PlayerCareerStatsList[]
  seasons?: PlayerCareerStatsList[]
};
