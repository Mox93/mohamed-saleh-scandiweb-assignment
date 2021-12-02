import React from "react";
import { withRouter } from "react-router-dom";

import arrow from "../assets/arrow.svg";
import { getCurrencySymbol } from "../utils";

class CurrencySelector extends React.Component {
  constructor(props) {
    super(props);

    this.state = { currencyMenuOpen: false };
  }

  toggleCurrencyMenu = () =>
    this.setState((state) => ({
      currencyMenuOpen: !state.currencyMenuOpen,
    }));

  render() {
    const params = new URLSearchParams(this.props.params);
    const selected = params.get("currency");

    return (
      <div className="dropdown">
        <button className="element currency" onClick={this.toggleCurrencyMenu}>
          {getCurrencySymbol(selected)}
          <img
            className={`arrow ${this.state.currencyMenuOpen ? "open" : ""}`}
            src={arrow}
            alt=""
          />
        </button>
        {this.state.currencyMenuOpen && (
          <div className="currency-menu">
            {this.props.currencies.map((currency) => (
              <button
                className="element"
                key={currency}
                onClick={() => {
                  params.set("currency", currency);
                  this.props.history.replace({ search: params.toString() });
                  this.toggleCurrencyMenu();
                }}
              >
                <div className="symbol">{getCurrencySymbol(currency, "")}</div>
                <div className="value">{currency}</div>
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(CurrencySelector);
