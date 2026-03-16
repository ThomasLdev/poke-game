import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getMove } from '@/api/pokemon';
import { selectCandidates, selectDiverseMoves } from '@/utils/moves';
import { pokemonKeys } from '@/hooks/queryKeys';
import type { MoveDetail, PokemonMoveEntry } from '@/types/pokemon';

export function usePokemonMoves(rawMoves: PokemonMoveEntry[] | undefined) {
  const candidateNames = useMemo(
    () => (rawMoves && rawMoves.length > 0 ? selectCandidates(rawMoves) : []),
    [rawMoves],
  );

  const { data, isLoading, error } = useQuery({
    queryKey: pokemonKeys.moves(candidateNames.join(',')),
    queryFn: async () => {
      const results = await Promise.allSettled(candidateNames.map((name) => getMove(name)));

      const fulfilled = results
        .filter((r): r is PromiseFulfilledResult<MoveDetail> => r.status === 'fulfilled')
        .map((r) => r.value);

      if (fulfilled.length === 0) {
        throw new Error('Failed to load moves');
      }

      return selectDiverseMoves(fulfilled);
    },
    enabled: candidateNames.length > 0,
  });

  return {
    moves: data ?? [],
    loading: isLoading,
    error: error ? (error instanceof Error ? error.message : 'Failed to load moves') : null,
  };
}
