import React from 'react';
import Logo from '../../Logo/Logo';
import NavItems from '../NavItems/NavItems';
import classes from './SideDrawer.css';
import BackDrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../HOC/AuxComp';

const sideDrawer = (props) => {
  let attachClass = [classes.sideDrawer, classes.Closed];
  if(props.open){
    attachClass = [classes.sideDrawer, classes.Open];
  }
  return (
    <Aux>
      <BackDrop show={props.open} clicked={props.Closed}></BackDrop>
      <div className={attachClass.join(' ')}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavItems></NavItems>
        </nav>
      </div>
    </Aux>

  );
}

export default sideDrawer;
