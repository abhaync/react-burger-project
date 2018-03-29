import React,{Component} from 'react';
import Button from '../../../Components/UI/Button/Button';
import classes from './Contact.css';
import axios from '../../../axiosOrders';
import Spinner from '../../../Components/UI/Spinner/Spinner';
import Input from '../../../Components/UI/Input/Input';

class Contact extends Component {
  state = {
    orderForm: {
        name: {
          eleType: 'input',
          eleConfig: {
            type: 'text',
            placeholder: 'Your Name',
          },
          value: '',
          validation: {
            required: true
          },
          valid: false,
          touched: false,
          invalidMsg: 'Field is required'
        },
        street: {
          eleType: 'input',
          eleConfig: {
            type: 'text',
            placeholder: 'Street',
          },
          value: '',
          validation: {
            required: true
          },
          valid: false,
          touched: false,
          invalidMsg: 'Field is required'
        },
        zipcode: {
          eleType: 'input',
          eleConfig: {
            type: 'text',
            placeholder: 'ZipCode'
          },
          value: '',
          validation: {
            required: true,
            minLength: 6,
            maxLength: 6
          },
          valid: false,
          touched: false,
          invalidMsg: ''
        },
        country: {
          eleType: 'input',
          eleConfig: {
            type: 'text',
            placeholder: 'Country'
          },
          value: '',
          validation: {
            required: true
          },
          valid: false,
          touched: false,
          invalidMsg: 'Field is required'
        },
        email: {
          eleType: 'input',
          eleConfig: {
            type: 'email',
            placeholder: 'Mail'
          },
          value: '',
          validation: {
            required: true
          },
          valid: false,
          touched: false,
          invalidMsg: 'Invalid Email'
        },
        deliveryMethod: {
          eleType: 'select',
          eleConfig: {
            options: [
              {value: 'fastest', displayValue: 'Fastest'},
              {value: 'cheapest', displayValue: 'Cheapest'}
            ]
          },
          value: 'fastest',
          valid: true
        },
    },
    loading: false,
    formIsValid: false
  }

  checkValidity = (value, rules) => {
    let isValid = true;
    if(rules){
      if(rules.required ){
        isValid = value.trim() !== '' && isValid;
      }
      if(rules.minLength){
        isValid = value.length >= rules.minLength && isValid;
      }
      if(rules.maxLength){
        isValid = value.length <= rules.maxLength && isValid;
      }
    }

    return isValid;
  }

  orderHandler = (event) => {
    event.preventDefault();
    this.setState({loading: true});
    const formData = {};
    for(let id in this.state.orderForm){
      formData[id] = this.state.orderForm[id].value;
    }

    const orderObj = {
      ingredients: this.props.ings,
      price: this.props.price.toFixed(2),
      orderData: formData
    }
    axios.post('/orders.json',orderObj)
      .then((resp) => {
        console.log(resp);
        this.setState({loading: false});
      })
      .catch((error) => {
        this.setState({loading: false});
        console.log(error);
      })

      this.props.history.push('/');
  }

  inpChangedHandler = (event, inputID) => {
    let updatedForm = {
      ...this.state.orderForm
    }
    let updatedElem = {
      ...updatedForm[inputID]
    }


    updatedElem.value = event.target.value;
    updatedElem.valid = this.checkValidity(updatedElem.value, updatedElem.validation);
    updatedElem.touched = true;
    if(inputID === 'zipcode'){
      if(updatedElem.value.length < updatedElem.validation.minLength){
        updatedElem.invalidMsg = 'Too Short';
      }
      if(updatedElem.value.length > updatedElem.validation.maxLength){
        updatedElem.invalidMsg = 'Too Long';
      }
    }
    let formValid = true;
    for (let inputid in updatedForm){
      formValid = updatedForm[inputid].valid && formValid;
    }
    updatedForm[inputID] = updatedElem;
    this.setState({
      orderForm: updatedForm,
      formIsValid: formValid
    });


  }
  render() {
    const formElemsArray = [];
    for(let key in this.state.orderForm) {
      formElemsArray.push({
        id: key,
        config: this.state.orderForm[key]
      });
    }
    //console.log(formElemsArray);
    let form = null;
    if(this.state.loading){
      form = <Spinner />
    }else {
      form = (
        <form onSubmit={this.orderHandler}>
          {formElemsArray.map((elem) => {
            return (
              <Input invalidErr={elem.config.invalidMsg} touched={elem.config.touched} shouldValidate={elem.config.validation} invalid={!elem.config.valid} Changed={(event) => this.inpChangedHandler(event, elem.id)} eleType={elem.config.eleType} eleConfig={elem.config.eleConfig} value={elem.config.value} key={elem.id} />
            );
          })}
          <Button btnType="Success" disabled={!this.state.formIsValid} >ORDER</Button>
        </form>
      );
    }
    return (
      <div className={classes.Contact}>
        <h4>Enter Your Contact Details</h4>
        {form}
      </div>
    );
  }
}

export default Contact;
