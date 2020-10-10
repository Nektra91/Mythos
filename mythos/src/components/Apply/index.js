import React, { Component } from 'react';
import axios from 'axios';

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
  avgilvl: '',
  eqilvl: '',
  hasNotLinked: true,
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
    var data = axios.post(`https://light-jackal-86.hasura.app/v1/graphql`, {
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
    }).then(data => console.log(data))
    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  }

  getPlayerData = event => {
    event.preventDefault();
    const {name, server} = this.state;
    let lowerCaseName = name.toLowerCase();
    let lowerCaseServer = server.toLowerCase();
    axios.get(`https://eu.api.blizzard.com/profile/wow/character/${lowerCaseServer}/${lowerCaseName}?namespace=profile-eu&access_token=USgc2iLpK0Rl4iED63M5cDBl3Hupw0y7Jv`
    ).then(data => {
      console.log(data.data.average_item_level)
      this.setState({ avgilvl: data.data.average_item_level });
      this.setState({ eqilvl: data.data.equipped_item_level });
      this.setState({ hasNotLinked: false });
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
           spec, 
           avgilvl,
           eqilvl,
           hasNotLinked,
           error} = this.state;

    return (
      <div>
        <h1>Apply</h1>
        <div>
          <form onSubmit={this.onSubmit}>
            <div>
              <input
                name="name"
                value={name}
                onChange={this.onChange}
                type="text"
                placeholder="Ingame name"
              />
            </div>
            <div>
              <input
                name="server"
                value={server}
                onChange={this.onChange}
                type="text"
                placeholder="Server name"
              />
              <button onClick={this.getPlayerData}>
              Fetch player data
              </button>
            </div>
            <div>
              <input
                name="battletag"
                value={battletag}
                onChange={this.onChange}
                type="text"
                placeholder="BattleTag"
              />
            <div>
              <input
                name="log"
                value={log}
                onChange={this.onChange}
                type="text"
                placeholder="Warcarft logs tag"
              />
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
            <div>
              <input
                name="spec"
                value={spec}
                onChange={this.onChange}
                type="text"
                placeholder="Prefered spec/role"
              />
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
            <div>
              <textarea
                name="experience"
                value={experience}
                onChange={this.onChange}
                type="text"
                placeholder="Raiding experience"
              />
            </div>
            <div>
              <textarea
                name="brag"
                value={brag}
                onChange={this.onChange}
                type="text"
                placeholder="Something you want to brag about?"
              />
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
            <div onChange={this.onChange}>
              <input type="radio" value="true" name="available" /> Yes
              <input type="radio" value="false" name="available" /> No
            </div>
            <div onChange={this.onChange}>
              <input type="radio" value="true" name="guild" /> Yes
              <input type="radio" value="false" name="guild" /> No
            </div>
            <div onChange={this.onChange}>
              <input type="radio" value="true" name="prepared" /> Yes
              <input type="radio" value="false" name="prepared" /> No
            </div>
              <button disabled={hasNotLinked} type="submit">
              Apply
              </button>
          </form>
        </div>
      </div>
    )
  }
}

export default Apply;