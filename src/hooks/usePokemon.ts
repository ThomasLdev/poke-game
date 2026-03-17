import { useQuery, keepPreviousData } from '@tanstack/react-query';
import {getPokemonList, getPokemonDetail, getPokemon} from '@/api/pokemon';
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
    error: error ? (error.message) : null,
  };
}

export function usePokemon(idOrName: string, placeholderPokemon?: Pokemon | null) {
  const { data, isLoading, error } = useQuery({
    queryKey: pokemonKeys.detail(idOrName),
    queryFn: () => getPokemonDetail(idOrName),
    placeholderData: placeholderPokemon ?? undefined,
  });

  return {
    pokemon: data ?? null,
    loading: isLoading,
    error: error ? (error.message) : null,
  };
}

export function useSearchPokemon(name: string) {
  const { data, isLoading, error } = useQuery({
    queryKey: pokemonKeys.search(name),
    queryFn: () => getPokemon(name),
    enabled: name.length > 0,
    retry: false
  });

  return {
    pokemon: data ?? null,
    loading: isLoading,
    error: error ? (error.message) : null,
  };
}
