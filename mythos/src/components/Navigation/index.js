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
      <div className={styles.Tile}>
        <Link to={ROUTES.ADMIN}>Admin</Link>
      </div>
      applications = 
      <div className={styles.Tile}>
          <Link to={ROUTES.APPLICATIONS}>Applications</Link>
      </div>  
    } else if(this.state.user) {
      adminTile = <div></div>
      if(this.state.user.Applications.length > 0) {
        var path = ROUTES.APPLICATION;
        let id = this.state.user.Applications[0].Id;
        let newPath = path.replace(':applicationId', id);
        applications = 
        <div className={styles.Tile}>
          <Link to={newPath}>Application</Link>
        </div>
      }
    }

    return (
      <div className={styles.Tiles}>
        <div className={styles.Tile}>
          <Link to={ROUTES.APPLY}>Apply</Link>
        </div>
        {applications}    
        {adminTile}
        <div className={styles.Tile}>
          <Link to={ROUTES.ACCOUNT}>Account</Link>
        </div>
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
    <div className={styles.Tile}>
      <Link to={ROUTES.SIGN_IN}>Sign in</Link>
    </div>
  </div>
);

export default Navigation;
