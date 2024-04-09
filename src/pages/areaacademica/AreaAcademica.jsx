import React from 'react'
import './areaacademica.css';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import DatatableAcademica from '../../components/datatableacademica/DatatableAcademica';

const AreaAcademica = () => {
  return (
    <div className='areaacademica'>
        <Sidebar/>
        <div className='container'>
            <Navbar/>
            <div>
                <DatatableAcademica/>
            </div>
        </div>
    </div>
  )
}

export default AreaAcademica