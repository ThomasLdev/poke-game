import { useState } from 'react';
import { usePokemonList } from '@/hooks/usePokemon';
import { Grid, Pagination } from '@/components/PokemonListPage';
import { Header } from '@/components/Layout';

function PokemonListPage() {
  const limit = 20;
  const [offset, setOffset] = useState(0);
  const { data, loading, error, showSkeleton } = usePokemonList(limit, offset);

  if (error)
    return <div className="min-h-screen bg-slate-900 text-red-400 flex items-center justify-center">{error}</div>;

  return (
    <div className="min-h-screen bg-slate-900">
      <Header />

      <div className="max-w-7xl mx-auto px-4 pt-8 pb-4">
        <h1 className="text-3xl font-bold text-white mb-1">All Pokémon</h1>
      </div>

      <Grid data={data} showSkeleton={showSkeleton} />
      <Pagination
        next={data?.next ?? null}
        previous={data?.previous ?? null}
        onPageChange={setOffset}
        limit={limit}
        offset={offset}
        loading={loading}
      />
    </div>
  );
}

export default PokemonListPage;
