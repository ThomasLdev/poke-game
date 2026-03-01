export const pokemonKeys = {
  all: ['pokemon'] as const,
  list: (limit: number, offset: number) => [...pokemonKeys.all, 'list', { limit, offset }] as const,
  detail: (id: string) => [...pokemonKeys.all, 'detail', id] as const,
  species: (idOrName: number | string) => [...pokemonKeys.all, 'species', idOrName] as const,
  moves: (key: string) => [...pokemonKeys.all, 'moves', key] as const,
};
