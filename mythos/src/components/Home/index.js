import React from 'react';
import style from './home.module.css';
import logo from '../../images/logo.png';

import Recruitment from './Recruitment';
 
const HomePage = () => (
  <div>
    <div className={style.row}>
      <div className={style.homeContainer}>
        <Recruitment />
      </div>
      <div className={style.homeContainer}>
        <div className={style.row}>
          <div>
            <img src={logo} alt="" className={style.logo}/>
          </div>
          <div className={style.guildName}>
            <h1>Mythos</h1>
          </div>
        </div>
        <div className={style.row}>
          <div>
            <h1>A lot of texty text plus more texty text</h1>
          </div>
          <div>
            <div>
              <h1>Latest kill pic?</h1>
              <img src={logo} alt="" className={style.logo}/>
            </div>
            <div className={style.row}>
              <div>
                <div>
                  <h1>
                    links
                  </h1>
                </div>
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
