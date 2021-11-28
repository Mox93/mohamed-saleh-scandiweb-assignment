import React from "react";
import cart from "../assets/cart.svg";
import CurrencySelector from "./CurrencySelector";

class OptionList extends React.Component {
  render() {
    return (
      <div className="option-list">
        <CurrencySelector
          currencies={["USD", "GBP", "AUD", "JPY", "RUB"]}
          selected="USD"
        />
        <button className="element">
          <img src={cart} alt="cart" />
        </button>
      </div>
    );
  }
}

export default OptionList;
