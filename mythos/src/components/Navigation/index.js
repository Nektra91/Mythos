import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import * as ROUTES from '../../constants/routes';
import { AuthUserContext } from '../Session';

import logo from '../../images/logo.png';
import styles from './navigation.module.css';
import '../../images/images.css';

import service from '../../service/database';

const Navigation = () => (
  <div className={styles.baseContainer}>
    <div className={styles.navbar}>
      <div className={styles.NavigationBackground}>
      <div className={styles.Logo}>
        <Link to={ROUTES.HOME}>
          <img src={logo} alt="Logo" style={{height: 75, width: 75}} />      
        </Link>
      </div>
      <Link to={ROUTES.HOME} className={styles.Tile}>
        Home
      </Link >
      <Link to={ROUTES.RULES} className={styles.Tile}>
        Guild rules
      </Link> 
      <Link to={ROUTES.TWITCH} className={styles.Tile}>
        Twitch
      </Link>
        <AuthUserContext.Consumer>
          {authUser =>
            authUser ? <NavigationAuth auth={authUser} /> : <NavigationNonAuth />
          }
        </AuthUserContext.Consumer>
      </div>
    </div>
  </div>  
);
 
class NavigationAuth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authUser: this.props.auth,
      user: null
    };
  }
  
  componentDidMount() {
    this.fetchUserData(this.state.authUser.uid);
  }
  
  componentWillReceiveProps(newProps) {
    this.fetchUserData(this.state.authUser.uid);
  }

  render() {

    let adminTile;
    let applications;
    if(this.state.user && this.state.user.Admin) {
      adminTile = 
      <Link  to={ROUTES.ADMIN} className={styles.Tile}>
        Admin
      </Link>
      applications = 
      <Link to={ROUTES.APPLICATIONS} className={styles.Tile}>
          Applications
      </Link>  
    } else if(this.state.user) {
      adminTile = <div></div>
      if(this.state.user.Applications.length > 0) {
        var path = ROUTES.APPLICATION;
        let id = this.state.user.Applications[0].Id;
        let newPath = path.replace(':applicationId', id);
        applications = 
        <Link to={newPath} className={styles.Tile}>
          Application
        </Link>
      }
    }

    return (
      <div className={styles.Tiles}>
        <Link to={ROUTES.APPLY} className={styles.Tile}>
          Apply
        </Link>
        {applications}    
        {adminTile}
        <Link to={ROUTES.ACCOUNT} className={styles.Tile}>
          Account
        </Link>
      </div>
    )
  }

  async fetchUserData(uid) {
    let payload = {
        uid: uid,
    }
    await service.fetchUserData(payload)
    .then(response => {
        this.setState({user: response})
    });
  }
}
  

const NavigationNonAuth = () => (
  <div className={styles.Tiles}>
    <Link to={ROUTES.SIGN_IN} className={styles.Tile}>
      Sign in
    </Link>
  </div>
);

export default Navigation;
