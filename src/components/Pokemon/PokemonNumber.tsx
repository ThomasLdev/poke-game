interface PokemonNumberProps {
  id: number;
  className: string;
}

export function PokemonNumber({ id, className = '' }: PokemonNumberProps) {
  return <p className={`text-slate-500 font-mono ${className}`}>
    #{id.toString().padStart(3, '0')}
  </p>;
}
