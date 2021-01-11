import React, { Component, useState } from 'react';
import { Link } from 'react-router-dom';

import * as ROUTES from '../../constants/routes';
import { AuthUserContext } from '../Session';

import logo from '../../images/logo.png';
import styles from './navigation.module.css';
import '../../images/images.css';

import NavigationAuth from './NavigationAuth/navigation-auth';
import ModalSideNavBar from './ModalSideNavBar/modal-side-nav-bar';


export default class Navigation extends Component {

  constructor(props) {
    super(props);
    this.setShow = this.setShow.bind(this);
    this.state = {
      showMobileNav: false
    };
  }

  setShow(show) {
    this.setState({showMobileNav: show});
  }

  render() {
    return (
      <div className={styles.baseContainer}>
      <div className={styles.navbar}>
      <ModalSideNavBar show={this.state.showMobileNav} close={(e) => this.setShow(false)}/>
        <div className={styles.mobileMenu}>
          <div className={styles.logo} onClick={() => this.setShow(true)}>
          <svg viewBox="0 0 100 80" width="40" height="40">
            <rect style={{fill:"#e88c20"}} width="100" height="10" rx="8"></rect>
            <rect style={{fill:"#e88c20"}} y="30" width="100" height="10" rx="8"></rect>
            <rect style={{fill:"#e88c20"}} y="60" width="100" height="10" rx="8"></rect>
          </svg>
          </div>
        </div>
        <div className={styles.NavigationBackground}>
        <div className={styles.deskLogo}>
          <Link to={ROUTES.HOME}>
            <img src={logo} alt="Logo" style={{height: 75, width: 75}} />      
          </Link>
        </div>
        <div className={styles.mobileLogo}>
          <Link to={ROUTES.HOME}>
            <img src={logo} alt="Logo" style={{height: 75, width: 75}} />      
          </Link>
        </div>
        <div className={styles.mobileGuildName}>
          <h2>Mythos</h2>
        </div>
        <Link to={ROUTES.HOME} className={styles.Tile}>Home</Link>
        <Link to={ROUTES.RULES} className={styles.Tile}>Guild rules</Link> 
        <Link to={ROUTES.TWITCH} className={styles.Tile}>Twitch</Link>
          <AuthUserContext.Consumer>
            {authUser =>
              authUser ? <NavigationAuth auth={authUser} /> : <NavigationNonAuth />
            }
          </AuthUserContext.Consumer>
        </div>
      </div>
    </div>  
    );
  }
}
const NavigationNonAuth = () => (
  <div className={styles.Tiles}>
    <Link to={ROUTES.SIGN_IN} className={styles.Tile}>
      Sign in
    </Link>
  </div>
);