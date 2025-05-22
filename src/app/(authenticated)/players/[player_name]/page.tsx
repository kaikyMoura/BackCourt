"use client"
import PlayerInfoCard from "@/components/features/PlayerInfoCard"
import StatsTable from "@/components/features/StatsTable"
import styles from "./page.module.scss"

const PlayerDetails = () => {

    return (
        <div className={`${styles.container} lg:-ml-10`}>
            <PlayerInfoCard />
            <div className="mt-6">
                <StatsTable />
            </div >
            {/* TODO: Add player team mates */}
        </div >
    )
}

export default PlayerDetails;