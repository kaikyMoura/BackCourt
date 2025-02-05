import { useLoadingContext } from "@/contexts/LoadingContextProvider"
import Cookies from "js-cookie"
import styles from "./styles.module.scss"

const Dashboard = () => {
    const { setLoading } = useLoadingContext()
    return (<>
        <div className={`flex absolute ml-44 gap-6 ${styles.container}`}>
            <button onClick={() => Cookies.remove('Token')}>Sair</button>
            <button onClick={() => setLoading(true)}>carregar</button>
        </div>
    </>)
}

export default Dashboard