import React from "react";

class AmountController extends React.Component {
  render() {
    return (
      <div className="amount">
        <button
          className="element"
          onClick={() =>
            this.props.updateAmount(this.props.uid, this.props.amount + 1)
          }
        >
          +
        </button>
        <h3 className="value">{this.props.amount}</h3>
        <button
          className="element"
          onClick={() =>
            this.props.updateAmount(this.props.uid, this.props.amount - 1)
          }
        >
          -
        </button>
      </div>
    );
  }
}

export default AmountController;
