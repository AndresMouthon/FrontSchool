import React from 'react'
import './listacudiente.css';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import DatatableAcudiente from '../../components/datatableacudiente/DatatableAcudiente';

const ListAcudiente = () => {
  return (
    <div className='listAcudiente'>
        <Sidebar/>
        <div className='container'>
            <Navbar/>
            <DatatableAcudiente/>
        </div>
    </div>
  )
}

export default ListAcudiente