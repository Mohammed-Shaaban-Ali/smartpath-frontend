import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

type BaseProps = {
  totalPages: number;
  currentPage: number;
  totalItems?: number;
  pageSize?: number;
  className?: string;
};

type CustomPaginationProps =
  | (BaseProps & { baseUrl: string; onPageChange?: never })
  | (BaseProps & { onPageChange: (page: number) => void; baseUrl: never });

const BTNS_COUNT = 3;

export function CustomPagination({
  baseUrl,
  onPageChange,
  currentPage,
  totalPages,
  className,
}: CustomPaginationProps) {
  const router = useRouter();

  const isFirstPage =
    currentPage === 1 || (totalPages === 0 && currentPage === 0);
  const isLastPage = currentPage === totalPages;
  const isFewPages = totalPages <= BTNS_COUNT;

  const isPrevDots = !isFewPages && currentPage > Math.ceil(BTNS_COUNT / 2);
  const isAfterDots =
    !isFewPages && currentPage < totalPages - Math.floor(BTNS_COUNT / 2);

  function generateArr(start: number, count = BTNS_COUNT) {
    return Array.from(
      { length: Math.min(count, totalPages - start + 1) },
      (_, i) => start + i
    );
  }

  const startPage = isFewPages
    ? 1
    : Math.max(
        1,
        Math.min(
          currentPage - Math.floor(BTNS_COUNT / 2),
          totalPages - BTNS_COUNT + 1
        )
      );

  const handlePageChange = (e: React.MouseEvent, page: number) => {
    e.preventDefault();
    if (onPageChange) {
      onPageChange(page);
    } else if (baseUrl) {
      router.push(`${baseUrl}?page=${page}`);
    }
  };

  return (
    <section className="flex items-center justify-between w-full gap-5 px-5">
      <div className="text-14 flex items-center gap-1 text-black/80">
        <span className="hidden sm:inline">Total Pages</span>
        <span>{totalPages}</span> /{" "}
        <span className="font-bold text-black">{currentPage}</span>
      </div>

      <div className={cn("h-16 flex items-center justify-center", className)}>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href={baseUrl ? `${baseUrl}?page=${currentPage - 1}` : "#"}
                onClick={(e) => handlePageChange(e, currentPage - 1)}
                aria-disabled={isFirstPage}
                className={cn(
                  isFirstPage
                    ? "pointer-events-none opacity-50 cursor-not-allowed"
                    : ""
                )}
              />
            </PaginationItem>

            {isPrevDots && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}

            {generateArr(startPage).map((ele) => (
              <PaginationItem key={ele}>
                <PaginationLink
                  href={baseUrl ? `${baseUrl}?page=${ele}` : "#"}
                  onClick={(e) => handlePageChange(e, ele)}
                  isActive={currentPage === ele}
                  className="cursor-pointer w-10 h-10 flex items-center justify-center"
                >
                  {ele}
                </PaginationLink>
              </PaginationItem>
            ))}

            {isAfterDots && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}

            <PaginationItem>
              <PaginationNext
                href={baseUrl ? `${baseUrl}?page=${currentPage + 1}` : "#"}
                onClick={(e) => handlePageChange(e, currentPage + 1)}
                aria-disabled={isLastPage}
                className={cn(
                  isLastPage ? "pointer-events-none opacity-50" : ""
                )}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </section>
  );
}
