const express = require("express");
const router = express.Router();
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const products = require('../data/products.json');

// Simple static mapping (for demo).
const countryCurrency = {
  IN: { currency: "inr", rate: 82 }, // 1 USD = 82 INR (example)
  US: { currency: "usd", rate: 1 },
  GB: { currency: "gbp", rate: 0.78 },
};

router.post('/create-session', async (req, res) => {
    try {
        const { productId, country } = req.body;
        const product = products.find(p => p.id === productId);
        if(!product){
            return res.status(404).json({ error: "Product not found" });
        }

        const mapping = countryCurrency[country] || countryCurrency['US'];
        const unitAmount = Math.round(product.priceUSD * mapping.rate * 100); // in smallest currency unit (e.g cents/paise)

        const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: mapping.currency,
            product_data: {
              name: product.name,
              images: [product.image || "https://picsum.photos/400"],
            },
            unit_amount: unitAmount,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.FRONTEND_URL}/success`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
    });

        res.json({ url: session.url });
    } catch (error) {
        console.error("Stripe error:", error);
    res.status(500).json({ error: error.message });
    }
});

module.exports = router;