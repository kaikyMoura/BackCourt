import Link from "next/link"
import styles from "./styles.module.scss"

const Footer = ({ }) => {

    return (
        <footer className={`w-full ${styles.footer}`}>
            <Link href={"https://github.com/kaikyMoura/Basketball-Advandced-Stats"}>github</Link>
        </footer>
    )
}

export default Footer;