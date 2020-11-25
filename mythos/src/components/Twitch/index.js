import React, { Component } from 'react';
import { TwitchEmbed } from 'react-twitch-embed';

import styles from './twitch.module.css';
 
class Twitch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rehyn: false,
      guarr: false,
    }
  }

  guarr() {
    this.setState({guarr: true})
    this.setState({rehyn: false})
  }

  rehyn() {
    this.setState({guarr: false})
    this.setState({rehyn: true})
  }

  render() {

    let stream;

    if(this.state.rehyn) {
      stream = <div className={styles.stream}>
        <TwitchEmbed
          channel="Rehyngaming"
          id="rehyn"
          theme="dark"
          width="80vw"
          height="80vh"
          withChat="false"
          muted
          onVideoPause={() => console.log(':(')}
        />
      </div>
    } else if(this.state.guarr) {
      stream = <TwitchEmbed
          channel="Guarr93"
          id="guarr"
          theme="dark"
          width="80vw"
          height="80vh"
          muted
          onVideoPause={() => console.log(':(')}
        />
    } else {
      stream =<div></div>
    }

    return(
      <div>
        <div>
          <button className={styles.button} onClick={() => this.guarr()}>Guarr</button>
          <button className={styles.button} onClick={() => this.rehyn()}>Rehyn</button>
        </div>
        {stream}
      </div>
    )
  }
}

export default Twitch;