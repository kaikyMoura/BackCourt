import { useLoadingContext } from "@/contexts/LoadingContextProvider";
import { useThemeContext } from "@/contexts/ThemeContextProvider";
import { useEffect } from "react";
import { MdWbSunny } from "react-icons/md";
import SearchBar from "../SearchBar";
import styles from "./styles.module.scss"
import { AiFillMoon } from "react-icons/ai";

const ToolBar = () => {

    const { setLoading } = useLoadingContext()
    const { theme, toggleTheme } = useThemeContext()

    useEffect(() => { }, [theme, toggleTheme])


    return (
        <div className={`fixed z-120 ${styles.toolbar_container}`}>
            <div className={`flex items-center ml-4 mr-4`}>
                <SearchBar keys={['full_name', 'full_name']} />

                {/* Theme switcher */}
                <div className="fixed top-5 right-2">
                    <div
                        className={`${styles.switch} ${theme === "dark" ? styles.dark : styles.light}`}
                        onClick={toggleTheme}
                    >
                        <div className={styles.slider}>
                            <div className={styles.icon}>
                                {theme === "dark" ? (
                                    <>
                                        <AiFillMoon className={styles.moon} />
                                    </>
                                ) : (
                                    <MdWbSunny className={styles.sun} />
                                )}
                            </div>
                            <div className={styles.circle}></div>
                        </div>
                    </div>
                </div>
                <div>
                    {/**
                     * Todo
                     * Create a user profile component
                     */}
                </div>
            </div>
        </div>
    )
}

export default ToolBar;