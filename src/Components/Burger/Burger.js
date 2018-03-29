import React from 'react';
import classes from './Burger.css';
import Ingredient from './BurgerIngredients/BurgerIngredient';

const Burger = (props) => {
  let tIngredients = Object.keys(props.ing).map(ingKey => {
    return [...Array(props.ing[ingKey])].map((_,i) => {
      return <Ingredient key={ingKey + i} type={ingKey} />;
    });
  }).reduce((arr,el) => {
    return arr.concat(el);
  }, []);

  if(tIngredients.length === 0){
    tIngredients = <p>Please add Ingredients</p>;
  }
  return (
    <div className={classes.Burger}>
      <Ingredient type="bread_top"></Ingredient>
      {tIngredients}
      <Ingredient type="bread_down"></Ingredient>
    </div>
  );
}

export default Burger;
