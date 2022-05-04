import './App.css';
import { BrowserRouter } from "react-router-dom";

import Header from './components/Header'
import SideMenuBar from "./components/SideMenuBar";
import Button from '@mui/material/Button';
import GlobalStyle from './components/GlobalStyle'

import Login from './pages/Login/Login'
import {useEffect, useState} from 'react';

import SideDrawer from "./components/SideDrawer";


function App() {
    const [login, setLogin] = useState(true);

  return (
    <>
        {login ? (
              <>
              <GlobalStyle />
              <BrowserRouter>
                  {/*<Header />*/}
                  <div className="container">
                    <SideDrawer />
                      {/*<SideMenuBar />*/}
                  </div>
              </BrowserRouter>
              </>
        ) : (
            <Login />
        )}
            </>
  );
}

export default App;
