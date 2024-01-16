import React from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { ThemeProvider, createTheme, styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CategoryIcon from '@mui/icons-material/Category';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import ReceiptIcon from '@mui/icons-material/Receipt';
import PaymentIcon from '@mui/icons-material/Payment';
import logo from '../../../Assets/Frame 1738.png'
import { AccountCircle, Logout } from '@mui/icons-material';
import { Menu, MenuItem } from '@mui/material';
import useAuth from '../../../Hooks/useAuth';
import Cookie from 'js-cookie';
import { role_name, token_name } from '../../../DataStatic';
import DashboardIcon from '@mui/icons-material/Dashboard';

const drawerWidth = 240;

const myTheme = createTheme({
  typography: {
    fontFamily: "Montserrat",
  },
  palette: {
    success: {
      main: "#790B0A",
      contrastText: "#FFFFFF",
    },
    warning: {
      main: "#FFFFFF",
      contrastText: "#790B0A",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          textTransform: "none",
          padding: "10px 20px",
          boxShadow: "none",
        },
      },
    },
  },
});

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const Layout = () => {
  const authCtx = useAuth();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = () => {
    authCtx.setLogOut(null, null)
    Cookie.remove(token_name)
    Cookie.remove(role_name)
    return navigate('/login')
  }

  const navItemsLogin = [
    {
      icon: <DashboardIcon sx={{ stroke: '#790B0A', fill: '#790B0A' }} />,
      label: 'Dashboard', variant: '', color: 'success', link: '/admin',
    },
    {
      icon: <Inventory2Icon sx={{ stroke: '#790B0A', fill: '#790B0A' }} />,
      label: 'Product', variant: '', color: 'warning', link: '/admin/product'
    },
    {
      icon: <CategoryIcon sx={{ stroke: '#790B0A', fill: '#790B0A' }} />,
      label: 'Category', variant: '', color: 'success', link: '/admin/category'
    },
    {
      icon: <ReceiptIcon sx={{ stroke: '#790B0A', fill: '#790B0A' }} />,
      label: 'Invoice', variant: '', color: 'success', link: '/admin/invoice',
    },
    {
      icon: <AccountCircle sx={{ stroke: '#790B0A', fill: '#790B0A' }} />,
      label: 'User', variant: '', color: 'success', link: '/admin/user',
    },
    {
      icon: <PaymentIcon sx={{ stroke: '#790B0A', fill: '#790B0A' }} />,
      label: 'Payment Method', variant: '', color: 'success', link: '/admin/payment',
    },

  ];
  
  return (
    <>
    <ThemeProvider theme={myTheme}>
      <Box sx={{ display: 'flex' }}>
      <CssBaseline />
        <AppBar position="fixed" open={open}>
          <Toolbar sx={{backgroundColor:'#790B0A'}}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
              <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'space-between' }}>
                  <Box
                    component="img"
                    sx={{
                      height: '100%',
                      width: '100%',
                      maxWidth: '200px',
                      backgroundColor: 'white',
                      padding: '0% 1%'
                    }}
                    alt="Car Image"
                    src={logo}
                />
                <Box>
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
                      vertical: 'top',
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
                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                    <MenuItem onClick={handleClose}>My account</MenuItem>
                  </Menu>
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleLogOut}
                    color="inherit"
                  >
                    <Logout/>
                  </IconButton>
                </Box>
            </Box>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            {navItemsLogin.map((value, index) => (
              <ListItem key={index} disablePadding sx={{ display: 'block' }}>
                <ListItemButton 
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}
                  onClick={() => navigate(value.link)}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    {value.icon}
                  </ListItemIcon>
                  <ListItemText primary={value.label} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3, overflow: 'hidden' }}>
          <DrawerHeader />
          <Outlet/>
        </Box>
      </Box>
    </ThemeProvider>
      
    </>
  )
}

export default Layout;