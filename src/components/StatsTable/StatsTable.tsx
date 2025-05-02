import { get_player_advanced_stats, get_player_carrer_stats, get_player_info, get_players } from '@/api/services/playersService';
import { useLoading } from '@/contexts/LoadingContext/useLoading';
import { PlayerStats } from '@/types/PlayerStats';
import { PlayerCareerStatsList } from '@/types/PlayerStatsList';
import { useParams } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa6';
import Table from '../Table';
import styles from './StatsTable.module.scss';
import { IoIosArrowForward } from 'react-icons/io';

const StatsTable = () => {
    const params = useParams()
    const { isLoading, setLoading } = useLoading()

    const [localLoading, setLocalLoading] = useState(false);

    const [openDropdownSeason, setOpenDropdownSeason] = useState(false);
    const [openDropdownPerMode, setOpenDropdownPerMode] = useState(false);

    const [seasonType, setSeasonType] = useState<"Regular Season" | "Pre Season" | "Playoffs">("Regular Season");
    const [perMode, setPerMode] = useState<"Totals" | "Per36" | "PerGame">("Totals");

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const [totalPages, setTotalPages] = useState(1);

    const [advancedStats, setPlayerAdvancedStats] = useState<PlayerStats[]>([]);
    const [careerStats, setCareerStats] = useState<PlayerCareerStatsList[]>([]);

    const [isActive, setIsActive] = useState<boolean | null>(null);

    const name = decodeURIComponent((params?.player_name as string) ?? '').replace(/_/g, ' ');

    const fetchStats = useCallback(async () => {
        console.log(seasonType, perMode)

        setLoading(true);
        setLocalLoading(true)
        try {
            const player = await get_player_info(undefined, name);
            const player_common = await get_players(undefined, player.data?.first_name! + player.data?.last_name!, undefined, undefined, 10);
            const active = player_common.data![0]?.is_active;

            setIsActive(active);

            if (active) {
                const res = await get_player_advanced_stats(player.data!.person_id!, perMode, "All", seasonType!);
                setPlayerAdvancedStats(res.data?.stats || []);

                const total = Math.ceil((res.data?.stats?.length || 0) / itemsPerPage);
                setTotalPages(total);
                setLocalLoading(false)
            } else {
                const res = await get_player_carrer_stats(player.data!.person_id!, seasonType!, "All", currentPage, itemsPerPage);
                setCareerStats(res.data?.seasons || []);

                const total = Math.ceil((res.data?.seasons?.length || 0) / itemsPerPage);
                setTotalPages(total);
                setLocalLoading(false)
            }
        } catch (error) {
            console.error('Error: ', error);
        } finally {
            setLoading(false);
        }
    }, [name, seasonType, perMode, currentPage, itemsPerPage]);

    useEffect(() => {
        fetchStats();
    }, [fetchStats]);

    const dataToRender = isActive ? advancedStats : careerStats;

    const slicedData = isActive
        ? dataToRender.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
        : dataToRender;

    const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
    const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

    const fields = careerStats
        ? [
            'season_id', 'team_abbreviation', 'gp', 'min', 'pts',
            'fgm', 'fga', 'fg_pct', 'fg3m', 'fg3a', 'fg3_pct',
            'ftm', 'fta', 'ft_pct', 'dreb', 'oreb', 'reb',
            'ast', 'stl', 'blk', 'tov', 'pf'
        ]
        : [
            'group_value', 'team_abbreviation', 'gp', 'min', 'pts',
            'fgm', 'fga', 'fg_pct', 'fg3m', 'fg3a', 'fg3_pct',
            'ftm', 'fta', 'ft_pct', 'dreb', 'oreb', 'reb',
            'ast', 'stl', 'blk', 'tov', 'pf'
        ];

    const headers = fields.map(f =>
        f.replace(/_/g, ' ').replace('pct', '%').toUpperCase()
    );

    const TableSkeleton: React.FC = ({ columns = 5, rows = 10 }: { columns?: number; rows?: number }) => {
        return (
            <table className={`min-w-[800px] table-auto border-collapse text-sm w-full ${styles.stats__table}`}>
                <thead className="sticky top-0">
                    <tr>
                        {Array.from({ length: columns }).map((_, i) => (
                            <th key={i} className="px-4 py-2 text-center">
                                <div className="h-4 bg-gray-300 rounded animate-pulse w-3/4 mx-auto" />
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {Array.from({ length: rows }).map((_, rowIndex) => (
                        <tr key={rowIndex} className="text-center">
                            {Array.from({ length: columns }).map((_, colIndex) => (
                                <td key={colIndex} className="px-4 py-2">
                                    <div className="h-4 bg-gray-200 rounded animate-pulse w-full" />
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    };

    return (
        <>
            <div className={`flex gap-6 p-4 ${styles.stats__table}`}>
        
                <div className="flex flex-col gap-1">
                    <label className="text-md font-normal">Season Type</label>
                    <button
                        type="button"
                        onClick={() => setOpenDropdownSeason(!openDropdownSeason)}
                        className={`flex items-center justify-between cursor-pointer ${styles.modalInput}`}
                    >
                        {seasonType || "select a category"}
                        <IoIosArrowForward className={`ml-2 ${styles.arrow} ${openDropdownSeason ? "rotate-90" : ""}`} fontSize={20} />
                    </button>
                    {openDropdownSeason && (
                        <ul className={`${styles.options}`} onMouseLeave={() => setOpenDropdownSeason(false)}>
                            {Object.entries(["Regular Season", "Pre season", "Playoffs"]).map(([key, value]) => (
                                <li key={key} className="p-2 hover:bg-gray-100 cursor-pointer"
                                    onClick={() => {
                                        setSeasonType(value as "Regular Season" | "Pre Season" | "Playoffs");
                                        setOpenDropdownSeason(false);
                                        fetchStats();
                                    }} >
                                    {value}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <div className="flex flex-col gap-1">
                    <label className="text-md font-normal">Per Mode</label>
                    <button
                        type="button"
                        onClick={() => setOpenDropdownPerMode(!openDropdownPerMode)}
                        className={`flex items-center justify-between cursor-pointer ${styles.modalInput}`}
                    >
                        {perMode || "per game"}
                        <IoIosArrowForward className={`ml-2 ${styles.arrow} ${openDropdownPerMode ? "rotate-90" : ""}`} fontSize={20} />
                    </button>
                    {openDropdownPerMode && (
                        <ul className={`${styles.options}`} onMouseLeave={() => setOpenDropdownPerMode(false)}>
                            {Object.entries(["Totals", "Per36", "Per Game"]).map(([key, value]) => (
                                <li key={key} className="p-2 hover:bg-gray-100 cursor-pointer"
                                    onClick={() => {
                                        setPerMode(value as "Totals" | "Per36" | "PerGame");
                                        setOpenDropdownPerMode(false);
                                        fetchStats();
                                    }} >
                                    {value}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>

            {!isLoading && !localLoading ? (
                <div>
                    <Table className={`mt-4 ${styles.stats__table}`} data={slicedData} fields={fields} headers={headers} />
                    <div className="flex justify-center items-center gap-4 mt-4">
                        <button
                            onClick={handlePrev}
                            disabled={currentPage === 1}
                            className="p-2 rounded-full border disabled:opacity-30"
                        >
                            <FaArrowLeft className='text-(--text-color)' fontSize={26} />
                        </button>
                        <span className="text-sm font-medium">
                            Page {currentPage} of {totalPages}
                        </span>
                        <button
                            onClick={handleNext}
                            disabled={currentPage === totalPages}
                            className="p-2 rounded-full border disabled:opacity-30"
                        >
                            <FaArrowRight className='text-(--text-color)' fontSize={26} />
                        </button>
                    </div>
                </div>
            )
                : (
                    <div>
                        <TableSkeleton />
                    </div>
                )
            }
        </>
    );
};

export default StatsTable;