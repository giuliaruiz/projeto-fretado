// app/motorista/layout.js
import "../../styles/globals.css";
import Sidebar from "../../components/Sidebar";

// Exemplo de dados do motorista (no futuro, esses dados virão de um contexto ou de uma API)
const mockMotorista = {
  role: "motorista",
  nome: "Motorista Exemplo",
  foto: "/default-motorista.png",
};

export default function MotoristaLayout({ children }) {
  return (
    <div style={layoutStyles.container}>
      <Sidebar role={mockMotorista.role} userData={mockMotorista} />
      <main style={layoutStyles.mainContent}>
        {children}
      </main>
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
