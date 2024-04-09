import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./single.css"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import List from "../../components/datatable/Datatable"


const Single = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try{
        // Obtener el token de autenticación del localStorage
        const storedToken = localStorage.getItem('token');
        // Verificar si el token está presente
        if (!storedToken) {
          throw new Error('Token de autenticación no encontrado en el localStorage');
        }
        // Realizar la solicitud a la API incluyendo el token de autenticación en el encabezado
        const response = await axios.get(`https://render-school.onrender.com/api/persona/${id}`,{
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
        console.log(response.data);
        setData(response.data);
      }catch (error){
        console.error('Error obteniendo datos', error);
      }
    };

    fetchData();
  },[id]);

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

  return (
    <div className="single">
      <Sidebar/>
      <div className="singleContainer">
        <Navbar/>
        <div className="arriba">
          <div className="left">
            <div className="editButton">Editar</div>
            <h1 className="titulo">Informacion</h1>
            <div className="item">
              <img alt="" className="itemImg" />
              <div className="detalles">
                <h1 className="nombre" id="nombre">{formData.nombre}</h1> 
                <div className="detailItem">
                  <span className="itemKey">Nombres</span>
                  <span className="itemValue" id="nombre" >{formData.nombre}</span>  
                </div> 
                <div className="detailItem">
                  <span className="itemKey">Apellidos</span>
                  <span className="itemValue" id="apellido" >{formData.apellido}</span>  
                </div> 
                <div className="detailItem">
                  <span className="itemKey">Tipo Identificacion</span>
                  <span className="itemValue" id="tipoIdentificacion" >{formData.tipoIdentificacion}</span>  
                </div> 
                <div className="detailItem">
                  <span className="itemKey">Identificacion</span>
                  <span className="itemValue" id="identificacion" >{formData.identificacion}</span>  
                </div> 
                <div className="detailItem">
                  <span className="itemKey">Fecha Nacimiento</span>
                  <span className="itemValue" id="fechaNacimiento" >{formData.fechaNacimiento}</span>  
                </div> 
                <div className="detailItem">
                  <span className="itemKey">Genero</span>
                  <span className="itemValue" id="genero" >{formData.genero}</span>  
                </div> 
                <div className="detailItem">
                  <span className="itemKey">Email</span>
                  <span className="itemValue" id="email" >{formData.email}</span>  
                </div>
                <div className="detailItem">
                  <span className="itemKey">Telefono</span>
                  <span className="itemValue" id="">{formData.telefono}</span>  
                </div>
                <div className="detailItem">
                  <span className="itemKey">Departamento</span>
                  <span className="itemValue" id="departamento">{formData.departamento}</span>  
                </div>
                <div className="detailItem">
                  <span className="itemKey">ciudad</span>
                  <span className="itemValue" id="ciudad">{formData.ciudad}</span>  
                </div>
              </div>
            </div>
          </div>
          <div className="right">
          <div className="editButton">Editar</div>
          <h1 className="titulo">Informacion Institucion</h1>
          <div className="item">
              <div className="detalles">
                <h1 className="nombre">I. E. los Colores</h1>
                <div className="detailItem">
                  <span className="itemKey">Grado actual</span>
                  <span className="itemValue">1° Primero</span>  
                </div>
                <div className="detailItem">
                  <span className="itemKey">Acudiente</span>
                  <span className="itemValue">Margarita sanchez</span>  
                </div>
                <div className="detailItem">
                  <span className="itemKey">Telfono</span>
                  <span className="itemValue">+57 322 354 5655</span>  
                </div>
                <div className="detailItem">
                  <span className="itemKey">Ciudad</span>
                  <span className="itemValue">Monteria -</span>  
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bottom">
          <h1 className="calificaciones">Calificaciones</h1>
        
        </div>
      </div>
    </div>
  )
}

export default Single