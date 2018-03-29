import React, {Component} from 'react';
import Aux from '../../HOC/AuxComp';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
  state = {
    showDrawer: false,
    height: 0,
    width: 0
  }

  componentWillMount(){
    this.setState({height: window.innerHeight, width: window.innerWidth})
  }

  sideDrawerClose = () => {
    this.setState({showDrawer: false})
  }

  menuHandler = () => {
    this.setState((prevState) => ({showDrawer: !prevState.showDrawer}))
  }
  render(){
    return (
      <Aux>
        // <div>toolbar, sidebar, backdrop</div>
        <Toolbar menuClick={this.menuHandler} width={this.state.width}></Toolbar>
        <SideDrawer open={this.state.showDrawer} Closed={this.sideDrawerClose}></SideDrawer>
        <main className={classes.BurgerCont}>{this.props.children}</main>
      </Aux>
    );
  }
}

export default Layout;
