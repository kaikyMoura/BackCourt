import { FaHome } from "react-icons/fa"
import { FaBasketball } from "react-icons/fa6"
import { GiBasketballJersey } from "react-icons/gi"
import { IoNewspaper, IoPerson } from "react-icons/io5"
import { TbDeviceAnalytics } from "react-icons/tb"
import SideMenu from "../SideMenu"
import { JSX } from "react"

/**
 * Renders the main side menu of the application.
 * It contains a button to home page, news, teams, players, games and analytics.
 * The side menu is only visible when the user is authenticated.
 * @returns {JSX.Element}
 */
const SideMenuImpl = (): JSX.Element => {
    return (
        <SideMenu items={[{ name: "Home", link: "/", icon: <FaHome fontSize={28} />, tooltip: "Home" },
        { name: "News", link: "/news", icon: <IoNewspaper fontSize={28} />, tooltip: "News" },
        { name: "Teams", link: "/teams", icon: <GiBasketballJersey fontSize={28} />, tooltip: "Teams" },
        { name: "Players", link: "/players", icon: <IoPerson fontSize={28} />, tooltip: "Players" },
        { name: "Games", link: "/games", icon: <FaBasketball fontSize={28} />, tooltip: "Games" },
        { name: "Analytics", link: "/analitycs", icon: <TbDeviceAnalytics fontSize={28} />, tooltip: "Analytics" }
        ]} title={"Backcourt"} />
    )
}

export default SideMenuImpl