import React from 'react';
import { useNavigate } from 'react-router-dom';
import Auth from './Auth'

export default function HomeAdmin() {
    const user= JSON.parse(localStorage.getItem('user'))
  Auth();
  console.log('User en HomeUser:', user);
  const navigate = useNavigate();

  const handleLogout = () => {
    //localStorage.removeItem('token'); // elimina el JWT del navegador
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
  <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl w-full">
    <h1 className="text-3xl font-bold text-gray-800 mb-4">
      ¡Hola {user?.nombre ? `, ${user.nombre}` : ''}!
    </h1>
    <p className="text-gray-600 mb-6">
      Este es el panel de Administrador, desde aqui puedes gestionar los procesos de solicitudes.
    </p>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
      <button
        onClick={() => navigate('/Solicitud')}
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
      >
        Lista de solicitudes
      </button>
      <button
        onClick={() => navigate('/listApplication')}
        className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded"
      >
        Ver estado e historial de solicitudes
      </button>

      
      <div className="col-span-1 sm:col-span-2 flex justify-center">
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
        >
          Cerrar Sesión
        </button>
      </div>
    </div>

    <p className="text-sm text-gray-400 text-center">
      © {new Date().getFullYear()} DocuTrack. Todos los derechos reservados.
    </p>
  </div>
</div>
  )
}
