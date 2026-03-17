import {useSearchPokemon} from '@/hooks/usePokemon';
import {useNavigate} from 'react-router';
import {useEffect, useState} from "react";

interface SearchBarProps {
  showError?: boolean;
}

export function SearchBar({showError}: SearchBarProps) {
  const [inputValue, setInputValue] = useState<string>('');
  const [query, setQuery] = useState<string>('');
  const { pokemon, error, loading } = useSearchPokemon(query ?? '');
  const navigate = useNavigate();

  function search (e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const trimmed = inputValue.trim().toLowerCase();

    if (trimmed) {
      setQuery(trimmed);
    }
  }

  useEffect(() => {
    if (pokemon) {
      navigate(`/pokemons/${pokemon.id}`, {state: { pokemon: pokemon }});
    }
  }, [pokemon, navigate]);

  return (
    <>
      <div className="relative">
        <form onSubmit={search}>
          <label>
            <input
              name="query"
              id="query"
              type="text"
              placeholder="Search for a Pokémon..."
              aria-label="Search for a Pokémon"
              className={`text-lg w-full pl-12 pr-4 py-4 backdrop-blur-sm transition-all input ` + (error ? 'input-error': '')}
              value={loading ? 'loading...' : inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </label>
        </form>
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <svg
            className="h-5 w-5 text-slate-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
      {error && showError && <p className="text-red-400 mt-2">Pokémon not found</p>}
    </>
  );
}