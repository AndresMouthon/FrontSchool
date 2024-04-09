import React from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom'; 

const Logout = () => {
  const navigate = useNavigate();


  const handleLogout = () =>{
    const confirmLogout = window.confirm("¿Estás seguro que deseas cerrar sesión?");
    if (confirmLogout) {
      // Borra la cookie de token
      Cookies.remove('token');
      localStorage.removeItem('token');
      // Redirige al usuario a la página de inicio de sesión
      navigate('/login');
    }
  };

  const handleBack = () =>{
    navigate('/home');
  }

  return (
    <div>
      <button onClick={handleLogout}>Cerrar Sesión</button>
      <button onClick={handleBack}>Volver</button>
    </div>
  );
};

export default Logout