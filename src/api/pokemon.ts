import { get } from '@/api/client';
import type { MoveDetail, Pokemon, PokemonListResponse } from '@/types/pokemon';

export function getPokemon(idOrName: number | string): Promise<Pokemon> {
  return get<Pokemon>(`/pokemon/${idOrName}`);
}

export function getMove(name: string): Promise<MoveDetail> {
  return get<MoveDetail>(`/move/${name}`);
}

export async function listPokemons(limit: number = 20, offset: number = 0) {
  const list = await get<PokemonListResponse>(`/pokemon?limit=${limit}&offset=${offset}`);
  const details = await Promise.all(list.results.map((p) => getPokemon(p.name)));

  return { ...list, results: details };
}
