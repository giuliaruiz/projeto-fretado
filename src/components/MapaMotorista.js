"use client";
import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";

export default function MapaMotorista() {
    const mapRef = useRef(null); // Armazena a instância do mapa
    const mapContainerRef = useRef(null); // Armazena a referência da div do mapa
    const driverMarkerRef = useRef(null);
    const [driverLocation, setDriverLocation] = useState(null);

    useEffect(() => {
        if (mapContainerRef.current && !mapRef.current) {
            // Criar o mapa apenas se ele ainda não foi inicializado
            mapRef.current = L.map(mapContainerRef.current).setView([-23.963927, -46.321380], 18);

            L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
                maxZoom: 19,
                attribution: '© OpenStreetMap',
            }).addTo(mapRef.current);
        }

        const updateDriverLocation = () => {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    const { latitude, longitude } = pos.coords;
                    setDriverLocation({ lat: latitude, lng: longitude });

                    if (driverMarkerRef.current) {
                        driverMarkerRef.current.setLatLng([latitude, longitude]);
                    } else if (mapRef.current) {
                        // Criar o marcador do motorista
                        driverMarkerRef.current = L.marker([latitude, longitude]).addTo(mapRef.current);
                    }
                },
                (err) => console.error("Erro ao obter localização do motorista", err),
                { enableHighAccuracy: true }
            );
        };

        const interval = setInterval(updateDriverLocation, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-full">
            <h1>Localização do Motorista</h1>
            <div
                ref={mapContainerRef}
                id="map"
                className="w-full h-[500px] rounded-sm"
            ></div>
        </div>
    );
}
