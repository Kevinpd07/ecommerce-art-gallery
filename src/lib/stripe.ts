import Stripe from "stripe";

// Validate that Stripe secret key is available
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

if (!stripeSecretKey) {
  throw new Error("STRIPE_SECRET_KEY is not defined in environment variables");
}

export const stripe = new Stripe(stripeSecretKey, {
  apiVersion: "2025-12-15.clover",
  typescript: true,
});
