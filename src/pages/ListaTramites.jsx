import React from 'react'
import Auth from './Auth'
import { useEffect, useState } from "react";
export default function ListaTramites() {
     Auth();
    const [tramites, setTramites] = useState([]);

  useEffect(() => {
    // Hacer la solicitud GET cuando el componente se monte
    fetch("http://localhost:3001/api/ListaTramites")
      .then((res) => res.json())
      .then((data) => setTramites(data))
      .catch((error) => console.error("Error al obtener datos:", error));
  }, []);
   
    console.log(tramites)
const actualizarEstado = (id, nuevoEstado) => {
  fetch(`http://localhost:3001/api/ListaTramites/${id}/estado`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ estado: nuevoEstado }),
  })
    .then((res) => {
      if (!res.ok) throw new Error("Error al actualizar el estado");
      // Opcional: volver a cargar los trámites actualizados
      setTramites((prev) =>
        prev.map((t) => (t.id === id ? { ...t, estado: nuevoEstado } : t))
      
      );
      window.location.reload();
    })

    .catch((err) => console.error(err));
};

  return (
    <div className="max-w-4xl mx-auto p-6">
  <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
    📄 Trámites registrados
  </h2>

  {tramites.length === 0 ? (
    <div className="bg-yellow-100 text-yellow-800 text-center font-medium px-4 py-3 rounded-lg border border-yellow-300">
      No hay solicitudes de trámites registradas.
    </div>
  ) : (
    <ul className="space-y-4">
      {tramites.map((tramite) => (
        <li
          key={tramite.id}
          className="bg-white p-5 rounded-2xl shadow-sm border hover:shadow-md transition"
        >
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold text-blue-700">{tramite.tipo}</h3>
            <select
              value={tramite.estado}
              onChange={(e) => actualizarEstado(tramite.id, e.target.value)}
              className={`text-sm px-2 py-1 rounded-md border shadow-sm outline-none cursor-pointer
                ${
                  tramite.estado === 'Rechazado'
                    ? 'bg-red-100 text-red-700 border-red-400'
                    : tramite.estado === 'En Validacion'
                    ? 'bg-yellow-200 text-yellow-800 border-yellow-500'
                    : 'bg-green-100 text-green-700 border-green-400'
                }`}
            >
              <option value="En Validacion">Pedir corrección</option>
              <option value="EmitidoR">Rechazar</option>
              <option value="Emitido">Aprobar</option>
            </select>
          </div>
          <p className="text-sm text-gray-600"> Fecha de solicitud: {tramite.fecha_solicitud}</p>
          <p className="text-sm text-gray-600"> Solicitante: {tramite.nombre}</p>
          <p className="text-sm text-gray-600"> Lugar de nacimiento: {tramite.lugar_nacimiento}</p>
          <p className="text-sm text-gray-600"> Fecha de nacimiento: {tramite.fecha_nacimiento}</p>
          <p className="text-sm text-gray-600"> Género: {tramite.genero}</p>
          {tramite.archivo_adjuntado && (
            <a
              href={`http://localhost:3001/uploads/${tramite.archivo_adjuntado}`}
              download
              className="text-blue-600 underline text-sm mt-2 inline-block"
            >
              📥 Descargar documento
            </a>
          )}
        </li>
      ))}
    </ul>
  )}
</div>

  )
}
