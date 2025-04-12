import "@/styles/globals.css";
import Sidebar from "@/components/Sidebar";
import { ReactNode } from "react";

interface RootLayoutProps {
    children: ReactNode;
}

export default function Layout({ children }: RootLayoutProps) {
    return (
        <div className="grid w-screen h-screen grid-cols-[250px_1fr]">
            <Sidebar role={"aluno"} />
            <main className="m-auto">
                {children}
            </main>
        </div>
    );
}
