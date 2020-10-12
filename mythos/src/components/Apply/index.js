import React, { Component } from 'react';
import axios from 'axios';
import * as ROUTES from '../../constants/routes';
import blizzard from "../../service/blizzard";

import Spinner from '../Spinner';

import './apply.css';
import Recruitement from '../Home/Recruitment';

const INITAL_STATE = {
  name: '',
  server: '',
  battletag: '',
  log: '',
  discordtag: '',
  about: '',
  experience: '',
  brag: '',
  why: '',
  spec: '',
  available: false,
  guild: false,
  prepare: false,
  error: null,
  user: null,
  isLoading: false,
  hasNotLinked: true,
  playerClass: '',
  specs: [],
}

class Apply extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITAL_STATE };
  }

  onSubmit = event => {
    const {name, 
      server, 
      battletag, 
      log, 
      discordtag, 
      about,
      experience, 
      brag, 
      why, 
      spec, 
      available, 
      guild, 
      prepare,
      error} = this.state;
    axios.post(`https://light-jackal-86.hasura.app/v1/graphql`, {
      query: `mutation insert_Application {
        insert_Application(objects: {
          About: "${about}", 
          Available: "${available}", 
          BattleTag: "${battletag}", 
          Brag: "${brag}", 
          DiscordTag: "${discordtag}", 
          InGuild: "${guild}", 
          Name: "${name}", 
          OnTime: "${prepare}", 
          RaidingExperience: "${experience}", 
          Role: "${spec}", 
          Server: "${server}", 
          WarcraftLogTag: "${log}", 
          WhyMythos: "${why}"}) {
          returning {
            Id
            Name
          }
        }
      }`
    }).then(data => this.props.history.push(ROUTES.HOME))
    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  }

  getPlayerData = event => {
    event.preventDefault();
    this.setState({isLoading: true});
    let lowerCaseName = this.state.name.toLowerCase();
    let lowerCaseServer = this.state.server.toLowerCase();
    axios.get(`https://eu.api.blizzard.com/profile/wow/character/${lowerCaseServer}/${lowerCaseName}?namespace=profile-eu&access_token=USgc2iLpK0Rl4iED63M5cDBl3Hupw0y7Jv`
    ).then(data => {
      this.setState({ playerClass: data.data.character_class.name.en_US })
      this.setState({ hasNotLinked: false });      
      axios.post(`https://light-jackal-86.hasura.app/v1/graphql`, {
        query: `query MyQuery {
          Specialization(where: {Recruitments: {Class: {Name: {_eq: "${this.state.playerClass}"}}}}) {
            Name
          }
        }`
      }).then(spec => {
        this.setState({specs: spec.data.data.Specialization})
        this.setState({ isLoading: false });
        console.log(this.state.specs);
      });
    });
  }

  render() {
    const {name, 
           server, 
           battletag, 
           log, 
           discordtag, 
           about,
           experience, 
           brag, 
           why,  
           playerClass,
           hasNotLinked,
           isLoading,
           specs} = this.state;
      let classRender;

      if(isLoading) {
        classRender = <Spinner />
      } else if(!isLoading && specs.length > 0) {
        classRender = 
        <div className="classData">
          <div className="row">
            <div>Class</div>
            <div className="margin-left-10">{playerClass}</div>
          </div>
          <div className="row">
          <div>Specialization</div>
          <div onChange={this.onChange} className="row">
            {specs.map(sp => (
              <div key={sp.Name}>
                <input key={sp.Name} type="radio" value={sp.Name} name="spec"/>{sp.Name}
              </div>                  
            ))}
          </div>
        </div>
      </div>
      } else {
        classRender = <div></div>
      }

    return (
      <div>
        <h1>Apply</h1>
        <div className="row">          
          <div>
            <form onSubmit={this.onSubmit}>
              <div className="row">
                <div>
                  <div>
                    <div>
                      <label>
                        Character name
                      </label>
                    </div>
                    <div>
                    <input
                      name="name"
                      value={name}
                      onChange={this.onChange}
                      type="text"
                      placeholder="Ingame name"
                    />
                    </div>              
                  </div>
                  <div>
                    <div>
                      <label>
                        Server name
                      </label>
                    </div>
                    <div>
                    <input
                      name="server"
                      value={server}
                      onChange={this.onChange}
                      type="text"
                      placeholder="Server name"
                    />
                    </div>
                  </div>
                </div>
                <div className="fetchPlayer">
                  <div>
                    <div>A link to WoW account is needed to apply.</div>
                    <div>Type in the character and server name</div>
                    <div>and click "Fetch player data"</div>                  
                  </div>
                  <div>
                    <button onClick={this.getPlayerData}>
                      Fetch player data
                    </button>
                  </div>
                </div>            
              </div>
              {classRender}
              <div className="container">
                <div>
                  <div>
                    <label>
                      Battle tag
                    </label>
                  </div>
                  <div>
                    <input
                      name="battletag"
                      value={battletag}
                      onChange={this.onChange}
                      type="text"
                      placeholder="BattleTag"
                    />
                  </div>
                </div>
                <div>
                  <div>
                    <label>
                      Warcraftlogs link
                    </label>
                  </div>
                  <div>
                    <input
                      name="log"
                      value={log}
                      onChange={this.onChange}
                      type="text"
                      placeholder="Warcarft logs link"
                    />
                  </div>
                </div>
                <div>
                  <div>
                    <label>
                      Discord tag
                    </label>
                  </div>
                  <div>
                    <input
                      name="discordtag"
                      value={discordtag}
                      onChange={this.onChange}
                      type="text"
                      placeholder="Discord tag"
                    />
                  </div>
                </div>
              </div>
              <div className="container">
                <div>
                  <div>
                  <label>
                    About you
                  </label>
                  </div>
                  <div>  
                    <textarea
                      name="about"
                      value={about}
                      onChange={this.onChange}
                      type="text"
                      placeholder="About you"
                    />
                  </div>
                </div> 
                <div>
                  <div>
                    <label>
                      Raiding experience
                    </label>
                  </div>
                  <div>
                    <textarea
                      name="experience"
                      value={experience}
                      onChange={this.onChange}
                      type="text"
                      placeholder="Raiding experience"
                    />
                  </div>
                </div>  
                <div>
                  <div>
                    <label>
                      Something to brag about
                    </label>
                  </div>
                  <div>
                    <div>
                      <textarea
                        name="brag"
                        value={brag}
                        onChange={this.onChange}
                        type="text"
                        placeholder="Something you want to brag about?"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <div>
                    <label>
                      Why do you want to join Mythos
                    </label>
                  </div>
                  <div>
                    <textarea
                      name="why"
                      value={why}
                      onChange={this.onChange}
                      type="text"
                      placeholder="Why do you want to join Mythos"
                    />
                  </div>
                </div>
              </div>
                <button disabled={hasNotLinked} type="submit">
                Apply
                </button>
            </form>
          </div>
          <div>
            <Recruitement />
          </div>
        </div>
      </div>
    )
  }
}

export default Apply;