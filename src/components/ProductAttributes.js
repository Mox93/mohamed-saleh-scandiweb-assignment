import React from "react";

class ProductAttributes extends React.Component {
  render() {
    return (
      <div className="options">
        {this.props.items.map((item) => (
          <button
            className={`element ${this.props.type} ${
              this.props.selected && this.props.selected.id === item.id
                ? "selected"
                : ""
            }`}
            key={item.id}
            onClick={() => this.props.changeSelection(item)}
            disabled={this.props.disabled}
          >
            {this.props.type === "swatch" ? (
              <div style={{ backgroundColor: item.value }}></div>
            ) : (
              item.displayValue
            )}
          </button>
        ))}
      </div>
    );
  }
}

export default ProductAttributes;
