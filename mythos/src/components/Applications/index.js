import React, { Component } from 'react';
import axios from 'axios';
import Spinner from '../Spinner/index';
import './applications.css';

class Applications extends Component {
  constructor(props) {
    super(props);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.state = {
      loading: true,
      applications: [],
    };
  }

  componentDidMount() {
    axios
      .post(`https://light-jackal-86.hasura.app/v1/graphql`, {
        query: `query MyQuery {
                Application(where: {Completed: {_eq: false}}) {
                  Id
                  Name
                  About
                  Available
                  BattleTag
                  Brag
                  Completed
                  DiscordTag
                  InGuild
                  OnTime
                  RaidingExperience
                  Role
                  Server
                  WarcraftLogTag
                  WhyMythos
                }
              }`,
      })
      .then(res => {
        this.setState({ applications: res.data.data.Application, loading: false });
        console.log(this.state.applications);
      });
  }

  render() {
    const isLoading = this.state.loading;
    const applications = this.state.applications;
    let listToReturn;
    if (isLoading || !applications) {
      listToReturn = listToReturn = <Spinner />;
    } else if (applications.length === 0) {
      listToReturn = (
        <div className="noResult">
          <span>There are no applications at this time!</span>
        </div>
      );
    } else {
      {
        listToReturn = applications.map((application, i) =>
            {
                return <div className="application">
                    <div className="container">
                        <div className="label">Name:</div>
                        <div className="content">{application.Name}</div>
                    </div>
                    <div className="container">
                        <div className="label">About:</div>
                        <div className="content">{application.About}</div>
                    </div>
                    <div className="container">
                        <div className="label">Available:</div>
                        {application.Available 
                                        ? <div className="content">Yes</div>
                                        : <div className="content">No</div>     
                        }
                    </div>
                    <div className="container">
                        <div className="label">Battle tag:</div>
                        <div className="content">{application.BattleTag}</div>
                    </div>
                    <div className="container">
                        <div className="label">Brag:</div>
                        <div className="content">{application.Brag}</div>
                    </div>
                    <div className="container">
                        <div className="label">Compleated:</div>
                        {application.Completed 
                                        ? <div className="content">Yes</div>
                                        : <div className="content">No</div>     
                        }
                    </div>
                    <div className="container">
                        <div className="label">Discord tag: </div>
                        <div className="content">{application.DiscordTag}</div>
                    </div>
                    <div className="container">
                        <div className="label">In guild: </div>
                        {application.InGuild   
                                        ? <div className="content">Yes</div>
                                        : <div className="content">No</div>     
                        }
                    </div>
                    <div className="container">
                        <div className="label">On time: </div>
                        <div className="content">
                        {application.OnTime  
                                        ? <div className="content">Yes</div>
                                        : <div className="content">No</div>     
                        }
                        </div>
                    </div>
                    <div className="container">
                        <div className="label">Raiding experience: </div>
                        <div className="content">{application.RaidingExperience}</div>
                    </div>
                    <div className="container">
                        <div className="label">Role: </div>
                        <div className="content">{application.Role}</div>
                    </div>
                    <div className="container">
                        <div className="label">Server: </div>
                        <div className="content">{application.Server}</div>
                    </div>
                    <div className="container">
                        <div className="label">Warcraft log tag: </div>
                        <div className="content">{application.WarcraftLogTag}</div>
                    </div>
                    <div className="container">
                        <div className="label">Why Mythos: </div>
                        <div className="content">{application.WhyMythos}</div>
                    </div>
                </div>;
            },
        );
      }
    }
    return <div className="applications">{listToReturn}</div>;
  }
}

export default Applications;
