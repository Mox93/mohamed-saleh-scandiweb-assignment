const SYMBOLS = {
  usd: "$",
  gbp: "£",
  aud: "$",
  jpy: "¥",
  rub: "₽",
};

export const getCurrencySymbol = (currency, alt) =>
  SYMBOLS[currency] || (alt === undefined ? currency : alt);
