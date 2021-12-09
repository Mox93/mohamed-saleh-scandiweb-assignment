import React from "react";

class ProductSelections extends React.Component {
  render() {
    return (
      <div className="selections">
        {this.props.attributes.map((attribute) => {
          const selectedAttribute = this.props.selectedAttributes[attribute.id];

          return (
            <div className="element" key={attribute.id}>
              <h3 className="label">{attribute.name}</h3>
              <div
                className={`value ${selectedAttribute.type}`}
                data-name-tip={attribute.name}
              >
                {selectedAttribute.type === "swatch" ? (
                  <div
                    style={{ backgroundColor: selectedAttribute.value }}
                  ></div>
                ) : (
                  selectedAttribute.displayValue
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default ProductSelections;
