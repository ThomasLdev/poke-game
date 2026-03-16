import type {PokemonSpecies} from "@/types/pokemon.ts";

export function Description({ speciesDetails }: { speciesDetails: PokemonSpecies | null }) {
  if (!speciesDetails) {
    return (
      <div className="min-h-30 max-w-lg space-y-2 animate-pulse">
        <div className="h-4 w-full bg-slate-700/50 rounded" />
        <div className="h-4 w-full bg-slate-700/50 rounded" />
        <div className="h-4 w-5/6 bg-slate-700/50 rounded" />
        <div className="h-4 w-full bg-slate-700/50 rounded" />
        <div className="h-4 w-2/3 bg-slate-700/50 rounded" />
      </div>
    );
  }

  const textEntry = speciesDetails.flavor_text_entries[0];

  return (
    <p className="min-h-30 text-slate-400 leading-relaxed max-w-lg lowercase">
      {textEntry.flavor_text.replace(/[\n\f]/g, ' ')}
    </p>
  );
}
