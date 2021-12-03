import React from "react";

class ProductAttributes extends React.Component {
  render() {
    return (
      <div className="options">
        {this.props.items.map((item) => (
          <button
            className={`element ${
              this.props.selected === item.id ? "selected" : ""
            } ${this.props.type}`}
            key={item.id}
            onClick={() => this.props.changeSelection(item.id)}
            disabled={this.props.disabled}
          >
            {this.props.type === "swatch" ? (
              <div
                style={{
                  width: "48px",
                  height: "32px",
                  backgroundColor: item.value,
                }}
              ></div>
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
