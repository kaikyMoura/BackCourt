import Link from "next/link"
import styles from "./Footer.module.scss"
import { FaGithub } from "react-icons/fa6";

const Footer = ({ }) => {

    return (
        <footer className={`w-full ${styles.footer}`}>

            <div className="flex gap-6 ml-auto">
                <Link className="flex gap-1" href={"https://github.com/kaikyMoura/BackCourt"}>
                    <FaGithub fontSize={20} className="text-(--text-color)" />
                    <p>Github</p>
                </Link>
                <p className="mr-4 mb-2" >© 2025 - Backcourt</p>
                {/* <p className="mr-4 mb-2">{process.env.NEXT_PUBLIC_APP_VERSION as string}</p> */}
            </div>
        </footer>
    )
}

export default Footer;