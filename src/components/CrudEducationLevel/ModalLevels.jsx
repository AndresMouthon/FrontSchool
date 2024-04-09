import "./Modal.css";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import ReorderIcon from "@mui/icons-material/Reorder";
import CloseIcon from "@mui/icons-material/Close";

export function ModalLevels({
  openModal,
  toggleModal,
  handleChange,
  handleSubmit,
  nivel,
}) {
  const titulo = nivel.id
    ? "Actualizar nivel educativo"
    : "Registrar nivel educativo";
  const TituloBoton = nivel.id ? "Actualizar" : "Registrar";
  const claseboton = nivel.id ? "btn-actualizar" : "btn-registrar";

  if (openModal) {
    return (
      <div className="modal-background">
        <div className="modal-container">
          <header>
            <h1>{titulo}</h1>
            <CloseIcon className="incon-close" onClick={toggleModal} />
          </header>
          <br />
          <br />
          <hr style={{ width: "90%" }} />
          <br />
          <main className="inputs">
            <MenuBookIcon className="icons" />
            <input 
              type="text" 
              placeholder="Nivel educativo..." 
              value={nivel.nombre} 
              name="nombre"
              onChange={handleChange}
            />
          </main>
          <main className="inputs">
            <ReorderIcon className="icons" />
            <input 
              type="text" 
              placeholder="Codigo..." 
              value={nivel.codigo} 
              name="codigo"
              onChange={handleChange}
            />
          </main>
          <button onClick={handleSubmit} className={claseboton}>{TituloBoton}</button>
        </div>
      </div>
    );
  }
}
