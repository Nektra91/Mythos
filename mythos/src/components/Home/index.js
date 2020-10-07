import React, { Component } from 'react';
import axios from 'axios';
 
import { withAuthorization } from '../Session';
import Recruitment from './Recruitment';
 
class HomePage extends Component {
  state = {
    classes: []
  }

  render() {
    return (
      <div>
        <Recruitment classes={this.state.classes}>
          
        </Recruitment>
      </div>
    )
  }

  componentDidMount() {
    axios.post(`https://light-jackal-86.hasura.app/v1/graphql`, {
      query: `query MyQuery {
        Class {
          Id
          Name
          Recruitments {
            Specialization {
              Name
            }
            Recruiting
          }
        }
      }`
    }).then(res => {
      console.log(res.data.data.Class)
      this.setState({ classes: res.data.data.Class});
    })
  }
}
  
 
const condition = authUser => !!authUser;
 
export default withAuthorization(condition)(HomePage);
