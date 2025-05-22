"use client"
import { getArticles } from "@/api/services/articlesService"
import Button from "@/components/Button"
import Card from "@/components/Card/Card"
import { useLoading } from "@/components/Loader/hook"
import { Article } from "@/types/Article"
import Image from "next/image"
import Link from "next/link"
import { Suspense, useCallback, useEffect, useState } from "react"
import { TbReload } from "react-icons/tb"
// import styles from "./page.module.scss"

const News = () => {
    const { isLoading, setLoading } = useLoading()

    const [articles, setArticles] = useState<Article[] | undefined>([])
    // const [headlines, setheadlines] = useState<Article[] | undefined>([])

    const [page, setPage] = useState(1)

    const fetchArticles = useCallback(async () => {
        try {
            setLoading(true)
            const response = await getArticles(undefined, undefined, undefined, page, 8)

            if (response) {
                setLoading(false)

                setArticles((prev) => {
                    // add new data to the existing data
                    const all = [...(prev || []), ...(response.data || [])];

                    // removing duplicates
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
        finally {
            setLoading(false)
        }
    }, [setLoading])

    useEffect(() => {
        fetchArticles()
    }, [fetchArticles])

    return (<>
        <div className={`flex flex-col gap-6`}>
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
            <div className="rounded-lg overflow-hidden transition duration-300 ease-in-out">
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Suspense fallback={<p>Loading...</p>}>
                        {articles && articles?.map((article, index) => (
                            <li key={`${article.url}-${index}`}>
                                <Card className={`flex flex-col justify-center bg-(--component-color) rounded-xl p-4 overflow-hidden transition duration-300 hover:scale-105`} pages={1}>
                                    <Link href={`${article.url}`}>
                                        <p className="font-medium text-2xl">{article.source!.toUpperCase()}</p>
                                        {article.image && (
                                            <Image src={article.image!} loading="lazy" className="mt-4" alt={article.title!} width={400} height={250} />
                                        )}
                                        <p className="mt-4 font-medium text-2xl">{article.title}</p>
                                    </Link>
                                    <Link href={`${article.url}`} target="_blank" rel="noreferrer noopener">
                                        <button className="mt-4"><p className="bg-[#808080] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm">Read more</p></button>
                                    </Link>
                                </Card>
                            </li>
                        ))}
                    </Suspense>
                </ul>
            </div>
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
        </div >
    </>)
}

export default News