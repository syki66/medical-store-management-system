import './App.css';
import { BrowserRouter } from "react-router-dom";

import Header from './components/Header'
import SideMenuBar from "./components/SideMenuBar";
import GlobalStyle from './components/GlobalStyle'

import Login from './pages/Login/Login'
import {useEffect, useState} from 'react';


import SideDrawer from "./components/SideDrawer";


import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';

const getLoginSession = () => {
    const value = sessionStorage.getItem('login')
    return value;
}


function App() {
    const [login, setLogin] = useState(getLoginSession());

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
            <Login
                setLogin = {setLogin}
            />
        )}
            </>
  );
}

export default App;
