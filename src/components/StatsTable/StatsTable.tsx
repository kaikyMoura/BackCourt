import { get_player_advanced_stats, get_player_carrer_stats, get_player_info, get_players } from '@/api/services/playersService';
import { useLoading } from '@/contexts/LoadingContext/useLoading';
import { PlayerStats } from '@/types/PlayerStats';
import { PlayerCareerStatsList } from '@/types/PlayerStatsList';
import { useParams } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa6';
import Table from '../Table';
import styles from './StatsTable.module.scss';

const StatsTable = () => {
    const params = useParams()
    const { isLoading, setLoading } = useLoading()

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const name = decodeURIComponent((params?.player_name as string) ?? '').replace(/_/g, ' ')

    const [advancedStats, setPlayerAdvancedStats] = useState<PlayerStats[]>([])
    const [careerStats, setCareerStats] = useState<PlayerCareerStatsList[]>([])

    const fetchStats = useCallback(async () => {
        setLoading(true);

        try {
            const player = await get_player_info(undefined, name);
            const player_common = await get_players(undefined, player.data?.first_name! + player.data?.last_name!, undefined, undefined, 10);

            const isActive = player_common.data![0]?.is_active;

            let advancedStats: any[] = [];
            let careerStats: any = {};
            if (isActive) {
                const res = await get_player_advanced_stats(player.data!.person_id!, "Overall", "Totals", "All", "Regular Season");

                console.log(res.data?.stats)

                advancedStats = res.data?.stats || [];
            } else {
                const res = await get_player_carrer_stats(player.data!.person_id!, "Regular Season", "All", currentPage, totalPages);

                careerStats = res.data?.seasons || [];
            }
            setPlayerAdvancedStats(advancedStats);
            setCareerStats(careerStats);
        } catch (error) {
            console.error('Error: ', error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchStats();
    }, []);

    const dataToRender = Array.isArray(careerStats) && careerStats.length > 0 ? careerStats : advancedStats || [];

    const totalPages = Math.ceil(dataToRender.length / itemsPerPage);
    const slicedData = dataToRender.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

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
            {!isLoading ? (
                <div>
                    <Table className={styles.stats__table} data={slicedData} fields={fields} headers={headers} />
                    <div className="flex justify-center items-center gap-4 mt-4">
                        <button
                            onClick={handlePrev}
                            disabled={currentPage === 1}
                            className="p-2 rounded-full border disabled:opacity-30"
                        >
                            <FaArrowLeft className='text-(--text-color)' fontSize={26} />
                        </button>
                        <span className="text-sm font-medium">
                            Página {currentPage} de {totalPages}
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
                )}
        </>
    );
};

export default StatsTable;