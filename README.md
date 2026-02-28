# PokéSearch

[![CI](https://github.com/ThomasLdev/poke-game/actions/workflows/ci.yml/badge.svg)](https://github.com/ThomasLdev/poke-game/actions/workflows/ci.yml)
![Coverage](https://img.shields.io/endpoint?url=https://gist.githubusercontent.com/ThomasLdev/COVERAGE_GIST_ID/raw/poke-game-coverage.json)

A Pokemon exploration app built with React, TypeScript, and Tailwind CSS. Browse, search, and discover detailed information about Pokemon using the [PokeAPI](https://pokeapi.co/).

## Features

- Paginated list of all Pokemon with artwork and types
- Detailed Pokemon pages with stats, abilities, and more
- Responsive design with Tailwind CSS

## Tech Stack

- **React 19** with React Router
- **TypeScript**
- **Vite** — dev server and build tool
- **Tailwind CSS 4** — styling
- **Vitest** — testing with v8 coverage
- **ESLint + Prettier** — code quality and formatting
- **Knip** — unused export detection

## Getting Started

### Prerequisites

- Node.js 24+
- npm

### Installation

```bash
git clone git@github.com:ThomasLdev/poke-game.git
cd poke-game
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Typecheck + production build |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Run TypeScript type checking |
| `npm run format` | Format code with Prettier |
| `npm run format:check` | Check formatting |
| `npm run test` | Run tests once |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:coverage` | Run tests with coverage report |
| `npm run knip` | Check for unused exports |

## Project Structure

```
src/
├── api/             # API client and Pokemon endpoints
├── components/      # Reusable UI components
├── hooks/           # Custom React hooks
├── pages/           # Route page components
├── types/           # TypeScript type definitions
├── App.tsx          # Router setup
└── main.tsx         # Entry point

tests/               # Test files (mirrors src/ structure)
```
