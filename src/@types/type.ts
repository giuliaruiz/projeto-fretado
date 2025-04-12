import { ReactNode } from "react";

export type SlideBarItem = {
    link: string;
    label: string;
    icon: ReactNode;
    children?: SlideBarItem[];
};

export type Perfil = {
    nome?: string;
    foto?: string;
}

export type Aluno = {
    id: number;
    nome: string;
    email: string
    senha: string;
    cpf: string;
    telefone: string;
    faculdade: string;
    cep: string;
    cidade: string;
    bairro: string;
    rua: string;
    numero: string;
    itinerario?: number;
    fotoB64?: string;
    ordem?: number;
    presenca: boolean;
}

export type AlunoCreate = Omit<Aluno, "id" | "senha" | "presenca">;

export type Motorista = {
    id: number;
    nome: string;
    email: string;
    telefone: string;
    senha: string;
    habilitacao: string;
    itinerario?: number;
    fotoB64?: string;
}

export type MotoristaCreate = Omit<Motorista, "id" | "senha" | "itinerario" | "fotoB64">;

export type Van = {
    id: number;
    modelo: string;
    placa: string;
    capacidade: string;
    itinerario?: number;
    ano: string;
    cor: string;
}

export type VanCreate = Omit<Van, "id" | "itinerario">;

export type Admin = {
    id: number;
    nome: string;
    email: string;
    senha: string;
    fotoB64?: string;
}

export type Itinerario = {
    id: number;
    nome: string;
    inicio: string;
    cep_inicio: string;
    cidade_inicio: string;
    bairro_inicio: string;
    rua_inicio: string;
    numero_inicio: string;
    final: string;
    cep_final: string;
    cidade_final: string;
    bairro_final: string;
    rua_final: string;
    numero_final: string;
    motorista?: number;
    van?: number;
}

export type ItinerarioCreate = Omit<Itinerario, "id">;