import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import img from "../../img/no-image-found.png"
import Navbar from "../../components/navbar/Navbar"
import Sidebar from "../../components/sidebar/Sidebar"
import UploadFileIcon from '@mui/icons-material/UploadFile';
import "./edituser.css";

const EditUser = () => {
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
        const response = await axios.get(`https://render-school.onrender.com/api/persona/${id}`, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        });
        if (response && response.data){
            const userData = response.data;
            setFormData({
              nombre:             userData.nombre,
              apellido:           userData.apellido,
              fechaNacimiento:    userData.fechaNacimiento,
              tipoIdentificacion: userData.tipoIdentificacion,
              identificacion:     userData.identificacion,
              genero:             userData.genero,
              email:              userData.email,
              telefono:           userData.telefono,
              departamento:       userData.departamento,
              ciudad:             userData.ciudad,
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
  
  const handleDocument = (event) =>{
    const selectedDocument = event.target.files[0];
    setDocument(selectedDocument);
  };
  
  //Estado de la imagen de perfil
  const [ file, setFile ] = useState("");
  
  
  const [ formData, setFormData] = useState({
    
    nombre: "",
    apellido: "",
    fechaNacimiento: "",
    tipoIdentificacion: "",
    identificacion: "",
    genero: "",
    email: "",
    telefono: "",
    departamento: "",
    ciudad: "",
    /* 
    barrioId: "",
    corregimientoId: "",
    veredaId: "",
    comunaId: "",
  */

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
      const API_URL = `https://render-school.onrender.com/api/persona/${id}`;
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
        apellido: "",
        fechaNacimiento: "",
        tipoIdentificacion: "",
        identificacion: "",
        genero: "",
        email: "",
        telefono: "",
        departamento: "",
        ciudad: "",
        /* 
        barrioId: "",
        corregimientoId: "",
        veredaId: "",
        comunaId: "",
      */
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
          <h1> Editar Usuario </h1>
        </div>
        <div className="bottomEdit">
          <div className="leftEdit">
            <img src= {file ? URL.createObjectURL(file)
              :img} 
            alt="" />  
            <label htmlFor="file"><UploadFileIcon className="fileEdit"/></label>
            <input type="file" id="file" onChange={(e) => setFile(e.target.files[0])} 
            style={{display: "none"}} accept=".jpg, .jpeg, .png"/> 
          </div>
            <div className="rightEdit">
              <form onSubmit={handleSubmit}>
                <div className="formInput">
                  <label htmlFor="nombre">Nombre</label>
                  <input type="text" id="nombre" name="nombre" value={formData.nombre} onChange={handleInput}/>
                </div>

                <div className="formInput">
                  <label htmlFor="apellido">Apellido</label>
                  <input type="text" id="apellido" name="apellido" value={formData.apellido}  onChange={handleInput}/>
                </div>
                <div className="formInput">
                  <label htmlFor="tipoIdentificacion">Tipo Documento</label>
                  <select id="tipoIdentificacion" name="tipoIdentificacion" value={formData.tipoIdentificacion} onChange={handleInput}>
                    <option value="">Seleccione una opcion</option>
                    <option value="CC">Cedula Ciudadanía</option>
                    <option value="CE">Cedula Ciudadanía</option>
                    <option value="TI">Targeta Identidad</option>  
                  </select>
                </div>

                <div className="formInput">
                  <label htmlFor="identificacion">Identificacion</label>
                  <input type="text"  id="identificacion" name="identificacion" value={formData.identificacion}  onChange={handleInput}/>
                </div>
                <div className="formInput">
                  <label htmlFor="genero">Genero</label>
                  <select id="genero" name="genero" value={formData.genero}  onChange={handleInput}>
                    <option value="">Seleccione una opcion</option>
                    <option value="Masculino">Masculino</option>
                    <option value="Femenino">Femenino</option>
                    <option value="Otro">Otro</option>  
                  </select>
                </div>

                <div className="formInput">
                  <label htmlFor="fechaNacimiento">Fecha Nacimiento</label>
                  <input type="date" id="fechaNacimiento" name="fechaNacimiento" value={formData.fechaNacimiento}  onChange={handleInput}/>
                </div>
                <div className="formInput">
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" name="email" value={formData.email}  onChange={handleInput} />
                </div>
                <div className="formInput">
                  <label htmlFor="telefono">Tel</label>
                  <input type="text" id="telefono" name="telefono" value={formData.telefono}  onChange={handleInput}/>
                </div>
                <div className="formInput">
                  <label htmlFor="departamento">Departamento</label>
                  <input type="text" id="departamento" name="departamento" value={formData.departamento} onChange={handleInput}/>
                </div>
                <div className="formInput">
                  <label htmlFor="ciudad">ciudad</label>
                  <input type="text" id="ciudad" name="ciudad" value={formData.ciudad}  onChange={handleInput}/>
                </div>


                <div className="formInput">
                  <label htmlFor="barrioId">Barrio</label>
                  <input type="text" id="barrioId" name="barrioId" value={formData} onChange={handleInput}/>
                </div>
                <div className="formInput">
                  <label htmlFor="corregimientoId">Corregimiento</label>
                  <input type="text" id="corregimientoId" name="corregimientoId" value={formData} onChange={handleInput}/>
                </div>
                <div className="formInput">
                  <label htmlFor="veredaId">Vereda</label>
                  <input type="text" id="veredaId" name="veredaId" value={formData} onChange={handleInput}/>
                </div>
                <div className="formInput">
                  <label htmlFor="comunaId">Comuna</label>
                  <input type="text" id="comunaId" name="comunaId" value={formData} onChange={handleInput}/>
                </div>
                
                <div className="formDocument">
                  <label htmlFor="archivoInput">Documento</label>
                  <input type="file" id="archivoInput" onChange={handleDocument} 
                  accept=".pdf, .doc, .docx, .jpg, .jpeg, .png"/>
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


export default EditUser
