import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classes from './BurgerIngredient.css';

class Ingredient extends Component {
  render(){
    let ing = null;
    switch (this.props.type) {
      case 'bread_down':
            ing = <div className={classes.BreadBottom}></div>;
            break;

      case 'bread_top':
              ing = (
                <div className={classes.BreadTop}>
                  <div className={classes.Seeds1}></div>
                  <div className={classes.Seeds2}></div>
                </div>
              );
              break;

      case 'meat':
                ing = <div className={classes.Meat}></div>;
                break;

      case 'cheese':
                ing = <div className={classes.Cheese}></div>;
                break;

      case 'bacon':
                ing = <div className={classes.Bacon}></div>;
                break;

      case 'salad':
                ing = <div className={classes.Salad}></div>;
                break;  
      default:
                ing = null;

    }

    return ing;
  }
}

Ingredient.PropTypes = {
  type: PropTypes.string.isrequired
};

export default Ingredient;
