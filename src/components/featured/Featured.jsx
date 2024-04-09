import './featured.css'
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Search  from '@mui/icons-material/Search';
//import TableBasic from '../tableuser/TableBasic';
import TableData from '../tableuser/Tableuser';


const Featured = () => {

  // const [ data, setData] = useState([]);

  // useEffect(() =>{
  //   //Obtener el endpoint usando axios
  //   const URL_ENDPOINT = ''; 
  //   axios.get(URL_ENDPOINT).then((response) => {
  //     setData(response.data);
  //   })
  //   .catch((error) =>{
  //     console.error('Error al obtener datos: ', error);
  //   });
  // }, []); //El array vacio se asegura que el useEfect se ejecute solo una vez al montar el componente
  
  return (
    <div className='featuredBody'>
      <div className='featured'>
        <div className='topSeguimiento'>
            <h1 className='title'>Seguimiento Academico</h1>
            <MoreVertIcon fontSize='small'/>
        </div>
        <div className="head">
          <form className='FormSeguimiento'>
            <div className='rightSeguimiento'>
              <div className='itemRight'>
                <label htmlFor="">Docente</label>
                <input type="text" placeholder=''/>
              </div>
              <div className='itemRight'>
                <label htmlFor="">Asignatura</label>
                <input type="text" placeholder=''/>
              </div>
            </div>  
            <div className='leftSeguimiento'>
              <div className='itemLeftBuscar'>
                <label htmlFor="">Search</label>
                <div className="search">  
                  <input type="text" placeholder='Buscar'/>
                  <Search className='iconBuscar'/>
                </div>
              </div>
            </div>  
          </form>
        </div>  
      </div>
      <div className='featuredBottom'>     
        <div className='componentTable'>
          
        </div>
      </div>
    </div> 
  );
};

export default Featured