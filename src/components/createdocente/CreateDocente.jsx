import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./createdocente.css";

const CreateDocente = () => {
  const [token, setToken] = useState('');
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [filteredResults, setFilteredResults] = useState([]);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    setFilteredResults(searchResults);
  }, [searchResults]);

  const handleSearch = async (value) => {
    setSearchTerm(value);
    try {
      const storedToken = localStorage.getItem('token');
      if (!storedToken) {
        throw new Error('Token de autenticación no encontrado en el localStorage');
      }
      const response = await axios.get(`https://render-school.onrender.com/api/persona?search=${value}`, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      });
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error buscando los datos', error);
    }
  };

  const handleSelect = (userId) => {
    setSelectedId(userId);
    setModalOpen(false); // Cerrar la ventana modal cuando se selecciona un usuario
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const filterResults = () => {
    if (searchTerm.trim() === '') {
      setFilteredResults(searchResults);
    } else {
      const filtered = searchResults.filter(result => result.nombre.toLowerCase().includes(searchTerm.toLowerCase()));
      setFilteredResults(filtered);
    }
  };

  const [formData, setFormData] = useState({
    categoriaFuncionario: "",
  });
  
  const handleInput = (event) => {
    const { name, value } = event.target; 
    setFormData({ ...formData, [name]: value });
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (!token) {
        throw new Error('Token de autenticación no encontrado en el localStorage');
      }
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        formDataToSend.append(key, formData[key]);
      });
      // Agregar el ID seleccionado al formData
      formDataToSend.append("persona", selectedId);

      const API_URL = `https://render-school.onrender.com/api/docente`;
      const response = await axios.post(API_URL, formDataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });
      console.log('Respuesta del servidor:', response.data);
  
      setFormData({
        categoriaFuncionario: "", 
      });

    } catch (error) {
      console.error('Error al enviar datos:', error);
    }
  };

  return (
    <div className="createDocente">
      <Sidebar/>
      <div className="containerCreate">
        <Navbar/>
        <div className="topCreate">
          <h1>Nuevo Docente </h1>
        </div>
        <div className="bottomCreate">
          <div className="rightCreate">
            <form onSubmit={handleSubmit}>
              <div className="formInput">
                <label htmlFor="persona">Nombre</label>
                <input type="text" id="persona" name="persona" 
                  value={searchTerm} 
                  onChange={(e) => {handleSearch(e.target.value); filterResults();}} 
                  placeholder="Buscar"
                />
                <button onClick={handleOpenModal}>Seleccionar</button>
                <Modal open={modalOpen} onClose={handleCloseModal}>
                  <ul>
                    {filteredResults.map((result) => (
                      <li key={result.id} onClick={() => handleSelect(result.id)}>
                        {result.nombre}
                      </li>
                    ))}
                  </ul>
                </Modal>
              </div>
              <div className="formInput">   
                <label htmlFor="categoriaFuncionario">Categoria Funcionario</label>
                <input type="text" id="categoriaFuncionario" name="categoriaFuncionario" value={formData.categoriaFuncionario}  onChange={handleInput}/>
              </div>
              
              <div className="boton">
                <button type='submit'>Enviar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

const Modal = ({ open, onClose, children }) => {
  if (!open) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        {children}
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};


export default CreateDocente;
