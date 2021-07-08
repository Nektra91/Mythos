import React, { Component } from 'react';
import bosses from '../../images/SoD/sanctum.js';
import styles from './progress.module.css';
import BossIcon from './BossIcon';

import raider from '../../service/raider';

class Progress extends Component {
    constructor(props) {
        super(props);
        this.state = {
            raidProgression: {}
        }
    }

    componentDidMount() {
        this.fetchRaidProgress();
    } 
    
    render() {
        let bossKills = this.state.raidProgression.bossKill;
        let render;
        if(bossKills) {
            render = <div className={styles.bosses}>
                {bosses.map(boss => 
                        <span key={boss.name}>
                            <BossIcon image={boss.image} defeated={this.state.raidProgression.bossKill.filter(image => image.includes(boss.name))}/>
                        </span>    
                    )}
            </div>
        }
        return (
            <div>
                <div className={styles.well}>
                    <div className={styles.mythic}>
                        {this.state.raidProgression.mythic}
                    </div>
                    <div className={styles.bosses}>
                        {render}
                    </div>
                    <div className={styles.mythic}>
                        {this.state.raidProgression.heroic}
                    </div>
                </div>
            </div>
        )
    }

    async fetchRaidProgress() {
        await raider.getRaiderProgress()
        .then(response => {
          this.setState({raidProgression: response})
        })
      }
}

export default Progress;