import React, {Component} from 'react';
import Order from '../../Components/Order/Order';
import axios from '../../axiosOrders';
import withError from '../../HOC/withError';

class Orders extends Component {
  state = {
    orders: [],
    loading: true
  }
  componentDidMount(){
    axios.get('/orders.json')
      .then((res) => {
        const fetchOrders = [];
        for (let key in res.data){
          fetchOrders.push({
            ...res.data[key],
            id: key
          });
        }
        this.setState({loading: false, orders: fetchOrders});
      })
      .catch((err) => {
        this.setState({loading: false});
      })
  }
  render() {
    return (
      <div>
        {this.state.orders.map((order) => {
          return (
            <Order key={order.id} ings={order.ingredients} price={order.price} />
          );
        })}
      </div>
    );
  }
}

export default withError(Orders, axios);
