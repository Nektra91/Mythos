import React, { Component } from 'react';
import service from '../../../service/database';
import style from './icon.module.css';

class SpecIcon extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recruiting: this.props.recruiting, 
            image: this.props.image,
            adminMode: this.props.adminMode,
            id: this.props.id,
        };
    }

    toggleRecruitment(id, recruiting) {
        this.toggleRecruit(id, recruiting);
    }

    render() {
        const recruiting = this.state.recruiting;
        const adminMode = this.state.adminMode;
        const id = this.state.id;
        let icon;
        if(adminMode) {
            
            if(recruiting) {
                icon = <div className={style.Clickable} onClick={() => this.toggleRecruitment(id, false)}>
                    <img src={this.state.image} alt="" className={style.Recruiting} />
                </div>
            } else {
                icon = <div className={style.Clickable} onClick={() => this.toggleRecruitment(id, true)}>
                    <img src={this.state.image} alt="" className={style.NotRecruiting} />
                </div>
            }
        } else {
            if(recruiting) {
                icon = <img src={this.state.image} alt="" className={style.Recruiting} />
            } else {
                icon = <img src={this.state.image} alt="" className={style.NotRecruiting} />
            }
        }        

        return (
            <div>
                {icon}
            </div>
        )
    }

    async toggleRecruit(id, recruiting) {
        let payload = {
            id: id,
            recruiting: recruiting,
        }
        await service.toggleRecruitment(payload)
        .then(response => {
            this.setState({recruiting: recruiting})
        })
    }
}

export default SpecIcon;