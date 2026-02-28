import { useState, useEffect } from 'react';
import { listPokemons } from '@/api/pokemon';
import type { PokemonListResponse } from '@/types/pokemon';

export function usePokemonList(limit: number = 20, offset: number = 0) {
  const [data, setData] = useState<PokemonListResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showSkeleton, setShowSkeleton] = useState<boolean>(false);

  useEffect(() => {
    let ignore = false;
    let skeletonTimeout: ReturnType<typeof setTimeout> | null = null;

    if (!data) {
      setShowSkeleton(true);
    } else {
      skeletonTimeout = setTimeout(() => {
        if (!ignore) setShowSkeleton(true);
      }, 200);
    }

    async function fetchData() {
      setLoading(true);
      setError(null);

      try {
        const list = await listPokemons(limit, offset);

        if (!ignore) {
          if (skeletonTimeout) clearTimeout(skeletonTimeout);
          setData(list);
          setShowSkeleton(false);
        }
      } catch (error) {
        if (error instanceof Error) {
          if (!ignore) {
            setError(error.message);
          }
        } else {
          if (!ignore) {
            setError('An unexpected error occurred');
          }
        }
      } finally {
        setLoading(false);
      }
    }

    fetchData();

    return () => {
      ignore = true;
      if (skeletonTimeout) clearTimeout(skeletonTimeout);
    };
  }, [limit, offset]);

  return { data, loading, showSkeleton, error };
}
