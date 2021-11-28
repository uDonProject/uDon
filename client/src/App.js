import './App.css';
import Header from './component/Header';
import BoardList from './component/BoardList';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Contents from './pages/Contents'
import BoardDetail from './component/BoardDetail';
import BoardUpdate from './component/backup/BoardUpdate';
import BoardDelete from './component/BoardDelete';
import TownBoard from './pages/townBoard';
import BoardInput from './component/BoardInput';



function App() {

  const UserLocationNum = 2;


  return (
    <BrowserRouter>

      <div className="App">

        <Header LocationId = {UserLocationNum}/>

        <Routes>
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


      </div>

    </BrowserRouter>
  );
}

export default App;
