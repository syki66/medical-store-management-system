import * as React from 'react';

import {Link, Route, Routes} from "react-router-dom";
import {useNavigate} from "react-router";

import Home from "../pages/Home/Home";
import Company from "../pages/Company/Company";
import CompanyAccount from "../pages/CompanyAccount/CompanyAccount";
import Employee from "../pages/Employee/Employee";
import Medicine from "../pages/Medicine";
import Bill from "../pages/Bill/Bill";
import CustomerRequest from "../pages/Request/CustomerRequest";

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



export default function SideDrawer() {
    const navigate = useNavigate()

    const goToHome = () => {
        navigate('/')
    }

    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

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
                    <Typography variant="h6" noWrap component="div">
                        <h6 className='logo' onClick={() => goToHome()}>Medical Store Management System</h6>
                    </Typography>
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
                    <List className="sideNav" component="nav" aria-label="mailbox folders">
                        <Link className="link" to="/">
                            <ListItem button divider>
                                <ListItemText primary="Home" />
                            </ListItem>
                        </Link>
                        <Link className="link" to="/company">
                            <ListItem button divider>
                                <ListItemText primary="Manage Company" />
                            </ListItem>
                        </Link>
                        <Link className="link" to="/companyAccount">
                            <ListItem button divider>
                                <ListItemText primary="Manage Company Account" />
                            </ListItem>
                        </Link>
                        <Link className="link" to="/employee">
                            <ListItem button divider>
                                <ListItemText primary="Manage Employee" />
                            </ListItem>
                        </Link>
                        <Link className="link" to="/medicine">
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
                    <Routes>
                        <Route className="" path="/" element={<Home/>} />
                        <Route className="" path="/company" element={<Company/>} />
                        <Route className="" path="/companyAccount" element={<CompanyAccount/>} />
                        <Route className="" path="/employee" element={<Employee/>} />
                        <Route className="" path="/medicine" element={<Medicine/>} />
                        <Route className="" path="/bill" element={<Bill/>} />
                        <Route className="" path="/customerRequest" element={<CustomerRequest/>} />
                    </Routes>
            </Main>
        </Box>
    );
}

const drawerWidth = 240;

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
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

// const TypographyStyle = styled.h6`
//   .logo {
//     font-weight: bold;
//     font-size: 1.3em;
//   }
//   .logo:hover {
//     cursor:pointer;
//   }
// `