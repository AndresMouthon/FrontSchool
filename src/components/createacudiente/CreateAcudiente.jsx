import React, { useState, useEffect } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import './createacudiente.css';

const CreateAcudiente = ({ open, onClose }) => {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(null); // Estado para almacenar el ID del usuario seleccionado
  const [token, setToken] = useState('');

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const handleSearch = async (value) => {
    setSearchTerm(value);
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
      setOptions(response.data);
    } catch (error) {
      console.error('Error buscando los datos', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUserSelect = (event, value) => {
    if (value) {
      setSelectedUserId(value.id);
    } else {
      setSelectedUserId(null);
    }
  };

  const handleSubmit = async () => {
    try {
      if (!selectedUserId) {
        throw new Error('No se ha seleccionado ningún usuario.');
      }
      const storedToken = localStorage.getItem('token');
      if (!storedToken) {
        throw new Error('Token de autenticación no encontrado en el localStorage');
      }
      // Realizar la solicitud al endpoint con el ID seleccionado
      const response = await axios.post('https://render-school.onrender.com/api/acudiente', { persona: selectedUserId }, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      });
      console.log('Respuesta del servidor:', response.data);
    } catch (error) {
      console.error('Error al enviar los datos:', error);
      alert('Error al enviar los datos');
    }
  };

  return (
    <div className={`modal-overlay ${open ? 'open' : ''}`}>
      <div className={`modal-content ${open ? 'open' : ''}`}>
        <h3>Agregar Acudiente</h3>
        <Autocomplete
          options={options}
          loading={loading}
          getOptionLabel={(option) => option.nombre}
          onChange={handleUserSelect}
          onInputChange={(event, value) => handleSearch(value)}
          renderInput={(params) => (
            <TextField {...params} label="Buscar Persona" variant="outlined" />
          )}
        />
        <button className="cerrar" onClick={() =>  onClose() }>Cerrar</button>
        <button className="crear" onClick={() => { handleSubmit(); onClose(); }}>Crear</button>
      </div>
    </div>
  );
};

export default CreateAcudiente;

