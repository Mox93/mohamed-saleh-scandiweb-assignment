import React from "react";

const settingsInitialState = {
  category: "",
  currency: "",
  setCategory: () => {},
  setCurrency: () => {},
  validate: () => {},
  getParams: () => {},
};

export const SettingsContext = React.createContext(settingsInitialState);

export function initializeSettings(app) {
  return {
    ...settingsInitialState,

    currency: fetchCurrency(),

    setCategory: (category, updateParams = false) => {
      const params = new URLSearchParams(app.props.location.search);

      if (app.state.settings.category !== category) {
        app.setState((state) => ({
          settings: { ...state.settings, category },
        }));
      }

      if (updateParams) {
        if (params.get("category") !== category) {
          params.set("category", category);
          app.props.history.replace({ search: params.toString() });
        }
      } else if (params.has("category")) {
        params.delete("category");
        app.props.history.replace({ search: params.toString() });
      }
    },

    setCurrency: (currency) => {
      window.localStorage.setItem("currency", currency);
      app.setState((state) => ({ settings: { ...state.settings, currency } }));
    },

    validate: ({ categories, currencies }) => {
      // CURRENCIES
      const currency =
        currencies.find(
          (currency) => app.state.settings.currency === currency
        ) || currencies[0];

      app.state.settings.setCurrency(currency);

      // CATEGORIES
      const params = app.getParams();

      const categoryParam = params.get("category") || "";

      const category =
        categories.find(
          (category) => category === categoryParam.toLowerCase()
        ) || categories[0];

      if (category !== categoryParam) {
        app.state.settings.setCategory(category, params.has("category"));
      }
    },

    getParams: (update = () => {}) => {
      const params = app.getParams();
      update(params);
      return params.toString();
    },
  };
}

function fetchCurrency() {
  try {
    return window.localStorage.getItem("currency").toLowerCase();
  } catch (e) {
    console.log(e);
    return "";
  }
}
