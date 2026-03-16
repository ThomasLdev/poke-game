import {useParams, useLocation} from 'react-router';
import { usePokemon } from '@/hooks/usePokemon';
import { PokemonNumber, PokemonTypes } from '@/components/Pokemon';
import { Stats, Details, Moves, EvolutionChain, Description } from '@/components/PokemonDetailPage';
import { Header } from '@/components/Layout';
import { extract } from '@/utils/urlIdExtractor';
import {Button} from "@/components/DesignSystem/Button/Button.tsx";

function PokemonDetailPage() {
  const { id } = useParams();
  const { state } = useLocation();
  const { pokemon, error } = usePokemon(id!, state?.pokemon ?? null);

  if (error)
    return <div className="min-h-screen bg-slate-900 text-red-400 flex items-center justify-center">{error}</div>;

  return (
    <div className="min-h-screen bg-slate-900">
      <Header />

      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="mb-5">
          <Button isDisabled={false} onClick={() => {}} text={'Back'} />
        </div>

        <div className="bg-linear-to-br from-orange-500/10 via-red-500/10 to-yellow-500/10 border border-slate-700/50 rounded-3xl p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="shrink-0">
              <div className="w-64 h-64 bg-linear-to-br from-orange-500/20 to-red-600/20 rounded-full flex items-center justify-center">
                {pokemon ? (
                  <img
                    src={pokemon.sprites.other['official-artwork'].front_default}
                    alt={pokemon.name}
                    className="w-56 h-56 object-contain drop-shadow-2xl"
                  />
                ) : (
                  <div className="w-56 h-56 bg-slate-700/50 rounded-full animate-pulse" />
                )}
              </div>
            </div>

            <div className="flex-1 text-center md:text-left">
              {pokemon ? (
                <>
                  <PokemonNumber id={pokemon.id} className={'text-lg'} />
                  <h1 className="text-5xl font-extrabold text-white capitalize">{pokemon.name}</h1>
                  <p className="mb-4 font-extrabold text-white capitalize">
                    version : {pokemon.species_detail?.flavor_text_entries[0].version.name}
                  </p>
                  <div className="flex gap-2 justify-center md:justify-start mb-6">
                    <PokemonTypes pokemonTypes={pokemon.types} className={'px-4 py-1.5 text-sm'} />
                  </div>
                </>
              ) : (
                <div className="animate-pulse">
                  <div className="h-5 w-16 mb-2 bg-slate-700/50 rounded" />
                  <div className="h-12 w-48 mb-4 bg-slate-700/50 rounded" />
                  <div className="flex gap-2 justify-center md:justify-start mb-6">
                    <div className="h-7 w-16 bg-slate-700/50 rounded-full" />
                    <div className="h-7 w-16 bg-slate-700/50 rounded-full" />
                  </div>
                </div>
              )}
              <Description speciesDetails={pokemon?.species_detail ?? null} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Stats stats={pokemon?.stats ?? null} />
          <Details pokemon={pokemon ?? null} />
        </div>

        <div className="bg-slate-800/60 border border-slate-700/50 rounded-2xl p-6 mb-8">
          <h2 className="text-xl font-bold text-white mb-6">Evolution Chain</h2>
          {
            pokemon?.species_detail
                ? <EvolutionChain pokemon_name={pokemon.name}
                                  evolution_chain_id={extract(pokemon.species_detail.evolution_chain.url)}
                />
                : <div className="min-h-34 flex items-center justify-center gap-4 flex-wrap animate-pulse">
                    {[0, 1, 2].map((i) => (
                      <div key={i} className="contents">
                        {i > 0 && (
                          <div className="text-slate-700">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        )}
                        <div className="text-center">
                          <div className="w-24 h-24 mx-auto mb-2 bg-slate-700/50 rounded-full" />
                          <div className="h-4 w-16 mx-auto mb-1 bg-slate-700/50 rounded" />
                          <div className="h-3 w-10 mx-auto bg-slate-700/50 rounded" />
                        </div>
                      </div>
                    ))}
                  </div>
          }

        </div>

        <div className="bg-slate-800/60 border border-slate-700/50 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-white mb-4">Moves</h2>
          <Moves rawMoves={pokemon?.moves ?? null} />
        </div>
      </div>
    </div>
  );
}

export default PokemonDetailPage;
