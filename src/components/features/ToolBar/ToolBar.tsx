"use client"
import { get_players } from "@/api/services/playersService";
import { get_teams } from "@/api/services/teamsService";
import { useTheme } from "@/contexts/ThemeContext/useTheme";
import { useSearchCountStore } from "@/stores/useSearchCountStore";
import { Player } from "@/types/Player";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { AiFillMoon } from "react-icons/ai";
import { MdWbSunny } from "react-icons/md";
import { useLoading } from "../../ui/Loader/hook";
import SearchInput from "../../ui/SearchInput";
import styles from "./ToolBar.module.scss";

type CombinedData =
    | {
        image: string;
        id?: number;
        full_name: string;
        first_name: string;
        last_name: string;
        is_active: boolean;
    }
    | {
        image: string;
        id?: number;
        full_name: string;
        abbreviation: string;
        nickname: string;
        city: string;
        state: string;
        year_founded: number;
    };

const ToolBar = () => {
    const router = useRouter();
    const { theme, toggleTheme } = useTheme()
    const { setLoading } = useLoading()

    useEffect(() => { }, [theme, toggleTheme])

    const { incrementePlayerSearchCount } = useSearchCountStore()

    const [allData, setAllData] = useState<CombinedData[]>([]);

    const [isActivePlayer, setIsActivePlayer] = useState(true)

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const [playersData, teamsData] = await Promise.all([
                get_players(isActivePlayer, undefined, undefined, undefined, 10),
                get_teams(undefined, undefined, undefined, 10),
            ]);

            const players = playersData.data || [];
            const teams = teamsData.data || [];

            const playersWithImages = players.map(player => ({
                ...player,
                image: `https://cdn.nba.com/headshots/nba/latest/1040x760/${player.id}.png`
            }));

            const teamsWithImages = teams.map(team => ({
                ...team,
                image: "/" + team.full_name.toLowerCase().replace(/\s+/g, "_") + "_primary.png"
            }));

            const combinedData = [...(playersWithImages || []), ...(teamsWithImages || [])] as unknown as CombinedData[];

            setAllData(combinedData)
        } catch (error) {
            console.error('Error: ', error);
        } finally {
            setLoading(false);
        }
    }, [isActivePlayer]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleSelect = (player: Player) => {
        if (player.full_name) {
            incrementePlayerSearchCount(player.full_name);
        }
        router.push(`/players/${player.full_name}`);
    };

    return (
        <div className={`fixed z-120 ${styles.toolbar_container}`}>
            <div className={`flex items-center justify-center ml-4 mr-4`}>
                <SearchInput keys={['full_name']} placeholder={"search players"}
                    data={allData} onSelect={(player) => handleSelect(player as Player)} imageKey={"image"} isActive={isActivePlayer}
                    setActive={setIsActivePlayer} />
                {/* Theme switcher */}
                <div className="fixed top-5 right-2">
                    <div
                        className={`${styles.switch} ${theme === "dark" ? styles.dark : styles.light}`}
                        onClick={toggleTheme}
                    >
                        <div className={styles.slider}>
                            <div className={styles.icon}>
                                {theme === "dark" ? (
                                    <>
                                        <AiFillMoon className={styles.moon} />
                                    </>
                                ) : (
                                    <MdWbSunny className={styles.sun} />
                                )}
                            </div>
                            <div className={styles.circle}></div>
                        </div>
                    </div>
                </div>
                <div>
                    {/**
                     * Todo
                     * Create a user profile component
                     */}
                </div>
            </div>
        </div>
    )
}

export default ToolBar;