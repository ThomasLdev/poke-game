import {Link} from "react-router";

function HomePage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-purple-950 to-slate-900 flex flex-col items-center justify-center px-4">
      {/* Logo / Title */}
      <div className="mb-12 text-center">
        <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-yellow-400 via-red-500 to-pink-500 mb-2 tracking-tight">
          PokéSearch
        </h1>
        <p className="text-slate-400 text-lg">Explore the world of Pokémon</p>
      </div>

      {/* Search Bar */}
      <div className="w-full max-w-xl">
        <div className="relative">
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
          <input
            type="text"
            placeholder="Search for a Pokémon..."
            aria-label="Search for a Pokémon"
            className="w-full pl-12 pr-4 py-4 bg-slate-800/80 border border-slate-700 rounded-2xl text-white placeholder-slate-500 text-lg focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50 backdrop-blur-sm transition-all"
          />
        </div>
      </div>

      <div className="mt-10 flex gap-4">
        <Link to={`/pokemons?page=1`}
              className="px-6 py-3 bg-yellow-500 hover:bg-yellow-400 text-slate-900 font-semibold rounded-xl transition-colors shadow-lg shadow-yellow-500/20"
        >
          Browse All Pokémon
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
