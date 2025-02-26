import React, { useState, useEffect, useCallback } from 'react';
import { FaSearch } from 'react-icons/fa';
import styles from './styles.module.scss';
import { get_players } from '@/api/services/playersService';
import { get_teams } from '@/api/services/teamsService';
import { FaX } from 'react-icons/fa6';

const SearchBar = <T extends Record<string, any>>(
    props: {
        onSearch: (results: T[]) => void;
        keys: (keyof T)[];
    }) => {
    const [query, setQuery] = useState('');
    const [filteredData, setFilteredData] = useState<T[]>([]);
    const [allData, setAllData] = useState<T[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        try {
            const [playersData, teamsData] = await Promise.all([
                get_players(undefined, undefined, undefined, undefined, 10),
                get_teams(undefined, undefined, undefined, 10),
            ]);
            const combinedData = [
                ...(playersData.data || []),
                ...(teamsData.data || [])
            ] as unknown as T[];
            setAllData(combinedData);
        } catch (error) {
            console.error('Error: ', error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    useEffect(() => {
        if (!query.trim()) {
            setFilteredData([]);
            return;
        }

        const filtered = allData.filter((item) =>
            props.keys.some((key) =>
                String(item[key]).toLowerCase().includes(query.toLowerCase())
            )
        );

        setFilteredData(filtered);
        props.onSearch(filtered);
    }, [query, allData]);

    const clearInput = () => {
        setQuery('');
        setFilteredData([]);
    };

    return (
        <div className={`flex justify-center ${styles.container}`}>
            <div className='relative w-full max-w-md'>
                <div className="flex items-center relative">
                    <input
                        className={`focus:outline-none w-full ${styles.searchInput}`}
                        placeholder="Buscar..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />

                    {query && (
                        <button className="absolute right-12 cursor-pointer" onClick={clearInput}>
                            <FaX fontSize={20} color='#fff' />
                        </button>
                    )}

                    <button className={`absolute right-2 flex items-center justify-center ${styles.searchButton}`}>
                        <FaSearch fontSize={20} color="#fff" />
                    </button>
                </div>
                {query && !isLoading && filteredData.length > 0 && (
                    <ul className={`absolute w-full bg-white shadow-md ${styles.searchResults}`}>
                        {filteredData.map((item, index) => (
                            <li key={index} className="p-2 border-b border-gray-200">
                                <p>{item.full_name}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default SearchBar;