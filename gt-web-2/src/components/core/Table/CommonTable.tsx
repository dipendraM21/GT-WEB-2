"use client";

import { useSidebar } from "@/components/ui/sidebar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  OnChangeFn,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import debounce from "lodash.debounce";
import React, { useEffect, useRef, useState } from "react";
import CustomText from "../Text/CustomText";

interface TableProps<T extends { id: string | number }> {
  columns: ColumnDef<T>[];
  data: T[];
  sorting?: SortingState;
  setSorting?: OnChangeFn<SortingState>;
  onRowClick?: (row: T) => void;
  selectedRow?: (row: T) => boolean;
  isLoading?: boolean;
  isKeepScroll?: boolean;
  onDataLoaded?: () => void;
  loader?: React.ReactNode;
  dataLength: number;
  className?: string;
  onFetchMoreData?: () => void;
  inverse?: boolean;
  sortable?: boolean;
  // Pagination props
  hasPagination?: boolean;
  currentPage?: number;
  totalPage?: number;
  pageSize?: number;
  defaultPageSize?: number;
  showQuickJumper?: boolean;
  onPageChange?: (page: number, pageSize: number) => void;
}

export const CommonTable = <T extends { id: string | number }>({
  columns,
  data,
  sorting,
  setSorting,
  onRowClick,
  selectedRow,
  isLoading,
  className = "common-table",
  onDataLoaded,
  isKeepScroll = false,
  sortable = false,
  // Pagination props
  hasPagination = false,
  currentPage = 1,
  totalPage = 0,
  pageSize = 10,
  defaultPageSize = 10,
  showQuickJumper = true,
  onPageChange,
}: TableProps<T>) => {
  const { state } = useSidebar();
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: { sorting },
  });

  const [scrollPosition, setScrollPosition] = useState(0);
  const [horizontalScrollPosition, setHorizontalScrollPosition] = useState(0);
  const [isWideTable, setIsWideTable] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = debounce(() => {
    if (containerRef.current) {
      setScrollPosition(containerRef.current.scrollTop);
      setHorizontalScrollPosition(containerRef.current.scrollLeft);

      // Check if table is wide enough to need horizontal scroll
      const { scrollWidth, clientWidth } = containerRef.current;
      setIsWideTable(scrollWidth > clientWidth);
    }
  }, 700);

  const handleHorizontalScroll = debounce(() => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      const maxScrollLeft = scrollWidth - clientWidth;

      // If user has scrolled more than 80% to the right, auto-scroll to end
      if (scrollLeft > maxScrollLeft * 0.8) {
        containerRef.current.scrollTo({
          left: maxScrollLeft,
          behavior: "smooth",
        });
      }
    }
  }, 300);

  // Calculate scroll progress percentage
  const getScrollProgress = () => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      const maxScrollLeft = scrollWidth - clientWidth;
      return maxScrollLeft > 0 ? (scrollLeft / maxScrollLeft) * 100 : 0;
    }
    return 0;
  };

  // Handle mouse wheel for horizontal scrolling
  const handleWheel = (e: React.WheelEvent) => {
    if (containerRef.current) {
      // Check if Shift key is pressed or if we're on a wide table
      if (e.shiftKey || isWideTable) {
        e.preventDefault();
        const scrollAmount = e.deltaY;
        containerRef.current.scrollLeft += scrollAmount;
      }
    }
  };

  useEffect(() => {
    if (!isKeepScroll) return;
    const container = containerRef.current;
    if (container && scrollPosition !== 0) {
      container.scrollTop = scrollPosition;
      if (onDataLoaded) {
        onDataLoaded();
      }
    }
  }, [data, onDataLoaded, isKeepScroll, scrollPosition]);

  // Check table width on mount and data changes
  useEffect(() => {
    if (containerRef.current) {
      const { scrollWidth, clientWidth } = containerRef.current;
      const wide = scrollWidth > clientWidth;
      setIsWideTable(wide);
    }
  }, [data, columns]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[300px]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      onScroll={(e) => {
        handleScroll();
        handleHorizontalScroll();
      }}
      onWheel={handleWheel}
      className={`overflow-x-auto rounded-lg border shadow-lg ${
        state === "collapsed"
          ? "w-full max-w-[1766px]"
          : "w-full max-w-[1585px]"
      }`}
      style={{
        background:
          "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.98) 100%)",
        border: "1px solid rgba(226, 232, 240, 0.8)",
        boxShadow:
          "0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -1px rgba(0, 0, 0, 0.06)",
        scrollbarWidth: "none" /* Firefox */,
        msOverflowStyle: "none" /* Internet Explorer 10+ */,
      }}
    >
      <style jsx>{`
        div::-webkit-scrollbar {
          display: none; /* Chrome, Safari and Opera */
        }
      `}</style>
      <div className="min-w-max relative">
        <Table>
          <TableHeader className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white sticky top-0 z-10 shadow-lg">
            {table.getHeaderGroups().map((headerGroup, index) => (
              <TableRow
                key={`headerGroup-${headerGroup?.id}-${index}`}
                className="hover:bg-gray-800 transition-colors"
              >
                {headerGroup?.headers?.map((header, headerIndex) => (
                  <TableHead
                    key={`header-${header.id}-${index}-${headerIndex}`}
                    colSpan={header.colSpan}
                    className="border-b border-gray-700"
                  >
                    {header?.isPlaceholder ? null : (
                      <div
                        className={
                          header?.column?.getCanSort()
                            ? "cursor-pointer select-none flex items-center gap-2 text-white hover:text-blue-200 transition-colors duration-200"
                            : "text-white"
                        }
                        onClick={header?.column?.getToggleSortingHandler()}
                      >
                        <CustomText
                          variant="font-16-regular-20"
                          sx={{ color: "white" }}
                        >
                          {flexRender(
                            header?.column?.columnDef?.header,
                            header?.getContext()
                          )}
                        </CustomText>
                        {header?.column?.getCanSort() && sortable && (
                          <div className="flex flex-col">
                            <span
                              className={`text-xs transition-colors duration-200 ${
                                header.column.getIsSorted() === "asc"
                                  ? "text-blue-300"
                                  : "text-gray-300"
                              }`}
                            >
                              ▲
                            </span>
                            <span
                              className={`text-xs transition-colors duration-200 ${
                                header.column.getIsSorted() === "desc"
                                  ? "text-blue-300"
                                  : "text-gray-300"
                              }`}
                            >
                              ▼
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {data?.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={table.getAllColumns().length}
                  className="py-8 text-center text-gray-500"
                >
                  No data available
                </TableCell>
              </TableRow>
            ) : (
              table.getRowModel().rows.map((row, rowIndex) => (
                <TableRow
                  key={`row-${row.id}-${rowIndex}`}
                  onClick={() => onRowClick && onRowClick(row?.original)}
                  className={`
                    ${
                      selectedRow && selectedRow(row?.original)
                        ? "selected bg-blue-50"
                        : ""
                    }
                    ${rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50"}
                    hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50
                    transition-all duration-200 cursor-pointer
                    border-b border-gray-100
                  `}
                  data-state={
                    selectedRow && selectedRow(row?.original)
                      ? "selected"
                      : undefined
                  }
                >
                  {row?.getVisibleCells()?.map((cell, cellIndex) => (
                    <TableCell
                      key={`cell-${cell.id}-${cellIndex}`}
                      className="py-3 px-4 transition-colors duration-200"
                    >
                      <CustomText variant="font-16-medium-125">
                        {flexRender(
                          cell?.column?.columnDef?.cell,
                          cell?.getContext()
                        )}
                      </CustomText>
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Horizontal Scroll Progress Bar */}
      {getScrollProgress() > 0 && (
        <div className="w-full bg-gray-200 rounded-full h-1 mt-2">
          <div
            className="bg-blue-500 h-1 rounded-full transition-all duration-300"
            style={{ width: `${getScrollProgress()}%` }}
          />
        </div>
      )}

      {/* Pagination Component */}
      {hasPagination && (
        <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200">
          <div className="flex items-center space-x-2 text-sm text-gray-700">
            <span>Rows per page:</span>
            <select
              value={pageSize}
              onChange={(e) => onPageChange?.(1, parseInt(e.target.value))}
              className="border border-gray-300 rounded px-2 py-1 text-sm"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
            <span>
              Page {currentPage} of {Math.ceil(totalPage / pageSize)}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => onPageChange?.(1, pageSize)}
              disabled={currentPage === 1}
              className="px-2 py-1 text-sm border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              First
            </button>
            <button
              onClick={() => onPageChange?.(currentPage - 1, pageSize)}
              disabled={currentPage === 1}
              className="px-2 py-1 text-sm border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Previous
            </button>

            {showQuickJumper && (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-700">Go to:</span>
                <input
                  type="number"
                  min={1}
                  max={Math.ceil(totalPage / pageSize)}
                  className="w-16 px-2 py-1 text-sm border border-gray-300 rounded"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      const page = parseInt(e.currentTarget.value);
                      if (
                        page >= 1 &&
                        page <= Math.ceil(totalPage / pageSize)
                      ) {
                        onPageChange?.(page, pageSize);
                      }
                    }
                  }}
                />
              </div>
            )}

            <button
              onClick={() => onPageChange?.(currentPage + 1, pageSize)}
              disabled={currentPage >= Math.ceil(totalPage / pageSize)}
              className="px-2 py-1 text-sm border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Next
            </button>
            <button
              onClick={() =>
                onPageChange?.(Math.ceil(totalPage / pageSize), pageSize)
              }
              disabled={currentPage >= Math.ceil(totalPage / pageSize)}
              className="px-2 py-1 text-sm border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Last
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
