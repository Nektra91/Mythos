import React, { Component } from 'react';
import style from './home.module.css';
import logo from '../../images/logo.png';
import killpic from '../../images/killpics/Ghuun.png'

import Recruitment from './Recruitment';
import service from '../../service/database';
 
class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      texts: null
    }
  }

  componentDidMount() {
    this.fetchHomeTexts();
  }  

  render() {

    let allTexts;
    if(this.state.texts) {
      allTexts = this.state.texts.map(text => {
        return <p key={text.Id}>{text.Text}</p>
      });
    }

    return(
      <div className={style.homeContainer}>
        <div className={style.row}>
          <div className={style.recruitment}>
            <Recruitment adminMode={false}/>
          </div>
          <div className={style.detail}>
            <div className={style.headerRow}>
              <div className={style.background}>
                <img src={logo} alt="" className={style.logo}/>
              </div>
              <div className={style.guildName}>
                <span>MYTHOS</span>
              </div>
            </div>
            <div className={style.row}>
              <div className={style.fiftyperc}>
                {allTexts}
              </div>
              <div className={style.fiftyperc}>
                <div>
                  <img src={killpic} alt="" className={style.killpics}/>
                </div>
                <div className={style.row}>
                  <div>
                    <div>
                      <h1>
                        Wowprogess
                      </h1>
                    </div>
                  </div>
                </div>
              </div> 
            </div>
          </div>
        </div>    
      </div>
    )    
  }
  
  async fetchHomeTexts() {
      await service.fetchHomeTexts()
      .then(response => {
        this.setState({texts: response})
      })
  }

}
 
export default HomePage;
