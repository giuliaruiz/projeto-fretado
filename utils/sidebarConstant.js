import { User, Truck, UserRoundPlus, List, MapPinPlus, MapPin, House } from "lucide-react"

export const defaultIconProps = {
    className: "me-1",
    size: 18
}
    // < li style = { styles.item } onClick = {() => handleNavigation("/motorista/perfil")}>
    //     Ver Perfil
    //             </li >
    //             <li style={styles.item} onClick={() => handleNavigation("/motorista/itinerarios")}>
    //                 Itinerários
    //             </li>
    //             <li style={styles.item} onClick={() => handleNavigation("/motorista/horarios")}>
    //                 Horários
    //             </li>

export const itemAdmin = [
    {
        link: "/admin",
        label: "Home",
        icon: <House {...defaultIconProps} />,
    },
    {
        link: "",
        label: "Aluno",
        icon: <User {...defaultIconProps} />,
        children: [
            {
                link: "/admin/aluno/listar",
                label: "Listar Alunos",
                icon: <List {...defaultIconProps} />
            },
            {
                link: "/admin/aluno/cadastrar",
                label: "Cadastrar Alunos",
                icon: <UserRoundPlus {...defaultIconProps} />
            },
        ]
    },
    {
        link: "",
        label: "Motorista",
        icon: <User {...defaultIconProps} />,
        children: [
            {
                link: "/admin/motorista/listar",
                label: "Listar Motorista",
                icon: <List {...defaultIconProps} />
            },
            {
                link: "/admin/motorista/cadastrar",
                label: "Cadastrar Motorista",
                icon: <UserRoundPlus {...defaultIconProps} />
            },
        ]
    },
    {
        link: "",
        label: "Van",
        icon: <Truck {...defaultIconProps} />,
        children: [
            {
                link: "/admin/van/listar",
                label: "Listar Van",
                icon: <List {...defaultIconProps} />
            },
            {
                link: "/admin/van/cadastrar",
                label: "Cadastrar Van",
                icon: <MapPinPlus {...defaultIconProps} />
            },
        ]
    },
    {
        link: "",
        label: "Trajetos",
        icon: <MapPin {...defaultIconProps} />,
        children: [
            {
                link: "/admin/itinerario/listar",
                label: "Listar Trajetos",
                icon: <List {...defaultIconProps} />
            },
            {
                link: "/admin/itinerario/cadastrar",
                label: "Cadastrar Trajeto",
                icon: <MapPinPlus {...defaultIconProps} />
            },
        ]
    },
]

export const itemAluno = [
    {
        link: "/aluno/perfil",
        label: "Ver Perfil",
        icon: <User {...defaultIconProps} />,
    },
    {
        link: "/aluno/fretado",
        label: "Fretado",
        icon: <Truck {...defaultIconProps} />,
    }
]