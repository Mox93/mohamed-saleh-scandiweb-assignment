import React from "react";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";

import Category from "./pages/Category";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Navbar from "./components/Navbar";
import { SettingsContext, settingsInitialState } from "./context/settings";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { settings: settingsInitialState };

    this.state.settings.setCategory = (category, updateParams = false) => {
      const params = new URLSearchParams(this.props.location.search);

      if (this.state.settings.category !== category) {
        this.setState((state) => ({
          settings: { ...state.settings, category },
        }));
      }

      if (updateParams) {
        if (params.get("category") !== category) {
          params.set("category", category);
          this.props.history.replace({ search: params.toString() });
        }
      } else if (params.has("category")) {
        params.delete("category");
        this.props.history.replace({ search: params.toString() });
      }
    };

    this.state.settings.setCurrency = (currency) => {
      window.localStorage.setItem("currency", currency);
      this.setState((state) => ({ settings: { ...state.settings, currency } }));
    };

    this.state.settings.validate = ({ categories, currencies }) => {
      // CURRENCIES
      const currency =
        currencies.find(
          (currency) => this.state.settings.currency === currency
        ) || currencies[0];

      this.state.settings.setCurrency(currency);

      // CATEGORIES
      const params = this.getParams();

      const categoryParam = params.get("category") || "";

      const category =
        categories.find(
          (category) => category === categoryParam.toLowerCase()
        ) || categories[0];

      if (category !== categoryParam) {
        this.state.settings.setCategory(category, params.has("category"));
      }
    };

    this.state.settings.getParams = (applyChanges = () => {}) => {
      const params = this.getParams();
      applyChanges(params);
      return params.toString();
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
      </SettingsContext.Provider>
    );
  }
}

export default withRouter(App);
