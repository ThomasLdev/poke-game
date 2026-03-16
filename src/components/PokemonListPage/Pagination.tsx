import {Button} from "@/components/DesignSystem";

interface PaginationProps {
    next: string | null;
    previous: string | null;
    onPageChange: (offset: number) => void;
    page: number;
    loading: boolean;
    extraClass: string;
}

export function Pagination({next, previous, onPageChange, page, loading, extraClass}: PaginationProps) {
  return (
    <div className={`max-w-7xl mx-auto px-4 flex justify-center gap-2 ` + extraClass}>
        <Button isDisabled={!previous || loading} onClick={() => onPageChange(page - 1)} text={'Previous'} />
        <span className="text-slate-300 mx-auto md:mx-0 px-4 py-2">
            Current : {page}
        </span>
        <Button isDisabled={!next || loading} onClick={() => onPageChange(page + 1)} text={'Next'} />
    </div>
  );
}
