import React from "react";
import "./ModalPersona.css";
import CloseIcon from "@mui/icons-material/Close";
import { Keyboard } from "@mui/icons-material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import BadgeIcon from "@mui/icons-material/Badge";
import FemaleIcon from "@mui/icons-material/Female";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";
import ModeOfTravelIcon from "@mui/icons-material/ModeOfTravel";
import ApartmentIcon from "@mui/icons-material/Apartment";
import PersonPinCircleIcon from "@mui/icons-material/PersonPinCircle";
import MapIcon from "@mui/icons-material/Map";
import VillaIcon from "@mui/icons-material/Villa";
import LocationCityIcon from "@mui/icons-material/LocationCity";

export function ModalPersona({
  openModal,
  toggleModal,
  handleChange,
  departamentos,
  ciudades,
  corregimientos,
  barrios,
  veredas,
  comunas,
  handlerChange,
  persona,
}) {
  if (openModal) {
    if (persona.id) {
      return (
        <div className="modal-backgroun">
          <div className="modal-container2">
            <header>
              <h1>Actualizar persona</h1>
              <CloseIcon className="incon-close" onClick={toggleModal} />
            </header>
            <br />
            <hr style={{ width: "90%" }} />
            <br />
            <div className="inputs-container">
              <section>
                <main className="inputs">
                  <Keyboard className="icons" style={{ color: "#025752" }} />
                  <input
                    style={{ borderBottom: "1px solid #025752" }}
                    type="text"
                    placeholder="Nombre..."
                    value={persona.nombre}
                    name="nombre"
                    onChange={handleChange}
                    required
                  />
                </main>
                <main className="inputs">
                  <AssignmentIcon
                    className="icons"
                    style={{ color: "#025752" }}
                  />
                  <select
                    name="tipoIdentificacion"
                    id="tipoIdentificacion"
                    required
                    style={{ borderBottom: "1px solid #025752" }}
                    onChange={handleChange}
                  >
                    <option value={persona.tipoIdentificacion}>{persona.tipoIdentificacion}</option>
                    <option value="CC">C.C</option>
                    <option value="PAS">PAS</option>
                    <option value="CE">C.E</option>
                  </select>
                </main>
                <main className="inputs">
                  <FemaleIcon className="icons" style={{ color: "#025752" }} />
                  <select
                    name="genero"
                    id="genero"
                    required
                    style={{ borderBottom: "1px solid #025752" }}
                    onChange={handleChange}
                  >
                    <option value={persona.genero}>{persona.genero}</option>
                    <option value="Masculino">Masculino</option>
                    <option value="Femenino">Femenino</option>
                    <option value="Otro">Otro</option>
                  </select>
                </main>
                <main className="inputs">
                  <EmailIcon className="icons" style={{ color: "#025752" }} />
                  <input
                    type="email"
                    placeholder="Email..."
                    style={{ borderBottom: "1px solid #025752" }}
                    value={persona.email}
                    name="email"
                    onChange={handleChange}
                    required
                  />
                </main>
                {/* <main className="inputs">
                  <MapIcon className="icons" style={{ color: "#025752" }} />
                  <select
                    name="departamento"
                    id="departamento"
                    required
                    style={{ borderBottom: "1px solid #025752" }}
                    onChange={handleChange}
                  >
                    <option value="">Seleccione departamento...</option>
                    {departamentos.map((departamento) => (
                      <option key={departamento.id} value={departamento.id}>
                        {departamento.nombre}
                      </option>
                    ))}
                  </select>
                </main>
                <main className="inputs">
                  <PersonPinCircleIcon
                    className="icons"
                    style={{ color: "#025752" }}
                  />
                  <select
                    name="corregimiento"
                    id="corregimiento"
                    required
                    style={{ borderBottom: "1px solid #025752" }}
                    onChange={handleChange}
                  >
                    <option value="">Seleccione corregimiento...</option>
                    {corregimientos.map((corregimiento) => (
                      <option key={corregimiento.id} value={corregimiento.id}>
                        {corregimiento.nombre}
                      </option>
                    ))}
                  </select>
                </main>
                <main className="inputs">
                  <ModeOfTravelIcon
                    className="icons"
                    style={{ color: "#025752" }}
                  />
                  <select
                    name="vereda"
                    id="vereda"
                    required
                    style={{ borderBottom: "1px solid #025752" }}
                    onChange={handleChange}
                  >
                    <option value="">Seleccione vereda...</option>
                    {veredas.map((vereda) => (
                      <option key={vereda.id} value={vereda.id}>
                        {vereda.nombre}
                      </option>
                    ))}
                  </select>
                </main> */}
              </section>
              <section>
                <main className="inputs">
                  <Keyboard className="icons" style={{ color: "#CA8333" }} />
                  <input
                    style={{ borderBottom: "1px solid #CA8333" }}
                    type="text"
                    placeholder="Apellido..."
                    value={persona.apellido}
                    name="apellido"
                    onChange={handleChange}
                    required
                  />
                </main>
                <main className="inputs">
                  <BadgeIcon className="icons" style={{ color: "#CA8333" }} />
                  <input
                    style={{ borderBottom: "1px solid #CA8333" }}
                    type="text"
                    placeholder="Documento..."
                    value={persona.identificacion}
                    name="identificacion"
                    onChange={handleChange}
                    required
                  />
                </main>
                <main className="inputs">
                  <CalendarMonthIcon
                    className="icons"
                    style={{ color: "#CA8333" }}
                  />
                  <input
                    type="date"
                    style={{ borderBottom: "1px solid #CA8333" }}
                    value={persona.fechaNacimiento}
                    name="fechaNacimiento"
                    onChange={handleChange}
                    required
                  />
                </main>
                <main className="inputs">
                  <LocalPhoneIcon
                    className="icons"
                    style={{ color: "#CA8333" }}
                  />
                  <input
                    type="number"
                    placeholder="Contacto..."
                    style={{ borderBottom: "1px solid #CA8333" }}
                    value={persona.telefono}
                    name="telefono"
                    onChange={handleChange}
                    required
                  />
                </main>
                {/* <main className="inputs">
                  <ApartmentIcon
                    className="icons"
                    style={{ color: "#CA8333" }}
                  />
                  <select
                    name="ciudad"
                    id="ciudad"
                    style={{ borderBottom: "1px solid #CA8333" }}
                    onChange={handleChange}
                  >
                    <option value="">Seleccione ciudad...</option>
                    {ciudades.map((ciudad) => (
                      <option key={ciudad.id} value={ciudad.id}>
                        {ciudad.nombre}
                      </option>
                    ))}
                  </select>
                </main>
                <main className="inputs">
                  <VillaIcon className="icons" style={{ color: "#CA8333" }} />
                  <select
                    name="barrio"
                    id="barrio"
                    style={{ borderBottom: "1px solid #CA8333" }}
                    onChange={handleChange}
                  >
                    <option value="">Seleccione barrio...</option>
                    {barrios.map((barrio) => (
                      <option key={barrio.id} value={barrio.id}>
                        {barrio.nombre}
                      </option>
                    ))}
                  </select>
                </main>
                <main className="inputs">
                  <LocationCityIcon
                    className="icons"
                    style={{ color: "#CA8333" }}
                  />
                  <select
                    name="comuna"
                    id="comuna"
                    style={{ borderBottom: "1px solid #CA8333" }}
                    onChange={handleChange}
                  >
                    <option value="">Seleccione comuna...</option>
                    {comunas.map((comuna) => (
                      <option key={comuna.id} value={comuna.id}>
                        {comuna.nombre}
                      </option>
                    ))}
                  </select>
                </main> */}
              </section>
            </div>
            <button className="btn-actualizar" onClick={handlerChange}>
              Actualizar
            </button>
            <br />
          </div>
        </div>
      );
    } else {
      return (
        <div className="modal-backgroun">
          <div className="modal-container">
            <header>
              <h1>Registrar persona</h1>
              <CloseIcon className="incon-close" onClick={toggleModal} />
            </header>
            <br />
            <hr style={{ width: "90%" }} />
            <div className="inputs-container">
              <section>
                <main className="inputs">
                  <Keyboard className="icons" style={{ color: "#025752" }} />
                  <input
                    style={{ borderBottom: "1px solid #025752" }}
                    type="text"
                    placeholder="Nombre..."
                    // value={nivel.nombre}
                    name="nombre"
                    onChange={handleChange}
                    required
                  />
                </main>
                <main className="inputs">
                  <AssignmentIcon
                    className="icons"
                    style={{ color: "#025752" }}
                  />
                  <select
                    name="tipoIdentificacion"
                    id="tipoIdentificacion"
                    required
                    style={{ borderBottom: "1px solid #025752" }}
                    onChange={handleChange}
                  >
                    <option>Seleccione tipo documento...</option>
                    <option value="CC">C.C</option>
                    <option value="PAS">PAS</option>
                    <option value="CE">C.E</option>
                  </select>
                </main>
                <main className="inputs">
                  <FemaleIcon className="icons" style={{ color: "#025752" }} />
                  <select
                    name="genero"
                    id="genero"
                    required
                    style={{ borderBottom: "1px solid #025752" }}
                    onChange={handleChange}
                  >
                    <option>Seleccione su genero...</option>
                    <option value="Masculino">Masculino</option>
                    <option value="Femenino">Femenino</option>
                    <option value="Otro">Otro</option>
                  </select>
                </main>
                <main className="inputs">
                  <EmailIcon className="icons" style={{ color: "#025752" }} />
                  <input
                    type="email"
                    placeholder="Email..."
                    style={{ borderBottom: "1px solid #025752" }}
                    // value={nivel.nombre}
                    name="email"
                    onChange={handleChange}
                    required
                  />
                </main>
                <main className="inputs">
                  <MapIcon className="icons" style={{ color: "#025752" }} />
                  <select
                    name="departamento"
                    id="departamento"
                    required
                    style={{ borderBottom: "1px solid #025752" }}
                    onChange={handleChange}
                  >
                    <option value="">Seleccione departamento...</option>
                    {departamentos.map((departamento) => (
                      <option key={departamento.id} value={departamento.id}>
                        {departamento.nombre}
                      </option>
                    ))}
                  </select>
                </main>
                <main className="inputs">
                  <PersonPinCircleIcon
                    className="icons"
                    style={{ color: "#025752" }}
                  />
                  <select
                    name="corregimiento"
                    id="corregimiento"
                    required
                    style={{ borderBottom: "1px solid #025752" }}
                    onChange={handleChange}
                  >
                    <option value="">Seleccione corregimiento...</option>
                    {corregimientos.map((corregimiento) => (
                      <option key={corregimiento.id} value={corregimiento.id}>
                        {corregimiento.nombre}
                      </option>
                    ))}
                  </select>
                </main>
                <main className="inputs">
                  <ModeOfTravelIcon
                    className="icons"
                    style={{ color: "#025752" }}
                  />
                  <select
                    name="vereda"
                    id="vereda"
                    required
                    style={{ borderBottom: "1px solid #025752" }}
                    onChange={handleChange}
                  >
                    <option value="">Seleccione vereda...</option>
                    {veredas.map((vereda) => (
                      <option key={vereda.id} value={vereda.id}>
                        {vereda.nombre}
                      </option>
                    ))}
                  </select>
                </main>
              </section>
              <section>
                <main className="inputs">
                  <Keyboard className="icons" style={{ color: "#CA8333" }} />
                  <input
                    style={{ borderBottom: "1px solid #CA8333" }}
                    type="text"
                    placeholder="Apellido..."
                    // value={nivel.nombre}
                    name="apellido"
                    onChange={handleChange}
                    required
                  />
                </main>
                <main className="inputs">
                  <BadgeIcon className="icons" style={{ color: "#CA8333" }} />
                  <input
                    style={{ borderBottom: "1px solid #CA8333" }}
                    type="text"
                    placeholder="Documento..."
                    // value={nivel.nombre}
                    name="identificacion"
                    onChange={handleChange}
                    required
                  />
                </main>
                <main className="inputs">
                  <CalendarMonthIcon
                    className="icons"
                    style={{ color: "#CA8333" }}
                  />
                  <input
                    type="date"
                    style={{ borderBottom: "1px solid #CA8333" }}
                    // value={nivel.nombre}
                    name="fechaNacimiento"
                    onChange={handleChange}
                    required
                  />
                </main>
                <main className="inputs">
                  <LocalPhoneIcon
                    className="icons"
                    style={{ color: "#CA8333" }}
                  />
                  <input
                    type="number"
                    placeholder="Contacto..."
                    style={{ borderBottom: "1px solid #CA8333" }}
                    // value={nivel.nombre}
                    name="telefono"
                    onChange={handleChange}
                    required
                  />
                </main>
                <main className="inputs">
                  <ApartmentIcon
                    className="icons"
                    style={{ color: "#CA8333" }}
                  />
                  <select
                    name="ciudad"
                    id="ciudad"
                    style={{ borderBottom: "1px solid #CA8333" }}
                    onChange={handleChange}
                  >
                    <option value="">Seleccione ciudad...</option>
                    {ciudades.map((ciudad) => (
                      <option key={ciudad.id} value={ciudad.id}>
                        {ciudad.nombre}
                      </option>
                    ))}
                  </select>
                </main>
                <main className="inputs">
                  <VillaIcon className="icons" style={{ color: "#CA8333" }} />
                  <select
                    name="barrio"
                    id="barrio"
                    style={{ borderBottom: "1px solid #CA8333" }}
                    onChange={handleChange}
                  >
                    <option value="">Seleccione barrio...</option>
                    {barrios.map((barrio) => (
                      <option key={barrio.id} value={barrio.id}>
                        {barrio.nombre}
                      </option>
                    ))}
                  </select>
                </main>
                <main className="inputs">
                  <LocationCityIcon
                    className="icons"
                    style={{ color: "#CA8333" }}
                  />
                  <select
                    name="comuna"
                    id="comuna"
                    style={{ borderBottom: "1px solid #CA8333" }}
                    onChange={handleChange}
                  >
                    <option value="">Seleccione comuna...</option>
                    {comunas.map((comuna) => (
                      <option key={comuna.id} value={comuna.id}>
                        {comuna.nombre}
                      </option>
                    ))}
                  </select>
                </main>
              </section>
            </div>
            <button className="btn-registrar" onClick={handlerChange}>
              Registrar
            </button>
            <br />
          </div>
        </div>
      );
    }
  }
}
