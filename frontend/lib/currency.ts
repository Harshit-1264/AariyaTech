export type CountryCode = 'IN' | 'US' | 'GB';

export const countryCurrency = {
  IN: { code: 'IN', currency: 'INR', symbol: '₹', rate: 82 },
  US: { code: 'US', currency: 'USD', symbol: '$', rate: 1 },
  GB: { code: 'GB', currency: 'GBP', symbol: '£', rate: 0.78 }
} as const;

export function formatPriceUSDBase(priceUSD: number, country: CountryCode){
    const mapping = countryCurrency[country];
    const converted = priceUSD * mapping.rate;
    return `${mapping.symbol} ${converted.toFixed(2)}`;
}