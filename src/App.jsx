import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import AuthLogin from './context/authlogin.jsx';
import Login from '../src/pages/login/login.jsx';
import LoginUser from '../src/pages/signUp/LoginUser.jsx'
import Home from './pages/home/Home.jsx';
import List from './pages/list/List.jsx';
import Single from './pages/single/Single.jsx';
import New from './pages/new/New.jsx';
import Followup from "./pages/followup/Followup.jsx";
import Logout from './components/logout/Logout.jsx';
import EditUser from './pages/editUser/EditUser.jsx';
import DeleteUser from './pages/deleteUser/DeleteUser.jsx';
import DeleteDocente from './components/createdocente/DeleteDocente.jsx';
import ViewStudent from './components/createstudent/ViewStudent.jsx';
import ViewDocente from './components/createdocente/ViewDocente.jsx';
import CreateAcudiente from './components/createacudiente/CreateAcudiente.jsx';
import CreateStudent from './components/createstudent/CreateStudent.jsx';
import CreateDocente from './components/createdocente/CreateDocente.jsx';
import EditStudent from './components/createstudent/EditStudent.jsx';
import EditDocente from './components/createdocente/EditDocente.jsx';
import ListStudent from './pages/liststudent/ListStudent.jsx';
import ListDocente from './pages/listdocente/ListDocente.jsx';
import ListAcudiente from './pages/listacudiente/ListAcudiente.jsx';
import Company from './pages/company/Company.jsx';
import { ListEducationLevels } from './pages/educationLevel/ListEducationLevels.jsx';
import AreaAcademica from './pages/areaacademica/AreaAcademica.jsx';
import Academica from './components/areaacademica/Academica.jsx';


function App() {
  const [count, setCount] = useState(0);
  const isAuthenticated = localStorage.getItem('token');

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<LoginUser />}  />
          <Route path="/logout" element={<Logout />}  />
          <Route path="/home" element={<Home />}  />
          <Route path="users"> 
            <Route index element={<List/>}/>
            <Route path="test/:id" element={<Single/>}/>
            <Route path="new" element={<New/>}/>
            <Route path="edit/:id" element={<EditUser/>} />
            <Route path="delete/:id" element={<DeleteUser/>}/> 
          </Route>
          <Route path="student"> 
            <Route index element={<ListStudent/>}/>
            <Route path="view/:id" element={<ViewStudent/>}/>
            <Route path="new" element={<CreateStudent/>}/>
            <Route path="edit/:id" element={<EditStudent/>} />
            <Route path="delete/:id" element={<DeleteUser/>}/> 
          </Route>
          <Route path="teacher"> 
            <Route index element={<ListDocente/>}/>
            <Route path="view/:id" element={<ViewDocente/>}/>
            <Route path="new" element={<CreateDocente/>}/>
            <Route path="edit/:id" element={<EditDocente/>} />
            <Route path="delete/:id" element={<DeleteDocente/>}/> 
          </Route>
          <Route path="attendant"> 
            <Route index element={<ListAcudiente/>}/>
            <Route path="view/:id" element={<ViewDocente/>}/>
            <Route path="new" element={<CreateAcudiente/>}/>
            <Route path="edit/:id" element={<EditDocente/>} />
            <Route path="delete/:id" element={<DeleteDocente/>}/> 
          </Route>
          <Route path="academico"> 
            <Route index element={<Followup/>}/>
            <Route path=":seguimiento" element={<Followup/>}/>
            <Route path="new" element={<New/>}/>
          </Route>
          <Route path="company"> 
            <Route index element={<Company/>}/>
            <Route path=":seguimiento" element={<Company/>}/>
          </Route>
          <Route path="/educationLevel" element={<ListEducationLevels />}/>
          <Route path="other"> 
            <Route index element={<AreaAcademica/>}/>
            <Route path=":seguimiento" element={<AreaAcademica/>}/>
            <Route path="new" element={<Academica/>}/>
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
