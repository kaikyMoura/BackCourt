import Footer from "@/components/Footer";
import SideMenuImpl from "@/components/SideMenuImpl";
import ToolBar from "@/components/ToolBar";
import { useAuth } from "@/contexts/AuthContext/useAuth";
import { redirect } from "next/navigation";

export default function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
    const { isAuthenticated } = useAuth()

    if (!isAuthenticated) redirect("/login");

    return (
        <div className="flex min-h-screen">
            <SideMenuImpl />
            <ToolBar />
            <main className="flex-grow p-14 transition-[margin-left,width] duration-500 ease-in-out ml-(--sidebar-width)">
                {children}
            </main>
            <Footer />
        </div>
    )
}