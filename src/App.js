import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import Category from "./pages/Category";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Navbar from "./components/Navbar";
import { fetchSettings } from "./utils/requests";
import { settingsInitialState, SettingsContext } from "./context/settings";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { settings: settingsInitialState };

    this.state.settings.categories.change = (selection) => {
      this.setState((state) => ({
        settings: {
          ...state.settings,
          categories: { ...state.settings.categories, selected: selection },
        },
      }));
    };

    this.state.settings.currencies.change = (selection) => {
      this.setState((state) => ({
        settings: {
          ...state.settings,
          currencies: { ...state.settings.currencies, selected: selection },
        },
      }));
    };
  }

  componentDidMount() {
    fetchSettings({
      success: (data) => {
        const categories = data.categories;
        const currencies = data.currencies;

        this.setState((state) => ({
          settings: {
            ...state.settings,
            categories: {
              ...state.settings.categories,
              options: categories.map(({ name }) => name),
              selected: categories[0].name,
            },
            currencies: {
              ...state.settings.currencies,
              options: currencies,
              selected: currencies[0],
            },
          },
        }));
      },
      error: (err) => console.log(err),
    });
  }

  render() {
    const categories = this.state.settings.categories.options;

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
              {categories.length > 0 && <Redirect to={`/products`} />}
            </Route>
          </Switch>
        </div>
      </SettingsContext.Provider>
    );
  }
}

export default App;
