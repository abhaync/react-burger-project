import React,{ Component } from 'react';
import CheckoutSummary from '../../Components/Order/CheckoutSummary/CheckoutSummary';
import {Route, Switch} from 'react-router-dom';
import Contact from './Contact/Contact';

class Checkout extends Component {
  state = {
    ing: {
        meat: 1,
        salad: 1,
        cheese: 1,
        bacon: 1
    }
  }

  cancelHandler = () => {
    this.props.history.goBack();
  }

  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    let mying = {}
    let price = 0;
    for(let param of query.entries()){
      if(param[0] === 'price') {
        price = +param[1];
      }else {
        mying[param[0]] = +param[1];
      }

    }
    this.setState({
      ing: mying,
      totalPrice: price
    });
  }


  continueHandler = () => {
    this.props.history.replace('/Checkout/Contact');
  }
  render() {
    return (
      <div>
        <CheckoutSummary onCancel={this.cancelHandler} onContinue={this.continueHandler} ing={this.state.ing} />
        <Route path={this.props.match.path + '/Contact'} render={(props) => (<Contact {...props} ings={this.state.ing} price={this.state.totalPrice} />)} />
      </div>
    );
  }
}

export default Checkout;
