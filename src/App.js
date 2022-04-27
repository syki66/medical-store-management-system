import './App.css';
import Header from './components/Header'
import SideMenuBar from "./components/SideMenuBar";
import Button from '@mui/material/Button';
import GlobalStyle from './components/GlobalStyle'

import Login from './pages/Login/Login'
import {useEffect, useState} from 'react';

import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';

function App() {
    const [login, setLogin] = useState(true);

  return (
    <>
        {login ? (
              <>
                  <GlobalStyle />
                  <Header />
                  <div className="container">
                      <SideMenuBar />
                  </div>
              </>
        ) : (
            <Login />
        )}



    </>
  );
}

export default App;
