import ClientProviders from "@/components/ClientProviders";
import { Metadata } from "next";
import '../styles/globals.css';

import type { Viewport } from 'next'

export const metadata: Metadata = {
    metadataBase: new URL('https://example.com'),
    title: 'Backcourt | NBA Stats & News',
    description: 'Your ultimate source for in-depth NBA coverage.',
    keywords: ['NBA', 'Basketball', 'Stats', 'Players', 'Teams'],
    authors: [{ name: 'Kaiky Tupinambá', url: 'https://github.com/kaikyMoura' }],
    icons: {
        icon: '/favicon.ico',
        apple: '/apple-icon.png',
    },
    openGraph: {
        title: 'Backcourt - NBA Stats & News',
        description: 'Explore comprehensive stats, teams, and players.',
        url: 'https://backcourt.app',
        siteName: 'Backcourt',
        images: [
            {
                url: '/og-image.png',
                width: 1200,
                height: 630,
            },
        ],
        type: 'website',
    },
}

export const viewport: Viewport = {
    themeColor: '#161616',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <ClientProviders>
                    {children}
                </ClientProviders>
            </body>
        </html>
    );
}