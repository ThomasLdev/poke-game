import type { Pokemon } from '@/types/pokemon.ts';

export function Details({ pokemon }: { pokemon: Pokemon | null }) {
  return (
    <div className="bg-slate-800/60 border border-slate-700/50 rounded-2xl p-6">
      <h2 className="text-xl font-bold text-white mb-4">Details</h2>
      {pokemon ? (
        <>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-900/50 rounded-xl p-4">
              <p className="text-slate-500 text-sm mb-1">Height</p>
              <p className="text-white text-lg font-semibold">{pokemon.height / 10} meter(s)</p>
            </div>
            <div className="bg-slate-900/50 rounded-xl p-4">
              <p className="text-slate-500 text-sm mb-1">Weight</p>
              <p className="text-white text-lg font-semibold">{pokemon.weight / 10} kg(s)</p>
            </div>
            <div className="bg-slate-900/50 rounded-xl p-4">
              <p className="text-slate-500 text-sm mb-1">Base Experience</p>
              <p className="text-white text-lg font-semibold">{pokemon.base_experience}</p>
            </div>
            <div className="bg-slate-900/50 rounded-xl p-4">
              <p className="text-slate-500 text-sm mb-1">Abilities</p>
              <p className="text-white text-lg font-semibold capitalize">{pokemon.abilities.filter((a) => !a.is_hidden)[0].ability.name}</p>
            </div>
          </div>

          <div className="mt-4">
            <h3 className="text-sm text-slate-500 mb-2">All Abilities</h3>
            <div className="flex flex-wrap gap-2">
              {pokemon.abilities.map((ability) =>
                  ability.is_hidden
                      ? <span key={ability.ability.name} className="px-3 py-1 bg-slate-900/50 border border-yellow-500/30 rounded-lg text-sm text-yellow-400 capitalize">{ability.ability.name} (Hidden)</span>
                      : <span key={ability.ability.name} className="px-3 py-1 bg-slate-900/50 border border-slate-700 rounded-lg text-sm text-slate-300 capitalize">{ability.ability.name}</span>
              )}
            </div>
          </div>
        </>
      ) : (
        <div className="animate-pulse">
          <div className="grid grid-cols-2 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-slate-900/50 rounded-xl p-4">
                <div className="h-4 w-16 mb-2 bg-slate-700/50 rounded" />
                <div className="h-6 w-20 bg-slate-700/50 rounded" />
              </div>
            ))}
          </div>
          <div className="mt-4">
            <div className="h-4 w-24 mb-2 bg-slate-700/50 rounded" />
            <div className="flex gap-2">
              <div className="h-7 w-20 bg-slate-700/50 rounded-lg" />
              <div className="h-7 w-24 bg-slate-700/50 rounded-lg" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
