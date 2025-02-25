// app/aluno/layout.js
import "../../styles/globals.css";
import Sidebar from "../../components/Sidebar";

const mockAluno = {
  role: "aluno",
  nome: "Aluno Exemplo",
  foto: "/default-aluno.png",
};

export default function AlunoLayout({ children }) {
  return (
    <div style={layoutStyles.container}>
      <Sidebar role={mockAluno.role} userData={mockAluno} />
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
