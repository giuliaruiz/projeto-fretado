import L from "leaflet";
import { useRef } from "react";

export const useMotortistaLoc = (mapRef) => {
    const driverMarkerRef = useRef(null)

    const marcadorMotortista = async () => {
        if (!mapRef.current) return

        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const { latitude, longitude } = pos.coords;


                if (driverMarkerRef.current) {
                    driverMarkerRef.current.setLatLng([latitude, longitude]);
                } else {

                    driverMarkerRef.current = L.marker([latitude, longitude], {
                        icon: L.icon({
                            iconUrl: "/default_driver_image.png",
                            iconSize: [30, 30],
                        }),
                    }).addTo(mapRef.current).bindPopup("Motorista");
                }

                //mapRef.current.setView([latitude, longitude], 15);
            },
            (err) => console.error("Erro ao obter localização do motorista", err),
            { enableHighAccuracy: true }
        );
    };

    return { marcadorMotortista };
};
