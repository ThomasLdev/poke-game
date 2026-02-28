import { useState, useEffect } from 'react';
import {getPokemonList, getPokemon, getSpecies} from '@/api/pokemon';
import type {PokemonListResponse, Pokemon, PokemonSpecies} from '@/types/pokemon';

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
        const list = await getPokemonList(limit, offset);

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

export function usePokemon(id: string, initialData?: Pokemon | null) {
  const [pokemon, setPokemon] = useState<Pokemon | null>(initialData ?? null);
  const [loading, setLoading] = useState<boolean>(!initialData);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    if (initialData) return;

    let ignore = false;

    getPokemon(id)
      .then((data) => {
        if (!ignore) setPokemon(data);
      })
      .catch((err) => {
        if (!ignore) setError(err instanceof Error ? err.message : 'Failed to load Pokemon');
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [id, initialData]);

  return { pokemon, loading, error };
}

export function usePokemonSpecies(idOrName: number | string) {
  const [species, setSpecies] = useState<PokemonSpecies | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;

    async function fetchData() {
      setLoading(true);
      setError(null);

      try {
        const data = await getSpecies(idOrName);

        if (!ignore) {
          setSpecies(data);
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
    };
  }, [idOrName]);

  return { species, loading, error };
}
