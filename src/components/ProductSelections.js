import React from "react";

class ProductSelections extends React.Component {
  render() {
    return (
      <div className="selections">
        {Object.keys(this.props.selectedAttributes).map((key) => {
          const attribute = this.props.selectedAttributes[key];

          return (
            <div
              className={`element ${attribute.type}`}
              key={key}
              data-name-tip={attribute.name}
            >
              {attribute.type === "swatch" ? (
                <div style={{ backgroundColor: attribute.value }}></div>
              ) : (
                attribute.displayValue
              )}
            </div>
          );
        })}
      </div>
    );
  }
}

export default ProductSelections;
