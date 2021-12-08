import React from "react";

import { CartContext } from "../context/cart";
import { SettingsContext } from "../context/settings";
import CartItem from "../components/CartItem";

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
