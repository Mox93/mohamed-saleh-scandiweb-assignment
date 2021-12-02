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
    let violation = false;

    if (!currencies.includes(params.get("currency"))) {
      params.set("currency", currencies[0]);
      violation = true;
    }

    if (!categories.includes(params.get("category"))) {
      params.set("category", categories[0]);
      violation = true;
    }

    if (violation) {
      this.props.history.replace({ search: params.toString() });
    }
  }

  componentDidMount() {
    fetchSettings({
      success: (data) => {
        const categories = data.categories.map(({ name }) => name);
        this.setState(() => ({
          categories: categories,
          currencies: data.currencies,
        }));
        this.validateParams({ categories, currencies: data.currencies });
      },
      error: (err) => console.log(err),
    });
  }

  // componentDidUpdate() {
  //   this.validateParams(this.state);
  // }

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
