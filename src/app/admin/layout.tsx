"use client"
import Sidebar from "../../components/Sidebar";
import { ReactNode, useState } from "react";
import { Menu } from "lucide-react";
import "@/styles/globals.css";

interface RootLayoutProps {
    children: ReactNode;
}

export default function AdminLayout({ children }: RootLayoutProps) {

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="w-screen h-screen flex flex-col md:grid md:grid-cols-[250px_1fr]">

            <div className="w-full grid justify-start md:hidden shadow px-4 mb-10">
                <button
                    className="flex items-center"
                    onClick={() => setIsSidebarOpen(true)}
                >
                    <Menu className="" />
                </button>
            </div>

            <div
                className={`fixed top-0 left-0 h-full w-64 bg-white shadow transition-transform z-50
                ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:static md:shadow-none`}
            >
                <Sidebar role={"admin"} />
                <button
                    onClick={() => setIsSidebarOpen(false)}
                    className="absolute top-0 bg-transparent text-white hover:bg-transparent right-2 md:hidden"
                >
                    ✕
                </button>
            </div>

            <main className="flex-1 overflow-auto">
                {children}
            </main>
        </div>
    );
}