import React from "react";

export const settingsInitialState = {
  category: "",
  currency: "",
  setCategory: () => {},
  setCurrency: () => {},
  validate: () => {},
  getParams: () => {},
};

export const SettingsContext = React.createContext(settingsInitialState);
