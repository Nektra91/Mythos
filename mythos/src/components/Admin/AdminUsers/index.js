import React, { Component } from 'react';
import service from '../../../service/database';

import style from './adminusers.module.css'

class AdminUsers extends Component {

  constructor(props) {
    super(props);
    this.state = {
        users: null,
    }
  }  

  componentDidMount() {
    this.fetchAllUsers();
  }

  makeAdmin(userId) {
    this.makeUserAdmin(userId);
  }

  render() {

    let allUsers;
    if(this.state.users) {
      allUsers = this.state.users.map(user => {
        return <div key={user.Id} className={style.Users}>
          <div className={style.Tile}>
            <div className={style.ImgContainer}>
              <img className={style.Avatar} src={user.CharacterUrl} alt=""/>
            </div>
            <div>
               <div className={style.Text}>Username: {user.Username}</div>
               <div className={style.Text}>Character: {user.CharacterName} - {user.ServerName}</div>
               <div className={style.Text}>Class: {user.CharacterClass}</div>
               <div>
              {user.Admin ? 
                <div>
                  <div>System admin</div>
                </div>
                :
                <div>
                  <button type="button" className={style.Button} onClick={() => this.makeAdmin(user.Id)}>
                    Make admin 
                  </button>
                </div>
              }
            </div>
            </div>                        
          </div>          
        </div>
      })
    }

    return (
      <div>
        <div className={style.Title}>
          <h1>Admin users</h1>
        </div>
        <div className={style.Users}>
          {allUsers}
        </div>
      </div>
    )
  }

  async fetchAllUsers() {
    service.fetchAllUsers()
    .then(response => {
        console.log(response)
        this.setState({users: response})
    })
  }

  async makeUserAdmin(userId) {
    let payload = {
      userId: userId
    }
    service.makeUserAdmin(payload)
    .then(response => {
      console.log(response)
      const newList = this.state.users.map(user => {
        if(user.Id === userId) {
          const updatedUser = {
            ...user,
            Admin: true,
          };
          return updatedUser;
        }
        return user;
      });
      this.setState({users: newList});
    });
  }

}

export default AdminUsers;