import React, {useState, useEffect} from 'react'
import axios from 'axios';
import './company.css';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';

const Company = () => {
  const [token, setToken] = useState('');
  const [zona, setZona ] = useState('');
  const [mostrarCampos, setMostrarCampos]= useState(false);
  const [comuna, setComuna] = useState([]);
  const [selectedComuna, setSelectedComuna] = useState('');
  const [barrios, setBarrios] = useState([]);
  const [selectedBarrio, setSelectedBarrio] = useState('');
  const [departamento, setDepartamento] = useState([]);
  const [selectDepartamento, setSelectDepartamento] = useState('');
  const [ciudad, setCiudad] = useState([]);
  const [selectCiudad, setSelectCiudad] = useState('');

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []); 
  
  const [formData, setFormData] = useState({
    nombre: "",
    nit: "",
    codigo: "",
    correo: "",
    telefono: "",
    direccion: "",
    dane: "",
    departamento: "",
    ciudad: "",
    comuna: "",
    barrio: "",

  });

  // Metodo para traer los departamentos 
  useEffect(() => {
      // Obtiene el token del almacenamiento local
      const storedToken = localStorage.getItem('token');

      // Si no se encuentra el token, muestra un mensaje de error
      if (!storedToken) {
        console.error('Token de autenticación no encontrado en el almacenamiento local');
        return;
      }
  
      // Realiza la solicitud HTTP GET a la API para obtener los datos
      axios.get('https://render-school.onrender.com/api/departamento', {
        headers: {
          'Authorization': `Bearer ${storedToken}` // Incluye el token en el encabezado de autorización
        }
      })
        .then(response => {
          // Almacena los datos obtenidos en el estado
          console.log('datos obtenidos exitosamente');
          setDepartamento( response.data);
        })
        .catch(error => {
          console.error('Error al obtener los datos:', error);
        });
  }, []);

  // Metodo para manejar los cambios del select de departamentos 
  const handleDepartamento = event => {
    // Maneja el cambio en el select
    setSelectDepartamento(event.target.value);

  };

    // Metodo para traer las ciudades 
    useEffect(() => {
      // Obtiene el token del almacenamiento local
      const storedToken = localStorage.getItem('token');

      // Si no se encuentra el token, muestra un mensaje de error
      if (!storedToken) {
        console.error('Token de autenticación no encontrado en el almacenamiento local');
        return;
      }
  
      // Realiza la solicitud HTTP GET a la API para obtener los datos
      axios.get('https://render-school.onrender.com/api/ciudad', {
        headers: {
          'Authorization': `Bearer ${storedToken}` // Incluye el token en el encabezado de autorización
        }
      })
        .then(response => {
          // Almacena los datos obtenidos en el estado
          console.log('datos obtenidos exitosamente');
          setCiudad( response.data);
        })
        .catch(error => {
          console.error('Error al obtener los datos:', error);
        });
  }, []);

  // Metodo para manejar los cambios del select de departamentos 
  const handleCiudad = event => {
    // Maneja el cambio en el select
    setSelectCiudad(event.target.value);
  };


  // Metodo para traer las comunas
  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedToken = localStorage.getItem('token');
        if (!storedToken) {
          throw new Error('Token de autenticación no encontrado en el localStorage');
        }

        const response = await fetch('https://render-school.onrender.com/api/comuna', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${storedToken}` // Incluye el token de autorización en el encabezado
          }
        });
        if (!response.ok) {
          throw new Error('Error al obtener los datos');
        }
        const data = await response.json();
        console.log(data)
        setComuna(data);
      } catch (error) {
        console.error('Error obteniendo datos:', error);
      }
    };
  
    fetchData();
  }, []);
  

  const handleComunaChange = async (event) => {
    const selectedComunaId = event.target.value;
    setSelectedComuna(selectedComunaId);
    // Realizar una solicitud para obtener los barrios de la comuna seleccionada
    await fetchBarrios(selectedComunaId);

  };

  //metodo para traer los barrios segun la comuna
  const fetchBarrios = async (ComunaId) => {
    try {
      const storedToken = localStorage.getItem('token');
        if (!storedToken) {
          throw new Error('Token de autenticación no encontrado en el localStorage');
        }
        
        const response = await fetch(`https://render-school.onrender.com/api/barrio/${ComunaId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${storedToken}` // Incluye el token de autorización en el encabezado
          }
        });
      if (!response.ok) {
        throw new Error('Error al obtener los barrios');
      }
      const data = await response.json();
      console.log('Datos de barrios:', data);
      setBarrios(data);
    } catch (error) {
      console.error('Error obteniendo los barrios:', error);
    }
  };


  const handleZonaChange = (event) => {
    const selectedValue = event.target.value;
    setZona(selectedValue);
    // Mostrar u ocultar los campos adicionales según la selección
    if (selectedValue === 'rural' || selectedValue === 'urbana') {
      setMostrarCampos(true);
    } else {
      setMostrarCampos(false);
    }
  };

  

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

      // Copia el objeto formData actual
    const updateFormData = { ...formData };

    // Agrega los IDs y el valor de la zona al objeto formData
    updateFormData.departamento = selectDepartamento;
    updateFormData.ciudad = selectCiudad;
    updateFormData.comuna = selectedComuna;
    updateFormData.barrio = selectedBarrio;

    // Crea un nuevo objeto FormData y agrega los datos actualizados
    
      const formDataToSend = new FormData();
      Object.keys(updateFormData).forEach((key) => {
        formDataToSend.append(key, updateFormData[key]);
      });

      const API_URL = `https://render-school.onrender.com/api/empresa`;
      const response = await axios.post(API_URL, formDataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });
      console.log('Respuesta del servidor:', response.data);
  
      setFormData({
        nombre: "",
        nit: "",
        codigo: "",
        correo: "",
        telefono: "",
        direccion: "",
        dane: "",
        departamento: "",
        ciudad: "",
        comuna: "",
        barrio: "",

      });

    } catch (error) {
      console.error('Error al enviar datos:', error);
    }
  };


  return (
    <div className='company'>
        <Sidebar/>
        <div className='container'>
          <Navbar/> 
          <div className='bodyCompany'>
            <div className='title-company'>
              <h2>Crear Compañia</h2>
            </div>
            <div className='formCompany'>

              <form className="form-container"  onSubmit={handleSubmit}> 

                <div className='form-pair'>
                  <div className="formInput">   
                    <label htmlFor="nombre">Nombre </label>
                    <input type="text" id="nombre" name="nombre" value={formData.nombre}  onChange={handleInput}/>
                  </div>
                  <div className="formInput">   
                    <label htmlFor="nit">NIT</label>
                    <input type="text" id="nit" name="nit" value={formData.nit}  onChange={handleInput}/>
                  </div>
                </div>

                <div className='form-pair'>
                  <div className="formInput">   
                    <label htmlFor="codigo">Codigo</label>
                    <input type="text" id="codigo" name="codigo" value={formData.codigo}  onChange={handleInput}/>
                  </div>
                  <div className="formInput">   
                    <label htmlFor="correo">Correo</label>
                    <input type="email" id="correo" name="correo" value={formData.correo}  onChange={handleInput}/>
                  </div>
                </div>

                <div className='form-pair'>                  
                  <div className="formInput">   
                    <label htmlFor="telefono">Telefono</label>
                    <input type="text" id="telefono" name="telefono" value={formData.telefono}  onChange={handleInput}/>
                  </div>
                  <div className="formInput">   
                    <label htmlFor="direccion">Dirección</label>
                    <input type="text" id="direccion" name="direccion" value={formData.direccion}  onChange={handleInput}/>
                  </div>
                </div>
                
                <div className='form-pair'>
                  <div className="formInput">   
                    <label htmlFor="dane">Dane</label>
                    <input type="text" id="dane" name="dane" value={formData.dane}  onChange={handleInput}/>
                  </div>
                  <div className="formInput">   
                    <label htmlFor="departamento">Departamento</label>
                    <select id="departamento" value={selectDepartamento} onChange={handleDepartamento}>
                      <option value="">Selecciona...</option>
                      {/* Utiliza map para iterar sobre los datos y generar las opciones del select */}
                      {departamento.map(option => (
                        <option key={option.id} value={option.id}>{option.nombre}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className='form-pair'>
                  <div className="formInput">   
                    <label htmlFor="ciudad">Ciudad</label>
                    <select id="ciudad" value={selectCiudad} onChange={handleCiudad}>
                      <option value="">Selecciona...</option>
                      {/* Utiliza map para iterar sobre los datos y generar las opciones del select */}
                      {ciudad.map(option => (
                        <option key={option.id} value={option.id}>{option.nombre}</option>
                      ))}
                    </select>
                  </div>
                  <div className="formInput">   
                    <label htmlFor="zona">Zona</label>
                    <select name="zona" id="zona" value={zona} onChange={handleZonaChange}>
                      <option value="">Seleccione...</option>
                      <option value="rural">Rural</option>
                      <option value="urbana">Urbana</option>
                    </select>
                    {/* Campos adicionales que se muestran según la selección */}
                    {mostrarCampos && (
                      <div>
                        {/* Aquí puedes agregar los campos adicionales */}
                        {/* Por ejemplo: */}
                        {zona === 'rural' && (
                          <div className="formInput">
                            <label htmlFor="campoRural">Campo para zona rural:</label>
                            <input type="text" id="campoRural" name="campoRural" />
                          </div>
                        )}
                        {zona === 'urbana' && (
                          <div className="form-pair">
                            <div className="formInput">
                              <label htmlFor="comuna">Comuna</label>
                              <select name="comuna" id="comuna" value={selectedComuna} onChange={handleComunaChange}>
                                <option value="seleccione">Selecciona...</option>
                                {/* Utiliza map para iterar sobre los datos y generar las opciones */}
                                {comuna.map((option) => (
                                  <option key={option.id} value={option.id}>{option.nombre}</option>
                                ))}
                              </select>
                            </div>
                            <div className="formInput">
                              <label htmlFor="barrio">Barrio</label>
                              <select name="barrio" id="barrio" value={selectedBarrio} onChange={(e) => setSelectedBarrio(e.target.value)}>
                                <option value="seleccione">Selecciona...</option>
                                {barrios.map((barrio) => (
                                  <option key={barrio.id} value={barrio.id}>{barrio.nombre}</option>
                                ))}
                              </select>
                            </div>
                          </div>   
                        )}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="form-submit">
                  <button type='submit'>Enviar</button>
                </div>
              </form>

            </div>
            
          </div>
        </div>
    </div>
  )
}

export default Company