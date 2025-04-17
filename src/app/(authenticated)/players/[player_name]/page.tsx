"use client"
import PlayerInfoCard from "@/components/PlayerInfoCard"
import StatsTable from "@/components/StatsTable"
import styles from "./page.module.scss"

const PlayerDetails = () => {

    return (
        <div className={`${styles.container} lg:-ml-10`}>
            <PlayerInfoCard />
            <div className="mt-4">
                <StatsTable />
            </div >
        </div >
    )
}

export default PlayerDetails;