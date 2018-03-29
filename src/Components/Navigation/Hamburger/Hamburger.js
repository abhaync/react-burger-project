import React from 'react';
import classes from './Hamburger.css';

const Hamburger = (props) => {
  return (
    <div onClick={props.Clicked}>
      <div className={classes.hamburger}>
        <div className={classes.hamburger_box}>
          <div className={classes.hamburger_inner} ></div>
          </div>
        </div>
    </div>
  );
}

export default Hamburger;
