import { get } from '@/api/client';
import type {MoveDetail, Pokemon, PokemonEvolutionChain, PokemonListResponse, PokemonSpecies} from '@/types/pokemon';

async function getPokemon(idOrName: number | string): Promise<Pokemon> {
  return get<Pokemon>(`/pokemon/${idOrName}`);
}

export async function getPokemonDetail(idOrName: number | string): Promise<Pokemon> {
  const pokemon = await get<Pokemon>(`/pokemon/${idOrName}`);
  const species = await get<PokemonSpecies>(`/pokemon-species/${idOrName}`);

  species.flavor_text_entries = species.flavor_text_entries.filter((p) => {
    return p.language.name === 'en';
  });

  return {...pokemon, species_detail: species};
}

export function getMove(name: string): Promise<MoveDetail> {
  return get<MoveDetail>(`/move/${name}`);
}

export function getPokemonEvolutionChain(id: number): Promise<PokemonEvolutionChain> {
  return get<PokemonEvolutionChain>(`/evolution-chain/${id}`);
}

export async function getPokemonList(limit: number = 20, offset: number = 0) {
  const list = await get<PokemonListResponse>(`/pokemon?limit=${limit}&offset=${offset}`);
  const details = await Promise.all(list.results.map((p) => getPokemon(p.name)));

  return { ...list, results: details };
}
