import { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import axios from "axios";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const Tableuser = () => {
    //1 - Configuramos los hooks
    const [student, setStudent] = useState( [] ) 
    //2 - funcion para mostrar los datos
    const URL_API_DATA = '';
   
    const getData = async ()=>{
        await axios.get(URL_API_DATA).then((response)=>{
            const data = response.data
            console.log(data)
            setStudent(data)
        })
    }

    useEffect(()=>{
        getData()        
    }, [])

    //3 - definimos las columnas

    const columns = [
        {
            name: "id",
            label: "ID"                  
        },
        {
            name: "nombre",
            label: "NOMBRE"                  
        },            
        {
            name: "apellidos",
            label: "APELLIDOS"                  
        },
        {
            name: "email",
            label: "EMAIL"                  
        },
        {
            name: "user",
            label: "USER"                  
        },          
        {
            name: "actions",
            label: "ACCIONES",
            options: {
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        <div>
                            <IconButton onClick={() => handleEdit(tableMeta.rowData[0])}/> 
                                <EditIcon/>
                            <IconButton/>
                            <IconButton onClick={() => handleDelete(tableMeta.rowData[0])}/>
                                <DeleteIcon/>
                            <IconButton/>
                        </div>
                    );
                }, 
            },                  
        },        
    ]
    
  const options = {
    //Configuracion de opciones, por ejemplo, paginacion, busqueda, etc.
    filterType: 'checkbox',
    responsive: 'standart',
  };

  const handleEdit = (id) => {
    //logica para Editar
    console.log('Editar elemento con id:');
  };

  const handleDelete = (id) => {
    //logica para Eliminar
    console.log('Eliminar elemento con id:');
  }


    //4 - Renderizamos        
  return (
    <div>
        <MUIDataTable
            title={"Estudiantes"}
            data={student}
            columns={columns}
            options={options}
        />
    </div>
  )
}


export default Tableuser