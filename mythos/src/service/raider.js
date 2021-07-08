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
        await this.getSingleBossKill('the-tarragrue'
        ).then(bossKill => {
            if(bossKill !== '') {
                raidProgression.bossKill.push(bossKill.bossName)
            }
            if(!bossKill.defeated) {
                shouldTryNext = false;
            }
        })
        if(shouldTryNext) {
            await this.getSingleBossKill('the-eye-of-the-jailer'
            ).then(bossKill => {
                if(bossKill !== '') {
                    raidProgression.bossKill.push(bossKill.bossName)
                }
                if(!bossKill.defeated) {
                    shouldTryNext = false;
                }
            })
            await this.getSingleBossKill('the-nine'
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
            await this.getSingleBossKill('remnant-of-nerzhul'
            ).then(bossKill => {
                if(bossKill !== '') {
                    raidProgression.bossKill.push(bossKill.bossName)
                }
                if(!bossKill.defeated) {
                    shouldTryNext = false;
                }
            })
            await this.getSingleBossKill('soulrender-dormazain'
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
            await this.getSingleBossKill('painsmith-raznal'
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
            await this.getSingleBossKill('guardian-of-the-first-ones'
            ).then(bossKill => {
                if(bossKill !== '') {
                    raidProgression.bossKill.push(bossKill.bossName)
                }
                if(!bossKill.defeated) {
                    shouldTryNext = false;
                }
            })
            await this.getSingleBossKill('fatescribe-rohkalo'
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
            await this.getSingleBossKill('kelthuzad'
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
            await this.getSingleBossKill('sylvanas-windrunner'
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
        await axios.get(`https://raider.io/api/v1/guilds/boss-kill?region=eu&realm=Kazzak&guild=Mythos&raid=sanctum-of-domination&boss=${payload}&difficulty=mythic`
        ).then(bossData => {
            if(Object.entries(bossData.data).length === 0) {
                returnObject.defeated = false;
            }
            if(Object.entries(bossData.data).length !== 0) {
                returnObject.bossName = payload
            }
        })
        return returnObject;
    },

    async getPlayerData(payload) {
        let returnData = {
            playerClass: '',            
        }
        await axios.get(`https://raider.io/api/v1/characters/profile?region=eu&realm=${payload.server}&name=${payload.name}`
        ).then(data => {
            returnData.playerClass = data.data.class;
        });
        return returnData;
    },

    async getPlayerDataWithGearInfo(payload) {
        let returnData = {
            itemLvl: 0,
            playerClass: '',
            avatarImg: '',
            raiderLink: '',        
        }
        await axios.get(`https://raider.io/api/v1/characters/profile?region=eu&realm=${payload.server}&name=${payload.name}&fields=gear`
        ).then(data => {
            returnData.avatarImg = data.data.thumbnail_url;
            returnData.playerClass = data.data.class;
            returnData.itemLvl = data.data.gear.item_level_equipped;
            returnData.raiderLink = data.data.profile_url;
        });
        return returnData;
    },
}

export default raiderFunctions