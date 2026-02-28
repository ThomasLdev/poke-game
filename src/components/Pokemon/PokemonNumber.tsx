export function PokemonNumber({ id, className = '' }: { id: number; className: string }) {
  return <p className={`text-slate-500 font-mono ${className}`}>#{id.toString().padStart(3, '0')}</p>;
}
