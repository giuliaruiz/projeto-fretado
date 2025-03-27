"use client";
import { useInicioFinalLoc } from "./hooks/useInicioFinalLoc";
import { useMotortistaLoc } from "./hooks/useMotoristaLoc";
import { useAlunoLoc } from "./hooks/useAlunoLoc";
import React, { useEffect, useRef } from "react";
import Routing from "leaflet-routing-machine";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

export default function Mapa({ alunosEnderecos, cargo, itinerario }) {
    const mapRef = useRef(null);
    const mapContainerRef = useRef(null);

    const { marcadorAluno, alunosLoc } = useAlunoLoc(mapRef);
    const { marcadorMotortista } = useMotortistaLoc(mapRef);
    const { marcadorInicio, marcadorFinal, inicioLoc, finalLoc } = useInicioFinalLoc(mapRef);

    const routeControlRef = useRef(null);

    useEffect(() => {
        if (!mapContainerRef.current || mapRef.current) return;
        mapRef.current = L.map(mapContainerRef.current).setView([-23.963927, -46.321380], 15);
        L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
            maxZoom: 19,
            attribution: '© OpenStreetMap',
        }).addTo(mapRef.current);
    }, []);

    useEffect(() => {
        if (!mapRef.current) return;

        if (!alunosEnderecos || alunosEnderecos.length === 0) return;
        marcadorAluno(alunosEnderecos);
        marcadorInicio(itinerario);
        marcadorFinal(itinerario);
    }, [alunosEnderecos]);

    useEffect(() => {

        if (!inicioLoc || !finalLoc || !alunosLoc) return;

        let waypoints = [
            L.latLng(inicioLoc.lat, inicioLoc.lon), 
        ];

        alunosLoc.forEach(aluno => {
            waypoints.push(L.latLng(aluno.lat, aluno.lon));
        });

        waypoints.push(L.latLng(finalLoc.lat, finalLoc.lon));  

        if (routeControlRef.current) {
            routeControlRef.current.setWaypoints(waypoints);
        } else {
            routeControlRef.current = L.Routing.control({
                waypoints: waypoints,
                routeWhileDragging: true,
                createMarker: function () { return null; },
            }).addTo(mapRef.current);
        }
    }, [inicioLoc, finalLoc, alunosLoc]);

    useEffect(() => {
        const marcarMot = async () => { await marcadorMotortista(); }
        marcarMot();

        const interval = setInterval(() => { marcarMot(); }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-full h-full">
            <div ref={mapContainerRef} id="map" className="w-full h-full rounded-md"></div>
        </div>
    );
}
