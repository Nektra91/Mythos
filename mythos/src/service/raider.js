import axios from 'axios';

const raiderFunctions = {
    async getRaiderProgress() {
        let raidProgression = [];
        await axios.get(`https://raider.io/api/v1/guilds/profile?region=eu&realm=Kazzak&name=Mythos&fields=raid_progression`
        ).then(data => {
            raidProgression = data.data.raid_progression;
        });
        return raidProgression;
    },  
}

export default raiderFunctions