import React from 'react';
import { Navigate } from 'react-router-dom';

const authlogin = ({ isAuthenticated, ...rest }) => {
  return isAuthenticated ? (
    // Si está autenticado, renderiza el componente asociado a la ruta
    rest.children
  ) : (
    // Si no está autenticado, redirige a la página de inicio de sesión
    <Navigate to="/login" replace />
  );
};

export default authlogin;
