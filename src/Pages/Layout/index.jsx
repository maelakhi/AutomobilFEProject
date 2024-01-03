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
import { Container, Grid, ThemeProvider, Typography, createTheme } from "@mui/material";
import logo from '../../Assets/Frame 1738.png'
import { Link, Outlet, useNavigate } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import Cookie from 'js-cookie';
import { role_name, token_name } from '../../DataStatic';
import useAuth from '../../Hooks/useAuth';
import PropTypes from 'prop-types';

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
  { label: 'Sign Up', variant: 'contained', color: 'warning', link: '/register' },
  { label: 'Login', variant: 'contained', color: 'success', link: '/login' },
];

const navItemsLogin = [
  {
    icon: <ShoppingCartIcon sx={{ stroke: '#790B0A', fill: '#790B0A' }} />,
    label: 'Cart', variant: '', color: 'warning', link: '/checkout'
  },
  {
    icon: null,
    label: 'My Class', variant: '', color: 'success', link: '/myclass'
  },
  {
    icon: null,
    label: 'Invoice', variant: '', color: 'success', link: '/invoice',
    divider:
      <Divider orientation="vertical"
        sx={{ borderRightWidth: 3, borderColor: '#790B0A', my: '1%' }}
        flexItem 
      />
  },
  {
    icon: <PersonIcon sx={{ stroke: '#790B0A', fill: '#790B0A' }} />,
    label: 'Profile', variant: '', color: 'success', link: '/profile'
  },
  {
    icon: <LogoutIcon sx={{ stroke: '#790B0A', fill: '#790B0A' }} />,
    label: 'LogOut', variant: '', color: 'success', link: '/'
  }
];


const Layout = (props) => {
  const { window } = props;
  const authCtx = useAuth();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleRedirect = (value) => {
    return navigate(value)
  }

  const handleLogOut = () => {
    authCtx.setLogOut(null, null)
    Cookie.remove(token_name)
    Cookie.remove(role_name)
    return navigate('/')
  }

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Box sx={{ display: 'flex' }} onClick={() => handleRedirect('/')}>
        <img src={logo} alt="LOGO" />
      </Box>
      <Divider />
      <List>
        {!authCtx.isLogin && navItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
        {authCtx.isLogin && navItemsLogin.map((item) => (
          <ListItem key={item.label} disablePadding onClick={() => handleRedirect(item.link)}>
            <ListItemButton sx={{ textAlign: 'center', justifyContent: "center" }}>
              {item?.icon ? <>{item.icon}{item.label}</> : <ListItemText primary={item.label} />}
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
        <AppBar component="nav"
          sx={{
            background: '#FFFFFF',
            boxShadow: 'none', padding: '0px !important'
          }}
        >
          <Container maxWidth='xl' sx={{ padding: '0px !important' }} >
            <Toolbar >
              {!authCtx.isLogin && (
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={handleDrawerToggle}
                  sx={{ mr: 2, display: { sm: 'none' }, color: '#000000' }}
                >
                  <MenuIcon />
                </IconButton>
              )}
              {authCtx.isLogin && (
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={handleDrawerToggle}
                  sx={{ mr: 2, display: { md: 'none' }, color: '#000000' }}
                >
                  <MenuIcon />
                </IconButton>
              )}
              {!authCtx.token && (
                <>
                  <Grid container sx={{ display: { xs: 'none', sm: 'flex' } }}>
                    <Grid item sm md={6} >
                      <Link to={"/"}>
                        <Box
                          component="img"
                          sx={{
                            height: '100%',
                            width: '100%',
                            maxWidth: '200px'
                          }}
                          alt="Car Image"
                          src={logo}
                        />
                      </Link>
                    </Grid>
                    <Grid item md={6}>
                      <Box
                        sx={{
                          height: '100%',
                          display: { xs: 'none', sm: 'flex' },
                          justifyContent: 'end',
                          alignItems: 'center'
                        }}
                      >
                        {navItems.map((item) => {
                          return (
                            <Button
                              key={item.label}
                              variant={item.variant}
                              color={item.color}
                              sx={{ mx: '10px' }}
                              onClick={() => handleRedirect(item.link)}
                            >
                              {item.label}
                            </Button>
                          )
                        })}
                      </Box>
                    </Grid>
                  </Grid>
                </>
              )}
              {authCtx.token && (
                <>
                  <Grid container sx={{ display: { sm: 'none', md: 'flex' } }}>
                    <Grid item sm md={6} >
                      <Link to={"/"}>
                        <Box
                          component="img"
                          sx={{
                            height: '100%',
                            width: '100%',
                            maxWidth: '200px'
                          }}
                          alt="Car Image"
                          src={logo}
                        />
                      </Link>
                    </Grid>
                    <Grid item md={6}>
                      <Box
                        sx={{
                          height: '100%',
                          display: { xs: 'none', sm: 'flex' },
                          justifyContent: 'end',
                          alignItems: 'center',
                          gap: '20px',
                          px: '1%'
                        }}
                      >
                          {/* <Grid container sx={{ border: '2px solid black', width: '100%' }}> */}
                            {navItemsLogin.map((item) => (
                              <div key={item.label}>
                                  <Box sx={{width: '100%'}}    key={item.label}>
                                    {item.label == 'LogOut' ? (
                                      <>
                                      <Button onClick={() => handleLogOut()} >
                                          {item?.icon ?
                                            item.icon :
                                            <Typography component="p" variant='caption' color="#790B0A">
                                              {item.label}
                                            </Typography>
                                          }
                                        </Button>
                                      </>
                                    ) : (
                                      <>
                                        <Button
                                          component={Link}
                                          to={item.link}
                                          sx={{ minWidth: '100px' }}
                                        >
                                          {item?.icon ?
                                            item.icon :
                                            <Typography component="p" variant='caption' color="#790B0A">
                                              {item.label}
                                            </Typography>
                                          }
                                        </Button>
                                      </>
                                    )}
                                  </Box>
                                {item?.divider && (item?.divider)}
                              </div>
                            ))}
                          {/* </Grid> */}
                        </Box>
                    </Grid>
                  </Grid>
                </>
              )}
            </Toolbar>
          </Container>
        </AppBar>
        <nav>
          {!authCtx.token && (
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
          )}
          {authCtx.token && (
            <Drawer
              container={container}
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
              sx={{
                display: { md: 'block', lg: 'none' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
              }}
            >
              {drawer}
            </Drawer>
          )}
        </nav>
        <Container maxWidth='xl' sx={{ padding: '0px !important', width: '100%' }}>
          {/* <Toolbar /> */}
          <Outlet />
        </Container>
      </Box>
    </ThemeProvider>

  );
}

Layout.propTypes = {
  window: PropTypes.object  
}

export default Layout