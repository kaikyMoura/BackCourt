'use client';

import { AuthProvider } from '@/contexts/AuthContext/AuthContext';
import { LoadingProvider } from '@/components/Loader/context';
import { ThemeProvider } from '@/contexts/ThemeContext/ThemeContext';
import { Tooltip } from 'react-tooltip';

export default function ClientProviders({ children }: { children: React.ReactNode }) {
    return (
        <LoadingProvider>
                <ThemeProvider>
                    <AuthProvider>
                        {children}
                        <Tooltip id="my-tooltip" className='z-120' place="right-start" />
                    </AuthProvider>
                </ThemeProvider>
        </LoadingProvider>
    );
}
