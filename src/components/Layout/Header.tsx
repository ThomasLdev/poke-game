import {SearchBar} from "@/components/Search";

export function Header() {
  return (
    <header className="sticky top-0 z-10 bg-slate-900/95 backdrop-blur-sm border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
        <a
          href="/"
          className="text-2xl font-bold text-transparent bg-clip-text bg-linear-to-r from-yellow-400 to-red-500"
        >
          PokéSearch
        </a>
        <SearchBar showError={false} />
      </div>
    </header>
  );
}
