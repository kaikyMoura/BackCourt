import styles from './styles.module.scss'

const Loader = () => {
    return (
        <div className={`${styles.modal}`}>
            <div className={`${styles.loader}`}>
                <div className={styles.loader__bar}></div>
                <div className={styles.loader__bar}></div>
                <div className={styles.loader__bar}></div>
                <div className={styles.loader__bar}></div>
                <div className={styles.loader__bar}></div>
                <div className={styles.loader__ball}></div>
            </div>
        </div>
    )
}

export default Loader;