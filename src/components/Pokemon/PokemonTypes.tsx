import type {PokemonType} from "@/types/pokemon.ts";

export function PokemonTypes({pokemonTypes, className = ''}: {pokemonTypes: PokemonType[], className: string}) {
  return (
    <>
    {pokemonTypes.map((pokemonType) => (
        <div
          key={pokemonType.slot}
          className={`type-${pokemonType.type.name} ${className}`}
        >
          {pokemonType.type.name}
        </div>
      ))}
    </>
  );
}