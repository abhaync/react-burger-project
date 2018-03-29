import React, { Component } from 'react';
import Aux from '../../HOC/AuxComp';
import Burger from '../../Components/Burger/Burger';
import Controls from  '../../Components/Burger/Controls/Controls';
import Modal from '../../Components/UI/Modal/Modal';
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary';
import axios from '../../axiosOrders';
import withError from '../../HOC/withError';
import Spinner from '../../Components/UI/Spinner/Spinner';

const ING_PRICES =  {
  salad: 0.3,
  cheese: 0.7,
  bacon: 1.4,
  meat: 1
}

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    purchasable: false,
    hasOrdered: false,
    totalPrice: 3,
    loading: false,
    error: false
  }

  updatePurchaseState = (ings) => {
    // const ings = {
    //   ...this.state.ingredients
    // };
    const sum = Object.keys(ings).map((ingKey) => {
      return ings[ingKey];
    }).reduce((sum, el) => {
      return sum + el;
    }, 0);

    this.setState({
      purchasable: sum > 0
    });
  }

  orderNowHandler = () => {
    this.setState({hasOrdered: true});
  }
  addIngHandler = (type) => {
    const uCount = this.state.ingredients[type] + 1;
    const uIng = {
      ...this.state.ingredients
    };
    uIng[type] = uCount;
    const newPrice = this.state.totalPrice + ING_PRICES[type];
    this.setState({
      ingredients: uIng,
      totalPrice: newPrice
    });
    this.updatePurchaseState(uIng);
  }

  remIngHandler = (type) => {
    let uRCount = 0;
    if(this.state.ingredients[type] > 0){
      uRCount = this.state.ingredients[type] - 1;
    }
    const uRIng = {
      ...this.state.ingredients
    };
    uRIng[type] = uRCount;
    const newRPrice = this.state.totalPrice - ING_PRICES[type];
    this.setState({
      ingredients: uRIng,
      totalPrice: newRPrice
    });
    this.updatePurchaseState(uRIng);
  }

  cancelPurchaseHandler = () => {
    this.setState({hasOrdered: false})
  }

  continuePurchaseHandler = () => {
    // alert("You Continued");
    this.setState({loading: true});
    // const orderObj = {
    //   ingredients: this.state.ingredients,
    //   price: this.state.totalPrice.toFixed(2),
    //   customer: {
    //     name: 'Abhay',
    //     address: {
    //       street: 'Ab Street 1',
    //       zipcode: '100201',
    //       country: 'India',
    //     },
    //     email: 'myburger@myburgr.com'
    //   },
    //   deliveryMethod: 'fastest'
    // }
    // axios.post('/orders.json',orderObj)
    //   .then((resp) => {
    //     console.log(resp);
    //     this.setState({loading: false, hasOrdered: false});
    //   })
    //   .catch((error) => {
    //     this.setState({loading: false, hasOrdered: false});
    //     console.log(error);
    //   });
      const qParams = [];
      for (let i in this.state.ingredients){
        qParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
      }
      qParams.push('price=' + this.state.totalPrice);
      const qString = qParams.join('&');
      this.props.history.push({
        pathname: '/Checkout',
        search: '?' + qString
      });
  }

  componentWillMount(){
    axios.get('https://my-react-burger-project.firebaseio.com/ingredients.json')
      .then((resp) => {
        this.setState({ingredients: resp.data});
      })
      .catch((error) => {
        this.setState({error: true});
      });
  }






  render(){
    const disableInfo = {
      ...this.state.ingredients
    }
    for(let key in disableInfo){
      disableInfo[key] = disableInfo[key] <= 0;
    }
    let burger = this.state.error ? <p>The ingredients can't be rendered</p> : <Spinner />;
    if(this.state.ingredients){
      burger = (
        <Aux>
          <Burger ing={this.state.ingredients} />
          <Controls ingAdded={this.addIngHandler} hasOrdered={this.orderNowHandler} ingRemove={this.remIngHandler} disabled={disableInfo} price={this.state.totalPrice} purchase={this.state.purchasable} />
        </Aux>
      );
    }



    let orderSmry = null;
    if(this.state.ingredients) {
      orderSmry = <OrderSummary ingr={this.state.ingredients} clickCancel={this.cancelPurchaseHandler} clickYes={this.continuePurchaseHandler} price={this.state.totalPrice} />;
    }
    if(this.state.loading){
      orderSmry = <Spinner />;
    }
    return (
      <Aux>
          <Modal show={this.state.hasOrdered} modalClosed={this.cancelPurchaseHandler}>
            {orderSmry}
          </Modal>
          {burger}
      </Aux>
    );
  }
}

export default withError(BurgerBuilder, axios);
