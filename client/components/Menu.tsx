import React, { useEffect, useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import AddBoxIcon from '@material-ui/icons/AddBox';
import Button from '@material-ui/core/Button';
import useArcanaAuth from '../helper/useArcanaAuth';
import { ColorRing } from 'react-loader-spinner';

// import { withRouter } from 'react-router';
import Link from 'next/link';

const isActive = (history: any, path: any) => {
  if (history.location.pathname == path) return { color: '#f99085' };
  else return { color: '#efdcd5' };
};
function Menu() {
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [account, setAccount] = useState('');

  const { initializeAuth, loggedIn, getAccounts, login, loginWithLink, logout, initialized } = useArcanaAuth();

  const initialize = async () => {
    await initializeAuth();
  };

  const handleLogout = async () => {
    await logout();
  };

  useEffect(() => {
    initialize();
  }, []);

  useEffect(() => {
    const loadDetails = async () => {
      if (initialized) {
        if (loggedIn) {
          const acc: any = await getAccounts();
          setAccount(acc[0]);
          setLoading(false);
        } else {
          setLoading(false);
        }
      }
    };
    loadDetails();
  }, [initialized, loggedIn]);

  const handleEmailChange = (event: any) => {
    setEmail(event.target.value);
  };

  return (
    <>
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

      <div className="container">
        <h1>AUTHENTICATION</h1>
        <div>
          {loading ? (
            <div className="loading">
              <ColorRing
                visible={true}
                height="100"
                width="80"
                ariaLabel="blocks-loading"
                wrapperStyle={{}}
                wrapperClass="blocks-wrapper"
                // colors={['#000000']}
              />
            </div>
          ) : !loading && loggedIn ? (
            <div>
              <h2 className="sub-heading">Logged In</h2>
              <h3>Welcome {account}</h3>
              <h3>you're logged in successfully.</h3>
              <button className="big-button" onClick={handleLogout}>
                Logout
              </button>
            </div>
          ) : (
            <div className="box">
              <h2 className="sub-heading">Select a login</h2>
              <div className="options">
                <button className="big-button" onClick={() => login('google')}>
                  Google Login
                </button>
                <button className="big-button" onClick={() => login('twitch')}>
                  Twitch Login
                </button>
                <button className="big-button" onClick={() => login('discord')}>
                  Discord Login
                </button>
                <button className="big-button" onClick={() => login('twitter')}>
                  Twitter Login
                </button>
                <button className="big-button" onClick={() => login('github')}>
                  Github Login
                </button>
              </div>
              <div className="form">
                <input value={email} type="text" placeholder="Enter email" onChange={handleEmailChange} />
                <button className="big-button" onClick={() => loginWithLink(email)}>
                  Login with link
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Menu;
