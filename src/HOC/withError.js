import React, {Component} from 'react';
import Modal from '../Components/UI/Modal/Modal';
import Aux from './AuxComp';
const withError = (Content, axios) => {
  return class extends Component {
    state = {
      error: null
    }
    componentWillMount() {
      this.reqInt = axios.interceptors.request.use((req) => {
        this.setState({error: null});
        return req;
      });
      this.resInt = axios.interceptors.response.use((res) => {
        return res;
      },(error) => {
        this.setState({error: error});
      })
    }

    componentWillUnmount(){
      axios.interceptors.request.eject(this.reqInt);
      axios.interceptors.response.eject(this.resInt);
    }

    clickHandler = () => {
      this.setState({error: null});
    }
    render() {
      return (
        <Aux>
          <Modal show={this.state.error} modalClosed={this.clickHandler}>
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <Content {...this.props} />
        </Aux>

      );
    }
  };
}

export default withError;
