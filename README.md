# TesloShop

A modern e-commerce frontend for a Tesla-inspired clothing store. Built with **React 19**, **TypeScript**, **Vite** and **Tailwind CSS**, it connects to a separate REST API (NestJS) to manage products and authentication.

## Features

### Storefront (public)
- Product catalog with server-side pagination.
- Dedicated pages per gender: `/gender/men`, `/gender/women`, `/gender/kid`.
- Full-text search by product query.
- Filters by size (XS–XXL) and price range, plus a `grid`/`list` view toggle.
- Responsive layout with a desktop navbar and a left slide-in drawer menu on mobile.

### Authentication
- Login and registration with JWT stored in `localStorage`.
- Automatic session check on app load (with periodic refresh) and Bearer token injection via an Axios interceptor.
- Route guards for unauthenticated users and role-based (admin) access.

### Admin panel (role-protected)
- Dashboard with overview metrics and charts.
- Products table management (list, create, edit) with image upload and removal.
- Product form with real-time price/stock normalization.

> Note: product detail, users management and several dashboard widgets are still under development / use static mock data.

## Tech stack

| Area | Technology |
| --- | --- |
| UI | React 19, Tailwind CSS v4, Radix UI primitives, shadcn-style components |
| State / Data | Zustand, TanStack Query, Axios |
| Forms | react-hook-form |
| Routing | react-router v7 (hash-based routing) |
| Tooling | Vite 7, TypeScript, ESLint 9 |

## Prerequisites

- **Node.js 20+** and **npm**.
- A running instance of the TesloShop **backend API** (NestJS) with the endpoints described in [Environment variables](#environment-variables).

## Environment variables

Copy `.env.template` and rename it to `.env`, then adjust the values:

```bash
VITE_API_URL=http://localhost:3000/api
```

The backend must expose at least:

- `GET /products` — product listing with `limit`, `offset`, `gender`, `sizes`, `minPrice`, `maxPrice` and `q` (search) filters.
- `POST /auth/login`, `POST /auth/register` and `GET /auth/check-status` — authentication.
- `POST /files/product` and `GET /files/product/:name` — product image upload and serving.

## Getting started

1. Clone the repository.
2. Copy `.env.template` to `.env` and set `VITE_API_URL` (see above).
3. Install dependencies:

   ```bash
   npm install
   ```

4. Make sure the backend is running and reachable at the URL defined in `.env`.
5. Start the development server:

   ```bash
   npm run dev
   ```

Open the printed URL (usually `http://localhost:5173`) in your browser.

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server. |
| `npm run build` | Type-check the project and build for production. |
| `npm run preview` | Preview the production build locally. |
| `npm run lint` | Run ESLint over the project. |

## Project structure

```
src/
├── api/          # Axios instance and interceptors
├── auth/         # Authentication: pages, actions, store, guards
├── shop/         # Storefront: pages, components, hooks, layout
├── admin/        # Admin panel: pages, components, hooks, layout
├── components/   # Shared UI (shadcn-style) and custom components
├── interfaces/   # Shared TypeScript types
├── lib/          # Utilities (currency formatter, etc.)
└── mocks/        # Local mock data
```

## Notes

- The app uses **hash-based routing** (`createHashRouter`), so it works on static hosting without server rewrites.