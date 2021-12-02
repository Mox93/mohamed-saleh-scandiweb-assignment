import React from "react";

class ProductAttributes extends React.Component {
  render() {
    return (
      <div className="options">
        {this.props.items.map((item) => (
          <button
            className={`element ${
              this.props.selected === item.id ? "selected" : ""
            }`}
            key={item.id}
            onClick={() => this.props.changeSelection(item.id)}
          >
            {item.displayValue}
          </button>
        ))}
      </div>
    );
  }
}

export default ProductAttributes;
