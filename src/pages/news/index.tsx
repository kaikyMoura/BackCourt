import { useLoadingContext } from "@/contexts/LoadingContextProvider"
import styles from "./styles.module.scss"
import { useThemeContext } from "@/contexts/ThemeContextProvider"
import { useEffect, useState } from "react"
import Card from "@/components/Card"
import { getArticles } from "@/api/services/articlesService"
import { Article } from "@/model/Article"
import Image from "next/image"

const News = () => {
    const { setLoading } = useLoadingContext()
    const { theme, toggleTheme } = useThemeContext()

    const [articles, setArticles] = useState<Article[] | undefined>([])
    const [headlines, setheadlines] = useState<Article[] | undefined>([])

    useEffect(() => {
        const fetchArticles = async () => {
            const response = await getArticles("bleacher_report", undefined, 10)

            const headlines = await getArticles("espn-headlines", undefined, 5)
            console.log(response)
            setArticles(response.data)
            setheadlines(headlines.data)
        }
        fetchArticles()
        console.log(articles)
    }, [theme, toggleTheme])

    return (<>
        <div className={`flex flex-col gap-6 ${styles.container}`}>
            <h1 className="font-bold text-2xl">Latest News</h1>
            <ul className="flex flex-wrap">
                {articles?.map(article => (
                    <li key={article.title}>
                        <Card className={styles.card} pages={1}>
                            <>
                                <a href={article.url} target="_blank" rel="noreferrer">
                                    <p className="font-medium text-2xl">{article.source!.toUpperCase()}</p>
                                </a>
                                <Image className={`mt-4 ${styles.articleImage}`} src={article.image!} alt={article.title!} width={400} height={250} />
                                <p className="mt-4 font-medium text-2xl">{article.title}</p>
                                <a href={article.url} target="_blank" rel="noreferrer">
                                    <button className="mt-4">Read more</button>
                                </a>
                            </>
                        </Card>
                    </li>
                ))}
            </ul>
            <Card className={`relative left-10 ${styles.card}`} pages={1}>
                    <h1 className="font-bold text-2xl">Headlines</h1>
                    {headlines?.map(headline => (
                        <li key={headline.title}>
                            <>
                                <p className="mt-4 font-medium text-2xl">{headline.title}</p>
                            </>
                        </li>
                    ))}
            </Card>
            {/* <button onClick={() => Cookies.remove('Token')}>Sair</button>
            <button onClick={() => setLoading(true)}>carregar</button>
            <button onClick={toggleTheme}>{theme === 'dark' ? "🌙 Modo Escuro" : "☀️ Modo Claro"} </button> */}
        </div >
    </>)
}

export default News