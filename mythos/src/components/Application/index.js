import React, { Component } from 'react'
import service from '../../service/database';
import raider from '../../service/raider';
import ApplicationDetail from './ApplicationDetail';
import Spinner from '../Spinner';
import ApplicationInfo from './ApplicationInfo';
import style from './application.module.css'
import CommentSection from '../CommentSection';
import * as ROUTES from '../../constants/routes';

export default class Application extends Component {
    constructor(props) {
        super(props);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.fetchData = this.fetchData.bind(this);
        this.initApplication = this.initApplication.bind(this);
        this.approve = this.approve.bind(this);
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
            history: props.history,
            approved: false,
            loading: true
        };
    }

    componentDidMount() {
        const id = this.props.match.params.applicationId;
        this.fetchData(id);
    }

    approve() {
        let newPath = ROUTES.APPLICATIONS;
        this.state.history.push(newPath);
    }

    async fetchData(id) {
        await service.fetchApplication(id).then(application => {
            this.initApplication(application).then(res => {
                this.setState({detail: {...res.detail}, moreInfo: {...res.info}, loading: false});
            });
        }).catch(err => {
        });
    }

    async initApplication(application) {
        let dto = {
            detail: {
                id: application.Id,
                name: application.Name,
                server: application.Server,
                role: application.Role,
                discordTag: application.DiscordTag,
                warcraftLogTag: application.WarcraftLogTag,
                battleTag: application.BattleTag,
                avgItemLevel: 0,
                completed: application.Completed,
                raiderLink: '',
            },
            info: {
                about: application.About,
                brag: application.Brag,
                raidingExperience: application.RaidingExperience,
                whyMythos: application.WhyMythos,
            }
        };
        let payload = {
            name: application.Name.toLowerCase(),
            server: application.Server.toLowerCase()
          }
        await raider.getPlayerDataWithGearInfo(payload).then(profile => {
            dto.detail.avgItemLevel = profile.itemLvl;
            dto.detail.raiderLink = profile.raiderLink;
        }).catch(err =>{
        });
        return dto;
    }
    render() {
        const detail = this.state.detail;
        const applicationId = detail.id; 
        const moreInfo = this.state.moreInfo;
        if(this.state.loading) {
            return (
                <div className={style.mainContainer}>
                    <div className={style.spinner}>
                        <Spinner/>
                    </div>
                </div>
            )
        } else {
            return (
                <div className={style.mainContainer}>
                    <div className={style.detailContainer}>
                        <ApplicationDetail {...detail}/>
                    </div>
                    <div className={style.infoContainer}>
                        <ApplicationInfo {...moreInfo}/>
                    </div>
                    <div className={style.commentContainer}>
                        <CommentSection historyChange={this.approve} applicationId={applicationId}/>
                    </div>
                </div>
            )
        }
    }
}
