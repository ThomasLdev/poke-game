import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { getPokemonList, getPokemon, getSpecies } from '@/api/pokemon';
import { pokemonKeys } from '@/hooks/queryKeys';
import type { Pokemon } from '@/types/pokemon';

export function usePokemonList(limit: number = 20, offset: number = 0) {
  const { data, isLoading, isPlaceholderData, error } = useQuery({
    queryKey: pokemonKeys.list(limit, offset),
    queryFn: () => getPokemonList(limit, offset),
    placeholderData: keepPreviousData,
  });

  return {
    data: data ?? null,
    isLoading,
    isPlaceholderData,
    error: error ? (error instanceof Error ? error.message : 'An unexpected error occurred') : null,
  };
}

export function usePokemon(id: string, initialData?: Pokemon | null) {
  const { data, isLoading, error } = useQuery({
    queryKey: pokemonKeys.detail(id),
    queryFn: () => getPokemon(id),
    initialData: initialData ?? undefined,
  });

  return {
    pokemon: data ?? null,
    loading: isLoading,
    error: error ? (error instanceof Error ? error.message : 'Failed to load Pokemon') : null,
  };
}

export function usePokemonSpecies(idOrName: number | string) {
  const { data, isLoading, error } = useQuery({
    queryKey: pokemonKeys.species(idOrName),
    queryFn: () => getSpecies(idOrName),
  });

  return {
    species: data ?? null,
    loading: isLoading,
    error: error ? (error instanceof Error ? error.message : 'An unexpected error occurred') : null,
  };
}
