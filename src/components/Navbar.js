import React from "react";

import CategoryList from "./CategoryList";
import CurrencySelector from "./CurrencySelector";
import logo from "../assets/logo.svg";
import { fetchSettings } from "../utils/requests";
import CartOverlay from "./CartOverlay";
import { SettingsContext } from "../context/settings";

class Navbar extends React.Component {
  static contextType = SettingsContext;

  constructor(props) {
    super(props);
    this.state = { categories: [], currencies: [] };
  }

  componentDidMount() {
    const settings = this.context;

    fetchSettings({
      success: (data) => {
        const categories = data.categories.map(({ name }) =>
          name.toLowerCase()
        );
        const currencies = data.currencies.map((currency) =>
          currency.toLowerCase()
        );
        this.setState(() => ({ categories, currencies }));
        settings.validate({ categories, currencies });
      },
      error: (err) => console.log(err),
    });
  }

  render() {
    const settings = this.context;

    return (
      <div className="navbar">
        <img className="logo" src={logo} alt="Scandiweb" />
        <CategoryList
          categories={this.state.categories}
          selected={settings.category}
          getParams={settings.getParams}
        />
        <div className="option-list">
          <CurrencySelector
            currencies={this.state.currencies}
            selected={settings.currency}
            setCurrency={settings.setCurrency}
          />
          <CartOverlay
            currency={settings.currency}
            params={settings.getParams((params) => params.delete("category"))}
          />
        </div>
      </div>
    );
  }
}

export default Navbar;
