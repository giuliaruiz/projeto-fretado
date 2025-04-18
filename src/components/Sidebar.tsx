"use client";
import { itemAluno, itemAdmin, itemMotorista } from "@/utils/sidebarConstant";
import { getMotoristaById } from "@/controllers/motorista";
import { Perfil, SlideBarItem } from "@/@types/type";
import { getAlunoById } from "@/controllers/aluno";
import { getAdminById } from "@/controllers/admin";
import React, { useEffect, useState } from "react"
import { GetCookie } from "@/actions/cookie"
import { useRouter } from "next/navigation"

interface ISideBar {
    role : string;
}

interface IFotoUser {
    fotoB64: string;
}

export default function Sidebar({ role } : ISideBar) {

    const [perfil, setPerfil] = useState<Perfil>({})
    const router = useRouter();
    const [openMenus, setOpenMenus] = useState<Record<number, boolean>>({});

    const handleNavigation = (path : string) => { router.push(path) }
    const handleLogout = () => { router.push("/") }

    useEffect(() => {
        (async () => {
            const data = await GetCookie();
            let fotoUser : any
            
            if (role == "aluno") {
                fotoUser = await getAlunoById(data.data.id)
            }
            if (role == "admin") {
                fotoUser = await getAdminById(data.data.id)
            }
            if (role == "motorista") {
                fotoUser = await getMotoristaById(data.data.id)
            }

            setPerfil({ ...data.data, foto: fotoUser?.fotoB64 })
        })();
    }, []);

    const toggleMenu = (index : number) => {
        setOpenMenus((prev) => ({ ...prev, [index]: !prev[index] }));
    };

    const renderMenuItems = (menuItems : SlideBarItem[]) => {
        return menuItems.map((item, index) => (
            <li
                key={index}
                className="flex flex-col w-full items-start cursor-pointer p-4 border-b border-[#333]"
            >
                <div
                    onClick={() => item.children ? toggleMenu(index) : handleNavigation(item.link)}
                    className="flex flex-row gap-1 w-full justify-start"
                >
                    {item.icon}
                    {item.label}
                </div>

                {item.children && openMenus[index] && (
                    <ul
                        className={`flex flex-col w-full p-1 gap-2 overflow-hidden max-h-0 ${openMenus[index] ? "max-h-screen" : "max-h-0"}`} >
                        {item.children.map((child, childIndex) => (
                            <li
                                key={childIndex}
                                className="cursor-pointer flex gap-2 items-center text-[#dddddd]"
                                onClick={() => handleNavigation(child.link)}
                            >
                                {child.icon}
                                {child.label}
                            </li>
                        ))}
                    </ul>
                )}
            </li >
        ))
    }

    return (
        <div className="w-full h-full bg-[#222] flex flex-col py-8 px-4">
            <div className="flex flex-col items-center w-full">
                <img
                    src={perfil.foto || "./fotoperfil.jpg"}
                    alt="Foto de Perfil"
                    className="w-24 h-24 rounded-full mb-2 bg-black"
                />
                <h2 className="text-xl">
                    {perfil.nome}
                </h2>
            </div>
            <ul className="w-full">
                {role === "admin" && renderMenuItems(itemAdmin)}
                {role === "motorista" && renderMenuItems(itemMotorista)}
                {role === "aluno" && renderMenuItems(itemAluno)}
            </ul>
            <div className="mt-auto w-full">
                <button
                    onClick={handleLogout}
                    className="bg-[#2ecc71] text-white border-none rounded w-full cursor-pointer px-3 py-4"
                >
                    SAIR
                </button>
            </div>
        </div>
    );
}