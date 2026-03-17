import {Link} from "react-router";
import {SearchBar} from "@/components/Search";

function HomePage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-purple-950 to-slate-900 flex flex-col items-center justify-center px-4">
      <div className="mb-12 text-center">
        <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-yellow-400 via-red-500 to-pink-500 mb-2 tracking-tight">
          PokéGame
        </h1>
        <p className="text-slate-400 text-lg">Create your team and fight them all</p>
      </div>

      <div className="w-full max-w-xl">
        <SearchBar showError={true} />
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
