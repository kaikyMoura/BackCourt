"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { ReactNode, useEffect, useState } from 'react'
import { FaBasketball } from 'react-icons/fa6'
import { GiHamburgerMenu } from 'react-icons/gi'
import styles from './SideMenu.module.scss'

const SideMenu = ({ title, items }: {
    title: string,
    items: {
        name: string, link: string, icon: ReactNode, tooltip?: string,
        subMenuItems?: { name: string, link: string, icon: ReactNode, tooltip?: string }[]
    }[],
}) => {
    const pathName = usePathname()

    const [isExpanded, setIsExpanded] = useState(false);

    const toggleSidebar = () => {
        const root = document.documentElement;

        const isExpanded = root.style.getPropertyValue("--sidebar-width") === "240px";
        root.style.setProperty("--sidebar-width", isExpanded ? "75px" : "240px");

        setIsExpanded((prev) => !prev);
    };

    useEffect(() => { }, [isExpanded, pathName])

    return (
        <>
            <aside className={`${styles.sidemenu} flex items-center ${isExpanded ? styles.expanded : null} transition-all duration-500 ease-in-out`}>
                <ul className={`flex flex-col items-center gap-6 mt-6 ${isExpanded ? "ml-6" : "ml-2"}`}>
                    <div className='flex w-full ml-8 gap-2'>
                        <FaBasketball fontSize={28} color="#fff" />
                        {isExpanded &&
                            <h2 className={`font-semibold text-xl transition-all duration-800 ease-in-out`}>
                                {title}
                            </h2>
                        }
                    </div>

                    {items && items.map((item, index) => (
                        <React.Fragment key={index}>
                            <li className={`w-full rounded-lg ${pathName === item.link && isExpanded ? styles.selected : null}`}>
                                <Link
                                    className="flex items-center px-2 py-2 "
                                    href={item.link}
                                    data-tooltip-id="my-tooltip"
                                    data-tooltip-content={item.tooltip} >
                                    <div
                                        className={`p-2 rounded-lg ${pathName === item.link ? styles.selected : null} transition-colors`}
                                    >
                                        {item.icon}
                                    </div>
                                    <p className={`ml-4 transition-opacity duration-1000 ease-in-out ${!isExpanded ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'}`}>
                                        {isExpanded && item.name}
                                    </p>
                                </Link>
                            </li>
                        </React.Fragment>
                    ))}
                </ul>
            </aside>
            <div className={`fixed ${!isExpanded ? 'left-20' : 'left-48'} top-4 transition-all duration-800 ease-in-out`} style={{ zIndex: 200 }}>
                <button onClick={toggleSidebar}>
                    <GiHamburgerMenu className='cursor-pointer hover:text-black' fontSize={28} />
                </button>
            </div>
        </>
    )
}

export default SideMenu;