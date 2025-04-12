import "@/styles/globals.css";
import Sidebar from "../../components/Sidebar";
import { ReactNode } from "react";

interface RootLayoutProps {
    children: ReactNode;
}

export default function AdminLayout({ children } : RootLayoutProps) {
    return (
        <div className="grid w-screen h-screen grid-cols-[250px_1fr]">
            <Sidebar role={"admin"} />
            <main className="m-auto">
                {children}
            </main>
        </div>
    );
}