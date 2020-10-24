import React, { Component } from 'react';

import style from './admin.module.css';
 
class AdminPage extends Component {
  constructor(props) {
    super(props);
 
    this.state = {
      loading: false,
      users: [],
    };
  }
 
  render() {
 
    return (
      <div className={style.baseContainer}>
        <div className={style.Center}>
          <h1>Admin</h1>
        </div>        
        <div className={style.Row}>
          <div className={style.Tile}>
            <span>Users</span>
          </div>
          <div className={style.Tile}>
            <span>Recruitment</span>
          </div>
          <div className={style.Tile}>
            <span>Progress</span>
          </div>
        </div>
      </div>
    );
  }
};
 
export default AdminPage;
