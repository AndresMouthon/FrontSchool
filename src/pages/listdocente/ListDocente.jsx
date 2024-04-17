import React from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./listdocente.css";
import DatatableDocente from "../../components/datatabledocente/DatatableDocente";
import { useAuthDocente } from "../../hooks/useAuthDocente";

const ListDocente = () => {
  const { docentes, loading, eliminarDocente } = useAuthDocente();

  return (
    <div className="listDocente">
      <Sidebar />
      <div className="container-docente">
        <Navbar />
        <DatatableDocente
          docentes={docentes}
          loading={loading}
          eliminarDocente={eliminarDocente}
        />
      </div>
    </div>
  );
};

export default ListDocente;
