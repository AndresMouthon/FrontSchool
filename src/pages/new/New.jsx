import { useState, useEffect } from "react";
import axios from "axios";
import img from "../../img/no-image-found.png"
import Navbar from "../../components/navbar/Navbar"
import Sidebar from "../../components/sidebar/Sidebar"
import UploadFileIcon from '@mui/icons-material/UploadFile';
import "./new.css"

const New = () => {

  const [token, setToken] = useState('');

  useEffect(() => {
    // Verifica si el token está en el localStorage al cargar el componente
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

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
      //________________________
      if (!token) {
        throw new Error('Token de autenticación no encontrado en el localStorage');
      }
      //________________________

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
      const API_URL = 'https://render-school.onrender.com/api/persona';
      const response = await axios.post(API_URL, formDataToSend, {
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

    } catch (error) {
      console.error('Error al enviar datos:', error);
    }
  };
 

  
  return (
    <div className="new">
      <Sidebar/>
      <div className="containerNew">
        <Navbar/>
        <div className="topNew">
          <h1> Add Nuevo Usuario </h1>
        </div>
        <div className="bottomNew">
          <div className="leftNew">
            <img src= {file ? URL.createObjectURL(file)
              :img} 
            alt="" />  
            <label htmlFor="file"><UploadFileIcon className="fileNew"/></label>
            <input type="file" id="file" onChange={(e) => setFile(e.target.files[0])} 
            style={{display: "none"}} accept=".jpg, .jpeg, .png"/> 
          </div>
            <div className="rightNew">
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
                  <button type='submit'>Enviar</button>
                </div>
              </form>
            </div>
        </div>
      </div>
    </div>
  )
}


export default New