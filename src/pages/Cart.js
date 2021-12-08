import React from "react";

import { CartContext } from "../context/cart";
import { SettingsContext } from "../context/settings";
import CartItem from "../components/CartItem";
import ProductAttributes from "../components/ProductAttributes";

class Cart extends React.Component {
  render() {
    return (
      <CartContext.Consumer>
        {(cart) => (
          <div className="cart-page container">
            <h1 className="title">cart</h1>
            {cart.items.length > 0 ? (
              <SettingsContext.Consumer>
                {(settings) => (
                  <div className="content">
                    {cart.items.map((item) => (
                      <CartItem
                        {...item}
                        key={item.uid}
                        currency={settings.currency}
                        updateAmount={cart.updateAmount}
                        attributesComponent={
                          <div className="product-attributes">
                            {item.attributes.map((attribute) => (
                              <div className="element" key={attribute.id}>
                                <h3 className="label">{attribute.name}:</h3>
                                <ProductAttributes
                                  key={attribute.id}
                                  name={attribute.name}
                                  type={attribute.type}
                                  items={attribute.items}
                                  selected={
                                    item.selectedAttributes[attribute.id]
                                  }
                                  changeSelection={(selected) => {
                                    console.log(selected);
                                    cart.updateAttributes(
                                      item.uid,
                                      attribute.id,
                                      selected
                                    );
                                  }}
                                  disabled={false}
                                />
                              </div>
                            ))}
                          </div>
                        }
                      />
                    ))}
                  </div>
                )}
              </SettingsContext.Consumer>
            ) : (
              <h3 className="message">No items</h3>
            )}
          </div>
        )}
      </CartContext.Consumer>
    );
  }
}

export default Cart;
