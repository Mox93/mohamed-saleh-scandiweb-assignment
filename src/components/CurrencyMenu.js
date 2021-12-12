import React from "react";

import { getCurrencySymbol } from "../utils";

class CurrencyMenu extends React.Component {
  render() {
    return (
      <div className="currency-menu" ref={this.menuRef}>
        {this.props.currencies.map((currency) => (
          <button
            className="element"
            key={currency}
            onClick={() => {
              this.props.setCurrency(currency);
              this.props.close();
            }}
          >
            <div className="symbol">{getCurrencySymbol(currency, "")}</div>
            <div className="value">{currency}</div>
          </button>
        ))}
      </div>
    );
  }
}

export default CurrencyMenu;
