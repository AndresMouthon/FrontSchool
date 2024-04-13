import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import "./EducationLevels.css";
import Navbar from "../../components/navbar/Navbar";
import { useAuthNivelEducativo } from "../../hooks/useAuthNivelEducativo";
import { ModalLevels } from "../../components/crudEducationLevel/ModalLevels";
import { DataTableLevels } from "../../components/crudEducationLevel/DataTableLevels";

export function ListEducationLevels() {
  const {
    nivelesEducativos,
    loading,
    nivelEducativo,
    openModal,
    toggleModal,
    eliminarNivelEducativo,
    handleChange,
    capturarInformacion,
    handleSubmit,
    actualizar,
  } = useAuthNivelEducativo();

  const handler = nivelEducativo.id ? actualizar : handleSubmit;

  return (
    <div className="listEducationLevel">
      <Sidebar />
      <div className="container-educationLevel">
        <Navbar />
        <DataTableLevels
          loading={loading}
          eliminarNivelEducativo={eliminarNivelEducativo}
          capturarInformacion={capturarInformacion}
          nivelesEducativos={nivelesEducativos}
          toggleModal={toggleModal}
        />
        <ModalLevels 
        openModal={openModal}
        toggleModal={toggleModal}
        handleChange={handleChange}
        handleSubmit={handler}
        nivel={nivelEducativo}
        />
      </div>
    </div>
  );
}
