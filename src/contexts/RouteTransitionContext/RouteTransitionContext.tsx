'use client'
import { usePathname } from "next/navigation";
import { createContext, Dispatch, ReactNode, SetStateAction, startTransition, useEffect, useState } from "react";
import { useLoading } from "../LoadingContext/useLoading";

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
        startTransition(() => {
            setLoading(true);
        });

        const timer = setTimeout(() => {
            setLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, [pathname, setLoading]);

    return (
        <RouteTransitionContext.Provider value={{ isPending, setIsPending }}>
            {children}
        </RouteTransitionContext.Provider>
    );
};

export default RouteTransitionContext;