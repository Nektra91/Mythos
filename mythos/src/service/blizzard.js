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
    }
}

export default blizzardFunctions

