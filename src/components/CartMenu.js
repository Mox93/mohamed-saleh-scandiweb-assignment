import React from "react";

import CartItem from "./CartItem";
import CartMenuFooter from "./CartMenuFooter";
import ProductSelections from "./ProductSelections";

class CartMenu extends React.Component {
  render() {
    const cart = this.props.cart;
    const totalAmount = cart.totalAmount();

    return (
      <div className="cart-menu">
        <div ref={this.props.menuRef}>
          {totalAmount > 0 ? (
            <>
              <div className="content">
                <h3 className="title">
                  My Bag,
                  <span>
                    {` ${totalAmount} item${totalAmount > 1 ? "s" : ""}`}
                  </span>
                </h3>
                {cart.items.map((item) => (
                  <CartItem
                    {...item}
                    key={item.uid}
                    gallery={[item.gallery[0]]}
                    currency={this.props.currency}
                    updateAmount={cart.updateAmount}
                    attributesComponent={
                      <ProductSelections
                        selectedAttributes={item.selectedAttributes}
                        attributes={item.attributes}
                      />
                    }
                  />
                ))}
              </div>
              <CartMenuFooter
                totalPrices={cart.totalPrices()}
                currency={this.props.currency}
                params={this.props.params}
                close={this.props.close}
              />
            </>
          ) : (
            <h3 className="no-items">No items</h3>
          )}
        </div>
      </div>
    );
  }
}

export default CartMenu;
