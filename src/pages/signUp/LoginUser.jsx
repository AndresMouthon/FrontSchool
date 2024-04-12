import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./loginuser.css";
import registro from "./conexionUser";
import PersonIcon from "@mui/icons-material/Person";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import KeyboardAltIcon from '@mui/icons-material/KeyboardAlt';
import img from "../../img/RegistrarUsuario.png";

const LoginUser = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  // estado de carga cuando se envian datos
  const [cargando, setCargando] = useState(false);
  //Restricciones de la contraseña
  const [showPasswordRestrictions, setShowPasswordRestrictions] =
    useState(false);

  const handleChange = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
  };

  const passwordRestrictions = [
    "Al menos 8 caracteres",
    "Al menos una letra mayúscula",
    "Al menos una letra minúscula",
    "Al menos un número",
  ];
  //___________________________________________________________________________________________

  const handleLogin = async (event) => {
    event.preventDefault();
    setCargando(true); // activa la ventana para mostrar 'cargando...'
    try {
      const response = await registro(firstName, lastName, email, password);
      console.log(response);
    } catch (error) {
      console.error("Error en la solicitud:", error);
      setAlertMessage(
        "Error en las credenciales. Vefifica e intentalo nuevamente"
      );
      setShowAlert(true); // Mostrar la alerta
      // Reiniciar el formulario
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
    } finally {
      // codigo de ventana 'cargando...'
      // Independientemente del resultado, deja de mostrar el estado de carga
      setCargando(false);
    }
  };

  return (
    <div className="signup">
      {cargando && <p className="cargando">Cargando...</p>}
      {showAlert && (
        <div className="floating-alert2">
          <span>{alertMessage}</span>
          <button onClick={() => setShowAlert(false)}>Cerrar</button>
        </div>
      )}
      <form onSubmit={handleLogin}>
        <div className="container">
          <header className="content-img">
            <img src={img} />
          </header>
          <div className="content-inputs">
            <fieldset className="inputs">
              <span className="icons">
                <KeyboardAltIcon />
              </span>
              <input
                type="text"
                placeholder="Nombres..."
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </fieldset>
            <fieldset className="inputs">
              <span className="icons">
                <KeyboardAltIcon />
              </span>
              <input
                type="text"
                placeholder="Apellidos..."
                value={lastName}
                onChange={(e) => setLastName(e.target.value)} 
                required
              />
            </fieldset>
            <fieldset className="inputs">
              <span className="icons">
                <PersonIcon />
              </span>
              <input
                type="text"
                placeholder="Usuario"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </fieldset>
            <fieldset className="inputs">
              <span className="icons">
                <VpnKeyIcon />
              </span>
              <input
                type="password"
                placeholder="**********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setShowPasswordRestrictions(true)}
                onBlur={() => setShowPasswordRestrictions(false)}
                required
              />
              {showPasswordRestrictions && (
                <div className="textRestriccion">
                  {passwordRestrictions.map((restriction, index) => (
                    <p key={index}>{restriction}</p>
                  ))}
                </div>
              )}
            </fieldset>
            <span className="registro">
              Ya tienes cuenta!{" "}
              <Link to="/login" style={{ marginLeft: "5px" }}>
                Ingresa
              </Link>
            </span>
          </div>
        </div>
        <footer className="btn-iniciar">
          <button type="submit">Registrar</button>
        </footer>
      </form>
    </div>
  );
};

export default LoginUser;