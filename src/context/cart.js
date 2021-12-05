import React from "react";

const cartInitialState = {
  items: [],
  idCounter: {},
  add: () => {},
  updateAmount: () => {},
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
        if (item.id === newItem.id && sameSelections(item, newItem)) {
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
      const items = app.state.cart.items.map((item) => {
        if (item.identifier === identifier) {
          return { ...item, amount };
        }
        return item;
      });

      app.setState((state) => ({ cart: { ...state.cart, items } }));
    },
  };
}

function sameSelections(item1, item2) {
  console.log(item1.selections === item2.selections);

  for (let key in item1.selections) {
    if (item1.selections[key] !== item2.selections[key]) {
      return false;
    }
  }

  return true;
}
