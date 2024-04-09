import React from 'react'
import './home.css'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import Widget from '../../components/widget/Widget'

const Home = () => {
  return (
    <div className='home'>
        <Sidebar/>
        <div className='menu'>
          <Navbar/>
          <div className='widgets'>
            <Widget/>
          </div>
        </div>
    </div>
  )
}

export default Home