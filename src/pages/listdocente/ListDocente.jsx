import React from 'react'
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import './listdocente.css';
import DatatableDocente from '../../components/datatabledocente/DatatableDocente';

const ListDocente = () => {
  return (
    <div className='listDocente'>
        <Sidebar/>
        <div className='container-docente'>
            <Navbar/>
            <DatatableDocente/>
        </div>

    </div>
  )
}

export default ListDocente