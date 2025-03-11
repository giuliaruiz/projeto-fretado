// components/Sidebar.js
"use client";
import React from "react";
import { useRouter } from "next/navigation";

export default function Sidebar({ role, userData }) {
  const router = useRouter();

  const handleNavigation = (path) => {
    router.push(path);
  };

  const handleLogout = () => {
    // Lógica de logout (limpar tokens, contexto, etc.)
    router.push("/");
  };

  const renderAdminSidebar = () => (
    <>
      <h2 style={styles.header}>Administrador</h2>
      <ul style={styles.list}>
        <li style={styles.item} onClick={() => handleNavigation("/admin/cadastro-motorista")}>
          Cadastrar Motorista
        </li>
        <li style={styles.item} onClick={() => handleNavigation("/admin/cadastro-aluno")}>
          Cadastrar Aluno
        </li>
        <li style={styles.item} onClick={() => handleNavigation("/admin/cadastro-van")}>
          Cadastrar Van
        </li>
        <li style={styles.item} onClick={() => handleNavigation("/admin/cadastro-trajeto")}>
          Cadastrar Trajeto
        </li>
        <li style={styles.item} onClick={() => handleNavigation("/admin/itinerario")}>
          Itinerario
        </li>
        <li style={styles.item} onClick={() => handleNavigation("/admin/aluno")}>
          Alunos
        </li>
      </ul>
    </>
  );

  const renderMotoristaSidebar = () => (
    <>
      <div style={styles.userInfo}>
        <img 
          src="/images/rosto-menino.jpg" 
          alt="Foto do Motorista" 
          style={styles.avatar} 
        />
        <h2 style={styles.header}>{userData?.nome || "Motorista"}</h2>
      </div>
      <ul style={styles.list}>
        <li style={styles.item} onClick={() => handleNavigation("/motorista/perfil")}>
          Ver Perfil
        </li>
        <li style={styles.item} onClick={() => handleNavigation("/motorista/itinerarios")}>
          Itinerários
        </li>
        <li style={styles.item} onClick={() => handleNavigation("/motorista/horarios")}>
          Horários
        </li>
      </ul>
    </>
  );

  const renderAlunoSidebar = () => (
    <>
      <div style={styles.userInfo}>
        <img 
          src="/images/rosto-menina.jpg" 
          alt="Foto do Aluno" 
          style={styles.avatar} 
        />
        <h2 style={styles.header}>{userData?.nome || "Aluno"}</h2>
      </div>
      <ul style={styles.list}>
        <li style={styles.item} onClick={() => handleNavigation("/aluno/perfil")}>
          Ver Perfil
        </li>
        <li style={styles.item} onClick={() => handleNavigation("/aluno/fretado")}>
          Fretado
        </li>
      </ul>
    </>
  );

  return (
    <aside style={styles.sidebar}>
      {role === "admin" && renderAdminSidebar()}
      {role === "motorista" && renderMotoristaSidebar()}
      {role === "aluno" && renderAlunoSidebar()}
      <div style={styles.logoutContainer}>
        <button onClick={handleLogout} style={styles.logoutButton}>
          SAIR
        </button>
      </div>
    </aside>
  );
}

const styles = {
  sidebar: {
    width: "250px",
    backgroundColor: "#222",
    color: "#fff",
    padding: "1rem",
    height: "100vh",
    position: "fixed",
    top: 0,
    left: 0,
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
  },
  userInfo: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: "1rem",
  },
  avatar: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    objectFit: "cover",
    marginBottom: "0.5rem",
  },
  header: {
    fontSize: "1.2rem",
    marginBottom: "1rem",
    textAlign: "center",
  },
  list: {
    listStyle: "none",
    padding: 0,
  },
  item: {
    marginBottom: "0.8rem",
    cursor: "pointer",
    padding: "0.5rem 0",
    borderBottom: "1px solid #333",
    textAlign: "center",
  },
  logoutContainer: {
    marginTop: "auto",
    paddingTop: "1rem",
  },
  logoutButton: {
    backgroundColor: "#2ecc71",
    color: "#fff",
    border: "none",
    padding: "0.8rem 1rem",
    borderRadius: "5px",
    cursor: "pointer",
    width: "100%",
  },
};

