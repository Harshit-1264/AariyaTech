import { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import CurrencySelector from '../components/CurrencySelector';
import { CountryCode } from '../lib/currency';

type Product = {
  id: string;
  name: string;
  description: string;
  image: string;
  priceUSD: number;
};

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [country, setCountry] = useState<CountryCode>('US');

  useEffect(() => {
    (async () => {
      try {
        const ipResp = await axios.get('https://ipapi.co/json/');
        const countryCode = ipResp.data.country_code || 'US';
        if (['IN', 'US', 'GB'].includes(countryCode)) setCountry(countryCode as CountryCode);
      } catch (err) {
        // ignore
      }
    })();

    (async () => {
      const resp = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000'}/api/products`);
      setProducts(resp.data);
    })();
  }, []);

  return (
    <main style={{ padding: 24 }}>
      <h1>Regional Pricing Demo</h1>
      <div style={{ marginBottom: 16 }}>
        <label>Select country: </label>
        <CurrencySelector country={country} setCountry={(c) => setCountry(c as CountryCode)} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
        {products.map((p) => (
          <ProductCard key={p.id} product={p} country={country} />
        ))}
      </div>
    </main>
  );
}
