import { FaCalendarAlt, FaHome, FaThList } from "react-icons/fa"
import { FaGear } from "react-icons/fa6"
import { IoPersonCircle } from "react-icons/io5"
import SideMenu from "../SideMenu"

const DashBoard = (props: {
    children: React.ReactNode
}) => {

     return (
        <div>
            <SideMenu items={[{ name: "Dashboard", link: "/home", icon: <FaHome fontSize={28} />, tooltip: "Home" },
            { name: "My Tasks", link: "/tasks", icon: <FaThList fontSize={28} />, tooltip: "My tasks" },
            { name: "Calendar", link: "/calendar", icon: <FaCalendarAlt fontSize={28} />, tooltip: "Calendar" },
            { name: "Categories", link: "/profile", icon: <IoPersonCircle fontSize={28} />, tooltip: "Profile" },
            { name: "Categories", link: "/settings", icon: <FaGear fontSize={28} />, tooltip: "Settings" }
            ]} />
            <main>
                {props.children}
            </main>
        </div>
    )
}

export default DashBoard;