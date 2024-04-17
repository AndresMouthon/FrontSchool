import React from "react";
import DataTable from "react-data-table-component";
import "./datatable.css";
import PersonIcon from "@mui/icons-material/Person";
import SchoolIcon from "@mui/icons-material/School";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";
import EditIcon from "@mui/icons-material/Edit";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import { Link } from "react-router-dom";

export default function Datatable({
  personas,
  loanding,
  eliminarPersona,
  toggleModal,
  capturarInformacion,
}) {
  const columns = [
    {
      name: "Acciones",
      selector: (row) => (
        <div className="cellAction">
          <button
            style={{ border: "none", cursor: "pointer", background: "none" }}
            onClick={() => eliminarPersona(row.id)}
          >
            <DeleteIcon
              className="iconDelete"
              style={{ marginTop: "4px", color: "red" }}
            />
          </button>
          <button
            style={{ border: "none", cursor: "pointer", background: "none" }}
            onClick={() => capturarInformacion(row)}
          >
            <EditIcon style={{ marginTop: "4px", color: "blue" }} />
          </button>
          <Link to={`/users/test/${row.id}`}>
            <button
              style={{ border: "none", cursor: "pointer", background: "none" }}
            >
              <VisibilityIcon
                style={{ marginTop: "4px", color: "yellowgreen" }}
              />
            </button>
          </Link>
        </div>
      ),
      sortable: true,
    },
    {
      name: "Contacto",
      selector: (row) => row.telefono,
      sortable: true,
    },
    {
      name: "Nombre",
      selector: (row) => row.nombre,
      sortable: true,
    },
    {
      name: "Identificacion",
      selector: (row) => row.identificacion,
      sortable: true,
    },
    {
      name: "Genero",
      selector: (row) => row.genero,
      sortable: true,
    },
  ];

  return (
    <div className="datatable">
      <div className="usersNew">
        <section className="content-card-persona">
          <main className="informacion">
            <PersonIcon />
            <h2>Persona</h2>
          </main>
          <Link to="/users">
            <button>GESTIONAR</button>
          </Link>
        </section>
        <section className="content-card-estudiante">
          <main className="informacion">
            <SchoolIcon />
            <h2>Estudiante</h2>
          </main>
          <Link to="/student">
            <button>GESTIONAR</button>
          </Link>
        </section>
        <section className="content-card-docente">
          <main className="informacion">
            <RecordVoiceOverIcon />
            <h2>Docente</h2>
          </main>
          <Link to="/teacher">
            <button>GESTIONAR</button>
          </Link>
        </section>
        <section className="content-card-acudiente">
          <main className="informacion">
            <FamilyRestroomIcon />
            <h2>Acudiente</h2>
          </main>
          <Link to="/attendant">
            <button>GESTIONAR</button>
          </Link>
        </section>
      </div>

      <div className="container_levels">
        <header>
          <button
            onClick={toggleModal}
            style={{
              width: "13rem",
              textTransform: "uppercase",
              fontWeight: "bold",
            }}
          >
            <PersonAddAlt1Icon
              className="icon-registrar"
              style={{ margin: "0 2px 0 0" }}
            />
            Registrar Persona
          </button>
        </header>
        <section>
          <DataTable
            columns={columns}
            data={personas}
            progressPending={loanding}
            pagination
          />
        </section>
      </div>
    </div>
  );
}
