"use client"
import Image from 'next/image';
import Link from 'next/link';
import { SetStateAction, useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { FaToggleOff, FaToggleOn, FaX } from 'react-icons/fa6';
import styles from './SearchInput.module.scss';
import useLazyLoading from '@/hooks/useLazyLoading';

interface SearchInputProps<T extends object> {
    placeholder: string;
    data: T[];
    imageKey?: keyof T;
    label: string;
    keys: (keyof T)[];
    onSelect: (item: T) => void;
    isActive: boolean;
    setActive: React.Dispatch<SetStateAction<boolean>>
}

const SearchInput = <T extends object>({
    placeholder,
    data: allData,
    imageKey,
    label,
    keys,
    onSelect,
    isActive,
    setActive }: SearchInputProps<T>
) => {
    const { imgRef } = useLazyLoading();

    const [query, setQuery] = useState('');
    const [filteredData, setFilteredData] = useState<T[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!query.trim()) {
            setFilteredData([]);
            return;
        }

        const filtered = allData.filter((item) =>
            keys.some((key) =>
                String(item[key]).toLowerCase().startsWith(query.toLowerCase()) || String(item[key]).toLowerCase().includes(query.toLowerCase())
            )
        );

        setFilteredData(filtered);
    }, [query, allData, keys]);


    const clearInput = () => {
        setQuery('');
        setFilteredData([]);
    };

    return (
        <div className={styles.search_input__container}>
            <div className='relative w-full max-w-md'>
                <div className="flex items-center relative">
                    <input className={`focus:outline-none w-full py-2 px-4 rounded-md ${styles.search_input}`} type="text" placeholder={placeholder} value={query}
                        onChange={(e: { target: { value: SetStateAction<string>; }; }) => setQuery(e.target.value)} />
                    {query &&
                        <div className="absolute inset-y-5 right-12 flex items-center cursor-pointer z-120" onClick={clearInput}>
                            <FaX className="text-[#2699ef]" />
                        </div>
                    }
                    <div className="absolute inset-y-5 right-3 flex items-center pointer-events-none z-120">
                        <FaSearch className="text-[#2699ef]" />
                    </div>
                </div>
            </div>
            {query && !isLoading && filteredData.length > 0 && (
                <ul className={`sticky w-full cursor-pointer ${styles.search_input__results}`}>
                    <li key={undefined} className="border-b border-gray-200 p-2">
                        <button className="ml-2 flex" onClick={() => setActive(!isActive)}>
                            <p className='font-medium text-lg'>Is active ?</p>
                            {isActive ?
                                (
                                    <FaToggleOn fontSize={26} color="#2699ef" />
                                )
                                :
                                (
                                    <FaToggleOff fontSize={26} color="#2699ef" />
                                )
                            }
                        </button>
                    </li>
                    {filteredData.map((item, i) => (
                        <li key={i} className="cursor-pointer">
                            <button type='button' className='flex items-center gap-4 p-2 border-b border-gray-200' onClick={
                                () => {
                                    onSelect(item);
                                    clearInput();
                                }
                            }>
                                <Image
                                    onLoad={() => setIsLoading(false)} src={item[imageKey!] as string || "https://cdn.nba.com/headshots/nba/latest/1040x760/0.png"} alt='player-image'
                                    loading="lazy" width={110} height={40}
                                    ref={imgRef} />
                                {keys.map((key, index) => (
                                    <p key={index} className="font-medium text-lg text-(--primary-text-color)">{item[key!] as React.ReactNode}</p>
                                ))}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchInput;