import styles from './Loader.module.scss'

const Loader = () => {
    return (
        <div className={`${styles.modal}`}>
            <div className={`${styles.loader}`}>
                <div className={`${styles.line} ${styles.line1}`}></div>
                <div className={`${styles.line} ${styles.line2}`}></div>
            </div>
            <div className={`${styles.shadow}`}></div>
        </div>
    )
}

export default Loader;