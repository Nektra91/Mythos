import axios from 'axios';

const raiderFunctions = {
    async getRaiderProgress() {
        let raidProgression = {
            mythic: "",
            heroic: '',
            bossKill: [],
        };
        let shouldTryNext = true;
        await axios.get(`https://raider.io/api/v1/guilds/profile?region=eu&realm=Kazzak&name=Mythos&fields=raid_progression`
        ).then(data => {
            //raidProgression = data.data.raid_progression;
            Object.keys(data.data.raid_progression).map(key => {
                raidProgression.mythic = "Mythic " + data.data.raid_progression[key].mythic_bosses_killed + "/" + data.data.raid_progression[key].total_bosses
                raidProgression.heroic = "Heroic " + data.data.raid_progression[key].heroic_bosses_killed + "/" + data.data.raid_progression[key].total_bosses
            })
        });
        await this.getSingleBossKill('shriekwing'
        ).then(bossKill => {
            if(bossKill !== '') {
                raidProgression.bossKill.push(bossKill.bossName)
            }
            if(!bossKill.defeated) {
                shouldTryNext = false;
            }
        })
        if(shouldTryNext) {
            await this.getSingleBossKill('huntsman-altimor'
            ).then(bossKill => {
                if(bossKill !== '') {
                    raidProgression.bossKill.push(bossKill.bossName)
                }
                if(!bossKill.defeated) {
                    shouldTryNext = false;
                }
            })
            await this.getSingleBossKill('hungering-destroyer'
            ).then(bossKill => {
                if(bossKill !== '') {
                    raidProgression.bossKill.push(bossKill.bossName)
                }
                if(!bossKill.defeated) {
                    shouldTryNext = false;
                }
            })
            await this.getSingleBossKill('artificer-xymox'
            ).then(bossKill => {
                if(bossKill !== '') {
                    raidProgression.bossKill.push(bossKill.bossName)
                }
                if(!bossKill.defeated) {
                    shouldTryNext = false;
                }
            })
            await this.getSingleBossKill('sun-kings-salvation'
            ).then(bossKill => {
                if(bossKill !== '') {
                    raidProgression.bossKill.push(bossKill.bossName)
                }
                if(!bossKill.defeated) {
                    shouldTryNext = false;
                }
            })
            await this.getSingleBossKill('lady-inerva-darkvein'
            ).then(bossKill => {
                if(bossKill !== '') {
                    raidProgression.bossKill.push(bossKill.bossName)
                }
                if(!bossKill.defeated) {
                    shouldTryNext = false;
                }
            })
            await this.getSingleBossKill('the-council-of-blood'
            ).then(bossKill => {
                if(bossKill !== '') {
                    raidProgression.bossKill.push(bossKill.bossName)
                }
                if(!bossKill.defeated) {
                    shouldTryNext = false;
                }
            })
        }
        if(shouldTryNext) {
            await this.getSingleBossKill('sludgefist'
            ).then(bossKill => {
                if(bossKill !== '') {
                    raidProgression.bossKill.push(bossKill.bossName)
                }
                if(!bossKill.defeated) {
                    shouldTryNext = false;
                }
            })
        }
        if(shouldTryNext) {
            await this.getSingleBossKill('stone-legion-generals'
            ).then(bossKill => {
                if(bossKill !== '') {
                    raidProgression.bossKill.push(bossKill.bossName)
                }
                if(!bossKill.defeated) {
                    shouldTryNext = false;
                }
            })
        }
        if(shouldTryNext) {
            await this.getSingleBossKill('sire-denathrius'
            ).then(bossKill => {
                if(bossKill !== '') {
                    raidProgression.bossKill.push(bossKill.bossName)
                }
                if(!bossKill.defeated) {
                    shouldTryNext = false;
                }
            })
        }
        
        return raidProgression;
    },

    async getSingleBossKill(payload) {
        let returnObject = {
            defeated: true,
            bossName: '',
        }
        await axios.get(`https://raider.io/api/v1/guilds/boss-kill?region=eu&realm=Kazzak&guild=Mythos&raid=castle-nathria&boss=${payload}&difficulty=mythic`
        ).then(bossData => {
            if(Object.entries(bossData.data).length === 0) {
                returnObject.defeated = false;
            }
            if(Object.entries(bossData.data).length !== 0) {
                returnObject.bossName = payload
            }
        })
        return returnObject;
    }
}

export default raiderFunctions