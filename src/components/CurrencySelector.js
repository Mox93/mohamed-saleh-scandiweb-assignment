import React from "react";
import arrow from "../assets/arrow.svg";
import { SettingsContext } from "../context/data";
import { getCurrencySymbol } from "../utils";

class CurrencySelector extends React.Component {
  static contextType = SettingsContext;

  constructor(props) {
    super(props);

    this.state = {
      currencyMenuOpen: false,
    };
  }

  toggleCurrencyMenu = () =>
    this.setState((state) => ({
      currencyMenuOpen: !state.currencyMenuOpen,
    }));

  render() {
    const settings = this.context;

    return (
      <div className="dropdown">
        <button className="element currency" onClick={this.toggleCurrencyMenu}>
          {getCurrencySymbol(settings.currencies.selected)}
          <img
            className={`arrow ${this.state.currencyMenuOpen ? "open" : ""}`}
            src={arrow}
            alt=""
          />
        </button>
        {this.state.currencyMenuOpen && (
          <div className="currency-menu">
            {settings.currencies.options.map((currency) => (
              <div
                className="element"
                key={currency}
                onClick={() => {
                  settings.currencies.change(currency);
                  this.toggleCurrencyMenu();
                }}
              >
                <div className="symbol">{getCurrencySymbol(currency, "")}</div>
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
