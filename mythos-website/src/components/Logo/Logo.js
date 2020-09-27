import React from 'react';

import classes from './Logo.css';

const logo = (props) => (
    <div className={classes.Logo} style={{height: props.height}}>
        <img src={props.logo} alt="Mythos" />
    </div>
);

export default logo;