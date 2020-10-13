import axios from 'axios';

const blizzardFunctions = {
    async getPlayerData(payload) {
        let token = '';
        await this.fetchToken()
        .then(response => {
            token = response;
        });
        let returnData = {
            playerClass: '',            
        }
        await axios.get(`https://eu.api.blizzard.com/profile/wow/character/${payload.server}/${payload.name}?namespace=profile-eu&access_token=${token}`
        ).then(data => {
            returnData.playerClass = data.data.character_class.name.en_US;
        });
        return returnData;
    },
    async fetchPlayerProfile(name, server) {
        let token = '';
        await this.fetchToken()
        .then(response => {
            token = response;
        });
        let lowerCaseName = name.toLowerCase();
        let lowerCaseServer = server.toLowerCase();
        let profile = null;
            await axios.get(`https://eu.api.blizzard.com/profile/wow/character/${lowerCaseServer}/${lowerCaseName}?namespace=profile-eu&access_token=${token}`).then(response => {
                profile = response;
              });
            return profile;
      },

      async fetchPlayerMedia(name, server) {
        let token = '';
        await this.fetchToken()
        .then(response => {
            token = response;
        });
        let lowerCaseName = name.toLowerCase();
        let lowerCaseServer = server.toLowerCase();
        let media = null;
          await axios.get(`https://eu.api.blizzard.com/profile/wow/character/${lowerCaseServer}/${lowerCaseName}/character-media?namespace=profile-eu&access_token=${token}`).then(response => {   
              media = response;
          });
          return media;
      },

      async fetchToken() {
          let token = '';
          await axios.get(`https://eu.battle.net/oauth/token`, {
              auth: {
              username: 'e9e451b5eceb4f13a9acaea882bd92d6',
              password: 'y6jHOURMLq1Z8LDoI05jSJX2q7uBaaMB',
              },
              params: {
              grant_type: 'client_credentials',
              }
          }).then(response => {
              token = response.data.access_token;
          });
          return token;
      }

      
    }
export default blizzardFunctions