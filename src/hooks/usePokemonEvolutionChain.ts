import { useQuery } from '@tanstack/react-query';
import { getPokemonEvolutionChain } from '@/api/pokemon';
import { pokemonKeys } from '@/hooks/queryKeys';

export function usePokemonEvolutionChain(id: number) {
    const { data, isLoading, error } = useQuery({
        queryKey: pokemonKeys.evolution_chain(id),
        queryFn: () => getPokemonEvolutionChain(id),
    });

    return {
        evolution_tree: data ?? null,
        loading: isLoading,
        error: error ? (error instanceof Error ? error.message : 'Failed to load Pokemon') : null,
    };
}