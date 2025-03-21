// "use client";
// import React, { useEffect, useState } from "react";
// import { GetCookie } from "../../../actions/cookie";

// const perfilContainerStyle = {
//   padding: "2rem",
//   backgroundColor: "#333",
//   borderRadius: "10px",
//   boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.3)",
//   maxWidth: "800px",
//   margin: "2rem auto",
//   textAlign: "center",
// };

// const perfilInfoStyle = {
//   display: "grid",
//   gridTemplateColumns: "1fr 1fr",
//   gap: "1.5rem",
//   textAlign: "left",
// };

// const perfilItemStyle = {
//   backgroundColor: "#222",
//   padding: "1rem",
//   borderRadius: "5px",
//   border: "2px solid #333",
//   color: "#fff",
// };

// const perfilTituloStyle = {
//   fontSize: "1.8rem",
//   marginBottom: "1rem",
// };

// const perfilBotaoStyle = {
//   backgroundColor: "#2ecc71",
//   color: "#111",
//   border: "none",
//   padding: "1rem 2rem",
//   borderRadius: "5px",
//   cursor: "pointer",
//   fontSize: "1rem",
//   marginTop: "1.5rem",
//   transition: "background-color 0.3s ease",
// };

// const perfilBotaoHoverStyle = {
//   backgroundColor: "#27ae60",
// };

// const VerPerfilMotorista = () => {
//   const [perfil, setPerfil] = useState({})
  
//   useEffect(() => {
//     (async () => {
//       const data = await GetCookie()
//       setPerfil(data.data)
//     })()
//   }, [])

//   return (
//     <div style={perfilContainerStyle}>
//       <h1 style={perfilTituloStyle}>Perfil de {perfil.nome}</h1>
//       <div style={perfilInfoStyle}>
//         <div style={perfilItemStyle}><strong>Email:</strong> {perfil.email}</div>
//         <div style={perfilItemStyle}><strong>Nº Habilitação:</strong> {perfil.habilitacao}</div>
//       </div>
//       <button
//         style={perfilBotaoStyle}
//         onMouseOver={(e) => (e.target.style.backgroundColor = perfilBotaoHoverStyle.backgroundColor)}
//         onMouseOut={(e) => (e.target.style.backgroundColor = perfilBotaoStyle.backgroundColor)}
//       >
//         Editar Perfil
//       </button>
//     </div>
//   );
// };

// export default VerPerfilMotorista;

"use client";
import React, { useEffect, useState } from "react";
import { GetCookie } from "../../../../actions/cookie";

const VerPerfilMotorista = () => {
    const [perfil, setPerfil] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [editedPerfil, setEditedPerfil] = useState({});

    // Lista de campos que NÃO devem ser exibidos
    const camposOcultos = ["id", "fotoB64"];

    useEffect(() => {
        (async () => {
            const data = await GetCookie();
            setPerfil(data.data);
            setEditedPerfil(data.data);
        })();
    }, []);

    const handleChange = (e) => {
        setEditedPerfil({ ...editedPerfil, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        try {
            const response = await fetch(`http://localhost:3002/driver/${perfil.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(editedPerfil),
            });

            if (!response.ok) throw new Error("Erro ao salvar perfil");

            setPerfil(editedPerfil);
            setIsEditing(false);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div style={perfilContainerStyle}>
            <h1 style={perfilTituloStyle}>
                {isEditing ? "Editar Perfil" : `Perfil de ${perfil.nome}`}
            </h1>

            <div style={perfilInfoStyle}>
                {Object.entries(perfil)
                    .filter(([key]) => !camposOcultos.includes(key))
                    .map(([key, value]) => (
                        <div key={key} style={isEditing ? perfilItemStyleEdit : perfilItemStyle}>
                            <strong>{key.toUpperCase()}:</strong>{" "}
                            {isEditing ? (
                                <input
                                    type="text"
                                    name={key}
                                    value={editedPerfil[key] || ""}
                                    onChange={handleChange}
                                    style={inputStyle}
                                />
                            ) : (
                                <div style={spanStyle}>{value}</div>
                            )}
                        </div>
                    ))}
            </div>

            {isEditing ? (
                <button
                    style={{ ...perfilBotaoStyle }}
                    onClick={handleSave}
                >
                    Salvar
                </button>
            ) : (
                <button
                    style={perfilBotaoStyle}
                    onClick={() => setIsEditing(true)}
                    onMouseOver={(e) => (e.target.style.backgroundColor = perfilBotaoHoverStyle.backgroundColor)}
                    onMouseOut={(e) => (e.target.style.backgroundColor = perfilBotaoStyle.backgroundColor)}
                >
                    Editar Perfil
                </button>
            )}
        </div>
    );
};

const perfilContainerStyle = {
    padding: "2rem",
    backgroundColor: "#333",
    borderRadius: "10px",
    width: "500px",
    margin: "20px 0px 0px 0px",
    textAlign: "center",
};

const perfilInfoStyle = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "1rem",
    textAlign: "left",
};

const perfilItemStyleEdit = {
    backgroundColor: "#222",
    padding: "10px",
    borderRadius: "8px",
    color: "#fff",
};

const perfilItemStyle = {
    padding: "10px",
    borderRadius: "8px",
    color: "#fff",
};

const perfilTituloStyle = {
    fontSize: "1.8rem",
    marginBottom: "1rem",
};

const perfilBotaoStyle = {
    backgroundColor: "#2ecc71",
    color: "#fff",
    border: "none",
    padding: "0.8rem 1rem",
    borderRadius: "5px",
    cursor: "pointer",
    width: "100%",
    fontSize: "1rem",
};

const perfilBotaoHoverStyle = {
    backgroundColor: "#2ecc71",
};

const inputStyle = {
    width: "200px",
    padding: "8px",
    borderRadius: "5px",
    border: "1px solid #555",
    fontSize: "1rem",
    backgroundColor: "#444",
    color: "#fff",
};

const spanStyle = {
    display: "block", 
    width: "200px",
    padding: "8px",
    borderRadius: "5px",
    fontSize: "1rem",
    color: "#fff",
    backgroundColor: "#444",
    border: "1px solid #555", 
    height: "40px", 
    lineHeight: "1.5", 
    margin: "0px 1px 4px 1px",  
    textAlign: "center",
};

export default VerPerfilMotorista;
