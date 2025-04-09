'use client';
import Cookies from 'js-cookie';
import { usePathname, useRouter } from "next/navigation";
import React, { createContext, ReactNode, useEffect, useState } from "react";
import { useLoading } from '../LoadingContext/useLoading';


interface AuthContextProps {
    isAuthenticated: boolean | null;
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean | null>>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined)

const publicPages = ['/login', '/registration', '/getStarted', '/verifyAccount', '/accountVerify', '/resetPassword', '/changePassword']

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    const { setLoading } = useLoading()
    const router = useRouter();
    const pathname = usePathname()

    const token = Cookies.get('Token');

    useEffect(() => {
        if (!setLoading) return

        setLoading(true)

        const timer = setTimeout(() => {
            setLoading(false)
        }, 300)

        return () => clearTimeout(timer)
    }, [pathname, setLoading, setLoading])

    // const handleAuthentication = useCallback(async () => {
    //     const token = Cookies.get('Token');

    //     setLoading(true);
    //     if (!token) {
    //         Cookies.remove('Token');
    //         Cookies.remove('UserEmail');
    //         if (!publicPages.includes(router.pathname)) {
    //             setIsAuthenticated(false);
    //             if (router.pathname !== '/login') {
    //                 router.push('/login');
    //             }
    //         } else {
    //             setIsAuthenticated(false);
    //         }
    //     } else {
    //         setIsAuthenticated(true);
    //         if (router.pathname === '/') {
    //             if (router.pathname !== '/') {
    //                 router.push('/');
    //             }
    //         }
    //     }
    //     setLoading(false);
    // }, [router, publicPages, setLoading]);


    // useEffect(() => {
    //     handleAuthentication();
    // }, [router, router.pathname, handleAuthentication]);

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext