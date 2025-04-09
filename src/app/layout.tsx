import { useAuth } from "@/contexts/AuthContext/useAuth";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
    title: 'Backcourt | NBA Stats & News',
    description: 'Your ultimate source for in-depth NBA coverage.',
    keywords: ['NBA', 'Basketball', 'Stats', 'Players', 'Teams'],
    authors: [{ name: 'Kaiky Tupinambá', url: 'https://github.com/kaikyMoura' }],
    icons: {
        icon: '/favicon.ico',
        apple: '/apple-icon.png',
    },
    themeColor: '#2699ef',
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const { isAuthenticated } = useAuth()

    if (isAuthenticated) redirect('/')

    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}