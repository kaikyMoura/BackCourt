import { useLoadingContext } from "@/contexts/LoadingContextProvider"
import styles from "./styles.module.scss"
import { useThemeContext } from "@/contexts/ThemeContextProvider"
import { useEffect, useState } from "react"
import Card from "@/components/Card"
import { getArticles } from "@/api/services/articlesService"
import { Article } from "@/model/Article"
import Image from "next/image"
import Link from "next/link"
import { TbReload } from "react-icons/tb"

const News = () => {
    const { isLoading, setLoading } = useLoadingContext()

    const [articles, setArticles] = useState<Article[] | undefined>([])
    const [headlines, setheadlines] = useState<Article[] | undefined>([])

    const [page, setPage] = useState(1)

    const fetchArticles = async () => {
        setLoading(true)

        try {
            const response = await getArticles(undefined, undefined, undefined, page, 8)

            if (response) {
                setLoading(false)
                setArticles((prev) => [...(prev) || [], ...(response.data) || []])
                setPage((prev) => prev + 1)
            }
        }
        catch (err) {
            setLoading(false)
            console.error("Error: " + err)
        }
    }

    const resetArticles = async () => {
        setLoading(true)
        setPage(1)
        setArticles([])
        
        try {
            const response = await getArticles(undefined, undefined, undefined, page, 8)

            if (response) {
                setLoading(false)
                setArticles(response.data)
            }
        } catch (error) {
            console.error("Erro ao resetar artigos:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {

        fetchArticles()
    }, [])

    return (<>
        <div className={`flex flex-col gap-6 ${styles.container}`}>
            <h1 className="font-bold text-2xl">Latest News</h1>
            <div className="flex justify-self-end gap-4">
                <button
                    onClick={resetArticles}
                    disabled={isLoading}
                    className="flex items-center bg-gray-900 rounded-md p-3"
                >
                    <p className="font-normal text-lg">Reload</p>
                    <TbReload fontSize={26} color="#fff"/>
                </button>
            </div>
            <ul className="flex flex-wrap">
                {articles?.map(article => (
                    <li key={article.title}>
                        <Card className={`flex flex-col justify-center ${styles.card}`} pages={1}>
                            <>
                                <Link href={`${article.url}`}>
                                    <a href={article.url} target="_blank" rel="noreferrer">
                                        <p className="font-medium text-2xl">{article.source!.toUpperCase()}</p>
                                    </a>
                                    {article.image && (
                                        <Image src={article.image!} className={`mt-4 ${styles.articleImage}`} alt={article.title!} width={400} height={250} />
                                    )}
                                    <p className="mt-4 font-medium text-2xl">{article.title}</p>
                                </Link>
                                <a href={article.url} target="_blank" rel="noreferrer">
                                    <button className="mt-4"><p className="text-gray-900">Read more</p></button>
                                </a>
                            </>
                        </Card>
                    </li>
                ))}
            </ul>
            <div className="flex justify-self-center w-full">
                <button
                    onClick={fetchArticles}
                    disabled={isLoading}
                    className="flex items-center p-2 bg-gray-900 text-white rounded-md w-32"
                >
                    {isLoading ? "Carregando..." : "Carregar mais"}
                </button>
            </div>
            {/* <button onClick={() => Cookies.remove('Token')}>Sair</button>
            <button onClick={() => setLoading(true)}>carregar</button>
            <button onClick={toggleTheme}>{theme === 'dark' ? "🌙 Modo Escuro" : "☀️ Modo Claro"} </button> */}
        </div >
    </>)
}

export default News