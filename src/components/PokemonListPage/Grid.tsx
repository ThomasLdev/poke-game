import {Link} from 'react-router';
import type {PokemonListResponse} from "@/types/pokemon.ts";
import {GridSkeletonCard} from '@/components/PokemonListPage';
import {PokemonNumber, PokemonTypes} from '@/components/Pokemon';

export function Grid({data, showSkeleton}: {
  data: PokemonListResponse | null,
  showSkeleton: boolean
}) {
  return (
    <div className="max-w-7xl mx-auto px-4 pb-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {showSkeleton
        ? Array.from({length: 20}).map((_, i) => <GridSkeletonCard key={i} />)
        : data?.results.map((pokemon) => (
          <Link key={pokemon.id} to={`/pokemons/${pokemon.id}`} state={{pokemon}}
             className="group h-52 bg-slate-800/60 border border-slate-700/50 rounded-2xl p-4 text-center hover:border-green-500/50 hover:bg-slate-800 transition-all cursor-pointer">
            <div className="relative">
              <div
                className="w-24 h-24 mx-auto mb-2 bg-linear-to-br from-green-500/20 to-emerald-600/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <img loading={"lazy"} src={pokemon.sprites.other["official-artwork"].front_default} alt={pokemon.name}
                     className="w-20 h-20 object-contain"/>
              </div>
            </div>
            <PokemonNumber id={pokemon.id} className={"text-xs"} />
            <p className="text-white font-medium text-sm capitalize">{pokemon.name}</p>
            <div className="mt-2 flex justify-center gap-1">
              <PokemonTypes pokemonTypes={pokemon.types} className={"px-2 py-0.5 text-xs"} />
            </div>
          </Link>
        ))}
    </div>
  );
}