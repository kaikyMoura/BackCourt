"use client"
import Footer from "@/components/Footer";
import SideMenuImpl from "@/components/SideMenuImpl";
import ToolBar from "@/components/ToolBar";

export default function AuthenticatedLayout({ children }: { children: React.ReactNode }) {

    return (
        <div className="flex min-h-screen">
            <SideMenuImpl />
            <ToolBar />
            <main className="flex-grow p-14 transition-[margin-left,width] duration-500 ease-in-out lg:ml-(--sidebar-width) md:ml-0 sm:ml-0">
                {children}
            </main>
            <Footer />
        </div>
    )
}