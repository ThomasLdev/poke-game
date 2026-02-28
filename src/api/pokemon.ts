import { get } from '@/api/client';
import type {MoveDetail, Pokemon, PokemonListResponse, PokemonSpecies} from '@/types/pokemon';

export async function getPokemon(idOrName: number | string): Promise<Pokemon> {
  return get<Pokemon>(`/pokemon/${idOrName}`);
}

export function getMove(name: string): Promise<MoveDetail> {
  return get<MoveDetail>(`/move/${name}`);
}

export function getSpecies(idOrName: number | string): Promise<PokemonSpecies> {
  const species = get<PokemonSpecies>(`/pokemon-species/${idOrName}`);

  return species.then((species) => {
    species.flavor_text_entries = species.flavor_text_entries.filter((p) => {
      return p.language.name === 'en' && p.version.name === 'red';
    });

    return species;
  })
}

export async function getPokemonList(limit: number = 20, offset: number = 0) {
  const list = await get<PokemonListResponse>(`/pokemon?limit=${limit}&offset=${offset}`);
  const details = await Promise.all(list.results.map((p) => getPokemon(p.name)));

  return { ...list, results: details };
}
