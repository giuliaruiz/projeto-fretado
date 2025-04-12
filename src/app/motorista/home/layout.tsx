import "@/styles/globals.css";
import Sidebar from "@/components/Sidebar";
import { ReactNode } from "react";

interface RootLayoutProps {
    children: ReactNode;
}

export default function AlunoLayout({ children }: RootLayoutProps) {
    return (
        <div className="grid w-screen h-screen grid-cols-[250px_1fr]">
            <Sidebar role={"motorista"} />
            <main className="m-auto  w-5/6 h-[90%] rounded-lg px-10 py-8 bg-[#333]">
                {children}
            </main>
        </div>
    );
}