import React, {Component} from 'react';
import Aux from '../../../HOC/AuxComp';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
  render(){
    const ingSummary = Object.keys(this.props.ingr).map((ingKey) => {
      return <li key={ingKey}><span style={{textTransform: 'capitalize'}}>{ingKey}</span>{this.props.ingr[ingKey]}</li>;
    });
    return (
      <Aux>
        <h3>Your order</h3>
        <p>Your Burger with these Ingredients : </p>
        <ul>
          {ingSummary}
        </ul>
        <p><strong>Total Price : {this.props.price.toFixed(2)}</strong></p>
        <p>Continue to Checkout</p>
        <Button btnType="Danger" clicked={this.props.clickCancel}>CANCEL</Button>
        <Button btnType="Success" clicked={this.props.clickYes}>CONTINUE</Button>
      </Aux>
    );
  }
}
export default OrderSummary;
