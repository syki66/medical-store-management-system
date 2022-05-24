import { BrowserRouter } from "react-router-dom";

import GlobalStyle from './components/GlobalStyle';

import Login from './pages/Login/Login'
import React, {useRef, useState} from 'react';


import SideDrawer from "./components/SideDrawer";


import axios from "axios";
import {Alert, Snackbar, Stack} from "@mui/material";

axios.defaults.withCredentials = true;
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';

const getLoginSession = () => {
    const value = sessionStorage.getItem('login')
    return value;
}


function App() {
    const [login, setLogin] = useState(getLoginSession());

    const [errorOpen, setErrorOpen] = useState(false);
    const errorMessage = useRef('오류가 발생하였습니다.');

    const handleToastClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setErrorOpen(false);
    };

  return (
    <>
        {login ? (
              <>
              <GlobalStyle />
              <BrowserRouter>
                  <div className="container">
                    <SideDrawer
                        setLogin = {setLogin}
                        setErrorOpen = {setErrorOpen}
                        errorMessage = {errorMessage}
                    />
                  </div>
              </BrowserRouter>
              </>
        ) : (
            <Login
                setLogin = {setLogin}
            />
        )}


        <Stack spacing={2} sx={{ width: '100%' }}>
            <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={errorOpen} onClose={handleToastClose}>
                <Alert onClose={handleToastClose} severity="error" sx={{ width: '100%' }}>
                    {errorMessage.current}
                </Alert>
            </Snackbar>
        </Stack>

    </>
  );
}

export default App;
