import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { PlantaData } from './interface/PlantaData';
import { Card } from './components/card/card';
import { usePLantaData } from './hooks/usePLantaData';
import { CreateModal } from './components/card/create-modal/create-modal';
import React, { useEffect } from 'react';
import HomePage from './pages/HomePage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import UserPage from './pages/UserPage';
import AccountPage from './pages/AccountPage';

const Private = ( {Item}:any) => {
  const signed = false;

  return signed == false ? <Item /> : <LoginPage/>;
}
function App() {
    return(
      <BrowserRouter>
        <Routes>
          <Route path='/' element= {<Private Item = {HomePage} />}></Route>
          <Route path='/login' element= {<LoginPage />}></Route>
          <Route path="/userPage/:id" element={<UserPage />} />
          <Route path="/accountPage" element={<AccountPage />} />
        </Routes>
      </BrowserRouter>
    )
}

export default App
