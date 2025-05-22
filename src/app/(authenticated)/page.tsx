"use client"
import { getArticles } from "@/api/services/articlesService"
import { get_player_carrer_stats, get_player_info, get_players } from "@/api/services/playersService"
import Card from "@/components/Card"
import { useLoading } from "@/contexts/LoadingContext/useLoading"
import { useSearchCountStore } from "@/stores/useSearchCountStore"
import { Article } from "@/types/Article"
import { PlayerInfo } from "@/types/PlayerInfo"
import Image from "next/image"
import Link from "next/link"
import { Suspense, useCallback, useEffect, useState } from "react"
import { FaBasketball } from "react-icons/fa6"
import styles from "./page.module.scss"
import { PlayerCareerStatsList } from "@/types/PlayerStatsList"

const Home = () => {
    const { setLoading } = useLoading();
    const { getTopSearchedPlayers } = useSearchCountStore()

    const [playersInfo, setPlayersInfo] = useState<PlayerInfo[]>([]);
    const [seasonStatsByPlayer, setSeasonStatsByPlayer] = useState<Record<string, PlayerCareerStatsList>>({});
    const [articles, setArticles] = useState<Article[] | undefined>([])

    const fetchData = useCallback(async () => {
        const topRatedPlayers = await getTopSearchedPlayers()
        setLoading(true);
        try {
            for (const topRatedPlayer of topRatedPlayers) {
                const response = await get_player_info(undefined, topRatedPlayer.name)
                setPlayersInfo((prev) => {
                    const alreadyExists = prev?.some(p => p.person_id === response.data!.person_id);
                    if (alreadyExists) return prev;
                    return [...prev, response.data!];
                });

                const playerInfo = response.data!;

                if (playerInfo.person_id) {
                    console.log(`${playerInfo.first_name} ${playerInfo.last_name}`);
                    const playerCommon = await get_players(undefined, `${playerInfo.first_name} ${playerInfo.last_name}`, undefined, undefined, 10);

                    console.log(playerCommon.data);

                    const isActive = playerCommon.data?.[0]?.is_active;
                    console.log(isActive);

                    const season = isActive ? "All" : undefined;
                    const playerSeasonStats = await get_player_carrer_stats(playerInfo.person_id, "Regular Season", season, undefined, 25);
                    console.log(playerSeasonStats.data!.seasons);

                    if (!playerCommon?.data || !playerSeasonStats?.data) {
                        console.warn("No data found.");
                        return;
                    }

                    const seasonData = isActive ? playerSeasonStats.data.seasons : playerSeasonStats.data.totals;
                    const lastSeasonStats = isActive
                        ? seasonData![seasonData!.length - 1]
                        : seasonData![0];

                    console.log(lastSeasonStats);
                    setSeasonStatsByPlayer(prev => ({
                        ...prev,
                        [playerInfo.person_id!.toString()]: {
                            ...lastSeasonStats,
                            player_id: playerInfo.person_id
                        }
                    }));
                }
            }
        } catch (error) {
            console.error('Error: ', error);
        } finally {
            setLoading(false);
        }
    }, [getTopSearchedPlayers, setLoading]);

    const fetchArticles = useCallback(async () => {
        try {
            setLoading(true);
            const response = await getArticles(undefined, undefined, 5, undefined, 5);

            if (response) {
                setLoading(false);

                setArticles((prev) => {
                    const all = [...(prev || []), ...(response.data || [])];
                    const unique = Array.from(new Map(all.map(a => [a.title, a])).values());
                    return unique;
                });
            }
        } catch (err) {
            setLoading(false);
            console.error("Error: " + err);
        }
    }, [setLoading]);

    useEffect(() => {
        fetchArticles();
        fetchData();
    }, [fetchArticles, fetchData]);

    return (
        <>
            <section className={styles.hero_gradient}>
                <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
                    <div className="md:w-1/2 mb-10 md:mb-0">
                        <div className={`flex justify-start gap-2 mb-2`}>
                            <FaBasketball fontSize={32} color="#fff" />
                            <h3 className="flex items-center font-semibold text-xl">BackCourt | NBA Stats & News</h3>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 logo-font">Dominate The Court</h1>
                        <p className="text-xl mb-8">Your ultimate basketball hub for stats, news, and analysis. Stay updated with everything happening in the NBA and beyond.</p>
                        <div className="flex space-x-4">
                            <button className="bg-white text-blue-800 hover:bg-gray-100 px-6 py-3 rounded-lg font-bold transition">
                                Explore Players
                            </button>
                            <button className="bg-transparent border-2 border-white hover:bg-white hover:text-blue-800 px-6 py-3 rounded-lg font-bold transition">
                                Latest News
                            </button>
                        </div>
                    </div>
                </div>
            </section>
            <section className="py-12">
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-3xl font-bold">🔥 Trending Players</h2>
                        <Link href="/players" className="text-blue-600 font-medium hover:text-blue-800">View All Players →</Link>
                    </div>

                    <div className="relative">
                        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {playersInfo?.map((player) => {
                                const playerStats = seasonStatsByPlayer[player.person_id!];

                                const normalize = (str: string) =>
                                    str.toLowerCase().replace(/\s+/g, "_").normalize("NFD").replace(/[\u0300-\u036f]/g, "");

                                const teamLogo = `/${normalize(player.team_city!)}_${normalize(player.team_name!)}_primary.png`;

                                return (
                                    <li key={player.person_id}>
                                        <Card className={`${styles.player_card} rounded-xl overflow-hidden transition duration-300 hover:scale-105`} pages={1}>
                                            <div className="relative inline-block">
                                                <Image
                                                    src={`https://cdn.nba.com/headshots/nba/latest/1040x760/${player.person_id}.png` || "https://cdn.nba.com/headshots/nba/latest/1040x760/0.png"}
                                                    alt="player_headshot"
                                                    loading="lazy"
                                                    width={300}
                                                    height={300}
                                                    className={`rounded-lg ${styles.card_player_headshot}`}
                                                />
                                                <Link href={`/teams/${player.team_name?.replace(/\s+/g, "_").toLowerCase()}`} className="absolute top-2 left-2 w-12 h-12 rounded-full shadow-md bg-white flex items-center justify-center hover:scale-110 hover:shadow-lg">
                                                    <Image
                                                        className="w-10 h-10 object-contain"
                                                        src={teamLogo || "https://cdn.nba.com/logos/nba/1610612737/primary/L/logo.svg"}
                                                        alt="team_logo"
                                                        width={40}
                                                        height={40}
                                                    />
                                                </Link>
                                            </div>
                                            <div className="p-4">
                                                <h3 className="font-bold text-xl">{player?.first_name} {player?.last_name}</h3>
                                                <p className="text-gray-600 text-sm mb-2">{player?.position} | #{player?.jersey} | {player?.height}</p>
                                                <div className="flex justify-between text-sm">
                                                    <div className="px-2 py-1 rounded shadow-md hover:">
                                                        <span className="font-bold text-blue-600">{playerStats?.pts_per_game}</span> PPG
                                                    </div>
                                                    <div className="px-2 py-1 rounded shadow-md hover:shadow-lg">
                                                        <span className="font-bold text-blue-600">{playerStats?.reb_per_game}</span> RPG
                                                    </div>
                                                    <div className="px-2 py-1 rounded shadow-md">
                                                        <span className="font-bold text-blue-600">{playerStats?.ast_per_game}</span> APG
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex justify-center w-full">
                                                <Link href={`/players/${player.first_name?.replace(/\s+/g, "_")}_${player.last_name?.replace(/\s+/g, "_")}`} className="bg-[#808080] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                                    View Profile
                                                </Link>
                                            </div>
                                        </Card>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
            </section >
            <div className="py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="heading-font text-2xl font-bold text-gray-900">Latest News</h2>
                        <Link href="#" className="text-blue-600 hover:text-blue-800 font-medium">View All News →</Link>
                    </div>

                    <div className="">
                        <div className="rounded-lg overflow-hidden transition duration-300 ease-in-out">
                            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                <Suspense fallback={<p>Loading...</p>}>
                                    {articles && articles?.map((article, index) => (
                                        <li key={`${article.url}-${index}`}>
                                            <Card className={`flex flex-col justify-center bg-(--component-color) rounded-xl p-4 overflow-hidden transition duration-300 hover:scale-105`} pages={1}>
                                                <Link href={`${article.url}`}>
                                                    <p className="font-medium text-2xl">{article.source!.toUpperCase()}</p>
                                                    {article.image && (
                                                        <Image src={article.image!} loading="lazy" className={`mt-4 ${styles.articleImage}`} alt={article.title!} width={400} height={250} />
                                                    )}
                                                    <p className="mt-4 font-medium text-2xl">{article.title}</p>
                                                </Link>
                                                <Link href={`${article.url}`} target="_blank" rel="noreferrer">
                                                    <button className="mt-4 "><p className="bg-[#808080] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm">Read more</p></button>
                                                </Link>
                                            </Card>
                                        </li>
                                    )).slice(0, 5)}
                                </Suspense>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="heading-font text-2xl font-bold text-gray-900">Advanced Analytics</h2>
                    <Link href="#" className="text-blue-600 hover:text-blue-800 font-medium">Explore all Metrics →</Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* <!-- Analytics Card 1 -->
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-center mb-4">
                            <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
                                <i className="fas fa-chart-line text-xl"></i>
                            </div>
                            <h3 className="heading-font text-lg font-bold text-gray-900">Player Efficiency</h3>
                        </div>
                        <p className="text-gray-600 mb-4">Our proprietary algorithm evaluates player impact through advanced metrics like PER, Win Shares, and RAPTOR.</p>
                        <div className="bg-gray-100 rounded-lg p-4">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm font-medium">Top 5 PER Leaders</span>
                                <span className="text-xs text-gray-500">2022-23 Season</span>
                            </div>
                            <div className="space-y-3">
                                <div className="flex items-center">
                                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold mr-3">1</div>
                                    <div className="flex-1">
                                        <div className="flex justify-between">
                                            <span className="text-sm font-medium">Nikola Jokic</span>
                                            <span className="text-sm font-bold">32.8</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                                            <div className="bg-blue-600 h-1.5 rounded-full" style="width: 100%"></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold mr-3">2</div>
                                    <div className="flex-1">
                                        <div className="flex justify-between">
                                            <span className="text-sm font-medium">Giannis Antetokounmpo</span>
                                            <span className="text-sm font-bold">29.7</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                                            <div className="bg-blue-500 h-1.5 rounded-full" style="width: 90%"></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-8 h-8 rounded-full bg-blue-400 flex items-center justify-center text-white text-xs font-bold mr-3">3</div>
                                    <div className="flex-1">
                                        <div className="flex justify-between">
                                            <span className="text-sm font-medium">Joel Embiid</span>
                                            <span className="text-sm font-bold">28.9</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                                            <div className="bg-blue-400 h-1.5 rounded-full" style="width: 88%"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                    <button className="mt-4 w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-md text-sm transition duration-150 ease-in-out">
                        View Full Rankings
                    </button>
                </div>

                {/* <!-- Analytics Card 2 -->
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-center mb-4">
                            <div className="p-3 rounded-full bg-purple-100 text-purple-600 mr-4">
                                <i className="fas fa-bolt text-xl"></i>
                            </div>
                            <h3 className="heading-font text-lg font-bold text-gray-900">Team Offense</h3>
                        </div>
                        <p className="text-gray-600 mb-4">Analyze team offensive efficiency through metrics like ORtg, eFG%, and points per possession.</p>
                        <div className="bg-gray-100 rounded-lg p-4">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm font-medium">Top Offensive Teams</span>
                                <span className="text-xs text-gray-500">2022-23 Season</span>
                            </div>
                            <div className="space-y-3">
                                <div className="flex items-center">
                                    <img src="https://cdn.nba.com/logos/nba/1610612743/primary/L/logo.svg" alt="Nuggets" className="w-6 h-6 mr-3">
                                        <div className="flex-1">
                                            <div className="flex justify-between">
                                                <span className="text-sm font-medium">Denver Nuggets</span>
                                                <span className="text-sm font-bold">118.3</span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                                                <div className="bg-purple-600 h-1.5 rounded-full" style="width: 100%"></div>
                                            </div>
                                        </div>
                                </div>
                                <div className="flex items-center">
                                    <img src="https://cdn.nba.com/logos/nba/1610612738/primary/L/logo.svg" alt="Celtics" className="w-6 h-6 mr-3">
                                        <div className="flex-1">
                                            <div className="flex justify-between">
                                                <span className="text-sm font-medium">Boston Celtics</span>
                                                <span className="text-sm font-bold">117.1</span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                                                <div className="bg-purple-500 h-1.5 rounded-full" style="width: 95%"></div>
                                            </div>
                                        </div>
                                </div>
                                <div className="flex items-center">
                                    <img src="https://cdn.nba.com/logos/nba/1610612744/primary/L/logo.svg" alt="Warriors" className="w-6 h-6 mr-3">
                                        <div className="flex-1">
                                            <div className="flex justify-between">
                                                <span className="text-sm font-medium">Golden State Warriors</span>
                                                <span className="text-sm font-bold">116.3</span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                                                <div className="bg-purple-400 h-1.5 rounded-full" style={{width: "92%"}}></div>
                                            </div>
                                        </div>
                                </div>
                            </div>
                        </div> */}
                <button className="mt-4 w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-md text-sm transition duration-150 ease-in-out">
                    View Full Rankings
                </button>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center mb-4">
                    <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
                        <i className="fas fa-shield-alt text-xl"></i>
                    </div>
                    <h3 className="heading-font text-lg font-bold text-gray-900">Defensive Impact</h3>
                </div>
                <p className="text-gray-600 mb-4">Measure defensive prowess through stats like DRtg, blocks, steals, and opponent field goal percentage.</p>
                <div className="bg-gray-100 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Top Defensive Players</span>
                        <span className="text-xs text-gray-500">2022-23 Season</span>
                    </div>
                    {/* <div className="space-y-3">
                                <div className="flex items-center">
                                    <img src="https://cdn.nba.com/headshots/nba/latest/1040x760/1629630.png" alt="Jaren Jackson Jr." className="w-6 h-6 rounded-full mr-3">
                                        <div className="flex-1">
                                            <div className="flex justify-between">
                                                <span className="text-sm font-medium">Jaren Jackson Jr.</span>
                                                <span className="text-sm font-bold">3.0 BPG</span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                                                <div className="bg-green-600 h-1.5 rounded-full" style="width: 100%"></div>
                                            </div>
                                        </div>
                                </div>
                                <div className="flex items-center">
                                    <img src="https://cdn.nba.com/headshots/nba/latest/1040x760/203500.png" alt="Rudy Gobert" className="w-6 h-6 rounded-full mr-3">
                                        <div className="flex-1">
                                            <div className="flex justify-between">
                                                <span className="text-sm font-medium">Rudy Gobert</span>
                                                <span className="text-sm font-bold">2.1 BPG</span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                                                <div className="bg-green-500 h-1.5 rounded-full" style="width: 70%"></div>
                                            </div>
                                        </div>
                                </div>
                                <div className="flex items-center">
                                    <Image src="https://cdn.nba.com/headshots/nba/latest/1040x760/1628368.png" alt="Bam Adebayo" className="w-6 h-6 rounded-full mr-3">
                                        <div className="flex-1">
                                            <div className="flex justify-between">
                                                <span className="text-sm font-medium">Bam Adebayo</span>
                                                <span className="text-sm font-bold">1.9 BPG</span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                                                <div className="bg-green-400 h-1.5 rounded-full" style="width: 63%"></div>
                                            </div>
                                        </div>
                                </div>
                            </div> */}
                </div>
                <button className="mt-4 w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-md text-sm transition duration-150 ease-in-out">
                    View Full Rankings
                </button>
            </div>
        </>
    )
}

export default Home