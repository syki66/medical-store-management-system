import './App.css';
import Header from './components/Header'
import SideMenuBar from "./components/SideMenuBar";
import Button from '@mui/material/Button';
import GlobalStyle from './components/GlobalStyle'

import Login from './pages/Login/Login'
import {useEffect, useState} from 'react';


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
