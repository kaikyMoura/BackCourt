import { useLoadingContext } from "@/contexts/LoadingContextProvider"
import Cookies from "js-cookie"
import styles from "./styles.module.scss"
import { useThemeContext } from "@/contexts/ThemeContextProvider"
import { useEffect } from "react"

const Dashboard = () => {
    const { setLoading } = useLoadingContext()
    const { theme, toggleTheme } = useThemeContext()

    useEffect(() =>{},[theme, toggleTheme])

    return (<>
        <div className={`flex ml-64 gap-6 ${styles.container} bg-white`}>
            <button onClick={() => Cookies.remove('Token')}>Sair</button>
            <button onClick={() => setLoading(true)}>carregar</button>
            <button onClick={toggleTheme}>{theme === 'dark' ? "🌙 Modo Escuro" : "☀️ Modo Claro"} </button>
        </div>
    </>)
}

export default Dashboard