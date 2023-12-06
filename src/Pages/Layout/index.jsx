import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { ThemeProvider, createTheme } from "@mui/material";


import logo from '../../Assets/Frame 1738.png'
import { Outlet, useNavigate, } from 'react-router-dom';

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

const navItems = [
  { label:'Sign Up', variant: 'contained', color: 'warning', link: '/register'},
  { label:'Login', variant: 'contained' ,color: 'success', link: '/login'},
];


const Layout = (props) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleRedirect = (value) => {
    return navigate(value)
  }

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Box sx={{ display: 'flex' }}>
        <img src={logo} alt="LOGO" />
      </Box>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;
  
  return (
    <ThemeProvider theme={myTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar component="nav" sx={{ background: '#FFFFFF', boxShadow: 'none'}}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' }, color: '#000000' }}
            >
              <MenuIcon />
            </IconButton>
            <Box component="div" sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
              <img src={logo} alt="LOGO" onClick={() => handleRedirect('/')} />
            </Box>
            <Box sx={{ display: { xs: 'none', sm: 'block'} }}>
              {navItems.map((item) => {
                return (
                  <Button
                    key={item.label}
                    variant={item.variant}
                    color={item.color}
                    sx={{ mx: '10px'}}
                    onClick={() => handleRedirect(item.link)}
                  >
                    {item.label}
                  </Button>
                )
              })}
            </Box>
          </Toolbar>
        </AppBar>
        <nav>
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
            }}
          >
            {drawer}
          </Drawer>
        </nav>
        <Box component="main" sx={{  width: '100%' }}>
          {/* <Toolbar /> */}
            <Outlet />
        </Box>
      </Box>
    </ThemeProvider>

  );
}

export default Layout