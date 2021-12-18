import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import MoreIcon from '@mui/icons-material/MoreVert';
import { Link, Button } from '@mui/material';

import {useNavigate} from 'react-router-dom';

import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";

import SearchPopUp from './other/SearchPopUp';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function NavBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [email, setEmail] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const auth = getAuth();
  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  const handleSignOut = () => {
    signOut(auth);
    localStorage.removeItem("uid");
    localStorage.removeItem("tmpToken");
    navigate("/")
  }
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>
        <Link href="/profile/0">
          Profile
        </Link>
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
      
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={() => {
        navigate("/")
        handleMobileMenuClose();
      }}>
        <Button >Home</Button>
      </MenuItem>
      <MenuItem onClick={() => {
          navigate("/profile/2");
          handleMobileMenuClose();
        }}>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem 
        // onClick={handleProfileMenuOpen}
        onClick={() => {
          navigate("/profile/0");
          handleMobileMenuClose();
        }}
        >
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  React.useEffect(() => {
    getAuth().onIdTokenChanged((user) => {
      if (user) {
        user.getIdToken().then(response => {
          localStorage.setItem("tmpToken", response);
        })
      } else {
        localStorage.removeItem("tmpToken");
      }
    })
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        setEmail(user.email);
        user.getIdToken().then(response => {
          console.log("update token")
          localStorage.setItem("tmpToken", response);
        })
      } else {
        // User is signed out
        // ...
        setEmail("");
        localStorage.removeItem("tmpToken");
      }
    });
  })

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            <a href="/" style={{
              color:"white",
              textDecoration: "none"
            }} >PlayPal</a>
          </Typography>
          
          
          <Search onClick={() => {
            handleClickOpen();
          }}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search', 'disabled': true }}
            />
          </Search>
          
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton href="/profile/2" size="large" aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={0} color="error">
                
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              // onClick={handleProfileMenuOpen}
              color="inherit"
              href="/profile/0"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
          {
            localStorage.getItem("uid") === null ?  
            <>
              <Button href="/register" variant="default" color="error">
                Sign-up
              </Button>
              <Button href="/signin" variant="default" color="success">
                Sign-in
              </Button>
            </>
            :
            <>
              <Button
                ariant="default"
                onClick={handleSignOut}
                style={{color:"white"}}
              >
                Sign-Out
              </Button>
              <Button
                ariant="default"
                href="/mypost"
                style={{color:"white"}}
              >
                My Posts
              </Button>
            </>
          }
          {
            localStorage.getItem("uid") === null ? null : 
            <Button style={{color:"white"}} href="/profile/0">
              {email}
            </Button>
          }
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      <SearchPopUp
        open={open}
        onClose={handleClose}
      />
    </Box>
  );
}
