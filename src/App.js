import React, { Component } from 'react';
import Layout from './Components/Layout/Layout';
import classes from './App.css';
import BurgerBuilder from './Containers/BurgerBuilder/BurgerBuilder';
import Checkout from './Containers/Checkout/Checkout';
import {Switch, Route} from 'react-router-dom';
import Orders from './Containers/Orders/Orders';

class App extends Component {
  render() {
    return (
      <div className={classes.App}>
          <Layout>
            <Switch>
              <Route path="/Checkout" component={Checkout} />
              <Route path="/Orders" component={Orders} />
              <Route path="/" component={BurgerBuilder} />
            </Switch>
            {/*<BurgerBuilder></BurgerBuilder>
            <Checkout></Checkout>*/}
          </Layout>
      </div>
    );
  }
}

export default App;
