import React from "react";

const cartInitialState = {
  items: [],
  idCounter: {},
  add: () => {},
  updateAmount: () => {},
  updateAttributes: () => {},
  totalPrices: () => {},
  totalAmount: () => {},
};

export const CartContext = React.createContext(cartInitialState);

function constructItem(item, amount, selectedAttributes) {
  const selectedAttributes$ = {};

  item.attributes.forEach((attribute) => {
    selectedAttributes$[attribute.id] = {
      ...selectedAttributes[attribute.id],
      type: attribute.type,
    };
  });

  return {
    id: item.id,
    brand: item.brand,
    name: item.name,
    prices: item.prices,
    gallery: item.gallery,
    attributes: item.attributes,
    amount,
    selectedAttributes: selectedAttributes$,
  };
}

export function initializeCart(app) {
  return {
    ...cartInitialState,

    ...fetchCart(),

    add: ({ item: rawData, amount, selectedAttributes }) => {
      const newItem = constructItem(rawData, amount, selectedAttributes);
      const idCounter = { ...app.state.cart.idCounter };

      let found = false;

      const items = app.state.cart.items.map((item) => {
        if (
          !found &&
          item.id === newItem.id &&
          sameSelections(item.selectedAttributes, newItem.selectedAttributes)
        ) {
          found = true;
          return { ...item, amount: item.amount + newItem.amount };
        }
        return item;
      });

      if (!found) {
        const count = idCounter[newItem.id] || 0;
        newItem.uid = `${newItem.id} ${count}`;
        idCounter[newItem.id] = count + 1;

        items.push(newItem);
      }

      app.setState((state) => {
        const cart = {
          ...state.cart,
          items,
          idCounter,
        };

        storeCart(cart);

        return { cart };
      });
    },

    updateAmount: (uid, amount) => {
      const items = app.state.cart.items
        .map((item) => {
          if (item.uid === uid) {
            return { ...item, amount };
          }
          return item;
        })
        .filter((item) => item.amount > 0);

      app.setState((state) => {
        const cart = { ...state.cart, items };

        storeCart(cart);
        return { cart };
      });
    },

    updateAttributes: (uid, attributeId, selected) => {
      const items = app.state.cart.items.map((item) => {
        if (item.uid === uid) {
          return {
            ...item,
            selectedAttributes: {
              ...item.selectedAttributes,
              [attributeId]: selected,
            },
          };
        }
        return item;
      });

      app.setState((state) => {
        const cart = { ...state.cart, items };

        storeCart(cart);
        return { cart };
      });
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

    totalAmount: () => {
      let totalAmount = 0;

      app.state.cart.items.forEach((item) => {
        totalAmount = totalAmount + item.amount;
      });

      return totalAmount;
    },
  };
}

function sameSelections(attributes1, attributes2) {
  for (let key in attributes1) {
    if (attributes1[key].id !== attributes2[key].id) {
      return false;
    }
  }

  return true;
}

function fetchCart() {
  try {
    return JSON.parse(window.localStorage.getItem("cart"));
  } catch (e) {
    console.log(e);
    return {};
  }
}

function storeCart(cart) {
  window.localStorage.setItem("cart", JSON.stringify(cart));
}
