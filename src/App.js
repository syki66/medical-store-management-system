import './App.css';
import Header from './components/Header'
import SideMenuBar from "./components/SideMenuBar";
import GlobalStyle from './components/GlobalStyle'

import Login from './pages/Login/Login'
import {useEffect, useState} from 'react';

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
                  <Header />
                  <div className="container">
                      <SideMenuBar />
                  </div>
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
