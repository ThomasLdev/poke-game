import type { PokemonStat } from '@/types/pokemon.ts';

export function Stats({ stats }: { stats: PokemonStat[] | null }) {
  return (
    <div className="bg-slate-800/60 border border-slate-700/50 rounded-2xl p-6">
      <h2 className="text-xl font-bold text-white mb-4">Base Stats</h2>
      {stats ? (
        <div className="space-y-3">
          {stats.map((stat) => (
            <div key={stat.stat.name}>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-400 capitalize">{stat.stat.name}</span>
                <span className="text-white font-mono">{stat.base_stat}</span>
              </div>
              <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 rounded-full" style={{ width: `${stat.base_stat}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-3 animate-pulse">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i}>
              <div className="flex justify-between text-sm mb-1">
                <div className="h-4 w-16 bg-slate-700/50 rounded" />
                <div className="h-4 w-8 bg-slate-700/50 rounded" />
              </div>
              <div className="h-2 bg-slate-700 rounded-full" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
//
//   <div className="flex justify-between text-sm mb-1">
//     <span className="text-slate-400">Attack</span>
//     <span className="text-white font-mono">84</span>
//   </div>
//   <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
//     <div className="h-full bg-red-500 rounded-full" style={{ width: '56%' }}></div>
//   </div>
// </div>
// <div>
//   <div className="flex justify-between text-sm mb-1">
//     <span className="text-slate-400">Defense</span>
//     <span className="text-white font-mono">78</span>
//   </div>
//   <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
//     <div className="h-full bg-orange-500 rounded-full" style={{ width: '52%' }}></div>
//   </div>
// </div>
// <div>
//   <div className="flex justify-between text-sm mb-1">
//     <span className="text-slate-400">Sp. Attack</span>
//     <span className="text-white font-mono">109</span>
//   </div>
//   <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
//     <div className="h-full bg-blue-500 rounded-full" style={{ width: '73%' }}></div>
//   </div>
// </div>
// <div>
//   <div className="flex justify-between text-sm mb-1">
//     <span className="text-slate-400">Sp. Defense</span>
//     <span className="text-white font-mono">85</span>
//   </div>
//   <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
//     <div className="h-full bg-purple-500 rounded-full" style={{ width: '57%' }}></div>
//   </div>
// </div>
// <div>
//   <div className="flex justify-between text-sm mb-1">
//     <span className="text-slate-400">Speed</span>
//     <span className="text-white font-mono">100</span>
//   </div>
//   <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
//     <div className="h-full bg-yellow-500 rounded-full" style={{ width: '67%' }}></div>
//   </div>
// </div>
