import React from 'react';
import axios from 'axios';
import { formatPriceUSDBase } from '../lib/currency';

type Product = {
  id: string;
  name: string;
  description: string;
  image: string;
  priceUSD: number;
};

export default function ProductCard({ product, country }: { product: Product; country: 'IN' | 'US' | 'GB' }) {
  async function buy() {
    try {
      const resp = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000'}/api/checkout/create-session`, {
        productId: product.id,
        country
      });
      // Redirect to Stripe Checkout
      window.location.href = resp.data.url;
    } catch (err) {
      console.error(err);
      alert('Failed to create checkout session');
    }
  }

  return (
    <div style={{ border: '1px solid #ddd', background: '#988f8fff', padding: 16, borderRadius: 8 }}>
      <img src={product.image} alt={product.name} width={240} />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p>{formatPriceUSDBase(product.priceUSD, country)}</p>
      <button onClick={buy} style={{padding: 5, borderRadius: 5, border: '1px solid #5f9ba87d'}}>Buy Now</button>
    </div>
  );
}
