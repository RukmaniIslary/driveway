# Driveway

Booking + deposit collection for mobile and home-service businesses.  
Built with Next.js 15, Tailwind CSS, and Paddle as the payment gateway.

---

## Features

- 4-step customer booking flow (service, date/time, details, deposit)
- Paddle Checkout overlay for PCI-compliant card collection
- Confirmation ticket with booking details
- Operator dispatch board with live stats, status filters, and job actions
- Webhook handler with HMAC-SHA256 Paddle signature verification
- All 50 US states + DC in the address form
- Fully typed with TypeScript — no `any`

---

## Quick start (local)

```bash
npm install
cp .env.local .env.local   # already created — fill in your keys
npm run dev
```

---

## Environment variables

| Variable | Where to get it |
|---|---|
| `NEXT_PUBLIC_PADDLE_CLIENT_TOKEN` | Paddle dashboard > Developer > Authentication |
| `NEXT_PUBLIC_PADDLE_ENVIRONMENT` | `sandbox` (dev) or `production` (live) |
| `NEXT_PUBLIC_PRICE_BATH_BRUSH` | Paddle dashboard > Catalog > Prices |
| `NEXT_PUBLIC_PRICE_FULL_GROOM` | same |
| `NEXT_PUBLIC_PRICE_DELUXE` | same |
| `PADDLE_WEBHOOK_SECRET` | Paddle dashboard > Developer > Webhooks |

---

## Deploy to Vercel

1. Push this folder to a GitHub repo.
2. Import the repo in [vercel.com/new](https://vercel.com/new).
3. Add every variable from the table above under **Settings > Environment Variables**.
4. Deploy. Vercel auto-detects Next.js.

### Paddle webhook setup

In Paddle dashboard > Developer > Webhooks, add a new endpoint:

```
https://your-vercel-domain.vercel.app/api/paddle/webhook
```

Subscribe to at minimum:
- `transaction.completed`
- `transaction.payment_failed`

Copy the webhook signing secret into `PADDLE_WEBHOOK_SECRET`.

---

## Swap to a real database

`lib/bookings.ts` uses an in-memory global store that resets on every cold start.  
Replace `getStore()` with your preferred DB client (Postgres via Neon/Supabase, PlanetScale, etc.) — the API surface stays identical.

---

## Customising services

Edit `lib/constants.ts`:

```ts
export const SERVICES = [
  {
    id: "bath-brush",
    name: "Bath & Brush",
    duration: "60 min",
    price: 65,      // full price in dollars
    deposit: 20,    // deposit in dollars
    priceId: process.env.NEXT_PUBLIC_PRICE_BATH_BRUSH ?? "",
    description: "...",
  },
  // add more...
];
```

Each service needs a matching Price ID created in your Paddle catalog.
