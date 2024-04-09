import { useEffect, useState } from 'react';
import axios from 'axios';
import './datatableacademica.css';
import { Link } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Academica from '../areaacademica/Academica';


const columns = [
  { field: 'no', headerName: 'No', width: 90 },
  { field: 'id', headerName: 'ID', width: 300 },
  { field: 'nombre', headerName: 'nombre', width: 250},

];


const DatatableAcademica = () => {
  const [dataRows, setDataRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    //Realiza la llamada a la API para obtener los datos
    const fetchData = async () =>{  
      try{
        // Recuperar el token de autenticación del localStorage
        const storedToken = localStorage.getItem('token');
        // Verificar si el token está presente
        if (!storedToken) {
          alert('Token de autenticación no encontrado en el localStorage');
          setLoading(false);
          throw new Error('Token de autenticación no encontrado en el localStorage');
        }
        
        // Realizar la solicitud a la API incluyendo el token de autenticación en el encabezado
        const response = await axios.get('https://render-school.onrender.com/api/area', {
          headers: {
            Authorization: `Bearer ${storedToken}`,
            },
        });
         // retorna los datos del usuario
        const rowsWithIds = response.data.map((row, index,) => ({ ...row, no: index + 1}));
        
        setDataRows(rowsWithIds);
        setLoading(false);
      }catch(error){
        console.error('Error al obtener los datos', error);
        throw error; // Re-lanzar el error para que el componente que llama pueda manejarlo
      };
    }
    // Llamar a la función fetchData al montar el componente
    fetchData();
  }, []); // El segundo argumento [] asegura que esta llamada solo se realice una vez al montar el componente


  
    const actionColumn = [
    {field:"action", 
    headerName:"Action", 
    width: 200, 
    renderCell: (params)=> (
        <div className="cellAction">
          <Link to={`/area/view/${params.row.id}`} style={{textDecoration: "none"}}>
            <abbr title="Ver"><div className='viewButton'><VisibilityIcon/></div></abbr>
          </Link>
          <Link to={`/area/delete/${params.row.id}`} style={{textDecoration: "none"}}>
            <abbr title="Eliminar"><div className='deleteButton'><DeleteIcon className='iconDelete'/></div></abbr>
          </Link>
          <Link to={`/area/edit/${params.row.id}`} style={{textDecoration: "none"}}>
            <abbr title="Editar"><div className='editButton'><EditIcon/></div></abbr>
          </Link>
        </div>
      ),
   },
  ];

  return (
      <div className='datatableAcademica'>
        <div className="usersAcademica">
          <div className="buttons">
            <h2>Area Academica</h2>
          </div>
        </div>
        <div className="table">
          <div className="datatableTitle">
            Nueva Area
            <Academica open={isModalOpen} onClose={handleCloseModal} />
          </div>
            <div className="datatable-container">
              {loading ? (
                <p>Cargando...</p>
              ) : dataRows.length === 0 ? (
                <p>No hay datos de Estudiante</p>
              ) : (
                <div style={{ height: 400, width: '100%' }}>
                  <DataGrid
                    className='datagrid'
                    rows={dataRows}
                    columns={columns.concat(actionColumn)}
                    initialState={{
                      pagination: {
                        paginationModel: {
                          pageSize: 5,
                        },
                      },
                    }}
                    pageSizeOptions={[5]}
                    checkboxSelection
                    disableRowSelectionOnClick
                  />
                </div>
              )}
            </div>
            
        </div>
      </div>
  );
};

export default DatatableAcademica;