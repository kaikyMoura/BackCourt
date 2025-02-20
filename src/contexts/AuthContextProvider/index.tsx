'use client';
import Cookies from 'js-cookie';
import { useRouter } from "next/router";
import React, { createContext, ReactNode, useEffect, useState } from "react";
import DashBoard from "@/components/Dashboard";
import { useLoadingContext } from '../LoadingContextProvider';


interface AuthContextProps {
    isAuthenticated: boolean | null;
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean | null>>;
}

const AppContext = createContext<AuthContextProps | undefined>(undefined)

const publicPages = ['/login', '/registration', '/getStarted', '/verifyAccount', '/accountVerify', '/resetPassword', '/changePassword']

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    const { setLoading } = useLoadingContext()
    const router = useRouter();
    const token = Cookies.get('Token');

    useEffect(() => {
        const timer = setTimeout(() => {
            if (setLoading) {
                const handleRouteChange = () => {
                    setLoading(true);
                };

                const handleRouteComplete = () => {
                    setLoading(false);
                };

                router.events.on('routeChangeStart', handleRouteChange);
                router.events.on('routeChangeComplete', handleRouteComplete);
                router.events.on('routeChangeError', handleRouteComplete);

                return () => {
                    router.events.off('routeChangeStart', handleRouteChange);
                    router.events.off('routeChangeComplete', handleRouteComplete);
                    router.events.off('routeChangeError', handleRouteComplete);
                };
            }
        }, 0);

        return () => clearTimeout(timer);
    }, [router, router.events, setLoading]);

    useEffect(() => {
        // const handleAuthentication = async () => {
        //     setLoading(true);

        //     if (!token) {
        //         if (!publicPages.includes(router.pathname)) {
        //             setIsAuthenticated(false);
        //             router.replace("/login");
        //         } else {
        //             setIsAuthenticated(false);
        //         }
        //     } else {
        //         setIsAuthenticated(true);
        //     }

        //     setLoading(false);
        // };

        //handleAuthentication();
    }, [token, router.pathname]);

    return (
        <AppContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
            {/* {isAuthenticated ? ( */}
            <DashBoard>
                {children}
            </DashBoard>
            {/* ) : (
                <main>{children}</main>
            )} */}
        </AppContext.Provider>
    );
}

export const useAuthContext = () => {
    const context = React.useContext(AppContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};