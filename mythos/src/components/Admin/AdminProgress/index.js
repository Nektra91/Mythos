import React, { Component } from 'react';
import service from '../../../service/database';

class AdminProgress extends Component {

  constructor(props) {
    super(props);
    this.state = {
        users: null,
    }
  }  

  componentDidMount() {
    this.fetchAllUsers();
  }

  render() {
    return (
      <div>
        <h1>Admin prog</h1>
      </div>
    )
  }

  async fetchAllUsers() {
    service.fetchAllUsers()
    .then(response => {
        console.log(response);
    })
  }

}

export default AdminProgress;