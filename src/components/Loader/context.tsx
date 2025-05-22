"use client"
import Loader from "@/components/Loader";
import React, { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react";

interface LoadingContextProps {
    isLoading: boolean | false,
    setLoading: Dispatch<SetStateAction<boolean>>
}

const LoadingContext = createContext<LoadingContextProps | undefined>(undefined)

export const LoadingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isLoading, setLoading] = useState(false);

    return (
        <LoadingContext.Provider value={{ isLoading, setLoading }}>
            {children}
            {isLoading && <Loader />}
        </LoadingContext.Provider>
    );
};

export default LoadingContext;