import React from "react";

import arrow from "../assets/arrow.svg";
import { getCurrencySymbol } from "../utils";

class CurrencySelector extends React.Component {
  constructor(props) {
    super(props);

    this.state = { menuOpen: false };

    this.buttonRef = React.createRef();
    this.menuRef = React.createRef();
  }

  toggleMenu = () => this.setState((state) => ({ menuOpen: !state.menuOpen }));

  handleClickOutside = (event) => {
    if (
      this.menuRef.current &&
      !this.menuRef.current.contains(event.target) &&
      this.buttonRef.current &&
      !this.buttonRef.current.contains(event.target)
    ) {
      this.setState(() => ({ menuOpen: false }));
    }
  };

  componentDidUpdate() {
    if (this.state.menuOpen) {
      document.addEventListener("mousedown", this.handleClickOutside);
    } else {
      document.removeEventListener("mousedown", this.handleClickOutside);
    }
  }

  render() {
    return (
      <div className="dropdown">
        <button
          className="element currency"
          ref={this.buttonRef}
          onClick={this.toggleMenu}
        >
          {getCurrencySymbol(this.props.selected)}
          <img
            className={`arrow ${this.state.menuOpen ? "open" : ""}`}
            src={arrow}
            alt=""
          />
        </button>
        {this.state.menuOpen && (
          <div className="currency-menu" ref={this.menuRef}>
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
