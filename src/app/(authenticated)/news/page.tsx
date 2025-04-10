"use client"
import { getArticles } from "@/api/services/articlesService"
import Button from "@/components/Button"
import Card from "@/components/Card/Card"
import { Article } from "@/types/Article"
import Image from "next/image"
import Link from "next/link"
import { Suspense, useEffect, useState } from "react"
import { TbReload } from "react-icons/tb"
import styles from "./page.module.scss"
import { useLoading } from "@/contexts/LoadingContext/useLoading"

const News = () => {

    const { isLoading, setLoading } = useLoading()

    const [articles, setArticles] = useState<Article[] | undefined>([])
    // const [headlines, setheadlines] = useState<Article[] | undefined>([])

    const [page, setPage] = useState(1)

    const fetchArticles = async () => {
        setLoading(true)

        try {
            const response = await getArticles(undefined, undefined, undefined, page, 8)

            if (response) {
                setLoading(false)

                setArticles((prev) => {
                    // Add new data to the existing data
                    const all = [...(prev || []), ...(response.data || [])];

                    // This removes duplicates
                    const unique = Array.from(new Map(all.map(a => [a.title, a])).values());

                    return unique;
                });

                setPage((prev) => prev + 1)
            }
        }
        catch (err) {
            setLoading(false)
            console.error("Error: " + err)
        }
    }

    useEffect(() => {
        fetchArticles()
    }, [])

    return (<>
        <div className={`flex flex-col gap-6 ${styles.container}`}>
            <h1 className="font-bold text-2xl">Latest News</h1>
            <div className="flex justify-self-end gap-4">
                <Button
                    className="rounded-md w-32 flex justify-center gap-2 items-center"
                    text={"Reload"}
                    type="submit"
                    style="secondary"
                    action={fetchArticles}
                    disabled={isLoading}
                    icon={<TbReload fontSize={22} color="#fff" />}
                />
            </div>
            <ul className="flex flex-wrap">
                <Suspense fallback={<p>Loading...</p>}>
                    {articles && articles?.map((article, index) => (
                        <li className={styles.card} key={`${article.url}-${index}`}>
                            <Card className={`flex flex-col justify-center`} pages={1}>
                                <Link href={`${article.url}`}>
                                    <p className="font-medium text-2xl">{article.source!.toUpperCase()}</p>
                                    {article.image && (
                                        <Image src={article.image!} loading="lazy" className={`mt-4 ${styles.articleImage}`} alt={article.title!} width={400} height={250} />
                                    )}
                                    <p className="mt-4 font-medium text-2xl">{article.title}</p>
                                </Link>
                                <Link href={`${article.url}`} target="_blank" rel="noreferrer">
                                    <button className="mt-4 "><p className="text-gray-900 hover:text-gray-300">Read more</p></button>
                                </Link>
                            </Card>
                        </li>
                    ))}
                </Suspense>
            </ul>
            <div className="flex justify-center w-full mb-2">
                <Button
                    text={isLoading ? "Loading..." : "Load more"}
                    type="submit"
                    style="secondary"
                    action={fetchArticles}
                    disabled={isLoading}
                    className="rounded w-32 h-10"
                />
            </div>
            {/* <button onClick={() => Cookies.remove('Token')}>Sair</button>
            <button onClick={() => setLoading(true)}>carregar</button>
            <button onClick={toggleTheme}>{theme === 'dark' ? "🌙 Modo Escuro" : "☀️ Modo Claro"} </button> */}
        </div >
    </>)
}

export default News