import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const verificar = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/me', {
          method: 'GET',
          credentials: 'include',  // para enviar cookies httpOnly
        });

        if (response.status === 401) {
          // Token inválido o expirado
          navigate('/login');
        }
        // si quieres puedes leer user data con response.json()
      } catch (error) {
        // Si hay error de red u otro, también rediriges o manejas aquí
        navigate('/login');
      }
    };

    verificar();
  }, [navigate]);
};

export default Auth;