export function Pagination({
  next,
  previous,
  onPageChange,
  limit,
  offset,
  loading,
}: {
  next: string | null;
  previous: string | null;
  onPageChange: (offset: number) => void;
  limit: number;
  offset: number;
  loading: boolean;
}) {
  const baseClass = 'px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg ';
  const activeClass = 'text-slate-300 hover:border-yellow-500/50 transition-colors';
  const inactiveClass = 'text-slate-500';

  return (
    <div className="max-w-7xl mx-auto px-4 pb-12 flex justify-center gap-2">
      <button
        className={baseClass + (previous ? activeClass : inactiveClass)}
        disabled={!previous || loading}
        onClick={() => onPageChange(offset - limit)}
      >
        Previous
      </button>
      <button
        className={baseClass + (next ? activeClass : inactiveClass)}
        disabled={!next || loading}
        onClick={() => onPageChange(offset + limit)}
      >
        Next
      </button>
    </div>
  );
}
