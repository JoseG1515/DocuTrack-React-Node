import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import jsPDF from 'jspdf';
export default function EstadoTramite() {
//const navigate = useNavigate();
 const [tramites, setTramites] = useState([]);
const user = JSON.parse(localStorage.getItem('user'));
const userId = user?.id;
const navigate = useNavigate();
  useEffect(() => {
    // Hacer la solicitud GET cuando id user cambie 
    fetch(`http://localhost:3001/api/EstadoTramite/${userId}`)
      .then((res) => res.json())
      .then((data) => setTramites(data))
      .catch((error) => console.error("Error al obtener datos:", error));
  }, [userId]);

console.log("desde tramites",tramites)
console.log("User ID:", userId);

const generarCertificadoPDF = (tramite) => {
  const doc = new jsPDF();

  // Encabezado
  doc.setFont("times", "bold");
  doc.setFontSize(18);
  doc.text("República de Panamá", 105, 25, { align: "center" });

  doc.setFontSize(14);
  doc.text("CERTIFICADO DE NACIMIENTO", 105, 35, { align: "center" });

  // Línea divisoria
  doc.setLineWidth(0.5);
  doc.line(20, 40, 190, 40);

  // Cuerpo del certificado
  doc.setFont("times", "normal");
  doc.setFontSize(12);

  const fechaNacimiento = new Date(tramite.fecha_nacimiento).toLocaleDateString();
  const fechaSolicitud = new Date(tramite.fecha_solicitud).toLocaleDateString();

  const texto = `
Certificamos que el ciudadano ${tramite.nombre}, 
nacido en ${tramite.lugar_nacimiento} el día ${fechaNacimiento}, 
género ${tramite.genero}, ha solicitado un certificado el día ${fechaSolicitud}.

El estado actual del trámite es: ${tramite.estado}.

Este documento corresponde al trámite con ID: ${tramite.id}.
`;

  doc.text(texto.trim(), 20, 50, { maxWidth: 170, align: "justify" });

  // Firma
  doc.setFont("times", "italic");
  doc.text("Firmado digitalmente por el Tribunal", 20, 140);
  doc.line(20, 145, 100, 145); // línea de firma
  doc.text("Oficina de Registro Civil", 20, 150);

  // Footer
  doc.setFontSize(10);
  doc.setTextColor(150);
  doc.text("Este documento es válido sin necesidad de firma física.", 105, 280, { align: "center" });

  doc.save(`Certificado_Nacimiento_${tramite.nombre.replace(/\s+/g, "_")}.pdf`);


fetch(`http://localhost:3001/api/EstadoTramite/${tramite.id}`, {
    method: 'PUT'
  })
    .then(res => res.json())
    .then(data => {
      console.log('Trámite marcado como descargado:', data);
    })
    .catch(err => console.error('Error al actualizar descarga:', err));

};

const handleBack = () => {
    navigate(-1); // -1 es una navegación hacia atrás en el historial
  };


   return (
    <>
    <button
      onClick={handleBack}
      className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded"
    > ⬅ Volver
    </button>
    <div className="bg-blue-100 border border-blue-300 text-blue-800 px-6 py-4 rounded-xl shadow-md mb-6 flex items-center justify-between">
      <h2 className="text-xl md:text-2xl font-semibold flex items-center gap-2">
        📄 Solicitud de Certificado de Nacimiento
      </h2>
     <span
  className={`text-sm px-3 py-1 rounded-full font-semibold
    ${
      tramites.estado === 'EmitidoR'
        ? 'bg-red-200 text-red-800'
        : tramites.estado === 'Emitido'
        ? 'bg-green-200 text-green-800'
        : tramites.estado === 'Recibido'
        ? 'bg-yellow-200 text-yellow-800'
        : 'bg-gray-200 text-gray-700'
    }
  `}
>
  {tramites.estado === 'EmitidoR'
    ? 'Rechazado'
    : tramites.estado === 'Emitido'
    ? 'Aprobado'
    : tramites.estado === 'Recibido'
    ? 'Recibido'
    : tramites.estado}
</span>
<button
  disabled={tramites.estado !== 'Emitido' || tramites.descargado === 'Si'}
  onClick={() => generarCertificadoPDF(tramites)}
  className={`px-4 py-2 rounded-md text-white font-semibold transition duration-300
    ${
      tramites.estado === 'Emitido' && tramites.descargado !== 'Si'
        ? 'bg-blue-600 hover:bg-blue-700 cursor-pointer'
        : 'bg-gray-400 cursor-not-allowed'
    }
  `}
>
  📥 Descargar Certificado
</button>
    </div>
    </>
  );
}
