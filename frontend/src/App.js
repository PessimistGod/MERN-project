import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from 'react';
import Login from '../pages/Login'

function App() {
  return (
  <BrowserRouter>
      <Routes>
        <Route path='/' component={Login}> </Route>
      </Routes>
  </BrowserRouter>  
  );
}

export default App;
