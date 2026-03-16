import { Link } from 'react-router';
import { usePokemonEvolutionChain } from '@/hooks/usePokemonEvolutionChain';
import { PokemonNumber } from '@/components/Pokemon';
import { extract } from '@/utils/urlIdExtractor';
import type { EvolutionNode } from '@/types/pokemon';

interface EvolutionChainProps {
  pokemon_name: string;
  evolution_chain_id: number;
}

interface FlatNode {
  name: string;
  id: number;
  min_level: number | null;
}

function flattenChain(node: EvolutionNode): FlatNode[] {
  const result: FlatNode[] = [
    {
      name: node.species.name,
      id: extract(node.species.url),
      min_level: node.evolution_details[0]?.min_level ?? null,
    },
  ];

  for (const child of node.evolves_to) {
    result.push(...flattenChain(child));
  }

  return result;
}

export function EvolutionChain({ pokemon_name, evolution_chain_id }: EvolutionChainProps) {
  const { evolution_tree, loading, error } = usePokemonEvolutionChain(evolution_chain_id);

  if (loading) return (
    <div className="min-h-[8.5rem] flex items-center justify-center gap-4 flex-wrap animate-pulse">
      {[0, 1, 2].map((i) => (
        <div key={i} className="contents">
          {i > 0 && (
            <div className="text-slate-700">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          )}
          <div className="text-center">
            <div className="w-24 h-24 mx-auto mb-2 bg-slate-700/50 rounded-full" />
            <div className="h-4 w-16 mx-auto mb-1 bg-slate-700/50 rounded" />
            <div className="h-3 w-10 mx-auto bg-slate-700/50 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
  if (error) return <p className="text-red-400">{error}</p>;
  if (!evolution_tree) return <p className="text-slate-400">No information available</p>;

  const nodes = flattenChain(evolution_tree.chain);

  return (
    <div className="min-h-[8.5rem] flex items-center justify-center gap-4 flex-wrap">
      {nodes.map((node, i) => (
        <div key={node.id} className="contents">
          {i > 0 && (
            <div className="text-slate-600 flex flex-col items-center">
              {node.min_level && (
                <span className="text-xs text-slate-500 mb-1">Lv. {node.min_level}</span>
              )}
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          )}
          <Link
            to={`/pokemons/${node.id}`}
            className={`text-center group cursor-pointer ${node.name === pokemon_name ? '' : ''}`}
          >
            <div
              className={`w-24 h-24 mx-auto mb-2 bg-linear-to-br from-orange-500/20 to-red-600/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform ${node.name === pokemon_name ? 'ring-2 ring-yellow-500/50' : ''}`}
            >
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${node.id}.png`}
                alt={node.name}
                className="w-20 h-20 object-contain"
              />
            </div>
            <p className={`text-sm font-medium capitalize ${node.name === pokemon_name ? 'text-yellow-400' : 'text-white'}`}>
              {node.name}
            </p>
            <PokemonNumber id={node.id} className="text-xs" />
          </Link>
        </div>
      ))}
    </div>
  );
}
