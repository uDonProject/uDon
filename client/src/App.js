import './App.css';
import Header from './component/Header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Contents from './pages/Contents'
import BoardDetail from './component/BoardDetail';
import BoardDelete from './component/BoardDelete';
import TownBoard from './pages/townBoard';
import BoardInput from './component/BoardInput';
import Register from './pages/register';
import Login from './pages/login';
import Logout from './pages/logout';
import { UserContext } from './UserContext/UserContext'
import { useState, useMemo } from 'react'


function App() {

  const UserLocationNum = 2;

  const [user, setUser] = useState(null)
  const value = useMemo( () => ( {user, setUser} ), [user, setUser]  )

  return (

    <BrowserRouter>

      <div className="App">
        
        
        <UserContext.Provider value = {value}>

        <Header LocationId = {UserLocationNum}/>

        
        <Routes>
          {/* <Route path ="/"  element ={<Contents LocationId = {UserLocationNum}/>}/> */}
          <Route path ="/"  element ={<Contents LocationId = {UserLocationNum}/>}/>
        </Routes>

        <Routes>
          
          <Route path ="/BoardDetail/:id"  element ={<BoardDetail />}/>
        </Routes>
        
        <Routes>
          <Route path = "/townBoard" element ={<TownBoard/>}/>
        </Routes>
        
        <Routes>
          <Route path = "/InputDataBoard" element ={<BoardInput/>}/>
        </Routes>

        {/* <Routes>
          <Route path ="/BoardUpdate/:id"  element ={<BoardUpdate />}/>
        </Routes> */}
        
        <Routes>
          <Route path ="/BoardDelete/:id"  element ={<BoardDelete />}/>
        </Routes>

        <Routes>
          <Route path ="/Register"  element ={<Register />}/>
        </Routes>

        <Routes>
          <Route path ="/Login"  element ={<Login />}/>
        </Routes>
        
        <Routes>
          <Route path ="/Logout"  element ={<Logout />}/>
        </Routes>
       
      </UserContext.Provider>
      
      </div>

    </BrowserRouter>
  );
}

export default App;
