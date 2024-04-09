import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./viewdocente.css"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import DatatableDocente from "../datatabledocente/DatatableDocente";


const ViewDocente = () => {
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
        const response = await axios.get(`https://render-school.onrender.com/api/docente/${id}`,{
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        });
        if (response && response.data){
          const userData = response.data;
          setFormData({
            id: userData.id,
            persona: userData.persona,
            identificacion:  userData.identificacion,     
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
    persona: "",
    identificacion: "",

  });

  return (
    <div className="viewDocente">
      <Sidebar/>
      <div className="viewContainer">
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
                  <span className="itemKey">ID</span>
                  <span className="itemValue" id="id" >{formData.id}</span>  
                </div> 
                <div className="detailItem">
                  <span className="itemKey">Nombre</span>
                  <span className="itemValue" id="persona" >{formData.persona}</span>  
                </div> 
                <div className="detailItem">
                  <span className="itemKey">Identificacion</span>
                  <span className="itemValue" id="identificacion" >{formData.identificacion}</span>  
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

export default ViewDocente