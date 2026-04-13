# EvolveWealth 🌱
**Stop Collecting Pennies. Start Building Empires.**

> Finvasia Innovation Hackathon 2026 — Problem Statement 2: Cashback Dependency

---

## What is EvolveWealth?

EvolveWealth is a behavioral finance super app for Gen-Z Indians that 
solves the Cashback Dependency problem. Instead of earning ₹50 cashback 
that gets immediately re-spent, every transaction automatically rounds 
up and invests the spare change into Digital Gold, ETFs, and Index Funds.

The same ₹800/month most Indians waste on cashback rewards — invested 
at 12% CAGR — becomes ₹1,84,166 over 10 years. That's the core insight 
EvolveWealth is built on.

---

## The Problem

Every UPI super app uses cashback to create a dopamine loop that drives 
repeat spending, not saving. Users feel rewarded while their long-term 
wealth potential silently evaporates. This is Cashback Dependency — and 
it's by design.

**Our answer:** Replace extrinsic cashback rewards with intrinsic wealth 
growth. Same dopamine loop, redirected toward compounding.

---

## Key Features

**Auto Micro-Invest** — Every transaction triggers an automatic round-up 
investment into the user's chosen asset. Spend ₹46 on coffee, ₹4 goes 
into Digital Gold. No action required.

**Anti-Impulse Shield** — Before an impulse purchase, an AI nudge shows 
exactly how much that money grows if invested instead. Real numbers, real 
future value, real decision.

**Financial Growth Score** — A 0–1000 score tracks wealth-building 
behavior across five tiers: Seed → Sapling → Wealth Builder → Freedom 
Fighter → Empire Mode.

**Gamified Milestones** — A Road to Freedom timeline with locked and 
unlocked achievements that make saving genuinely addictive.

**Wealth Simulator** — An interactive tool where users drag a slider to 
see their exact 10-year projected wealth using the SIP compound formula.

**Explainable Engine** — Every nudge, score change, and recommendation 
shows its exact reasoning. No black boxes.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) + TypeScript |
| Styling | Tailwind CSS + Framer Motion |
| Database | PostgreSQL via Supabase |
| ORM | Prisma |
| Auth | JWT + bcrypt |
| Charts | Recharts |
| State | Zustand |

---

## Architecture
Client (Next.js) → API Routes → Prisma ORM → PostgreSQL (Supabase)

The app is built on Next.js 14 App Router with a clean separation between 
server and client components. All data fetching happens through typed REST 
API routes. Authentication is stateless JWT — tokens are validated on every 
protected request. The nudge engine is a pure TypeScript rule evaluator that 
requires no ML — just financial behavior heuristics applied to transaction 
history.

**Wealth projection formula (SIP):**
FV = P × ((1 + r/12)^(12n) − 1) / (r/12) × (1 + r/12)

---

## Getting Started

```bash
# Install
git clone https://github.com/yourusername/evolvewealth
cd evolvewealth
npm install

# Configure
cp .env.example .env
# Add your DATABASE_URL, JWT_SECRET, NEXTAUTH_SECRET

# Database
npx prisma migrate dev --name init
npm run prisma:seed

# Run
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

**Demo account**
Email:    arjun@demo.com
Password: EvolveWealth2026

---

## API Overview

| Endpoint | Method | Description |
|---|---|---|
| `/api/auth/register` | POST | Register new user, return JWT |
| `/api/auth/login` | POST | Validate credentials, return JWT |
| `/api/portfolio/summary` | GET | Total wealth, score, streak |
| `/api/portfolio/holdings` | GET | All assets with returns |
| `/api/transactions/feed` | GET | Last 20 micro-invest events |
| `/api/transactions/roundup` | POST | Trigger round-up investment |
| `/api/nudge/evaluate` | POST | Should we show a nudge? |
| `/api/simulator/project` | GET | SIP compound projection |
| `/api/score/growth-score` | GET | Score, tier, XP, percentile |
| `/api/milestones/all` | GET | All milestones + unlock status |

---

## Hackathon Alignment

| Required | Built |
|---|---|
| Auto micro-invest cashback replacement | Round-up engine on every transaction |
| Financial growth score | 0–1000 score, 5 tiers, XP, percentile |
| Smart saving triggers | Rule-based nudge engine with full reasoning |
| Gamified wealth milestones | Road to Freedom — 5 stages, locked/unlocked |

Finvasia 2026 theme — *"Leveraging Emerging Trends for Financial Innovation"*

Behavioral finance + micro-investing + explainable AI nudges is exactly 
that emerging trend. EvolveWealth doesn't just use technology to move 
money — it uses technology to change the relationship people have with money.

---

## Roadmap

- UPI integration via Account Aggregator API
- Real mutual fund routing via AMFI-registered intermediary  
- ML-based nudge personalization
- WhatsApp Business API push nudges
- Social wealth milestones

---

*Built for Finvasia Innovation 2026 · EvolveWealth · Not financial advice*