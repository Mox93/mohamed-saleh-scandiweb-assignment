import React from "react";

import arrow from "../assets/arrow.svg";
import { getCurrencySymbol } from "../utils";

class CurrencySelector extends React.Component {
  constructor(props) {
    super(props);

    this.state = { menuOpen: false };
  }

  toggleMenu = () =>
    this.setState((state) => ({
      menuOpen: !state.menuOpen,
    }));

  render() {
    return (
      <div className="dropdown">
        <button className="element currency" onClick={this.toggleMenu}>
          {getCurrencySymbol(this.props.selected)}
          <img
            className={`arrow ${this.state.menuOpen ? "open" : ""}`}
            src={arrow}
            alt=""
          />
        </button>
        {this.state.menuOpen && (
          <div className="currency-menu">
            {this.props.currencies.map((currency) => (
              <button
                className="element"
                key={currency}
                onClick={() => {
                  this.props.setCurrency(currency);
                  this.toggleMenu();
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

export default CurrencySelector;
