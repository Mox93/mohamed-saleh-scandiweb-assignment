import React from "react";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";

import Category from "./pages/Category";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Navbar from "./components/Navbar";
import { initializeSettings, SettingsContext } from "./context/settings";
import { initializeCart, CartContext } from "./context/cart";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      settings: initializeSettings(this),
      cart: initializeCart(this),
    };
  }

  getParams() {
    return new URLSearchParams(this.props.location.search);
  }

  componentDidMount() {
    this.setState((state) => ({
      settings: {
        ...state.settings,
        currency: (window.localStorage.getItem("currency") || "").toLowerCase(),
      },
    }));
  }

  render() {
    return (
      <SettingsContext.Provider value={this.state.settings}>
        <CartContext.Provider value={this.state.cart}>
          <div className="App">
            <Navbar />
            <Switch>
              <Route exact path="/products">
                <Category />
              </Route>
              <Route exact path="/products/:id">
                <Product />
              </Route>
              <Route exact path="/cart">
                <Cart />
              </Route>
              <Route path="*">
                <Redirect to={`/products`} />
              </Route>
            </Switch>
          </div>
        </CartContext.Provider>
      </SettingsContext.Provider>
    );
  }
}

export default withRouter(App);
