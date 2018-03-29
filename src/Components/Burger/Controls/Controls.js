import React from 'react';
import classes from './Controls.css';
import BControl from './bControl/BControl';

const ctrl = [
  {label: 'Salad', type: 'salad'},
  {label: 'Bacon', type: 'bacon'},
  {label: 'Cheese', type: 'cheese'},
  {label: 'Meat', type: 'meat'},
]

const Controls = (props) => {
  return (
    <div className={classes.Controls}>
      <p>Price : <strong>{props.price.toFixed(2)}</strong></p>
      {ctrl.map((ctrl) => (
        <BControl key={ctrl.label} label={ctrl.label} more={() => props.ingAdded(ctrl.type)} less={() => props.ingRemove(ctrl.type)} disabled={props.disabled[ctrl.type]} ></BControl>
      ))}
      <button className={classes.orderBtn} disabled={!props.purchase} onClick={props.hasOrdered}>ORDER NOW</button>
    </div>
  );
}

export default Controls;
