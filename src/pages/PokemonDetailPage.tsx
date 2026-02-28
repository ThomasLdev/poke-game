import {useState, useEffect} from 'react';
import {useParams, useLocation} from 'react-router';
import {getPokemon} from '@/api/pokemon';
import type {Pokemon} from '@/types/pokemon';
import {PokemonNumber, PokemonTypes} from '@/components/Pokemon';
import {Stats, Details} from '@/components/PokemonDetailPage';
import {Header} from '@/components/Layout';

function PokemonDetailPage() {
  const {id} = useParams();
  const {state} = useLocation();
  const [pokemon, setPokemon] = useState<Pokemon | null>(state?.pokemon ?? null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log(pokemon);
    if (pokemon) return;

    getPokemon(id!)
      .then(setPokemon)
      .catch((err) => setError(err instanceof Error ? err.message : 'Failed to load Pokemon'));
  }, [id, pokemon]);

  if (error) return <div className="min-h-screen bg-slate-900 text-red-400 flex items-center justify-center">{error}</div>;
  if (!pokemon) return <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <Header />

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Pokemon Hero Section */}
        <div className="bg-linear-to-br from-orange-500/10 via-red-500/10 to-yellow-500/10 border border-slate-700/50 rounded-3xl p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Image */}
            <div className="shrink-0">
              <div className="w-64 h-64 bg-linear-to-br from-orange-500/20 to-red-600/20 rounded-full flex items-center justify-center">
                <img
                  src={pokemon.sprites.other["official-artwork"].front_default}
                  alt={pokemon.name}
                  className="w-56 h-56 object-contain drop-shadow-2xl"
                />
              </div>
            </div>

            {/* Basic Info */}
            <div className="flex-1 text-center md:text-left">
              <PokemonNumber id={pokemon.id} className={"text-lg"} />
              <h1 className="text-5xl font-extrabold text-white mb-4 capitalize">{pokemon.name}</h1>
              <div className="flex gap-2 justify-center md:justify-start mb-6">
                <PokemonTypes pokemonTypes={pokemon.types} className={"px-4 py-1.5 text-sm"} />
              </div>
              <p className="text-slate-400 leading-relaxed max-w-lg">
                It spits fire that is hot enough to melt boulders. It may cause forest fires by blowing flames.
              </p>
            </div>
          </div>
        </div>

        {/* Stats & Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Stats stats={pokemon.stats} />

          {/* Details */}
          <Details pokemon={pokemon} />
        </div>

        {/* Evolution Chain */}
        <div className="bg-slate-800/60 border border-slate-700/50 rounded-2xl p-6 mb-8">
          <h2 className="text-xl font-bold text-white mb-6">Evolution Chain</h2>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <a href="/pokemons/4" className="text-center group cursor-pointer">
              <div className="w-24 h-24 mx-auto mb-2 bg-linear-to-br from-orange-500/20 to-red-600/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png" alt="Charmander" className="w-20 h-20 object-contain" />
              </div>
              <p className="text-white text-sm font-medium">Charmander</p>
              <p className="text-slate-500 text-xs">#004</p>
            </a>

            <div className="text-slate-600 flex flex-col items-center">
              <span className="text-xs text-slate-500 mb-1">Lv. 16</span>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>

            <a href="/pokemons/5" className="text-center group cursor-pointer">
              <div className="w-24 h-24 mx-auto mb-2 bg-linear-to-br from-orange-500/20 to-red-600/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/5.png" alt="Charmeleon" className="w-20 h-20 object-contain" />
              </div>
              <p className="text-white text-sm font-medium">Charmeleon</p>
              <p className="text-slate-500 text-xs">#005</p>
            </a>

            <div className="text-slate-600 flex flex-col items-center">
              <span className="text-xs text-slate-500 mb-1">Lv. 36</span>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>

            <div className="text-center">
              <div className="w-24 h-24 mx-auto mb-2 bg-linear-to-br from-orange-500/20 to-red-600/20 rounded-full flex items-center justify-center ring-2 ring-yellow-500/50">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png" alt="Charizard" className="w-20 h-20 object-contain" />
              </div>
              <p className="text-yellow-400 text-sm font-medium">Charizard</p>
              <p className="text-slate-500 text-xs">#006</p>
            </div>
          </div>
        </div>

        {/* Moves Preview */}
        <div className="bg-slate-800/60 border border-slate-700/50 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-white mb-4">Moves</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            <div className="px-3 py-2 bg-orange-500/10 border border-orange-500/20 rounded-lg text-sm text-orange-400 text-center">
              Flamethrower
            </div>
            <div className="px-3 py-2 bg-sky-500/10 border border-sky-500/20 rounded-lg text-sm text-sky-400 text-center">
              Air Slash
            </div>
            <div className="px-3 py-2 bg-orange-500/10 border border-orange-500/20 rounded-lg text-sm text-orange-400 text-center">
              Fire Blast
            </div>
            <div className="px-3 py-2 bg-purple-500/10 border border-purple-500/20 rounded-lg text-sm text-purple-400 text-center">
              Dragon Claw
            </div>
            <div className="px-3 py-2 bg-orange-500/10 border border-orange-500/20 rounded-lg text-sm text-orange-400 text-center">
              Heat Wave
            </div>
            <div className="px-3 py-2 bg-slate-500/10 border border-slate-500/20 rounded-lg text-sm text-slate-400 text-center">
              Slash
            </div>
            <div className="px-3 py-2 bg-yellow-500/10 border border-yellow-500/20 rounded-lg text-sm text-yellow-400 text-center">
              Solar Beam
            </div>
            <div className="px-3 py-2 bg-sky-500/10 border border-sky-500/20 rounded-lg text-sm text-sky-400 text-center">
              Fly
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PokemonDetailPage;
