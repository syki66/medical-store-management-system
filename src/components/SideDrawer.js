import React, {useEffect, useState, useContext, useRef } from 'react';

import {Link, Route, Routes, useLocation} from "react-router-dom";
import {useNavigate} from "react-router";

import {baseURL} from "../variables/baseURL";
import Home from "../pages/Home/Home";
import Company from "../pages/Company/Company";
import CompanyAccount from "../pages/CompanyAccount/CompanyAccount";
import Employee from "../pages/Employee/Employee";
import Medicine from "../pages/Medicine/Medicine";
import Bill from "../pages/Bill/Bill";
import Request from '../pages/Request/Request';
import MyPage from "../pages/MyPage/MyPage";

import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import axios from "axios";



export const HomeContext = React.createContext(null);

const sessionTime = 1800;

export default function SideDrawer( {setLogin, errorMessage, setErrorOpen} ) {
    const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const [homeData, setHomeData] = useState(null);
    const [userName, setUserName] = useState('');

    const interval = useRef(null);
    const timer = useRef(sessionTime - 1);
    const [clock, setClock] = useState('30:00');

    const path = "user"
    const URL = baseURL + path;

    const getData = async () => {
        try {
            const response = await axios.get(URL);
            setHomeData(response.data);
            console.log('sidedrawer-response', response);
            setUserName(response.data.user_storename)
        } catch (error) {
            const { status, data } = error.response;
            if (status === 403 && data.message === "session ID not found") {
                // console.log('error.response.data', data);
                sessionStorage.setItem('login', false);
                setLogin(false)
            } else {
                console.log(error);
            }
        }
    };

    const navigate = useNavigate();
    const location = useLocation()

    const goToHome = () => {
        navigate('/')
    };

    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleChange = (event) => {
        setAuth(event.target.checked);
    };

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const runLogout = async (forced) => {
        try {
            const response = await axios.post(URL + '/logout/');
            if (response.data.message === 'Ok') {
                sessionStorage.setItem('login', false);
                setLogin(false);
                if (forced){
                    errorMessage.current = "세션이 만료되어 자동 로그아웃 되었습니다.";
                    setErrorOpen(true);
                }
            }
        } catch (error){
            console.log(error);
        }
    }


    const runTimer = () => {
        interval.current = setInterval(() => {
            if (timer.current <= 0){
                runLogout(true);
            }
            const minute = Math.floor(timer.current / 60);
            const second = timer.current % 60;
            timer.current -= 1;
            setClock(`${minute < 10 ? `0${minute}` : minute}:${second < 10 ? `0${second}` : second}`);
        }, 1000);
    }

    const clearTimer = () => {
        clearInterval(interval.current);
        timer.current = sessionTime - 1;
        setClock('30:00');

    }

    useEffect(() => {
        getData();
        console.log('sidedrawer-homeData', homeData);

        clearTimer();
        runTimer();

        return () => {
            clearInterval(interval.current);
        }
    }, [location]);

    return (
        <Box sx={{ display: 'flex' }}>

            <CssBaseline />

            <AppBar position="fixed" open={open} sx={{backgroundColor: '#f2413b'}} >

                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{ mr: 2, ...(open && { display: 'none' }) }}
                    >
                        <MenuIcon />
                    </IconButton>

                    <TypographyStyle variant="h6" noWrap component="div">
                        <h6 className='logo' onClick={() => goToHome()}>Medical Store Management System</h6>
                    </TypographyStyle>

                    <TypographyStyle sx={{ flexGrow: 1 }} />

                    <TypographyStyle variant="h6" noWrap component="div">
                        <h6 className='timer'>{clock}</h6>
                    </TypographyStyle>

                    <TypographyStyle variant="h6" noWrap component="div">
                        <h6 className='timer_btn' onClick={() => {
                            getData();
                            clearTimer();
                            runTimer();
                        }}>연장</h6>
                    </TypographyStyle>

                    <TypographyStyle variant="h6" noWrap component="div">
                        <h6 className='username'>{userName}님</h6>
                    </TypographyStyle>

                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        color="inherit"
                    >
                        <AccountCircle />
                    </IconButton>

                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <Link to="/myPage">
                            <MenuItem onClick={handleClose}>My Information</MenuItem>
                        </Link>
                        <MenuItem onClick={() => {
                            handleClose();
                            runLogout();
                        }}>
                            Logout
                        </MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>

            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader sx={{backgroundColor: '#FAEBD7'}}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                    <List sx={{backgroundColor: '#FAEBD7'}} className="sideNav" component="nav" aria-label="mailbox folders">
                        <Link className="link" to="/">
                            <ListItem button divider>
                                <ListItemText primary="Home" />
                            </ListItem>
                        </Link>
                        <Link className="link" to="/company/1">
                            <ListItem button divider>
                                <ListItemText primary="Manage Company" />
                            </ListItem>
                        </Link>
                        {/*<Link className="link" to="/companyAccount">*/}
                        {/*    <ListItem button divider>*/}
                        {/*        <ListItemText primary="Manage Company Account" />*/}
                        {/*    </ListItem>*/}
                        {/*</Link>*/}
                        <Link className="link" to="/employee/1">
                            <ListItem button divider>
                                <ListItemText primary="Manage Employee" />
                            </ListItem>
                        </Link>
                        <Link className="link" to="/medicine/1">
                            <ListItem button divider>
                                <ListItemText primary="Manage Medicine" />
                            </ListItem>
                        </Link>
                        <Link className="link" to="/bill">
                            <ListItem button divider>
                                <ListItemText primary="Generate Bill" />
                            </ListItem>
                        </Link>
                        <Link className="link" to="/customerRequest">
                            <ListItem button divider>
                                <ListItemText primary="Customer Request" />
                            </ListItem>
                        </Link>
                    </List>
            </Drawer>
            <Main open={open} sx={{width: '100%'}}>
                <DrawerHeader />
                <HomeContext.Provider value={{homeData}}>
                    <Routes>
                        <Route className="" exact path="/" element={<Home/>} />
                        <Route className="" path="/company/:id" element={<Company/>} />
                        <Route className="" path="/companyAccount" element={<CompanyAccount/>} />
                        <Route className="" path="/employee/:id" element={<Employee/>} />
                        <Route className="" path="/medicine/:id" element={<Medicine/>} />
                        <Route className="" path="/bill" element={<Bill/>} />
                        <Route className="" path="/customerRequest" element={<Request/>} />
                        <Route className="" path="/myPage" element={<MyPage/>} />
                    </Routes>
                </HomeContext.Provider>
            </Main>
        </Box>
    );
}

const drawerWidth = 250;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        // flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
    }),
);

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    // padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

const TypographyStyle = styled('Typography')`
  && {
      .logo, .timer, .username {
        font-size: 1.3em;
      }
      .logo:hover{
        cursor:pointer;
      }
        
      .username {
        margin-left: 1em;
      }
    
      .timer_btn {
        padding: 0.3em;
        margin: 0.5em;
        border: 0.1em solid;
        border-radius: 0.3em;
        transition: background-color 0.2s, color 0.2s;  
      }
      .timer_btn:hover {
        background-color: white;
        color: #f2413b;
        cursor:pointer;
      }
  }
`