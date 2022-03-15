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
        await this.getSingleBossKill('vigilant-guardian'
        ).then(bossKill => {
            if(bossKill !== '' && bossKill.defeated) {
                raidProgression.bossKill.push(bossKill.bossName)
            }
            if(!bossKill.defeated) {
                shouldTryNext = false;
            }
        })
        if(shouldTryNext) {
            await this.getSingleBossKill('skolex'
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
            await this.getSingleBossKill('halondrus'
            ).then(bossKill => {
                if(bossKill !== '') {
                    raidProgression.bossKill.push(bossKill.bossName)
                    shouldTryNext = true;
                }
                if(!bossKill.defeated) {
                    shouldTryNext = false;
                }
            })
            await this.getSingleBossKill('dausegne'
            ).then(bossKill => {
                if(bossKill !== '') {
                    raidProgression.bossKill.push(bossKill.bossName)
                    shouldTryNext = true;
                }
                if(!bossKill.defeated) {
                    shouldTryNext = false;
                }
            })
            if(shouldTryNext) {
                await this.getSingleBossKill('prototype-pantheon'
                ).then(bossKill => {
                    if(bossKill !== '') {
                        raidProgression.bossKill.push(bossKill.bossName)
                        shouldTryNext = true;
                    }
                    if(!bossKill.defeated) {
                        shouldTryNext = false;
                    }
                })
                if(shouldTryNext) {
                    await this.getSingleBossKill('lihuvim'
                    ).then(bossKill => {
                        if(bossKill !== '') {
                            raidProgression.bossKill.push(bossKill.bossName)
                            shouldTryNext = true;
                        }
                        if(!bossKill.defeated) {
                            shouldTryNext = false;
                        }
                    })
                }
            }
        }
        if(shouldTryNext) {
            await this.getSingleBossKill('anduin-wrynn'
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
            await this.getSingleBossKill('rygelon'
            ).then(bossKill => {
                if(bossKill !== '') {
                    raidProgression.bossKill.push(bossKill.bossName)
                }
                if(!bossKill.defeated) {
                    shouldTryNext = false;
                }
            })
            await this.getSingleBossKill('lords-of-dread'
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
            await this.getSingleBossKill('the-jailer'
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
        await axios.get(`https://raider.io/api/v1/guilds/boss-kill?region=eu&realm=Kazzak&guild=Mythos&raid=sepulcher-of-the-first-ones&boss=${payload}&difficulty=mythic`
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