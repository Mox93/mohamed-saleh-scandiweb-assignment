import React from "react";

class ProductAttributes extends React.Component {
  render() {
    return (
      <div className="product-attributes">
        {this.props.attributes.map((attribute) => (
          <div className="element" key={attribute.id}>
            <h3 className="label">{attribute.name}:</h3>
            <div className="options">
              {attribute.items.map((item) => (
                <button
                  className={`element ${attribute.type} ${
                    this.props.selectedAttributes[attribute.id] &&
                    this.props.selectedAttributes[attribute.id].id === item.id
                      ? "selected"
                      : ""
                  }`}
                  key={item.id}
                  onClick={() => this.props.changeSelection(attribute.id, item)}
                  disabled={this.props.disabled}
                >
                  {attribute.type === "swatch" ? (
                    <div style={{ backgroundColor: item.value }}></div>
                  ) : (
                    item.displayValue
                  )}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default ProductAttributes;
