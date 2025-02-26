import { get_players } from "@/api/services/playersService"
import { useEffect, useState } from "react"
import { FaHome } from "react-icons/fa"
import { FaBasketball } from "react-icons/fa6"
import { GiBasketballJersey } from "react-icons/gi"
import { IoNewspaper, IoPerson } from "react-icons/io5"
import { TbDeviceAnalytics } from "react-icons/tb"
import Footer from "../Footer"
import SideMenu from "../SideMenu"
import styles from "./styles.module.scss"
import { get_teams } from "@/api/services/teamsService"
import { Player } from "@/model/Player"
import { Team } from "@/model/Team"
import SearchBar from "../SearchBar"

const DashBoard = (props: {
    children: React.ReactNode
}) => {
    const [filteredData, setFilterdData] = useState<any[]>([])

return (
    <div className="flex min-h-screen">
        <SideMenu items={[{ name: "Home", link: "/", icon: <FaHome fontSize={28} color="white" />, tooltip: "Home" },
        { name: "News", link: "/news", icon: <IoNewspaper fontSize={28} />, tooltip: "News" },
        { name: "Teams", link: "/teams", icon: <GiBasketballJersey fontSize={28} />, tooltip: "Teams" },
        { name: "Players", link: "/players", icon: <IoPerson fontSize={28} />, tooltip: "Players" },
        { name: "Games", link: "/games", icon: <FaBasketball fontSize={28} />, tooltip: "Games" },
        { name: "Analytics", link: "/analitycs", icon: <TbDeviceAnalytics fontSize={28} />, tooltip: "Analytics" }
        ]} title={"BAS"} />
        <SearchBar onSearch={(results: Player[]) => {
            return setFilterdData(results)
        }} keys={['full_name', 'full_name']}/>
        <main className={styles.mainContent}>
            {props.children}
        </main>
        <Footer />
    </div>
)
}

export default DashBoard;