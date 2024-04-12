import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import img from "../../img/Login.png";
import PersonIcon from "@mui/icons-material/Person";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import "./login.css";
import ram from "./conexion";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  // estado de carga cuando se envian datos
  const [cargando, setCargando] = useState(false);

  const navigate = useNavigate(); // Obtén navigate aquí
  //javierrodriguez@gmail.com
  //Javierrodriguez1234
  //

  const handleLogin = async (event) => {
    event.preventDefault();
    setCargando(true); // activa la ventana para mostrar 'cargando...'
    try {
      const response = await ram(email, password, navigate);
      console.log(response);
    } catch (error) {
      alert("Error en la solicitud", error);
      console.error("Error en la solicitud:", error);
      setAlertMessage(
        "Error en las credenciales. Vefifica e intentalo nuevamente"
      );

      // Reiniciar el formulario
      setEmail("");
      setPassword("");
    } finally {
      // codigo de ventana 'cargando...'
      // Independientemente del resultado, deja de mostrar el estado de carga
      setCargando(false);
    }
  };
  return (
    <div className="login">
      {cargando && <p className="cargando">Cargando...</p>}
      {showAlert && (
        <div className="floating-alert">
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
                required
              />
            </fieldset>
            <span className="registro">
              No tienes cuenta?{" "}
              <Link to="/signUp" style={{ marginLeft: "5px" }}>
                Registrate
              </Link>
            </span>
          </div>
        </div>
        <footer className="btn-iniciar">
          <button>Iniciar sesion</button>
        </footer>
      </form>
    </div>
  );
};

export default Login;
