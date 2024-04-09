import "./navbar.css";
import SearchOutlineIcon from "@mui/icons-material/SearchOutlined";
import LanguageIcon from '@mui/icons-material/Language';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import FullscreenExitOutlinedIcon from '@mui/icons-material/FullscreenExitOutlined';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import ReorderOutlinedIcon from '@mui/icons-material/ReorderOutlined';
/*
import { DarkModeContext } from "../../context/darkMode";
import { useContext } from "react";
*/

const Navbar = () => {
  //const { dispatch } = useContext(DarkModeContext);
  return (
    <div className="navbar">
      <div className="wrapper">
          <div className="search">
              <input type="text" placeholder="Search..."/>
              <SearchOutlineIcon className="icon"/>
          </div>
          <div className="items">
            <div className="item">
              <LanguageIcon className="icon"/>
              English
            </div>
            <div className="item">
              <DarkModeOutlinedIcon className="icon" onClick={()=> dispatch({type:"TOGGLE"})}/>
            </div>
            <div className="item">
              <FullscreenExitOutlinedIcon className="icon"/>
            </div>
            <div className="item">
              <NotificationsActiveOutlinedIcon className="icon"/>
              <div className="counter">1</div>
            </div>
            <div className="item">
              <ChatBubbleOutlineOutlinedIcon className="icon"/>
              <div className="counter">2</div>
            </div>
            <div className="item">
              <ReorderOutlinedIcon className="icon" />
            </div>
            <div className="item">
              <img
              alt=""
              className="avatar"/>
            </div>
          </div>
      </div>
    </div>
  )
}

export default Navbar