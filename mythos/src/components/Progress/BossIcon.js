import React, { Component } from 'react';
import styles from './progress.module.css';

class BossIcon extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: this.props.image,
            defeated: this.props.defeated.length !== 0
        };
    }

    render() {
        let icon;
        if(this.state.defeated) {
            icon = <div>
                <img src={this.state.image} alt="" className={styles.bossicondefeated} />
            </div>
        } else {
            icon = <div>
                <img src={this.state.image} alt="" className={styles.bossicon} />
            </div>
        }

        return (
            <div>
                {icon}
            </div>
        )
    }
}

export default BossIcon;