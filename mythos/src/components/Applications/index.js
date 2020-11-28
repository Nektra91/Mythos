import React, { Component } from 'react';
import Spinner from '../Spinner/index';
import service from '../../service/database';
import blizzardService from '../../service/blizzard'
import './applications.css';
import * as ROUTES from '../../constants/routes';
import styles from './applications.module.css';

class Applications extends Component {
  constructor(props) {
    super(props);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.createApplications = this.createApplications.bind(this);
    this.fetchPlayerProfile = this.fetchPlayerProfile.bind(this);
    this.fetchPlayerMedia = this.fetchPlayerMedia.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.loadApplicationForm = this.loadApplicationForm.bind(this);
    this.state = {
      loading: true,
      applications: [],
      viewAll: false,
      history: props.history
    };
  }

  componentDidMount() {
      this.fetchData();
  }

  async fetchData() {
    await service.fetchAllApplications()
    .then(res => {
        this.createApplications(res)
        .then(applications => {
            this.setState({applications: applications, loading: false});
        });
    });
  }

  loadApplicationForm(dto, history) {
    let path = ROUTES.APPLICATION;
    let id = dto.applicationId.toString();
    let newPath = path.replace(':applicationId', id);
    history.push(newPath);

  }

  viewAll = event => {
    this.setState({viewAll: !this.state.viewAll})
  }

  async fetchPlayerProfile(name, server) {
    let result = null;
    await blizzardService.fetchPlayerProfile(name, server).then(profile => {
      result = profile;
    });
    return result;
  }

    async fetchPlayerMedia(name, server) {
      let result = null;
      await blizzardService.fetchPlayerMedia(name, server).then(media => {
        result = media;
      });
      return result;
    }

  async createApplications(applications) {
      let result = [];
      for(const application of applications) {
        let name = application.Name;
        let server = application.Server; 
        let applicationDto = {
            playerName: "",
            server: server,
            playerClass: "",
            spec: application.Role,
            avgItemLvl: 0,
            equippItemLvl: 0,
            avatar: "",
            applicationId: application.Id,
            completed: application.Completed,
        }
        await this.fetchPlayerProfile(name, server).then(profile => {
        applicationDto.playerName = name;
        applicationDto.server = server;
        applicationDto.playerClass = profile.data.character_class.name.en_US;
        applicationDto.avgItemLvl = profile.data.average_item_level;
        applicationDto.equippedItemLvl = profile.data.equipped_item_level;

        });
        await this.fetchPlayerMedia(name, server).then(media => {
          const key = 'avatar';
          let avatar = null;
          if(media.data.assets) {
            // some times the api returns a asset array 
            avatar = media.data.assets.filter(asset => asset.key === key)[0];
          }

            applicationDto.avatar = avatar && avatar.value ? avatar.value : media.data.avatar_url;
        });
        result.push(applicationDto);
      }
      return result;
  }

  render() {
    const isLoading = this.state.loading;
    let applications;
    let button;
    
    if(this.state.viewAll === false) {
      button = (
        <div>
          <button className={styles.allBtn} onClick={this.viewAll}>View all applications</button>
        </div>
      );
      applications = this.state.applications.filter(application => application.completed === false)
    } else {
      button = (
        <div>
          <button className={styles.allBtn} onClick={this.viewAll}>Hide confirmed applications</button>
        </div>
      );
      applications = this.state.applications;
    }

    let listToReturn;
    if (isLoading || !applications) {
      listToReturn = <div className="spinner"><Spinner /></div>;
    } else if (applications.length === 0) {
      listToReturn = (
        <div className="noResult">
          <span>There are no applications at this time!</span>
        </div>
      );
    } else {
      {
       listToReturn = applications.map((application) =>
            {
                return <div className="application" onClick={() => this.loadApplicationForm(application, this.state.history)}>
                    <div className="application-container">
                      <div className="img-container">
                        <img className="avatar" src={application.avatar} alt="" />
                      </div>
                      <div className="empty-container" />
                      <div className="about-container">
                        <div className="section">
                          <div className="container">
                            <div className="label">
                              Name:
                            </div>
                            <div className="content">
                              {application.playerName}
                            </div>
                            <div className="emptyContent"></div>
                          </div>
                          <div className="container">
                            <div className="label">
                              Server:
                            </div>
                            <div className="content">
                              {application.server}
                            </div>
                            <div className="emptyContent"></div>
                          </div>
                        </div>
                        <div className="section">
                          <div className="container">
                            <div className="label">
                              Player class:
                            </div>
                            <div className="content">
                              {
                                application.playerClass
                              }
                            </div>
                            <div className="emptyContent"></div>
                          </div>
                          <div className="container">
                            <div className="label">
                              Preferred spec:{' '}
                            </div>
                            <div className="content">
                              {application.spec}
                            </div>
                            <div className="emptyContent"></div>
                          </div>
                        </div>
                        <div className="section">
                          <div className="container">
                            <div className="label">
                              Average item level:{' '}
                            </div>
                            <div className="content">
                              {application.avgItemLvl}
                            </div>
                            <div className="emptyContent"></div>
                          </div>
                          <div className="container">
                            <div className="label">
                              Equipped item level:{' '}
                            </div>
                            <div className="content">
                              {
                                application.equippedItemLvl
                              }
                            </div>
                            <div className="emptyContent"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>;
            },
        );
      }
    }
    return <div className="applications">
      <h2>Applications</h2>
      {listToReturn}
      {button}
      </div>;
  }
}

export default Applications;
