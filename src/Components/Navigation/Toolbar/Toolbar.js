import React from 'react';
import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavItems from '../NavItems/NavItems';
import Hamburger from '../Hamburger/Hamburger';

const toolbar = (props) => {
  return (
    <header className={classes.Toolbar}>
      <Hamburger Clicked={props.menuClick} />
      <div className={classes.Logo}>
        <Logo />
      </div>
      <nav className={classes.DeskOnly}>
        <NavItems />
      </nav>

    </header>
  );
}

export default toolbar;
