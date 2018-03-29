import React from 'react';
import classes from './BControl.css';

const BControl = (props) => {
  return (
    <div className={classes.BControl}>
      <div className={classes.Label}>{props.label}</div>
      <button className={classes.Less} onClick={props.less} disabled={props.disabled}>Less</button>
      <button className={classes.More} onClick={props.more}>More</button>
    </div>
  );
}

export default BControl;
