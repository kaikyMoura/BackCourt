import Card from "../Card/Card";
import styles from "./PlayerInfoCard.module.scss"

const PlayerInfoCard = () => {

    return (
        <Card pages={1} className="p-4">
            <div className="overflow-x-auto">
                <table className="table-auto w-full border-collapse">
                    <thead className="bg-(--component-color) text-white">
                        <tr>
                            <th className="px-4 py-2">FIRST_NAME</th>
                            <th className="px-4 py-2">LAST_NAME</th>
                            <th className="px-4 py-2">DISPLAY_FIRST_LAST</th>
                            <th className="px-4 py-2">DISPLAY_LAST_COMMA_FIRST</th>
                            <th className="px-4 py-2">DISPLAY_FI_LAST</th>
                            <th className="px-4 py-2">PLAYER_SLUG</th>
                            <th className="px-4 py-2">BIRTHDATE</th>
                            <th className="px-4 py-2">SCHOOL</th>
                            <th className="px-4 py-2">COUNTRY</th>
                            <th className="px-4 py-2">LAST_AFFILIATION</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b">
                            <td className="px-4 py-2">Nikola</td>
                            <td className="px-4 py-2">Jokić</td>
                            <td className="px-4 py-2">Nikola Jokić</td>
                            <td className="px-4 py-2">Jokić, Nikola</td>
                            <td className="px-4 py-2">N. Jokić</td>
                            <td className="px-4 py-2">nikola-jokić</td>
                            <td className="px-4 py-2">1995-02-19T00:00:00</td>
                            <td className="px-4 py-2">Mega Basket</td>
                            <td className="px-4 py-2">Serbia</td>
                            <td className="px-4 py-2">Mega Basket/Serbia</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="overflow-x-auto mt-4">
                <table className="table-auto w-full border-collapse">
                    <thead className="bg-(--component-color) text-white">
                        <tr>
                            <th className="px-4 py-2">HEIGHT</th>
                            <th className="px-4 py-2">WEIGHT</th>
                            <th className="px-4 py-2">SEASON_EXP</th>
                            <th className="px-4 py-2">JERSEY</th>
                            <th className="px-4 py-2">POSITION</th>
                            <th className="px-4 py-2">ROSTERSTATUS</th>
                            <th className="px-4 py-2">GAMES_PLAYED_CURRENT_SEASON_FLAG</th>
                            <th className="px-4 py-2">TEAM_NAME</th>
                            <th className="px-4 py-2">TEAM_ABBREVIATION</th>
                            <th className="px-4 py-2">TEAM_CODE</th>
                            <th className="px-4 py-2">TEAM_CITY</th>
                            <th className="px-4 py-2">PLAYERCODE</th>
                            <th className="px-4 py-2">FROM_YEAR</th>
                            <th className="px-4 py-2">TO_YEAR</th>
                            <th className="px-4 py-2">DLEAGUE_FLAG</th>
                            <th className="px-4 py-2">NBA_FLAG</th>
                            <th className="px-4 py-2">GAMES_PLAYED_FLAG</th>
                            <th className="px-4 py-2">DRAFT_YEAR</th>
                            <th className="px-4 py-2">DRAFT_ROUND</th>
                            <th className="px-4 py-2">DRAFT_NUMBER</th>
                            <th className="px-4 py-2">GREATEST_75_FLAG</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b">
                            <td className="px-4 py-2">6-11</td>
                            <td className="px-4 py-2">284</td>
                            <td className="px-4 py-2">9</td>
                            <td className="px-4 py-2">15</td>
                            <td className="px-4 py-2">Center</td>
                            <td className="px-4 py-2">Active</td>
                            <td className="px-4 py-2">Y</td>
                            <td className="px-4 py-2">Nuggets</td>
                            <td className="px-4 py-2">DEN</td>
                            <td className="px-4 py-2">nuggets</td>
                            <td className="px-4 py-2">Denver</td>
                            <td className="px-4 py-2">nikola_jokic</td>
                            <td className="px-4 py-2">2015</td>
                            <td className="px-4 py-2">2024</td>
                            <td className="px-4 py-2">N</td>
                            <td className="px-4 py-2">Y</td>
                            <td className="px-4 py-2">Y</td>
                            <td className="px-4 py-2">2014</td>
                            <td className="px-4 py-2">2</td>
                            <td className="px-4 py-2">41</td>
                            <td className="px-4 py-2">N</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </Card>
    )
}

export default PlayerInfoCard;