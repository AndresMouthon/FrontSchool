import React from 'react'
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import './liststudent.css';
import DatatableStudent from '../../components/datatablestudent/DatatableStudent';

const ListStudent = () => {
  return (
    <div className='listStudent'>
        <Sidebar/>
        <div className='container-student'>
            <Navbar/>
            <DatatableStudent/>
        </div>

    </div>
  )
}

export default ListStudent