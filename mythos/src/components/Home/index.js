import React, { Component } from 'react';
import axios from 'axios';
import service from '../../service/database';

import Recruitment from './Recruitment';
 
const HomePage = () => (
  <div>
    <div className="Background">
      <Recruitment />
    </div>
  </div>
)
 
export default HomePage;
