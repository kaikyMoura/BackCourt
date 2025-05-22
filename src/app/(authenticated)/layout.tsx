"use client"

import SideMenuImpl from "@/components/features/SideMenuImpl"
import ToolBar from "@/components/features/ToolBar"
import Footer from "@/components/layout/Footer"

export default function AuthenticatedLayout({ children }: { children: React.ReactNode }) {

    return (
        <div className="flex min-h-screen overflow-x-hidden">
            <SideMenuImpl />
            <ToolBar />
            <main className="flex-grow p-14 transition-[margin-left,width] duration-500 ease-in-out lg:ml-(--sidebar-width) md:ml-0 sm:ml-0">
                {children}
            </main>
            <Footer />
        </div>
    )
}