export function GridSkeletonCard() {
  return (
    <div className="h-52 bg-slate-800/60 border border-slate-700/50 rounded-2xl p-4 text-center animate-pulse">
      <div className="relative">
        <div className="w-24 h-24 mx-auto mb-2 bg-slate-700/50 rounded-full" />
      </div>
      <div className="h-4 w-10 mx-auto mb-1 bg-slate-700/50 rounded" />
      <div className="h-5 w-16 mx-auto bg-slate-700/50 rounded" />
      <div className="mt-2 flex justify-center gap-1">
        <div className="h-5 w-12 bg-slate-700/50 rounded-full" />
        <div className="h-5 w-12 bg-slate-700/50 rounded-full" />
      </div>
    </div>
  );
}