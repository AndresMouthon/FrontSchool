import React from "react";
import "./DataTableLevels.css";
import DataTable from "react-data-table-component";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";

export function DataTableLevels({
  capturarInformacion,
  eliminarNivelEducativo,
  nivelesEducativos,
  toggleModal,
  loading,
}) {
  const columns = [
    {
      name: "Acciones",
      selector: (row) => (
        <div className="cellAction">
          <button
            style={{ border: "none", cursor: "pointer", background: "none" }}
            onClick={() => eliminarNivelEducativo(row.id)}
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
        </div>
      ),
      sortable: true,
    },
    {
      name: "Codigo",
      selector: (row) => row.codigo,
      sortable: true,
    },
    {
      name: "Nivel educativo",
      selector: (row) => row.nombre,
      sortable: true,
    },
  ];

  return (
    <div className="container_levels">
      <header>
        <button
          onClick={toggleModal}
          style={{
            width: "17rem",
            textTransform: "uppercase",
            fontWeight: "bold",
          }}
        >
          <BookmarkAddIcon className="icon-registrar" />
          Registrar nivel educativo
        </button>
      </header>
      <section>
        <DataTable
          columns={columns}
          data={nivelesEducativos}
          pagination
          progressPending={loading}
        />
      </section>
    </div>
  );
}
