import "./followup.css"
import Navbar from "../../components/navbar/Navbar"
import Sidebar from "../../components/sidebar/Sidebar"
import Featured from "../../components/featured/Featured"

const Followup = () => {
  return (
    <div className="followup">
        <Sidebar/>
        <div className="containerFollowup">
            <Navbar/>
            <Featured/>
        </div>
    </div>
  )
}

export default Followup