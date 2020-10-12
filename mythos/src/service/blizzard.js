import axios from 'axios';

const blizzardFunctions = {
    async getPlayerData(payload) {
        let returnData = {
            playerClass: '',            
        }
        await axios.get(`https://eu.api.blizzard.com/profile/wow/character/${payload.server}/${payload.name}?namespace=profile-eu&access_token=USgc2iLpK0Rl4iED63M5cDBl3Hupw0y7Jv`
        ).then(data => {
            returnData.playerClass = data.data.character_class.name.en_US;
        });
        return returnData;
    },
    async fetchPlayerProfile(name, server) {
        let lowerCaseName = name.toLowerCase();
        let lowerCaseServer = server.toLowerCase();
        let profile = null;
            await axios.get(`https://eu.api.blizzard.com/profile/wow/character/${lowerCaseServer}/${lowerCaseName}?namespace=profile-eu&access_token=USXinLxn1squzsiABqOWGlUmAxPE3TDe3D`).then(response => {
                profile = response;
              });
            return profile;
      },

      async fetchPlayerMedia(name, server) {
        let lowerCaseName = name.toLowerCase();
        let lowerCaseServer = server.toLowerCase();
        let media = null;
          await axios.get(`https://eu.api.blizzard.com/profile/wow/character/${lowerCaseServer}/${lowerCaseName}/character-media?namespace=profile-eu&access_token=USXinLxn1squzsiABqOWGlUmAxPE3TDe3D`).then(response => {   
              media = response;
          });
          return media;
      },
    }
export default blizzardFunctions