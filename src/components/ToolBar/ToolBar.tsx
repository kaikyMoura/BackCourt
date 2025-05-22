"use client"
import { get_players } from "@/api/services/playersService";
import { get_teams } from "@/api/services/teamsService";
import { useTheme } from "@/contexts/ThemeContext/useTheme";
import { useSearchCountStore } from "@/stores/useSearchCountStore";
import { Player } from "@/types/Player";
import { useRouter } from "next/navigation";
import { SetStateAction, useCallback, useEffect, useState } from "react";
import { AiFillMoon } from "react-icons/ai";
import { MdWbSunny } from "react-icons/md";
import SearchInput from "../SearchInput";
import styles from "./ToolBar.module.scss";
import { useLoading } from "../Loader/hook";

const ToolBar = () => {
    const router = useRouter();
    const { theme, toggleTheme } = useTheme()
    const { setLoading } = useLoading()

    useEffect(() => { }, [theme, toggleTheme])

    const { incrementePlayerSearchCount } = useSearchCountStore()

    const [allData, setAllData] = useState<any[]>([]);

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

            const combinedData = [...(playersWithImages || []), ...(teamsWithImages || [])] as unknown as any[];

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
                data={allData} label={""} onSelect={(player) => handleSelect(player)} imageKey={"image"} isActive={isActivePlayer} 
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