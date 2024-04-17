import "./list.css";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Datatable from "../../components/datatable/Datatable";
import { useAuthPersona } from "../../hooks/useAuthPersona";
import { ModalPersona } from "../../components/datatable/ModalPersona";
import { useAuthDepartamento } from "../../hooks/useAuthDepartamento";
import { useAuthCiudad } from "../../hooks/useAuthCiudad";
import { useAuthCorregimiento } from "../../hooks/useAuthCorregimiento";
import { useAuthBarrio } from "../../hooks/useAuthBarrio";
import { useAuthVereda } from "../../hooks/useAuthVereda";
import { useAuthComuna } from "../../hooks/useAuthComuna";

const List = () => {
  const {
    personas,
    loading,
    openModal,
    persona,
    eliminarPersona,
    toggleModal,
    handleChange,
    registrarPersona,
    capturarInformacion,
    actualizarPersona,
  } = useAuthPersona();

  const {departamentos} = useAuthDepartamento();
  const {ciudades} = useAuthCiudad();
  const {corregimientos} = useAuthCorregimiento();
  const {barrios} = useAuthBarrio();
  const {veredas} = useAuthVereda();
  const {comunas} = useAuthComuna();

  const handlerChange = persona.id ? actualizarPersona : registrarPersona;

  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <Datatable
          personas={personas}
          loading={loading}
          eliminarPersona={eliminarPersona}
          toggleModal={toggleModal}
          capturarInformacion={capturarInformacion}
        />
        <ModalPersona
          openModal={openModal}
          toggleModal={toggleModal}
          handleChange={handleChange}
          departamentos={departamentos}
          ciudades={ciudades}
          corregimientos={corregimientos}
          barrios={barrios}
          veredas={veredas}
          comunas={comunas}
          handlerChange={handlerChange}
          persona={persona}
        />
      </div>
    </div>
  );
};

export default List;
