import React, { Component } from 'react'
import service from '../../service/database';
import blizzardService from '../../service/blizzard';
import ApplicationDetail from './ApplicationDetail';
import Spinner from '../Spinner';
import ApplicationInfo from './ApplicationInfo';
import './application.css'

export default class Application extends Component {
    constructor(props) {
        super(props);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.fetchData = this.fetchData.bind(this);
        this.initApplication = this.initApplication.bind(this);
        this.state = {
            detail: {
                id: 0,
                name: '',
                server: '',
                role: '',
                discordTag: '',
                warcraftLogTag: '',
                battleTag: '',
                avgItemLevel: 0,
                eqptItemLevel: 0,
                completed: false
            },
            moreInfo: {
                about: '',
                brag: '',
                raidingExperience: '',
                whyMythos: '',
            },
            loading: true
        };
    }

    componentDidMount() {
        const id = this.props.match.params.applicationId;
        this.fetchData(id);
    }

    async fetchData(id) {
        await service.fetchApplication(id).then(application => {
            this.initApplication(application).then(res => {
                this.setState({detail: {...res.detail}, moreInfo: {...res.info}, loading: false});
            });
        }).catch(err => {
            console.log(err);
        });
    }

    async initApplication(appliaction) {
        let dto = {
            detail: {
                id: appliaction.Id,
                name: appliaction.Name,
                server: appliaction.Server,
                role: appliaction.Role,
                discordTag: appliaction.DiscordTag,
                warcraftLogTag: appliaction.WarcraftLogTag,
                battleTag: appliaction.BattleTag,
                avgItemLevel: 0,
                eqptItemLevel: 0,
                completed: appliaction.Completed
            },
            info: {
                about: appliaction.About,
                brag: appliaction.Brag,
                raidingExperience: appliaction.RaidingExperience,
                whyMythos: appliaction.WhyMythos,
            }
        };
        await blizzardService.fetchPlayerProfile(appliaction.Name, appliaction.Server).then(profile => {
            dto.detail.avgItemLevel = profile.data.average_item_level;
            dto.detail.eqptItemLevel = profile.data.equipped_item_level;
        }).catch(err =>{
            console.log(err);
        });
        return dto;
    }
    render() {
        const detail = this.state.detail;
        const moreInfo = this.state.moreInfo;
        if(this.state.loading) {
            return (
                <div className="main-container">
                    <Spinner/>
                </div>
            )
        } else {
            return (
                <div className="main-container">
                    <div className="detail-container">
                        <ApplicationDetail {...detail}/>
                    </div>
                    <div className="info-container">
                        <ApplicationInfo {...moreInfo}/>
                    </div>
                </div>
            )
        }
    }
}
