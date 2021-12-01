import React from "react";

export const settingsInitialState = {
  categories: { options: [], selected: null, change: () => {} },
  currencies: { options: [], selected: null, change: () => {} },
};

export const SettingsContext = React.createContext(settingsInitialState);
