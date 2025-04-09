import { useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa6';
import styles from './Card.module.scss';

const Card = ({ children, className, pages, title }: {
    children: React.ReactNode | React.ReactNode[],
    className?: string,
    pages: number;
    title?: string;
}) => {

    const [currentPage, setCurrentPage] = useState(0);

    const handlePageChange = (page: number) => {
        console.log(page)
        setCurrentPage(page);
    };

    return (
        <div className={`${styles.cardContainer} ${className}`}>
            {currentPage ?
                <button className={`${styles.arrows}`} onClick={() => handlePageChange(currentPage - 1)}>
                    <FaArrowLeft className='cursor-pointer' fontSize={26} />
                    <p className='font-semibold'>Back</p>
                </button>
                : null
            }
            <div className={`${className}`}>
                <h2 className="font-medium text-xl">{title}</h2>
                {pages > 1 ?
                    <>
                        {Array.isArray(children) ? children[currentPage] : children}
                    </>
                    :
                    <>
                        {Array.isArray(children) ? children : [children]}
                    </>
                }
            </div>
            {pages && (
                <>
                    {currentPage < pages - 1 &&
                        <button className={`${styles.arrows}`} onClick={() => handlePageChange(currentPage + 1)}>
                            <p className='font-semibold'>Foward</p>
                            <FaArrowRight className='cursor-pointer' fontSize={26} />
                        </button>
                    }
                </>
            )}
        </div>
    )
}

export default Card;