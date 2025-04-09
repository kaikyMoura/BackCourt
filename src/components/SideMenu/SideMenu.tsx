import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { ReactNode, useState } from 'react'
import { FaBasketball } from 'react-icons/fa6'
import { GiHamburgerMenu } from 'react-icons/gi'
import styles from './SideMenu.module.scss'

const SideMenu = ({title, items} : {
    title: string,
    items: {
        name: string, link: string, icon: ReactNode, tooltip?: string,
        subMenuItems?: { name: string, link: string, icon: ReactNode, tooltip?: string }[]
    }[],
}) => {
    const router = useRouter()

    const [isExpanded, setIsExpanded] = useState(false);

    const toggleSidebar = () => {
        const root = document.documentElement;

        const isExpanded = root.style.getPropertyValue("--sidebar-width") === "240px";
        root.style.setProperty("--sidebar-width", isExpanded ? "75px" : "240px");

        setIsExpanded((prev) => !prev);
    };

    return (
        <>
            <aside className={`${styles.sidemenu} flex items-center ${isExpanded === true ? styles.expanded : null} transition-all duration-500 ease-in-out`}>
                <FaBasketball fontSize={32} color="#fff" />
                {isExpanded &&
                    <h2 className={`absolute font-semibold text-xl ${isExpanded === true ? "ml-6" : "ml-4"} transition-all duration-800 ease-in-out`}>
                        {title}
                    </h2>
                }
                <ul className={`flex flex-col items-center gap-8 mt-6 ${isExpanded === true ? "ml-6" : null}`}>
                    {items && items.map((item, index) => (
                        <React.Fragment key={index}>
                            <li className={`cursor-pointer w-full rounded-lg ${router.pathname === item.link ? styles.selected : ""}`}>
                                <Link
                                    className="flex items-center w-full px-2 py-2 hover:rounded-lg"
                                    href={item.link}
                                    data-tooltip-id="my-tooltip"
                                    data-tooltip-content={item.tooltip}
                                >
                                    {item.icon}
                                    <p className={`ml-4 transition-opacity duration-1000 ease-in-out ${!isExpanded ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'}`}>
                                        {isExpanded && item.name}
                                    </p>
                                </Link>
                            </li>
                        </React.Fragment>
                    ))}
                </ul>
            </aside>
            <div className={`fixed ${!isExpanded ? 'left-32' : 'left-48'} top-4 transition-all duration-800 ease-in-out`} style={{ zIndex: 200 }}>
                <button onClick={toggleSidebar}>
                    <GiHamburgerMenu className='cursor-pointer' fontSize={28} />
                </button>
            </div>
        </>
    )
}

export default SideMenu;