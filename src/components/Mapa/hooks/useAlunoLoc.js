import L from "leaflet";
import { useState } from "react";

export const useAlunoLoc = (mapRef) => {

    const [alunosLoc, setAlunosLoc] = useState([])

    const marcadorAluno = async (alunosEnderecos) => {

        let alunosLocVariavel = [];

        if (!mapRef.current) return;

        const user_agent = "Geopy Library";
        const baseUrl = "https://nominatim.openstreetmap.org/search";

        for (const item of alunosEnderecos) {
            const query = new URLSearchParams({
                q: item.endereco,
                format: 'json',
                addressdetails: 1,
                limit: 1,
            });
            try {
                const resp = await fetch(`${baseUrl}?${query.toString()}`, {
                    method: 'GET',
                    headers: { 'User-Agent': user_agent }
                });

                const data = await resp.json();

                if (data.length > 0) {
                    const loc = data[0];
                    const lat = parseFloat(loc.lat);
                    const lon = parseFloat(loc.lon);

                    alunosLocVariavel.push({lat, lon})

                    L.marker([lat, lon], {
                        icon: L.divIcon({
                            html: `<div class="w-10 h-10 rounded-full bg-cover bg-center border-2 border-white shadow-md" 
                                      style="background-image: url(${item.foto});"></div>`,
                            className: '', 
                            iconSize: [40, 40],
                            iconAnchor: [20, 20]
                        }),
                    }).addTo(mapRef.current).bindPopup(`${item.nome} <br> ${item.endereco}`);

                } else {
                    console.log(`Nenhum resultado encontrado para o local: `, error);
                }
            } catch (error) {
                console.error(`Erro ao buscar localização para o local: `, error);
            }
        }

        setAlunosLoc(alunosLocVariavel)
    }

    return { marcadorAluno, alunosLoc }
}