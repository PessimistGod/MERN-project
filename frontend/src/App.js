import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/Authentication/Login'
import Signup from './pages/Authentication/Signup'
import Landing from './pages/Navigators/Landing';
import AppLayout from './AppLayout';
import LoanApplication from './pages/Navigators/LoanApplication';

function App() {
  return (
  <BrowserRouter>
      <Routes>
        <Route path='/' element={<AppLayout/>}>
          <Route index element={<Landing />}></Route>
          <Route path='/Apply' element={<LoanApplication />} ></Route>


        </Route>

        <Route path='/Login' element={<Login />}></Route>
        <Route path='/Signup' element={<Signup />}></Route>
      </Routes>
      
        
      
  </BrowserRouter>  
  );
}

export default App;
