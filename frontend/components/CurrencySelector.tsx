import React from "react";

type Props = { country: string; setCountry: (c: string) => void };

export default function CurrencySelector({ country, setCountry }: Props) {
  return (
    <select value={country} onChange={(e) => setCountry(e.target.value)}>
      <option value="US">United States (USD)</option>
      <option value="IN">India (INR)</option>
      <option value="GB">United Kingdom (GBP)</option>
    </select>
  );
}