import React, { Component } from 'react';
import * as ROUTES from '../../constants/routes';
import style from './admin.module.css';
 
class AdminPage extends Component {
  constructor(props) {
    super(props);
 
    this.state = {
      loading: false,
      users: [],
    };
  }

  setRoute(route) {
    this.props.history.push(route);
  }
 
  render() {
 
    return (
      <div className={style.baseContainer}>
        <div className={style.Center}>
          <h1>Admin</h1>
        </div>        
        <div className={style.Row}>
          <div className={style.Tile} onClick={() => this.setRoute(ROUTES.ADMINUSERS)}>
            <span>Users</span>
          </div>
          <div className={style.Tile} onClick={() => this.setRoute(ROUTES.ADMINRECRUITMENT)}>
            <span>Recruitment</span>
          </div>
          <div className={style.Tile} onClick={() => this.setRoute(ROUTES.ADMINPROGRESS)}>
            <span>Progress</span>
          </div>
          <div className={style.Tile} onClick={() => this.setRoute(ROUTES.ADMINHOME)}>
            <span>Home</span>
          </div>
        </div>
      </div>
    );
  }
};
 
export default AdminPage;
