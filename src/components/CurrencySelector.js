import React from "react";
import arrow from "../assets/arrow.svg";
import { getCurrencySymbol } from "../utils";

class CurrencySelector extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currencyMenuOpen: false,
    };
  }

  handleCurrencyButton = () =>
    this.setState((state) => ({
      currencyMenuOpen: !state.currencyMenuOpen,
    }));

  handleCurrencySelection(currency) {
    console.log(currency);
  }

  render() {
    return (
      <div className="dropdown">
        <button
          className="element currency"
          onClick={this.handleCurrencyButton}
        >
          {getCurrencySymbol(this.props.selected)}
          <img
            className={`arrow ${this.state.currencyMenuOpen ? "open" : ""}`}
            src={arrow}
            alt=""
          />
        </button>
        {this.state.currencyMenuOpen && (
          <div className="currency-menu">
            {this.props.currencies.map((currency) => (
              <div
                className="element"
                key={currency}
                onClick={() => this.handleCurrencySelection(currency)}
              >
                <div className="symbol">
                  {getCurrencySymbol(this.props.selected, "")}
                </div>
                <div className="value">{currency}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default CurrencySelector;
