import React from "react";

class ProductAttributes extends React.Component {
  render() {
    const items = this.props.items;

    return (
      <div className="options">
        {items.map((item) => (
          <button
            className="element"
            key={item.id}
            onClick={() => console.log(item.value)}
          >
            {item.displayValue}
          </button>
        ))}
      </div>
    );
  }
}

export default ProductAttributes;
