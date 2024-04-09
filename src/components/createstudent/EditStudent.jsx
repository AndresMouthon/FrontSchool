import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/navbar/Navbar"
import Sidebar from "../../components/sidebar/Sidebar"
import "./editstudent.css";

const EditStudent = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState('');
 
  useEffect(() => { 
    
    const fetchData = async () => {
      try {
        // Verifica si el token está en el localStorage al cargar el componente
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
          setToken(storedToken);
        }
        const response = await axios.get(`https://render-school.onrender.com/api/estudiante/${id}`, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        });
        if (response && response.data){
            const userData = response.data;
            setFormData({
              nombre:             userData.persona,
              grupo:              userData.grupo,
              acudiente:          userData.acudiente,
          });
        } else {
          throw new Error('La solicitud HTTP no fue exitosa');
        }
        // Usar los datos de response.data para prellenar el formulario de edición
      } catch (error) {
        console.error('Error al obtener los datos del usuario', error);
      }
    };
  
    fetchData();
  }, [id]);

  // Se crea el estado del documento
  const [document, setDocument] = useState(null);

  
  const [ formData, setFormData] = useState({
    
    nombre: "",
    grupo: "",
    acudiente: "",

  });
  
  const handleInput = (event) =>{
    const {name, value } = event.target; 
    setFormData({...formData, [name]: value});
  };
  

  const handleSubmit = async (event,) => {
    event.preventDefault();
    
    try {
      if (!token) {
        throw new Error('Token de autenticación no encontrado en el localStorage');
      }

      const formDataToSend = new FormData();
      // Agregar los archivos al formDataToSend
      if (document) {
        formDataToSend.append("document", document);
      }

      // Agregar los demás datos del formulario al formDataToSend
      Object.keys(formData).forEach((key) => {
        formDataToSend.append(key, formData[key]);
      });

      // Enviar formDataToSend al endpoint
      const API_URL = `https://render-school.onrender.com/api/estudiante/${id}`;
      const response = await axios.patch(API_URL, formDataToSend, {
        headers: {
          Authorization: `Bearer ${token}`, // Incluye el token de autenticación en el encabezado
          'Content-Type': 'application/json' // Especifica el tipo de contenido como JSON
        },
        //_________________________
        // Aquí puedes enviar los datos que deseas al endpoint
        formData: formData,
        
        // Puedes agregar más datos según sea necesario
      });
  
      console.log('Respuesta del servidor:', response.data);
  
      // Restablecer los campos del formulario después de enviarlos
      setFormData({
        nombre: "",
        grupo: "",
        acudiente: "",
      });
      setLoading(false);
    } catch (error) {
      console.error('Error al enviar datos:', error);
      setLoading(false);
    }

  };
  

  return (
    <div className="edit">
      <Sidebar/>
      <div className="containerEdit">
        <Navbar/>
        <div className="topEdit">
          <h1> Editar Estudiante </h1>
        </div>
        <div className="bottomEdit">
         
            <div className="rightEdit">
              <form onSubmit={handleSubmit}>
                <div className="formInput">
                  <label htmlFor="nombre">Nombre</label>
                  <input type="text" id="nombre" name="nombre" value={formData.nombre} onChange={handleInput}/>
                </div>

                <div className="formInput">
                  <label htmlFor="grupo">Grupo</label>
                  <input type="text" id="grupo" name="grupo" value={formData.grupo}  onChange={handleInput}/>
                </div>

                <div className="formInput">
                  <label htmlFor="acudiente">Acudiente</label>
                  <input type="text"  id="acudiente" name="acudiente" value={formData.acudiente}  onChange={handleInput}/>
                </div>
                

                <div className="boton">
                  <button type='submit'>Guardar</button>
                </div>
              </form>
            </div>
        </div>
      </div>
    </div>
  )
}


export default EditStudent