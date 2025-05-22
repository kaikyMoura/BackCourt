"use client"
import { get_player_carrer_stats, get_player_info, get_players } from "@/api/services/playersService";
import { useLoading } from "@/contexts/LoadingContext/useLoading";
import { usePlayerGif } from "@/hooks/usePlayerGif";
import { PlayerInfo } from "@/types/PlayerInfo";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { GoInfo } from "react-icons/go";
import Card from "../Card";
import styles from "./PlayerInfoCard.module.scss";
import { PlayerCareerStatsList } from "@/types/PlayerStatsList";
import Link from "next/link";

const PlayerInfoCard = () => {
    const params = useParams()
    const name = decodeURIComponent((params?.player_name as string) ?? '').replace(/_/g, ' ')

    const { setLoading } = useLoading();

    const [playerInfo, setPlayerInfo] = useState<PlayerInfo | null>(null);
    const [playerHeadShot, setPlayerHeadShot] = useState<string>("");
    const [teamLogo, setTeamLogo] = useState<string>("");

    const gifUrl = usePlayerGif(
        `nba ${name} ${playerInfo?.team_code}`,
        `nba ${playerInfo?.team_code} ${name}`,
        `${playerInfo?.team_code} ${playerInfo?.team_city} ${name}`,
        `${playerInfo?.team_code} ${name}`,
        `nba ${name}`,
        `${name}`
    );

    const [seasonStats, setSeasonStats] = useState<PlayerCareerStatsList | null>(null);

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const response = await get_player_info(undefined, name)

            if (response.success) {
                const player = response.data!

                /**
                 * Normalize a string by removing all whitespace and converting to
                 * lowercase. Additionally, all accented characters are converted to
                 * their base character.
                 * @param str The string to normalize
                 * @returns The normalized string
                */
                const normalize = (str: string) =>
                    str.toLowerCase().replace(/\s+/g, "_").normalize("NFD").replace(/[\u0300-\u036f]/g, "");

                const teamLogo = `/${normalize(player.team_city!)}_${normalize(player.team_name!)}_primary.png`;

                console.log(teamLogo)

                const playerHeadShot = `https://cdn.nba.com/headshots/nba/latest/1040x760/${player.person_id}.png`

                setPlayerInfo(player)
                setTeamLogo(teamLogo)
                setPlayerHeadShot(playerHeadShot)

                if (player.person_id) {
                    console.log(player.first_name! + player.last_name!)
                    const player_common = await get_players(undefined, `${player.first_name!} ${player.last_name!}`, undefined, undefined, 10);

                    console.log(player_common.data)

                    const isActive = player_common.data?.[0]?.is_active;
                    console.log(isActive)

                    const season = isActive ? "All" : undefined;
                    const player_season_stats = await get_player_carrer_stats(player.person_id, "Regular Season", season, 1, 25);
                    console.log(player_season_stats.data!.seasons)
                    if (!player_common?.data || !player_season_stats?.data) {
                        console.warn("Not data found.");
                        return;
                    }

                    const seasonData = isActive ? player_season_stats.data.seasons : player_season_stats.data.totals;
                    const lastSeasonStats = isActive
                        ? seasonData![seasonData!.length - 1]
                        : seasonData![0];

                    console.log(lastSeasonStats)
                    setSeasonStats(lastSeasonStats);
                }

                console.log(seasonStats)
            }
        } catch (error) {
            console.error('Error: ', error);
        } finally {
            setLoading(false);
        }
    }, [name, seasonStats, setLoading]);

    useEffect(() => {
        console.log(gifUrl)
        fetchData();
    }, [gifUrl, fetchData]);

    return (
        <Card className={`overflow-hidden transition-all duration-300 ease-in-out`} pages={1}>
            <div className={`relative w-full h-full px-6 py-8 rounded-2xl ${styles.player_card}`}>
                {gifUrl && gifUrl !== null && (
                    <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="absolute top-0 left-0 w-full h-full object-cover z-0"
                        src={gifUrl}
                    />
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10" />

                <div className="relative z-10 flex flex-col">
                    <div className="flex gap-4">
                        <Image
                            src={playerHeadShot || "https://cdn.nba.com/headshots/nba/latest/1040x760/0.png"}
                            alt="player_headshot"
                            width={300}
                            height={300}
                            className={`rounded-lg ${styles.card_player_headshot}`}
                        />

                        <div className="flex w-full gap-2 ml-2 md:flex-col sm:flex-col">
                            <div className="flex flex gap-6 items-center justify-between text-white">
                                <h2 className="font-bold text-4xl">{playerInfo?.first_name} {playerInfo?.last_name}</h2>
                                <div className="flex gap-2 text-lg">
                                    <p>{playerInfo?.position}</p>
                                    <p>|</p>
                                    <p>#{playerInfo?.jersey}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 text-xl">
                                <Link href={`/teams/${playerInfo?.team_name?.replace(/\s+/g, "_").toLowerCase()}`} className="w-16 h-16 rounded-full shadow-md bg-white flex items-center justify-center hover:scale-110 hover:shadow-lg">
                                    <Image
                                        className="w-14 h-14 object-contain"
                                        src={teamLogo || "https://cdn.nba.com/logos/nba/1610612737/primary/L/logo.svg"}
                                        alt="team_logo"
                                        width={64}
                                        height={64}
                                    />
                                </Link>
                                <p className="font-semibold text-lg text-white">{playerInfo?.team_city} {playerInfo?.team_name}</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-6 mt-6">

                        {/* Stats Card */}
                        <div className="flex items-start border border-white/40 rounded-xl px-6 py-4 shadow-md backdrop-blur-sm">
                            <div className="grid grid-cols-3 gap-4 text-sm text-white">
                                <div className="text-center">
                                    <p className="font-semibold text-lg">PPG</p>
                                    <p className="text-base">{seasonStats?.pts_per_game}</p>
                                </div>
                                <div className="text-center">
                                    <p className="font-semibold text-lg">RPG</p>
                                    <p className="text-base">{seasonStats?.reb_per_game}</p>
                                </div>
                                <div className="text-center">
                                    <p className="font-semibold text-lg">APG</p>
                                    <p className="text-base">{seasonStats?.ast_per_game}</p>
                                </div>
                                <div className="text-center">
                                    <p className="font-semibold text-lg">STL</p>
                                    <p className="text-base">{seasonStats?.stl_per_game}</p>
                                </div>
                                <div className="text-center">
                                    <p className="font-semibold text-lg">BLK</p>
                                    <p className="text-base">{seasonStats?.blk_per_game}</p>
                                </div>
                            </div>
                            <GoInfo
                                className="ml-4 mt-1 cursor-pointer"
                                fontSize={22}
                                color="#fff"
                                data-tooltip-id="my-tooltip"
                                data-tooltip-content="This stats is from the last/past season played"
                            />
                        </div>

                        {/* Bio Card */}
                        <div className="flex flex-col gap-4 border border-white/40 rounded-xl px-6 py-4 shadow-md backdrop-blur-sm text-white">
                            <div className="grid sm:grid-cols-3 lg:grid-cols-4 gap-4 text-sm">
                                <div className="text-center">
                                    <p className="font-semibold text-lg">HEIGHT</p>
                                    <p className="text-base">{playerInfo?.height}</p>
                                </div>
                                <div className="text-center">
                                    <p className="font-semibold text-lg">WEIGHT</p>
                                    <p className="text-base">{playerInfo?.weight} lbs</p>
                                </div>
                                <div className="text-center">
                                    <p className="font-semibold text-lg">COUNTRY</p>
                                    <p className="text-base">{playerInfo?.country}</p>
                                </div>
                                <div className="text-center">
                                    <p className="font-semibold text-lg">LAST ATTENDED</p>
                                    <p className="text-base">{playerInfo?.last_affiliation}</p>
                                </div>
                                <div className="text-center">
                                    <p className="font-semibold text-lg">BIRTHDATE</p>
                                    <p className="text-base">
                                        {playerInfo?.birthdate
                                            ? new Intl.DateTimeFormat(navigator.language, {
                                                year: "numeric",
                                                month: "2-digit",
                                                day: "2-digit",
                                            }).format(new Date(playerInfo.birthdate))
                                            : "N/A"}
                                    </p>
                                </div>
                                <div className="text-center">
                                    <p className="font-semibold text-lg">DRAFT</p>
                                    <p className="text-base">
                                        {playerInfo?.draft_year} R{playerInfo?.draft_round} P{playerInfo?.draft_number}
                                    </p>
                                </div>
                                <div className="text-center">
                                    <p className="font-semibold text-lg">SEASONS</p>
                                    <p className="text-base">{playerInfo?.season_exp}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Card >
    )
}

export default PlayerInfoCard;