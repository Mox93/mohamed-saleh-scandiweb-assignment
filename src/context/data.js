import React from "react";

export const settingInitialState = {
  categories: { options: [], selected: null, change: () => {} },
  currencies: { options: [], selected: null, change: () => {} },
};

export const SettingsContext = React.createContext(settingInitialState);
