import { useEffect, useRef, useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa6';

const Table = ({ className, data, fields, headers }: {
    className?: string
    data: Record<string, string | number>[]
    fields: string[]
    headers?: string[]
}) => {

    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    useEffect(() => {
        checkScroll();
    }, []);

    const checkScroll = () => {
        const el = scrollContainerRef.current;
        if (el) {
            setCanScrollLeft(el.scrollLeft > 5);
            setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 5);
        }
    };

    /**
     * Smoothly scrolls the table by 300px in the given direction. Does nothing if the table can't be scrolled in that direction.
     * @param {"left" | "right"} direction The direction to scroll the table. "left" will scroll left, "right" will scroll right.
     */
    const scrollTable = (direction: "left" | "right") => {
        const el = scrollContainerRef.current;
        if (!el) return;
        const amount = 300;
        el.scrollBy({ left: direction === "left" ? -amount : amount, behavior: "smooth" });
    };

    useEffect(() => {
        const el = scrollContainerRef.current;

        const handleScroll = () => checkScroll();
        const handleResize = () => checkScroll();

        if (el) {
            el.addEventListener("scroll", handleScroll);
            window.addEventListener("resize", handleResize);

            return () => {
                el.removeEventListener("scroll", handleScroll);
                window.removeEventListener("resize", handleResize);
            };
        }

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [scrollContainerRef]);

    if (!Array.isArray(data) || data.length === 0) return <p>No data</p>;

    return (
        <div className="relative w-full">
            {canScrollLeft && (
                <button
                    onClick={() => scrollTable("left")}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 shadow"
                >
                    <FaArrowLeft className='text-(--text-color)' fontSize={22} />
                </button>
            )}
            {canScrollRight && (
                <button
                    onClick={() => scrollTable("right")}
                    className="absolute right-2 top-1/2 -translate-y-1/2 z-20 p-2 shadow"
                >
                    <FaArrowRight className='text-(--text-color)' fontSize={22} />
                </button>
            )}

            <div
                ref={scrollContainerRef}
                className={`overflow-x-auto scroll-smooth ${className}`}
            >
                <table className="text-sm table-auto border-collapse min-w-max">
                    <thead className="sticky top-0 bg-[#808080] z-10">
                        <tr className="text-center">
                            {(headers ?? fields).map((header: string, i: number) => (
                                <th key={i} className="px-4 py-2 whitespace-nowrap">{header}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row: Record<string, string | number>, index: number) => (
                            <tr key={index} className="text-center">
                                {fields.map((field: string) => (
                                    <td key={field} className="px-4 py-2 whitespace-nowrap">
                                        {row[field] ?? '-'}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Table;