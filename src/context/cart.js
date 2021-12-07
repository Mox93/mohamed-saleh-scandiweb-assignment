import React from "react";

const cartInitialState = {
  items: [],
  idCounter: {},
  add: () => {},
  updateAmount: () => {},
  totalPrices: () => {},
};

export const CartContext = React.createContext(cartInitialState);

export function initializeCart(app) {
  return {
    ...cartInitialState,

    add: (newItem) => {
      const idCounter = { ...app.state.cart.idCounter };
      const count = (idCounter[newItem.id] || 0) + 1;
      newItem.identifier = `${newItem.id} ${count}`;
      idCounter[newItem.id] = count;

      let found = false;

      const items = app.state.cart.items.map((item) => {
        if (
          item.id === newItem.id &&
          sameSelections(item.attributes, newItem.attributes)
        ) {
          found = true;
          return { ...item, amount: item.amount + newItem.amount };
        }
        return item;
      });

      if (!found) {
        items.push(newItem);
      }

      app.setState((state) => ({
        cart: {
          ...state.cart,
          items,
          idCounter,
        },
      }));
    },

    updateAmount: (identifier, amount) => {
      const items = app.state.cart.items
        .map((item) => {
          if (item.identifier === identifier) {
            return { ...item, amount };
          }
          return item;
        })
        .filter((item) => item.amount > 0);

      app.setState((state) => ({ cart: { ...state.cart, items } }));
    },
    totalPrices: () => {
      const totalPrices = {};

      app.state.cart.items.forEach((item) => {
        item.prices.forEach((price) => {
          totalPrices[price.currency] =
            Math.round(
              ((totalPrices[price.currency] || 0) +
                price.amount * item.amount) *
                100
            ) / 100;
        });
      });

      return Object.keys(totalPrices).map((key) => ({
        currency: key,
        amount: totalPrices[key],
      }));
    },
  };
}

function sameSelections(attributes1, attributes2) {
  for (let key in attributes1) {
    if (attributes1[key].selected.id !== attributes2[key].selected.id) {
      return false;
    }
  }

  return true;
}
