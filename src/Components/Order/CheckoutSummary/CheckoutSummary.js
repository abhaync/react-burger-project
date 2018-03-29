import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.css';

const checkoutSummary = (props) => {
  return (
    <div className={classes.checkoutSummary}>
      <h1>Hope it tastes well</h1>
      <div style={{width: '100%', margin: 'auto'}} >
        <Burger ing={props.ing} />
      </div>
      <Button btnType="Danger" clicked={props.onCancel}>CANCEL</Button>
      <Button btnType="Success" clicked={props.onContinue}>CONTINUE</Button>
    </div>
  );
}

export default checkoutSummary;
