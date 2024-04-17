import React from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./createdocente.css";
import addDocente from "../../img/AddDocente.png";
import avatar1 from "../../img/Avatar1.png";
import avatar2 from "../../img/Avatar2.png";
import SearchIcon from "@mui/icons-material/Search";
import { Keyboard } from "@mui/icons-material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import BadgeIcon from "@mui/icons-material/Badge";
import FemaleIcon from "@mui/icons-material/Female";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import ApartmentIcon from "@mui/icons-material/Apartment";
import MapIcon from "@mui/icons-material/Map";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import { useAuthDocente } from "../../hooks/useAuthDocente";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const CreateDocente = () => {
  const {
    handleChangeBusqueda,
    buscarPersona,
    registrarDocente,
    busquedaDocente,
    persona,
    estadoBusqueda,
  } = useAuthDocente();
  return (
    <div className="createDocente">
      <Sidebar />
      <div className="containerCreate">
        <Navbar />
        <center>
          <div className="bottomCreate">
            <div className="formulario-contenedor">
              <div className="header">
                <figure className="imagen-header">
                  <img src={addDocente} />
                </figure>
                <h1>Registrar docente</h1>
              </div>
              <section className="contenido">
                <main className="labelContent">
                  <p
                    style={{
                      fontFamily: "revert-layer",
                      fontWeight: "bold",
                      fontSize: "18px",
                    }}
                  >
                    Digite la cedula de la persona
                  </p>
                  <fieldset>
                    <input
                      type="number"
                      value={busquedaDocente}
                      onChange={handleChangeBusqueda}
                      className="labelPersona"
                      placeholder="Buscar persona..."
                    />
                    <button onClick={buscarPersona} className="btn-buscar">
                      <SearchIcon />
                      Buscar
                    </button>
                  </fieldset>
                </main>
                {estadoBusqueda === "Con persona" && (
                  <>
                    <div className="resultado-persona">
                      <div className="img-content">
                        {persona.genero === "Masculino" && (
                          <img src={avatar1} />
                        )}
                        {persona.genero === "Femenino" && <img src={avatar2} />}
                      </div>
                      <section>
                        <fieldset
                          className="informacion-persona"
                          style={{ border: "1px solid #570217" }}
                        >
                          <AssignmentIcon
                            className="icon"
                            style={{ color: "#570217" }}
                          />
                          <label>{persona.tipoIdentificacion}</label>
                        </fieldset>
                        <fieldset
                          className="informacion-persona"
                          style={{ border: "1px solid #570217" }}
                        >
                          <Keyboard
                            className="icon"
                            style={{ color: "#570217" }}
                          />
                          <label>{persona.nombre}</label>
                        </fieldset>
                        <fieldset
                          className="informacion-persona"
                          style={{ border: "1px solid #570217" }}
                        >
                          <FemaleIcon
                            className="icon"
                            style={{ color: "#570217" }}
                          />
                          <label>{persona.genero}</label>
                        </fieldset>
                        <fieldset
                          className="informacion-persona"
                          style={{ border: "1px solid #570217" }}
                        >
                          <ApartmentIcon
                            className="icon"
                            style={{ color: "#570217" }}
                          />
                          <label>{persona.ciudad.nombre}</label>
                        </fieldset>
                      </section>
                      <div>
                        <fieldset
                          className="informacion-persona"
                          style={{ border: "1px solid #7451F8" }}
                        >
                          <BadgeIcon
                            className="icon"
                            style={{ color: "#7451F8" }}
                          />
                          <label>{persona.identificacion}</label>
                        </fieldset>
                        <fieldset
                          className="informacion-persona"
                          style={{ border: "1px solid #7451F8" }}
                        >
                          <Keyboard
                            className="icon"
                            style={{ color: "#7451F8" }}
                          />
                          <label>{persona.apellido}</label>
                        </fieldset>
                        <fieldset
                          className="informacion-persona"
                          style={{ border: "1px solid #7451F8" }}
                        >
                          <LocalPhoneIcon
                            className="icon"
                            style={{ color: "#7451F8" }}
                          />
                          <label>{persona.telefono}</label>
                        </fieldset>
                        <fieldset
                          className="informacion-persona"
                          style={{ border: "1px solid #7451F8" }}
                        >
                          <MapIcon
                            className="icon"
                            style={{ color: "#7451F8" }}
                          />
                          <label>{persona.departamento.nombre}</label>
                        </fieldset>
                      </div>
                    </div>
                    <center>
                      <hr style={{ border: "1px solid gray", width: "90%" }} />
                    </center>
                    <br />
                    <center>
                      <div className="footer">
                        <main className="labelContent">
                          <p
                            style={{
                              fontFamily: "revert-layer",
                              fontWeight: "bold",
                              fontSize: "18px",
                            }}
                          >
                            Categoria
                          </p>
                          <fieldset>
                            <label>
                              <AccountCircleIcon
                                style={{ margin: "0 0 0 10px" }}
                              />
                              Docente
                            </label>
                            <button
                              className="btn-buscar"
                              onClick={() =>
                                registrarDocente(
                                  persona.id,
                                  "6881bf9c-ac52-4da5-a420-f5fed2f77168"
                                )
                              }
                            >
                              <PersonAddAlt1Icon />
                              Registrar
                            </button>
                          </fieldset>
                        </main>
                      </div>
                    </center>
                  </>
                )}
                {estadoBusqueda === "Sin persona" && (
                  <>
                    <div className="resultado-persona">
                      <section className="personaNoEncontrada">
                        <h1>
                          Esta persona no se encuentra registrada{" "}
                          <SearchOffIcon />
                        </h1>
                      </section>
                    </div>
                  </>
                )}
                {estadoBusqueda === "Persona registrada" && (
                  <>
                    <div className="resultado-persona">
                      <section className="personaRegistrada">
                        <h1>
                          El docente fue registrado de manera exitosa{" "}
                          <CheckBoxIcon />
                        </h1>
                      </section>
                    </div>
                  </>
                )}
                {!(estadoBusqueda === "Con persona") &&
                  !(estadoBusqueda === "Sin persona") &&
                  !(estadoBusqueda === "Persona registrada") && (
                    <>
                      <div className="resultado-persona">
                        <section className="personaBuscar">
                          <h1>
                            Buscar en el sistema <PersonSearchIcon />
                          </h1>
                        </section>
                      </div>
                    </>
                  )}
              </section>
            </div>
          </div>
        </center>
      </div>
    </div>
  );
};

export default CreateDocente;
