export function EvolutionTree() {
    return (
        <div className="flex items-center justify-center gap-4 flex-wrap">
            <a href="/pokemons/4" className="text-center group cursor-pointer">
                <div className="w-24 h-24 mx-auto mb-2 bg-linear-to-br from-orange-500/20 to-red-600/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <img
                        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png"
                        alt="Charmander"
                        className="w-20 h-20 object-contain"
                    />
                </div>
                <p className="text-white text-sm font-medium">Charmander</p>
                <p className="text-slate-500 text-xs">#004</p>
            </a>

            <div className="text-slate-600 flex flex-col items-center">
                <span className="text-xs text-slate-500 mb-1">Lv. 16</span>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </div>

            <a href="/pokemons/5" className="text-center group cursor-pointer">
                <div className="w-24 h-24 mx-auto mb-2 bg-linear-to-br from-orange-500/20 to-red-600/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <img
                        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/5.png"
                        alt="Charmeleon"
                        className="w-20 h-20 object-contain"
                    />
                </div>
                <p className="text-white text-sm font-medium">Charmeleon</p>
                <p className="text-slate-500 text-xs">#005</p>
            </a>

            <div className="text-slate-600 flex flex-col items-center">
                <span className="text-xs text-slate-500 mb-1">Lv. 36</span>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </div>

            <div className="text-center">
                <div className="w-24 h-24 mx-auto mb-2 bg-linear-to-br from-orange-500/20 to-red-600/20 rounded-full flex items-center justify-center ring-2 ring-yellow-500/50">
                    <img
                        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png"
                        alt="Charizard"
                        className="w-20 h-20 object-contain"
                    />
                </div>
                <p className="text-yellow-400 text-sm font-medium">Charizard</p>
                <p className="text-slate-500 text-xs">#006</p>
            </div>
        </div>
    );
}