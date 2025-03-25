import L from "leaflet";

export const useInicioFinalLoc = (mapRef) => {

    const marcadorInicio = async (itinerario) => {

        if (!mapRef.current) return;

        const user_agent = "Geopy Library";
        const baseUrl = "https://nominatim.openstreetmap.org/search";

        const query = new URLSearchParams({
            q: `${itinerario.rua_inicio}, ${itinerario.numero_inicio}, ${itinerario.bairro_inicio}, ${itinerario.cidade_inicio}`,
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

                L.marker([lat, lon], {
                    icon: L.divIcon({
                        html: `<div class="w-10 h-10"
                                   style="background-image: url('/inicio.png'); background-size: cover; background-position: center;"></div>`,
                        iconSize: [40, 40],
                        iconAnchor: [20, 20],
                    }),
                }).addTo(mapRef.current).bindPopup(itinerario.inicio);


            } else {
                console.log(`Nenhum resultado encontrado para o local: `, error);
            }
        } catch (error) {
            console.error(`Erro ao buscar localização para o local: `, error);
        }
    }

    const marcadorFinal = async (itinerario) => {

        if (!mapRef.current) return;

        const user_agent = "Geopy Library";
        const baseUrl = "https://nominatim.openstreetmap.org/search";

        const query = new URLSearchParams({
            q: `${itinerario.rua_final}, ${itinerario.numero_final}, ${itinerario.bairro_final}, ${itinerario.cidade_final}`,
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

                L.marker([lat, lon], {
                    icon: L.divIcon({
                        html: `<div class="w-10 h-10"
                                   style="background-image: url('/inicio.png'); background-size: cover; background-position: center;"></div>`,
                        iconSize: [40, 40],
                        iconAnchor: [20, 20],
                    }),
                }).addTo(mapRef.current).bindPopup(itinerario.final);


            } else {
                console.log(`Nenhum resultado encontrado para o local: `, error);
            }
        } catch (error) {
            console.error(`Erro ao buscar localização para o local: `, error);
        }
    }

    return { marcadorInicio, marcadorFinal }
}