import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import Category from "./pages/Category";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Navbar from "./components/Navbar";

class App extends React.Component {
  render() {
    return (
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
    );
  }
}

export default App;
