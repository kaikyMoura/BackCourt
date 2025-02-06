import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { ReactNode, useState } from 'react'
import styles from './styles.module.scss'
import { GiHamburgerMenu } from 'react-icons/gi'

const SideMenu = (props: {
    title: string,
    items: {
        name: string, link: string, icon: ReactNode, tooltip?: string,
        subMenuItems?: { name: string, link: string, icon: ReactNode, tooltip?: string }[]
    }[],
}) => {
    const router = useRouter()

    const [expanded, setExpanded] = useState(false)

    const expandSideBar = () => {
        console.log(expanded)
        setExpanded(!expanded)
    }

    return (
        <>
            <div className={styles.sideContainer}>
                <div className={`${styles.sidemenu} flex items-center ${expanded === true ? styles.expanded : null} transition-all duration-500 ease-in-out`}>
                    <h2 className={`absolute font-semibold text-xl ${expanded === true ? "ml-6" : null} transition-all duration-800 ease-in-out`}>
                        {expanded ? "Basketball Advanced Stats" : "BAS"}</h2>
                    <ul className={`flex flex-col items-center gap-8 ${expanded === true ? "ml-6" : null}`}>
                        {props.items && props.items.map((item, index) => (
                            <React.Fragment key={index}>
                                <li className={`cursor-pointer w-full ${router.pathname === item.link ? styles.selected : ""}`}>
                                    <Link className={"flex"} href={item.link}
                                        data-tooltip-id="my-tooltip"
                                        data-tooltip-content={item.tooltip}>
                                        {item.icon}
                                        <p className={`flex items-center ml-4 ${!expanded ? 'opacity-0' : 'opacity-100'} transition-opacity duration-1000 ease-in-out`}>
                                            {expanded && item.name}</p>
                                    </Link>
                                </li>
                            </React.Fragment>
                        ))}
                    </ul>
                </div>
                <div className='relative left-48 top-4'>
                    <button onClick={expandSideBar}>
                        <GiHamburgerMenu fontSize={28} />
                    </button>
                </div>
            </div >
        </>
    )
}

export default SideMenu;