const SYMBOLS = {
  USD: "$",
  GBP: "£",
  AUD: "$",
  JPY: "¥",
  RUB: "₽",
};

export const getCurrencySymbol = (currency, alt) =>
  SYMBOLS[currency] || (alt === undefined ? currency : alt);
