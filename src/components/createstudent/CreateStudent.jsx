import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./createstudent.css";

const CreateStudent = () => {
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState('');
  const [selectedUserId, setSelectedUserId] = useState('');

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const [formData, setFormData] = useState({
    grupo: "",
    acudiente: "",
    persona: ""
  });

  const handleSearch = async (value) => {
    setSearch(value);
    
    if (value.trim() !== '') {
      try {
        setLoading(true);
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
      } finally {
        setLoading(false);
      }
    } else {
      setSearchResults([]);
    }
  };



  const handleSelect = (event) => {
    const selectedUserId = event.target.value;
    setSelectedUserId(selectedUserId);
    const selectedUser = searchResults.find((user) => user.id === selectedUserId);
    if (selectedUser) {
      setFormData({
        ...formData,
        persona: selectedUserId
      });
    }
  };

  const handleInput = (event) => {
    const { name, value } = event.target; 
    setFormData({...formData, [name]: value});
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

      const API_URL = `https://render-school.onrender.com/api/estudiante`;
      const response = await axios.post(API_URL, formDataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });
      console.log('Respuesta del servidor:', response.data);
      

      setFormData({
        grupo: "",
        acudiente: "",
        persona: "",
      });

    } catch (error) {
      console.error('Error al enviar datos:', error);
    }
  };

  return (
    <div className="createStudent">
      <Sidebar/>
      <div className="containerCreate">
        <Navbar/>
        <div className="topCreate">
          <h1>Nuevo Estudiante </h1>
        </div>
        <div className="bottomCreate">
          <div className="rightCreate">
            <form onSubmit={handleSubmit}>
              <div className="formInput">
                <label htmlFor="nombre">Nombre</label>
                <input type="text" id="persona" name="persona" value={formData.persona} onChange={(e) => handleSearch(e.target.value)} />
                <select onChange={handleSelect}>
                  <option value="">Seleccionar Usuarios</option>
                  {searchResults.map((user) => (
                    <option key={user.id} value={user.id}>{user.nombre} </option>
                  ))}
                </select>
                {loading && <p> Cargando resultados...</p>}
              </div>
              <div className="formInput">
                <label htmlFor="grupo">Grupo</label>
                <input type="text" id="grupo" name="grupo" value={formData.grupo}  onChange={handleInput}/>
              </div>
              <div className="formInput">
                <label htmlFor="acudiente">Acudiente</label>
                <input type="text" id="acudiente" name="acudiente" value={formData.acudiente}  onChange={handleInput}/>
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

export default CreateStudent;
