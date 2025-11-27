# Lead Distribution SaaS

Production-ready Next.js 14 app router project that wires the existing V0 UI to Supabase Postgres via Prisma, Auth.js (NextAuth) with Google SSO, and Stripe-ready billing scaffolding.

## Environment Variables
Create a `.env` file with the following values:

```
DATABASE_URL=postgresql://user:password@host:5432/db
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-random-secret
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
STRIPE_SECRET_KEY=sk_test_...
# Optional locally: Stripe webhook signing secret (leave blank if not handling webhooks)
STRIPE_WEBHOOK_SECRET=
STRIPE_WEBHOOK_SECRET=whsec_...
```

## Setup
1. Install dependencies: `pnpm install`
2. Generate Prisma client: `pnpm prisma:generate`
3. Run migrations: `pnpm prisma:migrate`
4. Seed sample data: `pnpm prisma:seed`
5. Start the dev server: `pnpm dev`

The seed user is `seller@example.com` (Google sign-in) with demo buyers, campaigns, and leads.

## Notes
- Protected routes are enforced via middleware for `/seller` and `/buyer` paths based on the authenticated user's role.
- API routes live under `app/api/**` for buyers, leads, dashboard metrics, and wallet credits.
- Lead routing logic is centralized in `lib/lead-router.ts` for auto and manual assignments.
