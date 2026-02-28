import { useState, useEffect } from 'react';
import { getMove } from '@/api/pokemon';
import { selectCandidates, selectDiverseMoves } from '@/utils/moves';
import type { MoveDetail, PokemonMoveEntry } from '@/types/pokemon';

export function usePokemonMoves(rawMoves: PokemonMoveEntry[] | undefined) {
  const [moves, setMoves] = useState<MoveDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    if (!rawMoves || rawMoves.length === 0) return;

    let ignore = false;

    const candidateNames = selectCandidates(rawMoves);

    Promise.allSettled(candidateNames.map((name) => getMove(name))).then((results) => {
      if (ignore) return;

      const fulfilled = results
        .filter((r): r is PromiseFulfilledResult<MoveDetail> => r.status === 'fulfilled')
        .map((r) => r.value);

      if (fulfilled.length === 0) {
        setError('Failed to load moves');
        setLoading(false);
        return;
      }

      setMoves(selectDiverseMoves(fulfilled));
      setLoading(false);
    });

    return () => {
      ignore = true;
    };
  }, [rawMoves]);

  if (!rawMoves) {
    return { moves: [], loading: true, error: null };
  }
  if (rawMoves.length === 0) {
    return { moves: [], loading: false, error: null };
  }

  return { moves, loading, error };
}
