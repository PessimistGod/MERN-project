import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/Authentication/Login'
import Signup from './pages/Authentication/Signup'


function App() {
  return (
  <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />}></Route>
      </Routes>

      <Routes>
        <Route path='/Signup' element={<Signup />}></Route>
      </Routes>
      
  </BrowserRouter>  
  );
}

export default App;
