import React from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import './Header.css';
import { useNavigate } from 'react-router'
import SideMenuBar from "./SideMenuBar";

import styled from 'styled-components'


export default function Header() {
    const navigate = useNavigate()

    const goToHome = () => {
        navigate('/')
    }

    return (
        <>
            {/*<div className="header">Medical Store Management System</div>*/}
            <Box sx={{ flexGrow: 1 }} >
                <AppBar position="static">
                    <Toolbar>
                        <TypographyStyle variant="h6" component="div" sx={{ flexGrow: 1 }} >
                            <h6 className='logo' onClick={() => goToHome()}>Medical Store Management System</h6>
                        </TypographyStyle>
                    </Toolbar>
                </AppBar>
            </Box>
        </>
    )
}


const TypographyStyle = styled.div`
  .logo {
    font-weight: bold;
    font-size: 1.3em;
  }
  .logo:hover {
    cursor:pointer;
  }
`
