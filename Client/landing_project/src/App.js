import './App.css';
import Header from './components/Header'
import SideMenuBar from "./components/SideMenuBar";
import Button from '@mui/material/Button';
import GlobalStyle from './components/GlobalStyle'


function App() {
  return (
    <>
      <GlobalStyle />
      <Header />
      <div className="container">
          <SideMenuBar />
      </div>
    </>
  );
}

export default App;
