
import './App.css';
import Login from './component/login/Login';
import Register from './component/register/Register';
import Home from './component/home/Home';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import { useState } from 'react';
import Navbar from './component/Navbar';
import RegisterAssociate from './component/RegisterAssociate';
import EditAssociate from './component/EditAssociate';
import Detail from './component/Detail';

function App() {
  const [user,setLoginUser]=useState({})
  
  return (
    <div>
     <Router>
       <Navbar setLoginUser={setLoginUser} />
        <Routes>
          {/* <Route exact path='/' element={user && user._id  ? <Home setLoginUser={setLoginUser} /> : <Login setLoginUser={setLoginUser} />} /> */}
          <Route exact path='/' element={<Home setLoginUser={setLoginUser} />} />
          <Route exact path='/login' element={<Login setLoginUser={setLoginUser}/> } />
          {/* <Route exact path='/register' element={<Register />} /> */}
          <Route exact path='/register_' element={<RegisterAssociate />} />
          <Route exact path='/edit/:id' element={<EditAssociate />} />
          <Route exact path='/view/:id' element={<Detail />} />
        </Routes>
        </Router>
   
    </div>
  );
}

export default App;
