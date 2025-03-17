import "../../styles/globals.css";
import Sidebar from "../../components/Sidebar";

export default function AdminLayout({ children }) {
    return (
        <div className="grid w-screen h-screen grid-cols-[250px_1fr]">
            <Sidebar role={"admin"} />
            <main className="m-auto">
                {children}
            </main>
        </div>
    );
}