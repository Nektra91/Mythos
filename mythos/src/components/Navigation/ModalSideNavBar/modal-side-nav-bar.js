import React, { Component } from 'react'
import styles from './modal-side-nav-bar.module.css';
import * as ROUTES from '../../../constants/routes';
import { AuthUserContext } from '../../Session';
import NavigationAuth from '../NavigationAuth/navigation-auth';
import { Link } from 'react-router-dom';

export default function ModalSideNavBar(props) {

    if(!props.show) {
        return null;
    }
    return (
        <div className={styles.modal}>
            <div className={styles.logo}>
            <svg viewBox="0 0 40 40">
                <path className={styles.close} onClick={() => props.close(false)} d="M 10,10 L 30,30 M 30,10 L 10,30" />
            </svg>
            </div>
            <div className={styles.Tile}>
                <Link to={ROUTES.HOME}>Home</Link>
            </div>
            <div className={styles.Tile}>
                <Link to={ROUTES.RULES}>Guild rules</Link>
            </div>
            <div className={styles.Tile}>
                <Link to={ROUTES.TWITCH}>Twitch</Link>
            </div>
            <AuthUserContext.Consumer>
                {authUser =>
                    authUser ? <NavigationAuth auth={authUser} /> : <NavigationNonAuth />
                }
            </AuthUserContext.Consumer>
        </div>
    )
}

const NavigationNonAuth = () => (
    <div className={styles.Tiles}>
      <div className={styles.Tile}>
        <Link to={ROUTES.SIGN_IN}>Sign in</Link>
      </div>
    </div>
  );
