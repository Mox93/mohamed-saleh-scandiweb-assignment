import React from "react";
import { Route, Switch } from "react-router-dom";

import Category from "./pages/Category";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Layout from "./components/Layout";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" />
          <Route exact path="/categories">
            <Layout component={Category} />
          </Route>
          <Route path="/categories/:name">
            <Layout component={Category} />
          </Route>
          <Route path="/products">
            <Layout component={Product} />
          </Route>
          <Route path="/cart">
            <Layout component={Cart} />
          </Route>
        </Switch>
      </div>
    );
  }
}

export default App;
