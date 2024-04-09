import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';

import "./login.css";
import ram  from "./conexion";


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); 
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] =useState(false);
  // estado de carga cuando se envian datos
  const [cargando, setCargando] =useState(false);
  

  const navigate = useNavigate(); // Obtén navigate aquí
  //javierrodriguez@gmail.com
  //Javierrodriguez1234
  //

    const handleLogin = async (event) => {
      event.preventDefault();
      setCargando(true);// activa la ventana para mostrar 'cargando...'
        try {
           const response = await ram(email, password, navigate)
              console.log(response);            
              
        } catch (error) {
            alert('Error en la solicitud', error);
            console.error('Error en la solicitud:', error);
            setAlertMessage('Error en las credenciales. Vefifica e intentalo nuevamente');
     
            // Reiniciar el formulario
            setEmail('');
            setPassword('');
            
       }// codigo de ventana 'cargando...'
       finally {
        // Independientemente del resultado, deja de mostrar el estado de carga
        setCargando(false);
      }
    };
  return (
    <div className="login">
      {cargando && <p>Cargando...</p>}
      {showAlert && (
        <div className="floating-alert">
          <span>{alertMessage}</span>
          <button onClick={() => setShowAlert(false)}>Cerrar</button>
        </div>
      )}
      <form onSubmit={handleLogin}>
        <div className="container">
          <h1>ADMIN</h1>
          <input type="email" placeholder="Email" value={email} 
              onChange={(e) => setEmail(e.target.value)} required/>
          <input type="password" placeholder="Password" value={password} 
              onChange={(e) => setPassword(e.target.value)} required/>
          <button type='submit'>Login</button>
          <span>No tienes cuenta? <Link to='/signUp'>Registrate</Link></span>
        </div>
      </form>
    </div>
  )
}

export default Login

