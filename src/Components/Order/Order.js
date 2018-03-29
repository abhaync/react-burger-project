import React from 'react';
import classes from './Order.css';

const Order = (props) => {
  const ings = [];
  for(let ingName in props.ings){
    ings.push(
      {
      name: ingName,
      amount: props.ings[ingName]
      }
    );
  }
  const ingOutput = ings.map((ing) => {
    return (
      <span style={{textTransform: 'capitalize', display: 'inline-block', margin: '0 8px', border: '1px solid #ccc', padding: '5px'}} key={ing.name}>{ing.name} ({ing.amount}) </span>
    );
  });
  return (
    <div className={classes.Order}>
      <p>ingredients: {ingOutput}</p>
      <p>Price: <strong>USD {props.price}</strong></p>
    </div>
  );
}

export default Order;
