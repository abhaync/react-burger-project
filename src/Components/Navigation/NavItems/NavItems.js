import React from 'react';
import classes from './NavItems.css';
import NavItem from './NavItem/NavItem';

const navItems = (props) => {
  return (
    <ul className={classes.navItems}>
      <NavItem link="/">Burger Builder</NavItem>
      <NavItem link="/Orders">Orders</NavItem>
    </ul>
  );
}

export default navItems;
