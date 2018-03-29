import React from 'react';
import classes from './Input.css';

const Input = (props) => {
  let inpElement = null;
  const inpClasses = [classes.Input];

  if(props.invalid && props.shouldValidate && props.touched){
    inpClasses.push(classes.Invalid);
  }
  switch(props.eleType){
    case('input'):
      inpElement = <input className={inpClasses.join(' ')} {...props.eleConfig} value={props.value} onChange={props.Changed}/>;
      break;
    case('textarea'):
      inpElement = <textarea className={inpClasses.join(' ')} {...props.eleConfig} value={props.value} onChange={props.Changed}/>
      break;
    case('select'):
      inpElement = <select className={inpClasses.join(' ')} value={props.value} onChange={props.Changed}>
        {props.eleConfig.options.map((opt) => {
          return (
            <option key={opt.value} value={opt.value}>
              {opt.displayValue}
            </option>
          );
        })}
      </select>
      break;
    default:
      inpElement = <input className={inpClasses.join(' ')} {...props.eleConfig} value={props.value} onChange={props.Changed}/>
  }
  let invalidError = null;
  if(props.invalid && props.touched){
    invalidError = <p>{props.invalidErr}</p>
  }
  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inpElement}
      {invalidError}
    </div>
  );
}

export default Input;
