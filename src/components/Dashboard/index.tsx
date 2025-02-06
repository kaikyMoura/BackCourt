import { FaBasketball, FaGear } from "react-icons/fa6"
import { GiBasketballJersey, GiHamburgerMenu } from "react-icons/gi"
import { IoPerson } from "react-icons/io5"
import SideMenu from "../SideMenu"
import { FaHome } from "react-icons/fa"
import { TbDeviceAnalytics } from "react-icons/tb"

const DashBoard = (props: {
    children: React.ReactNode
}) => {

    return (
        <div>
            <SideMenu items={[{ name: "Home", link: "/dashboard", icon: <FaHome fontSize={28} />, tooltip: "Home" },
            { name: "Teams", link: "/teams", icon: <GiBasketballJersey fontSize={28} />, tooltip: "Teams" },
            { name: "Players", link: "/players", icon: <IoPerson fontSize={28} />, tooltip: "Players" },
            { name: "Games", link: "/games", icon: <FaBasketball fontSize={28} />, tooltip: "Games" },
            { name: "Analytics", link: "/analitycs", icon: <TbDeviceAnalytics  fontSize={28} />, tooltip: "Analytics" }
            ]} title={"BAS"} />
            <main>
                {props.children}
            </main>
        </div>
    )
}

export default DashBoard;