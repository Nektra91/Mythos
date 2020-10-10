import React from 'react';
import { Link } from 'react-router-dom';

import SignOutButton from '../SignOut'
import * as ROUTES from '../../constants/routes';
import { AuthUserContext } from '../Session';

import logo from '../../images/logo.png';
import styles from './navigation.css';
import '../../images/images.css';

const Navigation = () => (
  <div className={styles.NavigationBackground}>
    <div>
      <Link to={ROUTES.HOME}>
        <img src={logo} alt="Logo" style={{height: 75, width: 100}} />      
      </Link>
    </div>
    <div className={styles.Tile}>
      <Link to={ROUTES.HOME}>Home</Link>
    </div>
    <div className={styles.Tile}>
      <Link to={ROUTES.ABOUT}>About us</Link>
    </div>
    <div className={styles.Tile}>
      <Link to={ROUTES.RULES}>Guild rules</Link>
    </div> 
    <AuthUserContext.Consumer>
      {authUser =>
        authUser ? <NavigationAuth /> : <NavigationNonAuth />
      }
    </AuthUserContext.Consumer>
  </div>
);
 
const NavigationAuth = () => (
  <div className={styles.Tiles}>
    <div className={styles.Tile}>
      <Link to={ROUTES.APPLY}>Apply</Link>
    </div>       
    <div className={styles.Tile}>
      <Link to={ROUTES.ADMIN}>Admin</Link>
    </div>
    <div className={styles.Tile}>
      <Link to={ROUTES.ACCOUNT}>Account</Link>
    </div>
    <div className={styles.Tile}>
      Cog for logout - login - admin - account
      <SignOutButton />
    </div>
  </div>
  
);
 
const NavigationNonAuth = () => (
  <ul>
    <li>
      <Link to={ROUTES.SIGN_IN}>Cog for logout - login - admin - account</Link>
    </li>
  </ul>
);

export default Navigation;
