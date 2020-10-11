import React, { Component } from 'react';
import axios from 'axios';
import Spinner from '../Spinner/index';
import './applications.css';

class Applications extends Component {
  constructor(props) {
    super(props);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.createApplications = this.createApplications.bind(this);
    this.fetchPlayerProfile = this.fetchPlayerProfile.bind(this);
    this.fetchPlayerMedia = this.fetchPlayerMedia.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.state = {
      loading: true,
      applications: [],
    };
  }

  componentDidMount() {
      this.fetchData();
  }

  async fetchData() {
    await axios
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
        this.createApplications(res.data.data.Application).then(applications => {
            this.setState({applications: applications, loading: false});
        });
    });
  }

  async fetchPlayerProfile(name, server) {
    let lowerCaseName = name.toLowerCase();
    let lowerCaseServer = server.toLowerCase();
    let profile = null;
        await axios.get(`https://eu.api.blizzard.com/profile/wow/character/${lowerCaseServer}/${lowerCaseName}?namespace=profile-eu&access_token=US3WIqXQvov3iUr0raZAIq37cefhOmn4ja`).then(response => {
            profile = response;
          });
        return profile;
  }

    async fetchPlayerMedia(name, server) {
      let lowerCaseName = name.toLowerCase();
      let lowerCaseServer = server.toLowerCase();
      let media = null;
        await axios.get(`https://eu.api.blizzard.com/profile/wow/character/${lowerCaseServer}/${lowerCaseName}/character-media?namespace=profile-eu&access_token=US3WIqXQvov3iUr0raZAIq37cefhOmn4ja`).then(response => {   
            media = response;
        });
        return media;
    }

  async createApplications(props) {
      let applications = props.map(prop => prop);
      let result = [];
      for(const application of applications) {
        let name = application.Name;
        let server = application.Server; 
        let applicationDto = {
            playerName: "",
            server: server,
            playerClass: "",
            spec: "",
            avgItemLvl: 0,
            avgEquippItemLvl: 0,
            avatar: "",
        }
        await this.fetchPlayerProfile(name, server).then(profile => {
        applicationDto.playerName = name;
        applicationDto.server = server;
        applicationDto.playerClass = profile.data.character_class.name.en_US;
        applicationDto.spec = profile.data.active_spec.name.en_US;
        applicationDto.avgItemLvl = profile.data.average_item_level;
        applicationDto.avgEquippItemLvl = profile.data.equipped_item_level;

        });
        await this.fetchPlayerMedia(name, server).then(media => {
            applicationDto.avatar = media.data.avatar_url;
        });
        result.push(applicationDto);
      }
      return result;
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
          debugger;
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
                        <div className="label">Completed:</div>
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
