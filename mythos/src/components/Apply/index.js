import React, { Component } from 'react';
import * as ROUTES from '../../constants/routes';
import blizzard from "../../service/blizzard";
import service from '../../service/database';

import Spinner from '../Spinner';

import style from './applyExtra.module.css';
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
    let payload = {
      name: this.state.name,
      server: this.state.server,
      battletag: this.state.battletag,
      log: this.state.log,
      discordtag: this.state.discordtag,
      about: this.state.about,
      experience: this.state.experience,
      brag: this.state.brag,
      why: this.state.why,
      spec: this.state.spec,
    }
    this.saveApplication(payload)
    .then(response => 
      this.props.history.push(ROUTES.HOME))
    .catch(err => {
      console.log(err)
    })
    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  }  

  getPlayerData = event => {
    event.preventDefault();
    this.setState({isLoading: true});
    let payload = {
      name: this.state.name.toLowerCase(),
      server: this.state.server.toLowerCase()
    }
    this.getPlayerDataFromBlizzard(payload)
    .then(response => {
      this.setState({playerClass: response})
      this.setState({isLoading: false})
      this.getAvailableSpecs(response)
      .then(response => {
        this.setState({specs: response})
        this.setState({hasNotLinked: false})
      }).catch(err => {
        console.log(err)
      })
    }).catch(err => {
      console.log(err)
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
        <div className={style.classData}>
          <div className={style.row}>
            <div>Class</div>
            <div className={style.marginLeft10}>{playerClass}</div>
          </div>
          <div className={style.row}>
          <div>Specialization</div>
          <div onChange={this.onChange} className={style.row}>
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
        <div className={style.baseContainer}>
        <div className={style.row}>
          <div>
            <div>
              <div className= {style.applyHeaderContainer}>
                <h2 className={style.applyHeader}>Apply</h2>
              </div>  
            </div>
            <div className={style.formContainer}>                                 
            <form onSubmit={this.onSubmit}>
              <div className={style.row}>
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
                <div className={style.fetchPlayer}>
                  <div>
                    <div><p>A link to WoW account is needed to apply.</p></div>
                    <div><p>Type in the character and server name</p></div>
                    <div><p>and click "Fetch player data"</p></div>                  
                  </div>
                  <div>
                    <button className={style.fetchButton} onClick={this.getPlayerData}>
                      Fetch player data
                    </button>
                  </div>
                </div>            
              </div>
              {classRender}
              <div className={style.container}>
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
              <div className={style.container}>
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
                <button disabled={hasNotLinked} type="submit" className={style.applyButton}>
                Apply
                </button>
            </form>
          </div> 
          </div>           
          <div className={style.recruitment}>
            <Recruitement />
          </div>
        </div>
      </div>
      </div>
      
    )
  }

  async saveApplication(payload) {
    await service.createApplication(payload)
    .then(response => {
      return response;
    })
  }

  async getPlayerDataFromBlizzard(payload) {
    let playerClass = '';
    await blizzard.getPlayerData(payload)
    .then(response => {
      playerClass = response.playerClass;
    });
    return playerClass;
  }

  async getAvailableSpecs(payload) {
    let specs = [];
    await service.getSpecsForClass(payload)
    .then(response => {
      specs = response;
    })
    return specs;
  }
}

export default Apply;