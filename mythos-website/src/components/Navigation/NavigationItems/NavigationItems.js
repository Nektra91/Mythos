import React from 'react';

import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = () => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact>Home</NavigationItem>
        <NavigationItem link="/about">About us</NavigationItem>
        <NavigationItem link="/apply">Apply</NavigationItem>
        <NavigationItem link="/login">Login</NavigationItem>
    </ul>
);

export default navigationItems;