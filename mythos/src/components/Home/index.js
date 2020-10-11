import React, { Component } from 'react';
import axios from 'axios';

import Recruitment from './Recruitment';

import styles from './home.css';
 
class HomePage extends Component {
  state = {
    classes: []
  }

  render() {
    return (
      <div>
        <div className="Background">
          <Recruitment classes={this.state.classes}>
          </Recruitment>
        </div>
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
      this.setState({ classes: res.data.data.Class});
    })
  }
}
 
export default HomePage;
