import { useParams, useLocation } from 'react-router';
import { usePokemon } from '@/hooks/usePokemon';
import { PokemonNumber, PokemonTypes } from '@/components/Pokemon';
import {Stats, Details, Moves, EvolutionTree} from '@/components/PokemonDetailPage';
import { Header } from '@/components/Layout';

function PokemonDetailPage() {
  const { id } = useParams();
  const { state } = useLocation();
  const { pokemon, error } = usePokemon(id!, state?.pokemon ?? null);

  if (error)
    return <div className="min-h-screen bg-slate-900 text-red-400 flex items-center justify-center">{error}</div>;
  if (!pokemon)
    return <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">Loading...</div>;

  console.log(pokemon);

  return (
    <div className="min-h-screen bg-slate-900">
      <Header />

      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="mb-5">
          <a className="text-white font-bold" href="/pokemons">
            Back
          </a>
        </div>

        <div className="bg-linear-to-br from-orange-500/10 via-red-500/10 to-yellow-500/10 border border-slate-700/50 rounded-3xl p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Image */}
            <div className="shrink-0">
              <div className="w-64 h-64 bg-linear-to-br from-orange-500/20 to-red-600/20 rounded-full flex items-center justify-center">
                <img
                  src={pokemon.sprites.other['official-artwork'].front_default}
                  alt={pokemon.name}
                  className="w-56 h-56 object-contain drop-shadow-2xl"
                />
              </div>
            </div>

            {/* Basic Info */}
            <div className="flex-1 text-center md:text-left">
              <PokemonNumber id={pokemon.id} className={'text-lg'} />
              <h1 className="text-5xl font-extrabold text-white mb-4 capitalize">{pokemon.name}</h1>
              <div className="flex gap-2 justify-center md:justify-start mb-6">
                <PokemonTypes pokemonTypes={pokemon.types} className={'px-4 py-1.5 text-sm'} />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Stats stats={pokemon.stats} />
          <Details pokemon={pokemon} />
        </div>

        <div className="bg-slate-800/60 border border-slate-700/50 rounded-2xl p-6 mb-8">
          <h2 className="text-xl font-bold text-white mb-6">Evolution Chain</h2>
          <EvolutionTree />
        </div>

        <div className="bg-slate-800/60 border border-slate-700/50 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-white mb-4">Moves</h2>
          <Moves rawMoves={pokemon.moves} />
        </div>
      </div>
    </div>
  );
}

export default PokemonDetailPage;
