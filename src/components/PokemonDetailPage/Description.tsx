import { usePokemonSpecies } from '@/hooks/usePokemon.ts';

export function Description({ idOrName }: { idOrName: string | number }) {
  const { species } = usePokemonSpecies(idOrName);

  console.log(species);

  return (
    <p className="text-slate-400 leading-relaxed max-w-lg">
      {species?.flavor_text_entries.map((entry) => entry.flavor_text.replace(/[\n\f]/g, ' ')).join(' ')}
    </p>
  );
}
