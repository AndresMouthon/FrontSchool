import { useState } from "react";
import "./sidebar.css";
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import SummarizeIcon from '@mui/icons-material/Summarize';
import BookIcon from '@mui/icons-material/Book';
import RuleFolderIcon from '@mui/icons-material/RuleFolder';
import ListAltIcon from '@mui/icons-material/ListAlt';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Business } from "@mui/icons-material";
import SettingsIcon from '@mui/icons-material/Settings';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from 'react-router-dom';
import Logout from "../logout/Logout";
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';

import { List, ListItem, ListItemText, Collapse } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

/*
import { DarkModeContext } from "../../context/darkMode";
import { useContext } from "react";
*/

const Sidebar = () => {  
    const [colapse, setColapse] = useState(false);
    const [subMenuOpen, setSubMenuOpen] = useState(false); // estado del submenu
    //const { dispatch } = useContext(DarkModeContext);
    
    const handleClick = () => {
        setColapse(!colapse);
    };

    const handleSubMenuClick = () => {
        setSubMenuOpen(!subMenuOpen); // Cambia el estado al contrario del estado actual
      };

    const handleLogout = ()=>{
        const confirmLogout = window.confirm("¿Estás seguro que deseas cerrar sesión?");
        if (confirmLogout) {
        // Borra la cookie de token
        Cookies.remove('token');
        // Redirige al usuario a la página de inicio de sesión
        navigate('/login');
        }
    };


    return (
    <div className="sidebar"> 
        <div className="top">
            <Link to="/" style={{textDecoration: "none"}}>
            <span className="logo">template</span>
            </Link>
        </div>
        <hr />
        <div className="center">
            <ul>
                <p className="title">MAIN</p>
                <Link to="/home" style={{textDecoration: "none"}}>
                    <li>
                        <DashboardIcon className="icon"/>
                        <span>Home</span>
                    </li>
                </Link>
                <p className="title">ESTUDIANTES</p>
                <Link to="/users" style={{textDecoration: "none"}}>
                    <li>
                        <PersonAddIcon className="icon"/>
                        <span>Nuevo Registro</span>
                    </li>
                </Link>
                <p className="title">NIVELES EDUCATIVOS</p>
                <Link to="/educationLevel" style={{textDecoration: "none"}}>
                    <li>
                        <AutoStoriesIcon className="icon"/>
                        <span>Gestionar</span>
                    </li>
                </Link>
                {/*
                <Link to="/academico" style={{textDecoration: "none"}}>
                    <li>
                        <SummarizeIcon className="icon"/>
                        <span>Informacion Academica</span>
                    </li>
                </Link>
                <li>
                    <BookIcon className="icon"/>
                    <span>Asignaturas</span>
                </li>
                <li>
                    <RuleFolderIcon className="icon"/>
                    <span>Calificacion</span>
                </li>
                <li>
                    <ListAltIcon className="icon"/>
                    <span>Informes</span>
                </li> */}
                <p className="title">SERVICIO</p>
                {/* <li>
                    <NotificationsIcon className="icon"/>
                    <span>Notificaciones</span>
                </li> */}
                <div className="menuItem" onClick={handleSubMenuClick}>
                    <li>
                        <Business className="icon" />
                        <span>Empresa</span>
                        {subMenuOpen && (
                            <div className="subMenu">
                                {/* Contenido del submenú */}
                                <Link to="/company" style={{ textDecoration: "none" }}>
                                    <div>Crear</div>
                                </Link>
                                <div>Editar</div>
                            </div>
                        )}
                    </li>
                </div>
                
                    
                    <div className="collapse">
                        {/* Item principal */}
                        <ListItem button onClick={handleClick}>
                            <AutoAwesomeMotionIcon className="icon" />
                            <span>Otros</span>
                            {colapse ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                        {/* Sub-items colapsables */}
                        <Collapse in={colapse} timeout="auto" unmountOnExit>
                            <div className="Item">
                                <Link to="/other" style={{textDecoration: "none"}}>
                                    <ListItem button >
                                        <span>Area Academica</span>
                                    </ListItem>
                                </Link>
                                <ListItem button>
                                    <span>Asignatura</span>
                                </ListItem>
                            </div>
                            
                        </Collapse>
                    </div>
         
                {/* <li>
                    <SettingsIcon className="icon"/>
                    <span>Ajustes</span>
                </li> */}
                <p className="title">USER</p>
                <Link to="/perfil" style={{textDecoration: "none"}}>
                    <li>
                        <PersonIcon className="icon"/>
                        <span>Perfil</span>
                    </li>
                </Link>
                <Link to="/logout" style={{textDecoration: "none"}}>
                    <li>
                        <LogoutIcon className="icon"/>
                        <span>Logout</span>
                    </li>
                </Link>
            </ul>
        </div>
        <div className="bottom">
            <div className="colorOption" onClick={()=> dispatch({type:"LIGHT"})}></div>
            <div className="colorOption" onClick={()=> dispatch({type:"DARK"})}></div>
        </div>
    </div>
  )
}

export default Sidebar