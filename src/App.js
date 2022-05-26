import { BrowserRouter } from "react-router-dom";

import GlobalStyle from './components/GlobalStyle';

import Login from './pages/Login/Login'
import React, {useEffect, useRef, useState} from 'react';


import SideDrawer from "./components/SideDrawer";


import axios from "axios";
import {Alert, Snackbar, Stack} from "@mui/material";
import Loading from "./components/Loading";

axios.defaults.withCredentials = true;
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';

const getLoginSession = () => {
    const value = sessionStorage.getItem('login')
    return value;
}


function App() {
    const [login, setLogin] = useState(getLoginSession()); // 초기값 sessionStorage에서 안받으면 새로고침시 로그인 풀림

  return (
    <>
        {login ? (
              <>
              <GlobalStyle />
              <BrowserRouter>
                  <div className="container">
                    <SideDrawer
                        setLogin = {setLogin}
                    />
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
