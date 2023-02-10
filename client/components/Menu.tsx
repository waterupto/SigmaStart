import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import AddBoxIcon from '@material-ui/icons/AddBox';
import Button from '@material-ui/core/Button';
// import auth from './../auth/auth-helper';
// import { withRouter } from 'react-router';
import Link from 'next/link';

const isActive = (history: any, path: any) => {
  if (history.location.pathname == path) return { color: '#f99085' };
  else return { color: '#efdcd5' };
};
const Menu = () => (
  <AppBar position="static">
    <Toolbar>
      {/* <Typography type="title" color="inherit">
        MERN Mediastream
      </Typography> */}
      <div>
        <Link href="/">
          <IconButton aria-label="Home">
            <HomeIcon />
          </IconButton>
        </Link>
      </div>
      <div style={{ position: 'absolute', right: '10px' }}>
        <span style={{ float: 'right' }}>
          {/* {!auth.isAuthenticated() && ( */}
          <span>
            <Link href="/signup">
              <Button>Sign up</Button>
            </Link>
            <Link href="/signin">
              <Button>Sign In</Button>
            </Link>
          </span>
          {/* )} */}
          {/* {auth.isAuthenticated() && (
            <span>
              <Link to="/media/new">
                <Button style={isActive(history, '/media/new')}>
                  <AddBoxIcon style={{ marginRight: '8px' }} /> Add Media
                </Button>
              </Link>
              <Link to={'/user/' + auth.isAuthenticated().user._id}>
                <Button style={isActive(history, '/user/' + auth.isAuthenticated().user._id)}>My Profile</Button>
              </Link>
              <Button
                color="inherit"
                onClick={() => {
                  auth.signout(() => history.push('/'));
                }}
              >
                Sign out
              </Button>
            </span>
          )} */}
        </span>
      </div>
    </Toolbar>
  </AppBar>
);

export default Menu;
