import React from 'react';

import mythosLogo from '../../assets/images/mythos-logo.jpg';
import classes from './Logo.css';

const logo = (props) => (
    <div className={classes.Logo} style={{height: props.height}}>
        <img src={mythosLogo} alt="Mythos" />
    </div>
);

export default logo;