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
                <p>Mythos traces its roots back on Sunstrider. 
                    The guild was formed in 2012 as Old by 3 good friends which are all a part of the guild today.
                    It started out as just close friends but over the years we have built up to become an international team of like minded individuals.
                    We've ensured that the guild is based around a strong core of people who know each other and have raided together for a long time.
                </p>
                <p>
                    We have always pushed ourselves to our limits in order to achieve the highest possible standard whilst still having a good time all whilst on a 2 day raiding schedule.
                    We aim to push Mythic content to achieve Cutting Edge in Shadowlands all whilst still retaining our 2 day raiding schedule.
                </p>
                <p>
                  To apply to Mythos please register to our webpage. We allow users to link their account to their World of Warcraft character in the account tab.
                </p>
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
