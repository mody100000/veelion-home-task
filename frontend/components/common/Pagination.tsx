import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/common/Button";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="mt-6 gap-x-10 flex items-center justify-center px-1">
      <div className="flex gap-1.5">
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="h-8 px-3 text-xs gap-1.5 bg-white text-zinc-900 border-border font-medium hover:border-primary hover:text-primary shadow-sm disabled:bg-slate-50 disabled:text-slate-400 disabled:border-slate-200 disabled:shadow-none transition-all"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
        >
          <ChevronLeft size={14} />
          Prev
        </Button>
        <div className="flex items-center px-2">
          <span className="text-xs font-medium text-slate-500">
            Page <span className="text-zinc-900">{currentPage}</span> of{" "}
            <span className="text-zinc-900">{totalPages}</span>
          </span>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="h-8 px-3 text-xs gap-1.5 bg-white text-zinc-900 border-border font-medium hover:border-primary hover:text-primary shadow-sm disabled:bg-slate-50 disabled:text-slate-400 disabled:border-slate-200 disabled:shadow-none transition-all"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
        >
          Next
          <ChevronRight size={14} />
        </Button>
      </div>
    </div>
  );
}
