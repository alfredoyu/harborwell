export const currencyRates = {
  USD: 1,
  EUR: 0.85,
  GBP: 0.73,
  CNY: 7.2
};

export const currencySymbols = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  CNY: '¥'
};

export const convertPrice = (price: number, fromCurrency: string = 'USD', toCurrency: string): number => {
  const usdPrice = price / currencyRates[fromCurrency as keyof typeof currencyRates];
  const convertedPrice = usdPrice * currencyRates[toCurrency as keyof typeof currencyRates];
  return Math.round(convertedPrice * 100) / 100;
};

export const formatPrice = (price: number, currency: string): string => {
  const symbol = currencySymbols[currency as keyof typeof currencySymbols];
  return `${symbol}${price.toFixed(2)}`;
};