# Novellia Pet

A pet health records management app built with React, Vite, and Express + SQLite.

## Prerequisites

- Node.js 20.19+ or 22.12+
- npm

## Setup

Install dependencies:

```bash
npm install
```

Seed the database:

```bash
npm run seed
```

## Running in development

The app requires running two concurrent processes for backend and frontend: Express server and Vite dev server.

**Terminal 1 — API server** (runs on port 3001):
```bash
npm run start
```

**Terminal 2 — Vite dev server** (runs on port 5173, proxies `/api` to port 3001):
```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Dev Decisions

- `better-sqlite` library: synchronous api for small test app. Trade offs, if high volume of users making requests, choose a different library/db set up 