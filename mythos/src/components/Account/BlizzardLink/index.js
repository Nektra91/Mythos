import React, { Component } from 'react';

import Spinner from '../../Spinner';

import service from '../../../service/database';
import raider from '../../../service/raider';
import styles from './account.module.css';

class BlizzardLink extends Component {
    constructor(props) {
        super(props);

        this.state = {
            uid: this.props.uid,
            userInfo: null,
            isLoading: true,
            server: '',
            name: '',
            playerClass: '',
            avatarUrl: "",
            swapping: false,
        }
    }    

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    } 

    componentDidMount() {
        this.fetchUserData();
    }

    getPlayerData = event => {
        let payload = {
            name: this.state.name.toLowerCase(),
            server: this.state.server.toLowerCase()
        }
        this.getPlayerDataFromBlizzard(payload)
        .then(response => {
            if(response === true) {
                let payload = {
                    name: this.state.name,
                    server: this.state.server,
                    playerClass: this.state.playerClass,
                    id: this.state.userInfo.Id,
                    avatar: this.state.avatarUrl,
                }
                this.saveCharacterSync(payload);
            }
            if(this.state.swapping) {
                this.setState({swapping: false})
            }
        })
    }

    swapLinkedChar = event => {
        this.setState({swapping: true})
    }

    render() {
        const {
            name,
            server,
            userInfo,
            isLoading,
            swapping,
        } = this.state;

        let toRender

        if(isLoading || !userInfo) {
            toRender = <Spinner />
        } else if(swapping) {
            toRender = (
                <div>
                    <div>
                        <div>
                            <div>
                                <div>
                                    <div>
                                        <label>
                                            Character name
                                        </label>
                                    </div>
                                    <div>
                                        <input
                                            name="name"
                                            value={name}
                                            onChange={this.onChange}
                                            type="text"
                                            placeholder="Ingame name"
                                        />
                                    </div>              
                                </div>
                                <div>
                                    <div>
                                        <label>
                                            Server name
                                        </label>
                                    </div>
                                    <div>
                                        <input
                                            name="server"
                                            value={server}
                                            onChange={this.onChange}
                                            type="text"
                                            placeholder="Server name"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="fetchPlayer">
                                <div>
                                    <button onClick={this.getPlayerData}>
                                    Link
                                    </button>
                                </div>
                            </div>            
                        </div>
                    </div>
                </div>
                )
        } else if(userInfo && !userInfo.Linked) {
            toRender = (
            <div>
                <div>
                    <p>You are not linked to a World of warcraft character</p>
                    <div>
                        <div>
                            <div>
                                <div>
                                    <label>
                                        Character name
                                    </label>
                                </div>
                                <div>
                                    <input
                                        name="name"
                                        value={name}
                                        onChange={this.onChange}
                                        type="text"
                                        placeholder="Ingame name"
                                    />
                                </div>              
                            </div>
                            <div>
                                <div>
                                    <label>
                                        Server name
                                    </label>
                                </div>
                                <div>
                                    <input
                                        name="server"
                                        value={server}
                                        onChange={this.onChange}
                                        type="text"
                                        placeholder="Server name"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="fetchPlayer">
                            <div>
                                <button onClick={this.getPlayerData}>
                                Link
                                </button>
                            </div>
                        </div>            
                    </div>
                </div>
            </div>
            )
        } else {
            toRender = (
                <div>
                    <div>
                        <p>You are linked to</p>
                    </div>
                    <div>
                        <p>{userInfo.CharacterName} - {userInfo.ServerName}</p>
                    </div>
                    <div>
                        <div>
                            <button onClick={this.swapLinkedChar}>
                                Changed linked character
                            </button>
                        </div>
                    </div>
                </div>
            )
        }
        return (
            <div>
                {toRender}
            </div>
        )        
    }

    async fetchUserData() {
        let payload = {
            uid: this.state.uid,
        }
        await service.fetchUserData(payload)
        .then(response => {
            this.setState({userInfo: response})
            this.setState({isLoading: false})
        });
    }

    async getPlayerDataFromBlizzard(payload) {
        let success = false;     
        await raider.getPlayerData(payload)
        .then(response => {
            this.setState({playerClass: response.playerClass})
            success = true;
        })
        .catch(err => {
            success = false;
        })
        return success;
    }

    async saveCharacterSync(payload) {
        await service.saveCharacterSync(payload)
        .then(response => {
            this.setState({userInfo: response})
        })
    }
}

export default BlizzardLink;