import * as React from 'react';
import PropTypes from 'prop-types';
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

import logo from '../../Assets/Frame 1738.png'
import { useNavigate, } from 'react-router-dom';

const drawerWidth = 240;
const navItems = [
  { label:'Sign Up', variant: 'text', color: 'secondary', link: '/register'},
  { label:'Login', variant: 'contained' ,color: 'success', link: '/login'},
];


const Layout = (props) => {
  const { window, children } = props;
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
     <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav" sx={{ background: '#FFFFFF', boxShadow:'none'}}>
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
            <img src={logo} alt="LOGO" />
          </Box>
          <Box sx={{ display: { xs: 'none', sm: 'block'} }}>
            {navItems.map((item) => {
              return (
                <Button
                  key={item.label}
                  variant={item.variant}
                  color={item.color}
                  sx={{ mx: '20px'}}
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
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, boxShadow:'none' },
            boxShadow:'none'
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Box component="main" sx={{ py: 3 }}>
        {/* <Toolbar /> */}
        <div style={{
          display: 'flex',
          justifyItems: 'center',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          {children}
        </div>
      </Box>
    </Box>

  );
}

export default Layout