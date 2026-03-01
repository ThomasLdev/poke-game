import type {PokemonSpecies} from "@/types/pokemon.ts";

export function Description({ speciesDetails }: { speciesDetails: PokemonSpecies | null }) {
  return (
    <p className="text-slate-400 leading-relaxed max-w-lg">
      {
        speciesDetails
            ? speciesDetails.flavor_text_entries
                .map((entry) => entry.flavor_text.replace(/[\n\f]/g, ' '))
                .join(' ')
            : 'No information available'
      }
    </p>
  );
}
