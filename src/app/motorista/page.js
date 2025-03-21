import MapaMotorista from "@/components/MapaMotorista";

export default function Motorista() {
    return (
        <div className="w-full h-full">
            <h1 className="text-2xl mb-2">
                Bem-vindo, Motorista!
            </h1>
            <div className="w-full h-full">
                <MapaMotorista />
            </div>
        </div>
    );
}
