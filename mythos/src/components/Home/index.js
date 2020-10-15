import React from 'react';
import './home.css';
import logo from '../../images/logo.png';

import Recruitment from './Recruitment';
 
const HomePage = () => (
  <div>
    <div className="row">
      <div className="homeContainer">
        <Recruitment />
      </div>
      <div className="homeContainer">
        <div className="row">
          <div>
            <img src={logo} alt="" className="logo"/>
          </div>
          <div className="guildName">
            <h1>Mythos</h1>
          </div>
        </div>
        <div className="row">
          <div>
            <h1>A lot of texty text</h1>
          </div>
          <div>
            <div>
              <h1>Latest kill pic?</h1>
              <img src={logo} alt="" className="logo"/>
            </div>
            <div className="row">
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
