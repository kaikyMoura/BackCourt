'use client'
import { usePathname } from "next/navigation";
import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react";
import { useLoading } from "../../components/ui/Loader/hook";

interface RouteTransitionContextProps {
    isPending: boolean | false,
    setIsPending: Dispatch<SetStateAction<boolean>>
}

const RouteTransitionContext = createContext<RouteTransitionContextProps | undefined>(undefined)

export const RouteTransitionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const pathname = usePathname()

    const [isPending, setIsPending] = useState<boolean | false>(false)
    const { setLoading } = useLoading()

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 500);

        setLoading(true);

        return () => clearTimeout(timer);
    }, [pathname, setLoading]);

    return (
        <RouteTransitionContext.Provider value={{ isPending, setIsPending }}>
            {children}
        </RouteTransitionContext.Provider>
    );
};

export default RouteTransitionContext;