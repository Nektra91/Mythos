import React, { Component } from 'react';
import Recruitement from '../../Home/Recruitment';

import style from './adminrecruitment.module.css';

class AdminRecruitment extends Component {
  render() {
    return (
      <div className={style.Container}>
        <div className={style.Recruitment}>
          <Recruitement adminMode={true}/>
        </div>
      </div>
    )
  }
}

export default AdminRecruitment;