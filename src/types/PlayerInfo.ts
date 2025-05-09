export type PlayerInfo = {
    person_id?: number;
    first_name?: string;
    last_name?: string;
    display_first_last?: string;
    display_last_comma_first?: string;
    display_fi_last?: string;
    player_slug?: string;
    birthdate?: string;
    school?: string;
    country?: string;
    last_affiliation?: string;
    height?: string;
    weight?: string | number;
    season_exp?: number;
    jersey?: string;
    position?: string;
    rosterstatus?: string;
    games_played_current_season_flag?: 'Y' | 'N';
    team_id?: number;
    team_name?: string;
    team_abbreviation?: string;
    team_code?: string;
    team_city?: string;
    playercode?: string;
    from_year?: number;
    to_year?: number;
    dleague_flag?: 'Y' | 'N';
    nba_flag?: 'Y' | 'N';
    games_played_flag?: 'Y' | 'N';
    draft_year?: string;
    draft_round?: string;
    draft_number?: string;
    greatest_75_flag?: 'Y' | 'N';
}