import type { PokemonType } from '@/types/pokemon.ts';

export function PokemonTypes({ pokemonTypes, className = '' }: { pokemonTypes: PokemonType[]; className: string }) {
  return (
    <>
      {pokemonTypes.map((pokemonType) => (
        <div key={pokemonType.slot} className={`type-${pokemonType.type.name} rounded-full font-medium capitalize ${className}`}>
          {pokemonType.type.name}
        </div>
      ))}
    </>
  );
}
