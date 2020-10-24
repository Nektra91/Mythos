import React from 'react';
import style from './home.module.css';
import logo from '../../images/logo.png';
import killpic from '../../images/killpics/Ghuun.png'

import Recruitment from './Recruitment';
 
const HomePage = () => (
  <div className={style.homeContainer}>
    <div className={style.row}>
      <div className={style.recruitment}>
        <Recruitment />
      </div>
      <div className={style.detail}>
        <div className={style.row}>
          <div className={style.background}>
            <img src={logo} alt="" className={style.logo}/>
          </div>
          <div className={style.guildName}>
            <span>MYTHOS</span>
          </div>
        </div>
        <div className={style.row}>
          <div className={style.fiftyperc}>
            <p>Our aim is to gain the Cutting Edge and progress consistantly in Mythic content in Shadowlands.</p>
            <p>Our aim is to gain the Cutting Edge and progress consistantly in Mythic content in Shadowlands.</p>
            <p>Our aim is to gain the Cutting Edge and progress consistantly in Mythic content in Shadowlands.</p>
            <p>Our aim is to gain the Cutting Edge and progress consistantly in Mythic content in Shadowlands.</p>
            <p>Our aim is to gain the Cutting Edge and progress consistantly in Mythic content in Shadowlands.</p>
            <p>Our aim is to gain the Cutting Edge and progress consistantly in Mythic content in Shadowlands.</p>
            <p>Our aim is to gain the Cutting Edge and progress consistantly in Mythic content in Shadowlands.</p>
            <p>Our aim is to gain the Cutting Edge and progress consistantly in Mythic content in Shadowlands.</p>
            <p>Our aim is to gain the Cutting Edge and progress consistantly in Mythic content in Shadowlands.</p>
            <p>Our aim is to gain the Cutting Edge and progress consistantly in Mythic content in Shadowlands.</p>
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
 
export default HomePage;
