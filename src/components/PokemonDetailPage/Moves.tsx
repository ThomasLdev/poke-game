import { usePokemonMoves } from '@/hooks/usePokemonMoves';
import type { PokemonMoveEntry } from '@/types/pokemon';

interface MovesProps {
  rawMoves: PokemonMoveEntry[] | null;
}

export function Moves({ rawMoves }: MovesProps) {
  const { moves, loading } = usePokemonMoves(rawMoves ?? []);
  if (!rawMoves || loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-10 bg-slate-700/50 rounded-lg animate-pulse" />
        ))}
      </div>
    );
  }

  if (moves.length === 0) {
    return <p className="text-slate-400">No moves available.</p>;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
      {moves.map((move) => (
        <div
          key={move.name}
          className={`type-${move.type.name} rounded-lg px-3 py-2 text-sm capitalize text-center`}
        >
          {move.name.replace(/-/g, ' ')}
        </div>
      ))}
    </div>
  );
}
