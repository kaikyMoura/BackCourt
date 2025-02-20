import { FaHome } from "react-icons/fa"
import { FaBasketball, FaNewspaper } from "react-icons/fa6"
import { GiBasketballJersey } from "react-icons/gi"
import { IoNewspaper, IoPerson } from "react-icons/io5"
import { TbDeviceAnalytics } from "react-icons/tb"
import SideMenu from "../SideMenu"
import Footer from "../Footer"
import styles from "./styles.module.scss"

const DashBoard = (props: {
    children: React.ReactNode
}) => {

    return (
        <div className="flex min-h-screen">
            <SideMenu items={[{ name: "Home", link: "/", icon: <FaHome fontSize={28} color="white"/>, tooltip: "Home" },
            { name: "Teams", link: "/teams", icon: <GiBasketballJersey fontSize={28} />, tooltip: "Teams" },
            { name: "News", link: "/news", icon: <IoNewspaper fontSize={28} />, tooltip: "News" },
            { name: "Players", link: "/players", icon: <IoPerson fontSize={28} />, tooltip: "Players" },
            { name: "Games", link: "/games", icon: <FaBasketball fontSize={28} />, tooltip: "Games" },
            { name: "Analytics", link: "/analitycs", icon: <TbDeviceAnalytics fontSize={28} />, tooltip: "Analytics" }
            ]} title={"BAS"} />
            <main className={styles.mainContent}>
                {props.children}
            </main>
            <Footer />
        </div>
    )
}

export default DashBoard;