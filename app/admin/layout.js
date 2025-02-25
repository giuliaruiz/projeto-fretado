// app/admin/layout.js
import "../../styles/globals.css";
import Sidebar from "../../components/Sidebar";

// Supondo que os dados do usuário venham de um contexto ou sejam mockados aqui
const mockAdmin = {
  role: "admin",
  nome: "Administrador Exemplo",
  foto: "/default-admin.png",
};

export default function AdminLayout({ children }) {
  return (
    <div style={layoutStyles.container}>
      <Sidebar role={mockAdmin.role} userData={mockAdmin} />
      <main style={layoutStyles.mainContent}>{children}</main>
    </div>
  );
}

const layoutStyles = {
  container: {
    display: "flex",
    height: "100vh",
  },
  mainContent: {
    flex: 1,
    padding: "1rem",
    overflowY: "auto",
  },
};
