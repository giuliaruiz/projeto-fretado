"use client";
import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { GetCookie } from "../../actions/cookie";
import { getItinerariosByAluno } from "../controllers/itinerario";

export default function MapaMotorista() {
    const mapRef = useRef(null);
    const mapContainerRef = useRef(null);
    const driverMarkerRef = useRef(null);
    const [studentMarkers, setStudentMarkers] = useState([]);
    const [alunosEnderecos, setAlunosEnderecos] = useState([]);

    let motorista = false;

    const [driverLocation, setDriverLocation] = useState(null);

    const studentAddresses = [
        { address: "Rua Itarare, 76, Praia Grande", name: "1", photo: "" },
        { address: "Rua João Pessoa, 200, São Vicente", name: "1", photo: "" },
        { address: "Avenida Ana Costa, 100, Santos", name: "1", photo: "" }
    ];



    useEffect(() => {
        if (!mapContainerRef.current || mapRef.current) return;

        // Inicializa o mapa (posição inicial genérica)
        mapRef.current = L.map(mapContainerRef.current).setView([-23.963927, -46.321380], 15);

        (async () => {
            const data = await GetCookie();
            const dataAluno = await getItinerariosByAluno(data.data.itinerario)
            setAlunosEnderecos(dataAluno)
            motorista = true
        })();

        L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
            maxZoom: 19,
            attribution: '© OpenStreetMap',
        }).addTo(mapRef.current)



    }, []);

    useEffect(() => {
  
        const updateAlunoLocation = async () => {

            
            const user_agent = "Geopy Library";
            const baseUrl = "https://nominatim.openstreetmap.org/search";
            for (const item of alunosEnderecos) {
                const query = new URLSearchParams({
                    q: `${item.rua}, ${item.bairro}`,
                    format: 'json',
                    addressdetails: 1,
                    limit: 1,
                });
                try {
                    const response = await fetch(`${baseUrl}?${query.toString()}`, {
                        method: 'GET',
                        headers: { 'User-Agent': user_agent }
                    });

                    const data = await response.json();

                    if (data.length > 0) {
                        const loc = data[0];
                        const lat = parseFloat(loc.lat);
                        const lon = parseFloat(loc.lon);
                        const studentName = item.nome;
                        const studentPhoto = "/default_student_image";

                        studentMarkers.current = L.marker([lat, lon], {
                            icon: L.icon({
                                iconUrl: "/default_student_image.png",
                                iconSize: [30, 30],
                            }),
                        }).addTo(mapRef.current).bindPopup("Student");



                    } else {
                        console.log(`Nenhum resultado encontrado para o local: `);
                    }
                } catch (error) {
                    console.error(`Erro ao buscar localização para o local: `, error);
                }
            }
        }

        updateAlunoLocation()

    }, [alunosEnderecos])

    useEffect(() => {

        const updateDriverLocation = () => {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    const { latitude, longitude } = pos.coords;
                    setDriverLocation({ lat: latitude, lng: longitude });

                    if (mapRef.current) {
                        // Atualiza o centro do mapa na localização do motorista
                        //mapRef.current.setView([latitude, longitude], 15);
                    }

                    if (driverMarkerRef.current) {
                        // Atualiza o marcador do motorista
                        driverMarkerRef.current.setLatLng([latitude, longitude]);
                    } else if (mapRef.current) {
                        // Cria o marcador do motorista caso não exista
                        driverMarkerRef.current = L.marker([latitude, longitude], {
                            icon: L.icon({
                                iconUrl: "/default_driver_image.png",
                                iconSize: [30, 30],
                            }),
                        }).addTo(mapRef.current).bindPopup("Motorista");
                    }
                },
                (err) => console.error("Erro ao obter localização do motorista", err),
                { enableHighAccuracy: true }
            );
        };

        
        const interval = setInterval(updateDriverLocation, 2000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-full h-full">
            <div ref={mapContainerRef} id="map" className="w-full h-full rounded-md"></div>
        </div>
    );
}
