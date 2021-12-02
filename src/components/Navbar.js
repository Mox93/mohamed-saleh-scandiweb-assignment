import React from "react";
import { withRouter } from "react-router-dom";

import CategoryList from "./CategoryList";
import CurrencySelector from "./CurrencySelector";
import logo from "../assets/logo.svg";
import { fetchSettings } from "../utils/requests";
import CartOverlay from "./CartOverlay";

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { categories: [], currencies: [] };
  }

  getParams() {
    return new URLSearchParams(this.props.location.search);
  }

  validateParams({ categories, currencies }) {
    const params = this.getParams();
    const currencyParam = params.get("currency") || "";
    const categoryParam = params.get("category") || "";

    const currency =
      currencies.find((currency) => currency === currencyParam.toLowerCase()) ||
      currencies[0];
    const category =
      categories.find((category) => category === categoryParam.toLowerCase()) ||
      categories[0];

    let replace = false;

    if (currency !== currencyParam) {
      params.set("currency", currency);
      replace = true;
    }

    if (category !== categoryParam) {
      params.set("category", category);
      replace = true;
    }

    if (replace) {
      console.log("Replacing");
      this.props.history.replace({ search: params.toString() });
    }
  }

  componentDidMount() {
    fetchSettings({
      success: (data) => {
        const categories = data.categories.map(({ name }) =>
          name.toLowerCase()
        );
        const currencies = data.currencies.map((currency) =>
          currency.toLowerCase()
        );
        this.setState(() => ({ categories, currencies }));
        this.validateParams({ categories, currencies });
      },
      error: (err) => console.log(err),
    });
  }

  componentDidUpdate() {
    this.validateParams(this.state);
  }

  render() {
    const params = this.getParams().toString();

    return (
      <div className="navbar">
        <img className="logo" src={logo} alt="Scandiweb" />
        <CategoryList categories={this.state.categories} params={params} />
        <div className="option-list">
          <CurrencySelector
            currencies={this.state.currencies}
            params={params}
          />
          <CartOverlay />
        </div>
      </div>
    );
  }
}

export default withRouter(Navbar);
